import * as React from "react";

declare module "react-grid-gallery" {
  export interface ReactGridGalleryImageComponentProps {
    item: ReactGridGalleryImage;
    index: number;
    margin: number;
    height: number;
    isSelectable: boolean;
    onClick: (index: number, event: React.MouseEvent<HTMLElement>) => void;
    onSelectImage: (
      index: number,
      event: React.MouseEvent<HTMLElement>
    ) => void;
    tileViewportStyle: () => React.CSSProperties;
    thumbnailStyle: () => React.CSSProperties;
    tagStyle: React.CSSProperties;
    customOverlay: React.ReactNode;
    thumbnailImageComponent: React.ComponentType<ReactGridGalleryThumbnailImageComponentProps>;
  }

  export interface ReactGridGalleryThumbnailImageComponentImageProps {
    key: string;
    src: string;
    alt: string;
    title: string | null;
    style: React.CSSProperties;
  }

  export type ReactGridGalleryThumbnailImageComponentProps =
    ReactGridGalleryImageComponentProps & {
      imageProps: ReactGridGalleryThumbnailImageComponentImageProps;
    };

  export interface ReactGridGalleryImageTag {
    value: React.ReactNode;
    title: string;
    key?: string;
  }

  export interface ReactGridGalleryImage {
    src: string;
    thumbnail: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    nano?: string;
    alt?: string;
    tags?: ReactGridGalleryImageTag[];
    isSelected?: boolean;
    caption?: React.ReactNode;
    srcSet?: string[];
    customOverlay?: React.ReactNode;
    thumbnailCaption?: React.ReactNode;
    orientation?: number;
  }

  export interface ReactGridGalleryProps {
    images: ReactGridGalleryImage[];
    id?: string;
    enableImageSelection?: boolean;
    onSelectImage?: (index: number, image: ReactGridGalleryImage) => void;
    rowHeight?: number;
    maxRows?: number;
    margin?: number;
    defaultContainerWidth?: number;
    enableLightbox?: boolean;
    onClickThumbnail?: (
      index: number,
      event: React.MouseEvent<HTMLElement>
    ) => void;
    lightboxWillOpen?: (index: number) => void;
    lightboxWillClose?: () => void;
    tagStyle?: React.CSSProperties;
    tileViewportStyle?: () => React.CSSProperties;
    thumbnailStyle?: () => React.CSSProperties;
    thumbnailImageComponent?: React.ComponentType<ReactGridGalleryThumbnailImageComponentProps>;

    backdropClosesModal?: boolean;
    currentImage?: number;
    preloadNextImage?: boolean;
    customControls?: React.ReactNode[];
    enableKeyboardInput?: boolean;
    imageCountSeparator?: string;
    isOpen?: boolean;
    showCloseButton?: boolean;
    showImageCount?: boolean;
    onClickImage?: (event: React.MouseEvent<HTMLElement>) => void;
    onClickPrev?: () => void;
    onClickNext?: () => void;

    currentImageWillChange?: (index: number) => void;
    showLightboxThumbnails?: boolean;

    onClickLightboxThumbnail?: (index: number) => void;
    lightboxWidth?: number;
    lightBoxProps?: any;
  }

  class ReactGridGallery extends React.Component<ReactGridGalleryProps> {}

  export default ReactGridGallery;
}
