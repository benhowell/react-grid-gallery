import { MouseEvent } from "react";
import { Image } from "./Image";
import { useContainerWidth } from "./useContainerWidth";
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
  const { containerRef, containerWidth } = useContainerWidth(
    defaultContainerWidth
  );

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
    <div id={id} className="ReactGridGallery" ref={containerRef}>
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
