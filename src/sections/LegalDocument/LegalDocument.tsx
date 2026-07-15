import './LegalDocument.scss';
import { type Locale } from '@/i18n/config';
import { enPrivacyBlocks, ruPrivacyBlocks } from './privacyPolicyData';
import { enAgreementBlocks, ruAgreementBlocks } from './agreementData';
import { enWebsitePrivacyBlocks, ruWebsitePrivacyBlocks } from './websitePrivacyPolicyData';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; columns?: string[]; rows: string[][] };

type LegalDocumentProps = { locale?: Locale; document?: 'privacy' | 'privacy-website' | 'agreement' };

const headingPattern = /^(?:\d+\.\s|Who we are|Who are we|Definitions|What is|For what|From where|To whom|Do we|What rights|Contact|Is my|Changes to|РљС‚Рѕ РјС‹|РћРїСЂРµРґРµР»РµРЅРёСЏ|Р”Р»СЏ РєР°РєРёС…|РЎ РєР°РєРѕР№|РљРѕРјСѓ РјС‹|РЎРѕР±РёСЂР°РµРј|РџРµСЂРµРґР°РµРј|РСЃРїРѕР»СЊР·СѓРµРј|РљР°РєРёРµ|РљР°Рє СЂРµР°Р»РёР·РѕРІР°С‚СЊ|РљРѕРЅС‚Р°РєС‚|РџСЂРѕРґР°РµРј|РР·РјРµРЅРµРЅРёСЏ|Р С™Р В°Р С”Р С‘Р Вµ|Р С™РЎвЂљР С• Р СРЎвЂ№|Р вЂќР В»РЎРЏ Р С”Р В°Р С”Р С‘РЎвЂ¦|Р ВР В·Р СР ВµР Р…Р ВµР Р…Р С‘РЎРЏ)/i;
const agreementHeadingPattern = /^(?:Introduction|Definitions|Telegram Terms|Right to use the Service|Description of the Service|Paid Service|VIP Subscription|Payment Rules|Information about Payment|User Eligibility|User Responsibilities|Content Responsibility|Specific Rules|User ban|Privacy and Data Protection|Security|Third-party links and information|Indemnity and Liability Limitation|Changes to the Terms of Use|Governing Law|Assignment|Contact Information|Indonesian Law Compliance|Indian Law Compliance|EU Digital Services Act Compliance|What is not allowed|How we moderate content|What action can we take|How to report illegal content|How to get in touch with us as a user|Points of contact|Legal Representative|Р’РІРµРґРµРЅРёРµ|РћРїСЂРµРґРµР»РµРЅРёСЏ|РЈСЃР»РѕРІРёСЏ Telegram|РџСЂР°РІРѕ РЅР° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РЎРµСЂРІРёСЃР°|РћРїРёСЃР°РЅРёРµ РЎРµСЂРІРёСЃР°|РџР»Р°С‚РЅС‹Рµ СѓСЃР»СѓРіРё|VIP-РїРѕРґРїРёСЃРєР°|РџСЂР°РІРёР»Р° РѕРїР»Р°С‚С‹|РРЅС„РѕСЂРјР°С†РёСЏ РѕР± РѕРїР»Р°С‚Рµ|РћР±СЏР·Р°РЅРЅРѕСЃС‚Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ|РћС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ Р·Р° РєРѕРЅС‚РµРЅС‚|РћСЃРѕР±С‹Рµ РїСЂР°РІРёР»Р° РґР»СЏ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№ РёР· РРЅРґРёРё Рё РРЅРґРѕРЅРµР·РёРё|РћСЃРѕР±С‹Рµ РїСЂР°РІРёР»Р°|Р‘Р»РѕРєРёСЂРѕРІРєР° РџРѕР»СЊР·РѕРІР°С‚РµР»СЏ|РљРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ Рё Р·Р°С‰РёС‚Р° РґР°РЅРЅС‹С…|Р‘РµР·РѕРїР°СЃРЅРѕСЃС‚СЊ|РЎСЃС‹Р»РєРё Рё РёРЅС„РѕСЂРјР°С†РёСЏ С‚СЂРµС‚СЊРёС… Р»РёС†|Р’РѕР·РјРµС‰РµРЅРёРµ СѓР±С‹С‚РєРѕРІ Рё РѕРіСЂР°РЅРёС‡РµРЅРёРµ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё|РР·РјРµРЅРµРЅРёСЏ РЈСЃР»РѕРІРёР№ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ|РР·РјРµРЅРµРЅРёСЏ РІ РЈСЃР»РѕРІРёСЏС… РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ|РџСЂРёРјРµРЅРёРјРѕРµ РїСЂР°РІРѕ|РЈСЃС‚СѓРїРєР° РїСЂР°РІ|РџРµСЂРµРґР°С‡Р° РїСЂР°РІ|РљРѕРЅС‚Р°РєС‚РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ|РЎРѕРѕС‚РІРµС‚СЃС‚РІРёРµ СЋСЂРёРґРёС‡РµСЃРєРёРј С‚СЂРµР±РѕРІР°РЅРёСЏРј РІ РРЅРґРѕРЅРµР·РёРё|РЎРѕРѕС‚РІРµС‚СЃС‚РІРёРµ СЋСЂРёРґРёС‡РµСЃРєРёРј С‚СЂРµР±РѕРІР°РЅРёСЏРј РІ РРЅРґРёРё|РЎРѕРѕС‚РІРµС‚СЃС‚РІРёРµ Р РµРіР»Р°РјРµРЅС‚Сѓ Р•РЎ Рѕ С†РёС„СЂРѕРІС‹С… СѓСЃР»СѓРіР°С…|РћРіСЂР°РЅРёС‡РµРЅРёСЏ РїСЂРё РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРё РЎРµСЂРІРёСЃР°|Р§С‚Рѕ Р·Р°РїСЂРµС‰РµРЅРѕ|РљР°Рє РѕСЃСѓС‰РµСЃС‚РІР»СЏРµС‚СЃСЏ РјРѕРґРµСЂР°С†РёСЏ РєРѕРЅС‚РµРЅС‚Р°|РљР°Рє РјС‹ РјРѕРґРµСЂРёСЂСѓРµРј РєРѕРЅС‚РµРЅС‚|РљР°РєРёРµ РјРµСЂС‹ РјРѕРіСѓС‚ Р±С‹С‚СЊ РїСЂРёРЅСЏС‚С‹|РљР°РєРёРµ РјРµСЂС‹ РјС‹ РјРѕР¶РµРј РїСЂРёРЅСЏС‚СЊ|РљР°Рє СЃРѕРѕР±С‰РёС‚СЊ Рѕ РЅРµР·Р°РєРѕРЅРЅРѕРј РєРѕРЅС‚РµРЅС‚Рµ|РљР°Рє РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РјРѕР¶РµС‚ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ РљРѕРјРїР°РЅРёРµР№|РљР°Рє СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ РЅР°РјРё РєР°Рє РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ|РљРѕРЅС‚Р°РєС‚РЅС‹Рµ РґР°РЅРЅС‹Рµ РґР»СЏ РѕСЂРіР°РЅРѕРІ РіРѕСЃСѓРґР°СЂСЃС‚РІ-С‡Р»РµРЅРѕРІ Р•РЎ|РљРѕРЅС‚Р°РєС‚РЅС‹Рµ РґР°РЅРЅС‹Рµ|Р®СЂРёРґРёС‡РµСЃРєРёР№ РїСЂРµРґСЃС‚Р°РІРёС‚РµР»СЊ РІ СЃРѕРѕС‚РІРµС‚СЃС‚РІРёРё СЃРѕ СЃС‚Р°С‚СЊС‘Р№ 13 Р РµРіР»Р°РјРµРЅС‚Р° Р•РЎ Рѕ С†РёС„СЂРѕРІС‹С… СѓСЃР»СѓРіР°С…|РЈРїРѕР»РЅРѕРјРѕС‡РµРЅРЅС‹Р№ РїСЂРµРґСЃС‚Р°РІРёС‚РµР»СЊ)/i;
const russianHeadingPattern = /^\u041a\u0442\u043e \u043c\u044b\??$/i;
const agreementMinorHeadingPattern = /^(?:\d+\.\s*)?(?:Contact sharing policy|Specific Rules for Indian and Indonesian Users|What is not allowed(?: when using the Service)?|How we moderate content|What action can we take|How to report illegal content|How to get in touch with us as a user|Points of contact(?: for Member States.? authorities)?|Legal Representative(?: under Article 13)?|\u041e\u0441\u043e\u0431\u044b\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u0430 \u0434\u043b\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438\u0437 \u0418\u043d\u0434\u0438\u0438 \u0438 \u0418\u043d\u0434\u043e\u043d\u0435\u0437\u0438\u0438|\u041e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f \u043f\u0440\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0438 \u0421\u0435\u0440\u0432\u0438\u0441\u0430|\u041a\u0430\u043a \u043e\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043c\u043e\u0434\u0435\u0440\u0430\u0446\u0438\u044f|\u041a\u0430\u043a \u043c\u044b \u043c\u043e\u0434\u0435\u0440\u0438\u0440\u0443\u0435\u043c|\u041a\u0430\u043a\u0438\u0435 \u043c\u0435\u0440\u044b \u043c\u043e\u0433\u0443\u0442 \u0431\u044b\u0442\u044c \u043f\u0440\u0438\u043d\u044f\u0442\u044b|\u041a\u0430\u043a \u0441\u043e\u043e\u0431\u0449\u0438\u0442\u044c \u043e\u0431 \u043d\u0435\u0437\u0430\u043a\u043e\u043d\u043d\u043e\u043c \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0435|\u041a\u0430\u043a \u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043c\u043e\u0436\u0435\u0442 \u0441\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f|\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435|\u042e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043f\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043b\u044c)/i;
const agreementStandaloneHeadingPattern = /^Service;?$/i;
const agreementPaidServiceSubheadingPattern = /^(?:VIP Subscription|Reaction Reset|Billing Policies\.?|Payment Information\.?)$/i;
const agreementForcedParagraphPattern = /^(?:By using the Bot, you unilaterally affirm|The Bot operates by randomly matching|The Bot supports the following content formats:|User-generated content is subject to manual and automated moderation|We may, without prior notice, change the Service)/i;
const subheadingPattern = /^(?:\d+\.\d+\.?(?:\s|$)|Р”Р»СЏ СЂРµР·РёРґРµРЅС‚РѕРІ [^:;]{1,70}[;:]?$|For residents [^:;]{1,70}[;:]?$|Р вЂќР В»РЎРЏ РЎР‚Р ВµР В·Р С‘Р Т‘Р ВµР Р…РЎвЂљР С•Р Р† [^:;]{1,70}[;:]?$)/i;
const closingPattern = /^(With warm regards,?|MALJOY Team|\u0421 \u0443\u0432\u0430\u0436\u0435\u043d\u0438\u0435\u043c|\u041a\u043e\u043c\u0430\u043d\u0434\u0430 MALJOY)/i;
const urlPattern = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function isHeading(text: string) {
  const value = text.trim();
  return !agreementMinorHeadingPattern.test(value)
    && !agreementPaidServiceSubheadingPattern.test(value)
    && (
      russianHeadingPattern.test(value)
      || headingPattern.test(value)
      || agreementHeadingPattern.test(value)
    )
    && value.length < 140
    || agreementStandaloneHeadingPattern.test(value);
}

function renderText(text: string) {
  return text.split(urlPattern).map((part, index) => {
    if (!part) return null;
    const isEmail = /^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part);
    const href = isEmail ? `mailto:${part}` : part.replace(/[.,;]+$/, '');
    const isLink = isEmail || part.startsWith('http');
    return isLink ? (
      <span key={`${part}-${index}`}>
        <a href={href} {...(isEmail ? {} : { target: '_blank', rel: 'noreferrer' })}>{part.slice(0, href.length)}</a>
        {part.slice(href.length)}
      </span>
    ) : part;
  });
}

function isListItem(text: string) {
  const value = text.trim();
  if (agreementForcedParagraphPattern.test(value)
    || agreementStandaloneHeadingPattern.test(value)
    || agreementPaidServiceSubheadingPattern.test(value)) {
    return false;
  }
  return /^(the right|right to|request |confirmation |access |correction |anonymization|the possibility |deletion |information about|find out|know |independently |claim |РїСЂР°РІРѕ |С‚СЂРµР±РѕРІР°С‚СЊ |РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ |РґРѕСЃС‚СѓРї |РёСЃРїСЂР°РІР»РµРЅ|Р°РЅРѕРЅРёРјРёР·Р°С†|РІРѕР·РјРѕР¶РЅРѕСЃС‚|СѓРґР°Р»РµРЅРё|РёРЅС„РѕСЂРјР°С†Рё|СЃРІРµРґРµРЅРёСЏ |Р·РЅР°С‚СЊ |СЃР°РјРѕСЃС‚РѕСЏС‚РµР»СЊРЅРѕ |С‚СЂРµР±РѕРІР°РЅРё|Р СџРЎР‚Р В°Р Р†Р С•|Р СћРЎР‚Р ВµР В±Р С•Р Р†Р В°РЎвЂљРЎРЉ|Р С—Р С•Р Т‘РЎвЂљР Р†Р ВµРЎР‚Р В¶Р Т‘Р ВµР Р…Р С‘Р Вµ|Р Т‘Р С•РЎРѓРЎвЂљРЎС“Р С—|РЎС“Р В·Р Р…Р В°РЎвЂљРЎРЉ|Р В·Р В°Р С—РЎР‚Р С•РЎРѓР С‘РЎвЂљРЎРЉ|Р С—Р ВµРЎР‚Р ВµР Т‘Р В°РЎвЂЎРЎС“)/i.test(text) || text.trim().endsWith(';');
}

function isSubheading(text: string) {
  const value = text.trim();
  return agreementPaidServiceSubheadingPattern.test(value)
    || agreementMinorHeadingPattern.test(value)
    || subheadingPattern.test(value)
    || /^For residents\b[^:]{0,90};?$/i.test(value)
    || /^\u0414\u043b\u044f \u0440\u0435\u0437\u0438\u0434\u0435\u043d\u0442\u043e\u0432\b[^:]{0,90};?$/i.test(value);
}

function normalizeListItem(text: string) {
  const value = text.trim();
  const lowerCased = value.charAt(0).toLowerCase() + value.slice(1);
  return /;$/.test(lowerCased) ? lowerCased : `${lowerCased.replace(/[.!]+$/, '')};`;
}

function renderBlock(block: LegalBlock, index: number) {
  if (block.type === 'paragraph') {
    if (isSubheading(block.text)) {
      const subheading = block.text.replace(/[;:]+$/, '');
      return <h3 className="legal-document__subheading" key={index}>{renderText(subheading)}</h3>;
    }
    return isHeading(block.text) ? <h2 key={index}>{renderText(block.text)}</h2> : <p key={index}>{renderText(block.text)}</p>;
  }

  if (block.type === 'list') {
    return (
      <ul key={index}>
        {block.items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderText(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="legal-document__table-wrap" key={index}>
      <table>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{renderText(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function addMissingSectionNumber(text: string, nextNumber: number) {
  return /^\d+\.\s/.test(text) || nextNumber <= 0 ? text : `${nextNumber}. ${text}`;
}

function renderBlocks(blocks: LegalBlock[]) {
  const result: React.ReactNode[] = [];
  let group: React.ReactNode[] = [];
  let list: string[] = [];
  let collectingList = false;
  let lastSectionNumber = 0;
  let tableSectionNumber: number | null = null;
  let hasExplicitTableSubheadings = false;
  let lastTableSubheadingNumber = 0;
  let listKey = 0;

  const flushList = () => {
    if (!list.length) return;
    group.push(
      <ul key={`list-${listKey++}`}>
        {list.map((item, index) => <li key={`${item}-${index}`}>{renderText(item)}</li>)}
      </ul>,
    );
    list = [];
  };

  const flushGroup = () => {
    if (!group.length) return;
    result.push(<div className="legal-document__block" key={`block-${result.length}`}>{group}</div>);
    group = [];
  };

  blocks.forEach((block, index) => {
    const blockText = block.type === 'paragraph' ? block.text.trim() : '';
    const forcedParagraph = block.type === 'paragraph' && agreementForcedParagraphPattern.test(blockText);
    if (block.type === 'paragraph' && !forcedParagraph && !isHeading(block.text) && !isSubheading(block.text) && (isListItem(block.text) || collectingList)) {
      list.push(normalizeListItem(block.text));
      collectingList = true;
      return;
    }
    flushList();
    collectingList = block.type === 'paragraph' && !forcedParagraph && blockText.endsWith(':');
    if (block.type === 'paragraph' && isHeading(block.text)) {
      flushGroup();
      const numberMatch = block.text.match(/^(\d+)\.\s/);
      if (numberMatch) {
        const sourceNumber = Number(numberMatch[1]);
        lastSectionNumber = sourceNumber > lastSectionNumber + 1
          ? lastSectionNumber + 1
          : sourceNumber;
        const normalizedNumber = `${lastSectionNumber}. `;
        group.push(
          <h2 key={`numbered-${index}`}>
            {renderText(block.text.replace(/^\d+\.\s/, normalizedNumber))}
          </h2>,
        );
        if (lastSectionNumber === 4 || /^For what purposes\b/i.test(block.text.trim())) {
          tableSectionNumber = 4;
          hasExplicitTableSubheadings = false;
          lastTableSubheadingNumber = 0;
        } else {
          tableSectionNumber = null;
        }
        return;
      }
      else if (!isSubheading(block.text)) lastSectionNumber += 1;
      if (!numberMatch && !isSubheading(block.text)) {
        if (/^For what purposes\b/i.test(block.text.trim())) {
          tableSectionNumber = 4;
          hasExplicitTableSubheadings = false;
          lastTableSubheadingNumber = 0;
        }
        group.push(<h2 key={`numbered-${index}`}>{addMissingSectionNumber(block.text, lastSectionNumber)}</h2>);
        return;
      }
    }
    if (block.type === 'paragraph' && isSubheading(block.text) && /^4\.\d+/.test(block.text.trim())) {
      hasExplicitTableSubheadings = true;
    }
    if (block.type === 'paragraph' && (/^4\.\s/.test(block.text.trim()) || /^For what purposes\b/i.test(block.text.trim()))) {
      tableSectionNumber = 4;
      hasExplicitTableSubheadings = false;
      lastTableSubheadingNumber = 0;
    } else if (block.type === 'paragraph' && isHeading(block.text) && !/^4\.\s/.test(block.text.trim())) {
      tableSectionNumber = null;
    }
    if (block.type === 'table' && tableSectionNumber === 4 && !hasExplicitTableSubheadings) {
      const subNumber = ++lastTableSubheadingNumber;
      group.push(<h3 className="legal-document__subheading" key={`table-subheading-${index}`}>{`4.${subNumber}`}</h3>);
    }
    group.push(renderBlock(block, index));
  });
  flushList();
  flushGroup();
  return result;
}

export function LegalDocument({ locale = 'ru', document = 'privacy' }: LegalDocumentProps) {
  const sourceBlocks = document === 'agreement'
    ? locale === 'ru' ? ruAgreementBlocks : enAgreementBlocks
    : document === 'privacy-website'
      ? locale === 'ru' ? ruWebsitePrivacyBlocks : enWebsitePrivacyBlocks
      : locale === 'ru' ? ruPrivacyBlocks : enPrivacyBlocks;
  const blocks = sourceBlocks.filter(
    (block) => block.type !== 'paragraph' || !closingPattern.test(block.text),
  );
  const isRussian = locale === 'ru';

  return (
    <section className="legal-document">
      <div className="legal-document__container">
        <header className="legal-document__hero">
          <p>{isRussian ? '\u0410\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u0440\u0435\u0434\u0430\u043a\u0446\u0438\u044f: 1 \u0438\u044e\u043d\u044f 2026 \u0433.' : 'Last updated: June 1, 2026.'}</p>
          <h1>{document === 'agreement' ? (isRussian ? 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ' : 'TERMS OF USE') : document === 'privacy-website' ? (isRussian ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ САЙТА' : 'WEBSITE PRIVACY POLICY') : (isRussian ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' : 'PRIVACY POLICY')}</h1>
          <div className="legal-document__lead">
            {document === 'privacy' && blocks.slice(2, 4).map((block, index) => block.type === 'paragraph' && <p key={index}>{renderText(block.text)}</p>)}
          </div>
        </header>

        <div className="legal-document__sections">
          <article className="legal-document__section">
            <div className="legal-document__content">{renderBlocks(document === 'privacy' ? blocks.slice(4) : blocks)}</div>
          </article>
        </div>

        <footer className="legal-document__closing">
          <p>{isRussian ? '\u0421\u043f\u0430\u0441\u0438\u0431\u043e, \u0447\u0442\u043e \u0432\u044b\u0431\u0440\u0430\u043b\u0438 Chatus. \u0421 \u0443\u0432\u0430\u0436\u0435\u043d\u0438\u0435\u043c, \u043a\u043e\u043c\u0430\u043d\u0434\u0430 MALJOY.' : 'With warm regards, MALJOY Team'}</p>
        </footer>
      </div>
    </section>
  );
}
