import svetAvifSrc from '@/assets/decor/svet.avif';
import svetSrc from '@/assets/decor/svet.webp';
import { RulesBan } from './rules-ban/RulesBan';
import { RulesHero } from './rules-hero/RulesHero';
import { RulesPrinciples } from './rules-principles/RulesPrinciples';
import './Rules.scss';

export function Rules() {
  return (
    <section className="rules-page indent">
      <picture>
        <source srcSet={svetAvifSrc.src} type="image/avif" />
        <source srcSet={svetSrc.src} type="image/webp" />
        <img className="rules-page__rays" src={svetSrc.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </picture>

      <div className="rules-page__container">
        <RulesHero />
        <RulesPrinciples />
        <RulesBan />
      </div>
    </section>
  );
}
