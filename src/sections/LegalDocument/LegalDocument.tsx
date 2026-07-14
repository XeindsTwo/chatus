import './LegalDocument.scss';
import { type Locale } from '@/i18n/config';
import { enPrivacyBlocks, ruPrivacyBlocks } from './privacyPolicyData';
import { enAgreementBlocks, ruAgreementBlocks } from './agreementData';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; rows: string[][] };

type LegalDocumentProps = { locale?: Locale; document?: 'privacy' | 'agreement' };

const headingPattern = /^(?:\d+\.\s|Who we are|Who are we|Definitions|What is|For what|From where|To whom|Do we|What rights|Contact|Is my|Changes to|Кто мы|Определения|Для каких|С какой|Кому мы|Собираем|Передаем|Используем|Какие|Как реализовать|Контакт|Продаем|Изменения|РљР°РєРёРµ|РљС‚Рѕ РјС‹|Р”Р»СЏ РєР°РєРёС…|РР·РјРµРЅРµРЅРёСЏ)/i;
const agreementHeadingPattern = /^(?:Introduction|Definitions|Telegram Terms|Right to use the Service|Description of the Service|Paid Service|VIP Subscription|Payment Rules|Information about Payment|User Responsibilities|Content Responsibility|Specific Rules|User ban|Privacy and Data Protection|Security|Third-party links and information|Indemnity and Liability Limitation|Changes to the Terms of Use|Governing Law|Assignment|Contact Information|Indonesian Law Compliance|Indian Law Compliance|EU Digital Services Act Compliance|What is not allowed|How we moderate content|What action can we take|How to report illegal content|How to get in touch with us as a user|Points of contact|Legal Representative|Введение|Определения|Условия Telegram|Право на использование Сервиса|Описание Сервиса|Платные услуги|VIP-подписка|Правила оплаты|Информация об оплате|Обязанности пользователя|Ответственность за контент|Особые правила для пользователей из Индии и Индонезии|Особые правила|Блокировка Пользователя|Конфиденциальность и защита данных|Безопасность|Ссылки и информация третьих лиц|Возмещение убытков и ограничение ответственности|Изменения Условий использования|Изменения в Условиях использования|Применимое право|Уступка прав|Передача прав|Контактная информация|Соответствие юридическим требованиям в Индонезии|Соответствие юридическим требованиям в Индии|Соответствие Регламенту ЕС о цифровых услугах|Ограничения при использовании Сервиса|Что запрещено|Как осуществляется модерация контента|Как мы модерируем контент|Какие меры могут быть приняты|Какие меры мы можем принять|Как сообщить о незаконном контенте|Как Пользователь может связаться с Компанией|Как связаться с нами как пользователь|Контактные данные для органов государств-членов ЕС|Контактные данные|Юридический представитель в соответствии со статьёй 13 Регламента ЕС о цифровых услугах|Уполномоченный представитель)/i;
const subheadingPattern = /^(?:\d+\.\d+\.?(?:\s|$)|Для резидентов [^:;]{1,70}[;:]?$|For residents [^:;]{1,70}[;:]?$|Р”Р»СЏ СЂРµР·РёРґРµРЅС‚РѕРІ [^:;]{1,70}[;:]?$)/i;
const closingPattern = /^(With warm regards,?|MALJOY Team|С уважением|Команда MALJOY)/i;
const urlPattern = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function isHeading(text: string) {
  return (headingPattern.test(text) || agreementHeadingPattern.test(text)) && text.length < 140;
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
  return /^(the right|right to|request |confirmation |access |correction |anonymization|the possibility |deletion |information about|find out|know |independently |claim |право |требовать |подтверждение |доступ |исправлен|анонимизац|возможност|удалени|информаци|сведения |знать |самостоятельно |требовани|РџСЂР°РІРѕ|РўСЂРµР±РѕРІР°С‚СЊ|РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµ|РґРѕСЃС‚СѓРї|СѓР·РЅР°С‚СЊ|Р·Р°РїСЂРѕСЃРёС‚СЊ|РїРµСЂРµРґР°С‡Сѓ)/i.test(text) || text.trim().endsWith(';');
}

function isSubheading(text: string) {
  const value = text.trim();
  return subheadingPattern.test(value)
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
      return <h3 className="legal-document__subheading" key={index}>{renderText(block.text)}</h3>;
    }
    return isHeading(block.text) ? <h2 key={index}>{renderText(block.text)}</h2> : <p key={index}>{renderText(block.text)}</p>;
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
    if (block.type === 'paragraph' && !isHeading(block.text) && !isSubheading(block.text) && (isListItem(block.text) || collectingList)) {
      list.push(normalizeListItem(block.text));
      collectingList = true;
      return;
    }
    flushList();
    collectingList = block.type === 'paragraph' && block.text.trim().endsWith(':');
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
    : locale === 'ru' ? ruPrivacyBlocks : enPrivacyBlocks;
  const blocks = sourceBlocks.filter(
    (block) => block.type !== 'paragraph' || !closingPattern.test(block.text),
  );
  const isRussian = locale === 'ru';

  return (
    <section className="legal-document">
      <div className="legal-document__container">
        <header className="legal-document__hero">
          <p>{isRussian ? 'Актуальная редакция: 1 июня 2026 г.' : 'Last updated: June 1, 2026.'}</p>
          <h1>{document === 'agreement' ? (isRussian ? 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ' : 'TERMS OF USE') : 'WEBSITE PRIVACY POLICY'}</h1>
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
          <p>{isRussian ? 'Спасибо, что выбрали Chatus. С уважением, команда MALJOY.' : 'With warm regards, MALJOY Team'}</p>
        </footer>
      </div>
    </section>
  );
}
