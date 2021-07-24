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

export interface ShootingStarConstructor {
  new (target: Element, options?: IOptions): IShootingStar;
}

export default ShootingStarConstructor;
