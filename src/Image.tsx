import { useState, MouseEvent } from "react";
import { CheckButton } from "./CheckButton";
import { ImageExtended, ImageProps } from "./types";
import * as styles from "./styles";
import { getStyle } from "./styles";

export const Image = <T extends ImageExtended>({
  item,
  thumbnailImageComponent: ThumbnailImageComponent,
  isSelectable = true,
  thumbnailStyle,
  tagStyle,
  tileViewportStyle,
  margin,
  index,
  onSelect,
  onClick,
}: ImageProps<T>): JSX.Element => {
  const styleContext = { item };

  const [hover, setHover] = useState(false);

  const thumbnailProps = {
    key: index,
    "data-testid": "grid-gallery-item_thumbnail",
    src: item.src,
    alt: item.alt ? item.alt : "",
    title: typeof item.caption === "string" ? item.caption : null,
    style: getStyle(thumbnailStyle, styles.thumbnail, styleContext),
  };

  const handleCheckButtonClick = (event: MouseEvent<HTMLElement>) => {
    if (!isSelectable) {
      return;
    }
    onSelect(index, event);
  };

  const handleViewportClick = (event: MouseEvent<HTMLElement>) => {
    onClick(index, event);
  };

  const thumbnailImageProps = {
    item,
    index,
    margin,
    onSelect,
    onClick,
    isSelectable,
    tileViewportStyle,
    thumbnailStyle,
    tagStyle,
  };

  return (
    <div
      className="ReactGridGallery_tile"
      data-testid="grid-gallery-item"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styles.galleryItem({ margin })}
    >
      <div
        className="ReactGridGallery_tile-icon-bar"
        style={styles.tileIconBar}
      >
        <CheckButton
          isSelected={item.isSelected}
          isVisible={item.isSelected || (isSelectable && hover)}
          onClick={handleCheckButtonClick}
        />
      </div>

      {!!item.tags && (
        <div
          className="ReactGridGallery_tile-bottom-bar"
          style={styles.bottomBar}
        >
          {item.tags.map((tag, index) => (
            <div
              key={tag.key || index}
              title={tag.title}
              style={styles.tagItemBlock}
            >
              <span style={getStyle(tagStyle, styles.tagItem, styleContext)}>
                {tag.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {!!item.customOverlay && (
        <div
          className="ReactGridGallery_custom-overlay"
          style={styles.customOverlay({ hover })}
        >
          {item.customOverlay}
        </div>
      )}

      <div
        className="ReactGridGallery_tile-overlay"
        style={styles.tileOverlay({
          showOverlay: hover && !item.isSelected && isSelectable,
        })}
      />

      <div
        className="ReactGridGallery_tile-viewport"
        data-testid="grid-gallery-item_viewport"
        style={getStyle(tileViewportStyle, styles.tileViewport, styleContext)}
        onClick={handleViewportClick}
      >
        {ThumbnailImageComponent ? (
          <ThumbnailImageComponent
            {...thumbnailImageProps}
            imageProps={thumbnailProps}
          />
        ) : (
          <img {...thumbnailProps} />
        )}
      </div>
      {item.thumbnailCaption && (
        <div
          className="ReactGridGallery_tile-description"
          style={styles.tileDescription}
        >
          {item.thumbnailCaption}
        </div>
      )}
    </div>
  );
};
