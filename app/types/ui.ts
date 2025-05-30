import { NonEmptyArray } from './utils';

export type UIImage = {
  src: string;
  width: number;
  height: number;
  classes?: string;
  alt?: string;
};

export type ImagesArray = NonEmptyArray<UIImage>;

export type UILink = {
  name: string;
  href: string;
  icon: any;
};

export type LinksArray = NonEmptyArray<UILink>;
