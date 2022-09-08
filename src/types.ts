import { MouseEvent, CSSProperties, ReactNode, ComponentType } from "react";

export interface ImageTag {
  value: ReactNode;
  title: string;
  key?: string;
}

export interface Image {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
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

export type EventHandler = (
  index: number,
  event: MouseEvent<HTMLElement>
) => void;

export interface ImageProps<T extends ImageExtended = ImageExtended> {
  item: T;
  index: number;
  margin: number;
  height: number;
  isSelectable: boolean;
  onClick: EventHandler;
  onSelectImage: EventHandler;
  tileViewportStyle: () => CSSProperties;
  thumbnailStyle: () => CSSProperties;
  tagStyle: CSSProperties;
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
  onSelectImage?: (index: number, image: T) => void;
  rowHeight?: number;
  maxRows?: number;
  margin?: number;
  defaultContainerWidth?: number;
  onClickThumbnail?: EventHandler;
  tagStyle?: CSSProperties;
  tileViewportStyle?: () => CSSProperties;
  thumbnailStyle?: () => CSSProperties;
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
