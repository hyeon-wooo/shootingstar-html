export interface IOptions {
  starLength?: number;
  starColor?: string;
  distance?: number;
  shootingDuration?: number;
  frequency?: number;
  minFrequency?: number;
  stoped?: boolean;
  playWhenCreated?: boolean;
}

export interface IShootingStar {
  option: {
    starLength: number;
    starColor: string;
    distance: number;
    shootingDuration: number;
    frequency: number;
    minFrequency: number;
    stoped: boolean;
    playWhenCreated: boolean;
  };
  getCurrentOption: (param: string | string[]) => string | string[];
  setStarLength: (newLength: number) => void;
  setStarColor: (newColor: string) => void;
  setDistance: (newDistance: number) => void;
  setShootingDuration: (newDuration: number) => void;
  setFrequency: (newFrequency: number) => void;
  setMinFrequency: (newMinFrequency: number) => void;
  showBackgroundStars: () => void;
  hideBackgroundStars: () => void;
}

export default function ShootingStar(
  target: Element,
  options?: IOPtions
): IShootingStar;
