import './LegalDocument.scss';
import { type Locale } from '@/i18n/config';
import { enPrivacyBlocks, ruPrivacyBlocks } from './privacyPolicyData';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; rows: string[][] };

type LegalDocumentProps = { locale?: Locale };

const headingPattern = /^(Who we are|Who are we|Definitions|What is|For what|From where|To whom|Do we|What rights|Contact|Is my|Changes to|Кто мы|Определения|Для каких|С какой|Кому мы|Собираем|Передаем|Используем|Какие|Как реализовать|Контакт|Продаем|Изменения)/i;
const subheadingPattern = /^\d+(?:\.\d+)*\.?\s/;
const closingPattern = /^(With warm regards,?|MALJOY Team|С уважением|Команда MALJOY)/i;
const urlPattern = /(https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;

function isHeading(text: string) {
  return headingPattern.test(text) && text.length < 140;
}

function renderText(text: string) {
  return text.split(urlPattern).map((part, index) => {
    if (!part) return null;
    const isEmail = part.includes('@') && !part.startsWith('http');
    const href = isEmail ? `mailto:${part}` : part.replace(/[.,;]+$/, '');
    const isLink = isEmail || part.startsWith('http');
    return isLink ? (
      <span key={`${part}-${index}`}>
        <a href={href} target="_blank" rel="noreferrer">{part.slice(0, href.length)}</a>
        {part.slice(href.length)}
      </span>
    ) : part;
  });
}

function isListItem(text: string) {
  return /^(the right|right to|request |confirmation |access |correction |anonymization|the possibility |deletion |information about|find out|know |independently |claim |право |требовать |подтверждение |доступ |исправлен|анонимизац|возможност|удалени|информаци|сведения |знать |самостоятельно |требовани)/i.test(text);
}

function renderBlock(block: LegalBlock, index: number) {
  if (block.type === 'paragraph') {
    if (subheadingPattern.test(block.text)) {
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

function renderBlocks(blocks: LegalBlock[]) {
  const result: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    result.push(
      <ul key={`list-${result.length}`}>
        {list.map((item, index) => <li key={`${item}-${index}`}>{renderText(item)}</li>)}
      </ul>,
    );
    list = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === 'paragraph' && isListItem(block.text)) {
      list.push(block.text);
      return;
    }
    flushList();
    result.push(renderBlock(block, index));
  });
  flushList();
  return result;
}

export function LegalDocument({ locale = 'ru' }: LegalDocumentProps) {
  const blocks = (locale === 'ru' ? ruPrivacyBlocks : enPrivacyBlocks).filter(
    (block) => block.type !== 'paragraph' || !closingPattern.test(block.text),
  );
  const isRussian = locale === 'ru';

  return (
    <section className="legal-document">
      <div className="legal-document__container">
        <header className="legal-document__hero">
          <p>{isRussian ? 'Актуальная редакция: 1 июня 2026 г.' : 'Last updated: June 1, 2026.'}</p>
          <h1>{isRussian ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' : 'PRIVACY POLICY'}</h1>
          <div className="legal-document__lead">
            {blocks.slice(2, 4).map((block, index) => block.type === 'paragraph' && <p key={index}>{renderText(block.text)}</p>)}
          </div>
        </header>

        <div className="legal-document__sections">
          <article className="legal-document__section">
            <div className="legal-document__content">{renderBlocks(blocks.slice(4))}</div>
          </article>
        </div>

        <footer className="legal-document__closing">
          <p>{isRussian ? 'Спасибо, что выбрали Chatus. С уважением, команда MALJOY.' : 'With warm regards, MALJOY Team'}</p>
        </footer>
      </div>
    </section>
  );
}
