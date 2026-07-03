import faceRowOne from '@/assets/faces/1.webp';
import faceRowTwo from '@/assets/faces/2.webp';
import faceRowThree from '@/assets/faces/3.webp';
import mobileFaceRowOne from '@/assets/faces/mobile/1.webp';
import mobileFaceRowTwo from '@/assets/faces/mobile/2.webp';
import mobileFaceRowThree from '@/assets/faces/mobile/3.webp';
import heroBackground from '@/assets/new_home_screen.webp';
import whatThis from '@/assets/what-this.webp';
import whatThisEn from '@/assets/what-this-en.webp';
import whatThisId from '@/assets/what-this-id.webp';
import audienceStepsBg from '@/assets/audience-steps-bg.svg';
import benefitFast from '@/assets/decor/benefits/1.svg';
import benefitFlirt from '@/assets/decor/benefits/2.svg';
import benefitFlirtBg from '@/assets/decor/benefits/2-bg.svg';
import benefitAnon from '@/assets/decor/benefits/3.svg';
import benefitAnonBg from '@/assets/decor/benefits/3-bg.svg';
import benefitTelegram from '@/assets/decor/benefits/4.svg';
import benefitTelegramCard from '@/assets/decor/benefits/card-4-desktop.svg';
import benefitTelegramCardEn from '@/assets/decor/benefits/card-4-desktop-en.svg';
import benefitTelegramCardId from '@/assets/decor/benefits/card-4-desktop-id.svg';
import stepOpen from '@/assets/decor/how-work/1.svg';
import stepSearch from '@/assets/decor/how-work/2.svg';
import stepChat from '@/assets/decor/how-work/3.svg';
import tariffFree from '@/assets/decor/tariffs/free.svg';
import tariffDiamond from '@/assets/decor/tariffs/diamond.svg';
import footerDecor from '@/assets/decor/footer.svg';
import footerMobileDecor from '@/assets/decor/footer-mobile.svg';
import rulesIconOne from '@/assets/decor/rules/1.svg';
import rulesIconTwo from '@/assets/decor/rules/2.svg';
import rulesIconThree from '@/assets/decor/rules/3.svg';
import rulesCross from '@/assets/decor/rules/cross.svg';
import svet from '@/assets/decor/svet.webp';

type ImageAsset = string | { src: string };

const imageSrc = (asset: ImageAsset) => (typeof asset === 'string' ? asset : asset.src);

export const criticalImages = [
  faceRowOne,
  faceRowTwo,
  faceRowThree,
  mobileFaceRowOne,
  mobileFaceRowTwo,
  mobileFaceRowThree,
  heroBackground,
  whatThis,
  whatThisEn,
  whatThisId,
  audienceStepsBg,
  benefitFast,
  benefitFlirt,
  benefitFlirtBg,
  benefitAnon,
  benefitAnonBg,
  benefitTelegram,
  benefitTelegramCard,
  benefitTelegramCardEn,
  benefitTelegramCardId,
  stepOpen,
  stepSearch,
  stepChat,
  tariffFree,
  tariffDiamond,
  footerDecor,
  footerMobileDecor,
  rulesIconOne,
  rulesIconTwo,
  rulesIconThree,
  rulesCross,
  svet,
].map(imageSrc);


