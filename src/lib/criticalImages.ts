import faceRowOne from '@/assets/faces/1.avif';
import faceRowTwo from '@/assets/faces/2.avif';
import faceRowThree from '@/assets/faces/3.avif';
import mobileFaceRowOne from '@/assets/faces/mobile/1.avif';
import mobileFaceRowTwo from '@/assets/faces/mobile/2.avif';
import mobileFaceRowThree from '@/assets/faces/mobile/3.avif';
import heroBackground from '@/assets/new_home_screen.avif';

type ImageAsset = string | { src: string };

const imageSrc = (asset: ImageAsset) => (typeof asset === 'string' ? asset : asset.src);

const desktopCriticalImages = [
  faceRowOne,
  faceRowTwo,
  faceRowThree,
  heroBackground,
].map(imageSrc);

const mobileCriticalImages = [
  mobileFaceRowOne,
  mobileFaceRowTwo,
  mobileFaceRowThree,
  heroBackground,
].map(imageSrc);

export function getCriticalImages(isMobile: boolean) {
  return isMobile ? mobileCriticalImages : desktopCriticalImages;
}
