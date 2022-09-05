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

export interface ImageExtended extends Image {
  scaledWidth: number;
  scaledHeight: number;
  viewportWidth: number;
  marginLeft: number;
}

export interface BuildLayoutOptions {
  containerWidth: number;
  maxRows?: number;
  rowHeight?: number;
  margin?: number;
}

export type ImageExtendedRow = ImageExtended[];

export type EventHandler = (
  index: number,
  event: MouseEvent<HTMLElement>
) => void;

export interface ImageProps {
  item: ImageExtended;
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

export type ThumbnailImageProps = ImageProps & {
  imageProps: ThumbnailImageComponentImageProps;
};

export interface GalleryProps {
  images: Image[];
  id?: string;
  enableImageSelection?: boolean;
  onSelectImage?: (index: number, image: Image) => void;
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
