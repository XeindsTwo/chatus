import mobileFaceRowOne from '@/assets/faces/mobile/1.avif';
import mobileFaceRowTwo from '@/assets/faces/mobile/2.avif';
import mobileFaceRowThree from '@/assets/faces/mobile/3.avif';
import heroBackground from '@/assets/new_home_screen.avif';
import audienceStepsBackground from '@/assets/audience-steps-bg.svg';

type ImageAsset = string | { src: string };

const imageSrc = (asset: ImageAsset) => (typeof asset === 'string' ? asset : asset.src);

const desktopCriticalImages = [heroBackground, audienceStepsBackground].map(imageSrc);

const mobileCriticalImages = [
  mobileFaceRowOne,
  mobileFaceRowTwo,
  mobileFaceRowThree,
  heroBackground,
  audienceStepsBackground,
].map(imageSrc);

export function getCriticalImages(isMobile: boolean) {
  return isMobile ? mobileCriticalImages : desktopCriticalImages;
}
