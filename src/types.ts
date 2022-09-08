import { MouseEvent, CSSProperties, ReactNode, ComponentType } from "react";

type Key = string | number;

export interface ImageTag {
  value: ReactNode;
  title: string;
  key?: Key;
}

export interface Image {
  key?: Key;
  src: string;
  width: number;
  height: number;
  nano?: string;
  alt?: string;
  tags?: ImageTag[];
  isSelected?: boolean;
  caption?: ReactNode;
  customOverlay?: ReactNode;
  thumbnailCaption?: ReactNode;
  orientation?: number;
}

export type ImageExtended<T extends Image = Image> = T & {
  scaledWidth: number;
  scaledHeight: number;
  viewportWidth: number;
  marginLeft: number;
};

export interface BuildLayoutOptions {
  containerWidth: number;
  maxRows?: number;
  rowHeight?: number;
  margin?: number;
}

export type ImageExtendedRow<T extends Image = Image> = ImageExtended<T>[];

export type EventHandler<T extends Image = Image> = (
  index: number,
  item: T,
  event: MouseEvent<HTMLElement>
) => void;

export type StyleFunctionContext<T extends Image = Image> = {
  item: T;
};

export type StyleFunction<T extends Image = Image> = (
  context: StyleFunctionContext
) => CSSProperties;

export type StyleProp<T extends Image = Image> =
  | CSSProperties
  | StyleFunction<T>;

export interface ImageProps<T extends ImageExtended = ImageExtended> {
  item: T;
  index: number;
  margin: number;
  height: number;
  isSelectable: boolean;
  onClick: (index: number, event: MouseEvent<HTMLElement>) => void;
  onSelect: (index: number, event: MouseEvent<HTMLElement>) => void;
  tileViewportStyle: StyleProp<T>;
  thumbnailStyle: StyleProp<T>;
  tagStyle: StyleProp<T>;
  thumbnailImageComponent: ComponentType<ThumbnailImageProps>;
}

export interface ThumbnailImageComponentImageProps {
  key: string | number;
  src: string;
  alt: string;
  title: string | null;
  style: CSSProperties;
}

export type ThumbnailImageProps<T extends ImageExtended = ImageExtended> =
  ImageProps<T> & {
    imageProps: ThumbnailImageComponentImageProps;
  };

export interface GalleryProps<T extends Image = Image> {
  images: T[];
  id?: string;
  enableImageSelection?: boolean;
  onSelect?: EventHandler<T>;
  rowHeight?: number;
  maxRows?: number;
  margin?: number;
  defaultContainerWidth?: number;
  onClick?: EventHandler<T>;
  tileViewportStyle?: StyleProp<T>;
  thumbnailStyle?: StyleProp<T>;
  tagStyle?: StyleProp<T>;
  thumbnailImageComponent?: ComponentType<ThumbnailImageProps>;
}

export interface CheckButtonProps {
  isSelected: boolean;
  isVisible: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  color: string;
  selectedColor: string;
  hoverColor: string;
}
