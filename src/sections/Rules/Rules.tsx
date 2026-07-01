import svetSrc from '@/assets/decor/svet.png';
import { RulesBan } from './rules-ban/RulesBan';
import { RulesHero } from './rules-hero/RulesHero';
import { RulesPrinciples } from './rules-principles/RulesPrinciples';
import './Rules.scss';

export function Rules() {
  return (
    <section className="rules-page">
      <img className="rules-page__rays" src={svetSrc.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />

      <div className="rules-page__container">
        <RulesHero />
        <RulesPrinciples />
        <RulesBan />
      </div>
    </section>
  );
}
