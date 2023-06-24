import { useState, useEffect, useCallback, useRef, MouseEvent } from "react";
import { Image } from "./Image";
import { ResizeListener } from "./ResizeListener";
import { buildLayoutFlat } from "./buildLayout";
import { Image as ImageInterface, GalleryProps } from "./types";
import * as styles from "./styles";

export const Gallery = <T extends ImageInterface>({
  images,
  id = "ReactGridGallery",
  enableImageSelection = true,
  onSelect = () => {},
  rowHeight = 180,
  maxRows,
  margin = 2,
  defaultContainerWidth = 0,
  onClick = () => {},
  tileViewportStyle,
  thumbnailStyle,
  tagStyle,
  thumbnailImageComponent,
}: GalleryProps<T>): JSX.Element => {
  const galleryRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(defaultContainerWidth);

  const handleResize = useCallback(() => {
    if (!galleryRef.current) {
      return;
    }
    let width = galleryRef.current.clientWidth;
    try {
      width = galleryRef.current.getBoundingClientRect().width;
    } catch (err) {}
    setContainerWidth(Math.floor(width));
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  const thumbnails = buildLayoutFlat<T>(images, {
    containerWidth,
    maxRows,
    rowHeight,
    margin,
  });

  const handleSelect = (index: number, event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onSelect(index, images[index], event);
  };

  const handleClick = (index: number, event: MouseEvent<HTMLElement>) => {
    onClick(index, images[index], event);
  };

  return (
    <div id={id} className="ReactGridGallery" ref={galleryRef}>
      <ResizeListener onResize={handleResize} />
      <div style={styles.gallery}>
        {thumbnails.map((item, index) => (
          <Image
            key={item.key || index}
            item={item}
            index={index}
            margin={margin}
            height={rowHeight}
            isSelectable={enableImageSelection}
            onClick={handleClick}
            onSelect={handleSelect}
            tagStyle={tagStyle}
            tileViewportStyle={tileViewportStyle}
            thumbnailStyle={thumbnailStyle}
            thumbnailImageComponent={thumbnailImageComponent}
          />
        ))}
      </div>
    </div>
  );
};

Gallery.displayName = "Gallery";
