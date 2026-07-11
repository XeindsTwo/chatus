import heroBackground from '@/assets/new_home_screen.webp';

type ImageAsset = string | { src: string };

const imageSrc = (asset: ImageAsset) => (typeof asset === 'string' ? asset : asset.src);

const criticalImages = [heroBackground].map(imageSrc);

export function getCriticalImages(_isMobile: boolean) {
  return criticalImages;
}
