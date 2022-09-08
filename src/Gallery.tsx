import { useState, useEffect, useCallback, useRef, MouseEvent } from "react";
import { Image } from "./Image";
import { ResizeListener } from "./ResizeListener";
import { buildLayoutFlat } from "./buildLayout";
import { Image as ImageInterface, GalleryProps } from "./types";

export const Gallery = <T extends ImageInterface>(
  props: GalleryProps<T>
): JSX.Element => {
  const galleryRef = useRef(null);

  const { maxRows, rowHeight, margin, enableImageSelection } = props;
  const { defaultContainerWidth, images } = props;

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
    props.onSelect(index, images[index], event);
  };

  const handleClick = (index: number, event: MouseEvent<HTMLElement>) => {
    props.onClick(index, images[index], event);
  };

  return (
    <div id={props.id} className="ReactGridGallery" ref={galleryRef}>
      <ResizeListener onResize={handleResize} />
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
          tagStyle={props.tagStyle}
          tileViewportStyle={props.tileViewportStyle}
          thumbnailStyle={props.thumbnailStyle}
          thumbnailImageComponent={props.thumbnailImageComponent}
        />
      ))}
    </div>
  );
};

Gallery.displayName = "Gallery";

Gallery.defaultProps = {
  id: "ReactGridGallery",
  enableImageSelection: true,
  rowHeight: 180,
  margin: 2,
  defaultContainerWidth: 0,
  onClick: () => {},
  onSelect: () => {},
};
