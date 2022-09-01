import PropTypes from "prop-types";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "./Image";
import ResizeListener from "./ResizeListener";
import renderThumbs from "./renderThumbs";

const Gallery = (props) => {
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

  const thumbnails = renderThumbs(images, {
    containerWidth,
    maxRows,
    rowHeight,
    margin,
  });

  const handleSelectImage = (index, event) => {
    event.preventDefault();
    props.onSelectImage(index, images[index]);
  };

  return (
    <div id={props.id} className="ReactGridGallery" ref={galleryRef}>
      <ResizeListener onResize={handleResize} />
      {thumbnails.map((item, index) => (
        <Image
          key={index}
          item={item}
          index={index}
          margin={margin}
          height={rowHeight}
          isSelectable={enableImageSelection}
          onClick={props.onClickThumbnail}
          onSelectImage={handleSelectImage}
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

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      nano: PropTypes.string,
      alt: PropTypes.string,
      thumbnail: PropTypes.string.isRequired,
      caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
            .isRequired,
          title: PropTypes.string.isRequired,
          key: PropTypes.string,
        })
      ),
      thumbnailWidth: PropTypes.number.isRequired,
      thumbnailHeight: PropTypes.number.isRequired,
      isSelected: PropTypes.bool,
      thumbnailCaption: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
    })
  ).isRequired,
  id: PropTypes.string,
  enableImageSelection: PropTypes.bool,
  onSelectImage: PropTypes.func,
  rowHeight: PropTypes.number,
  maxRows: PropTypes.number,
  margin: PropTypes.number,
  defaultContainerWidth: PropTypes.number,
  onClickThumbnail: PropTypes.func,
  tileViewportStyle: PropTypes.func,
  thumbnailStyle: PropTypes.func,
  tagStyle: PropTypes.object,
  thumbnailImageComponent: PropTypes.func,
};

Gallery.defaultProps = {
  id: "ReactGridGallery",
  enableImageSelection: true,
  rowHeight: 180,
  margin: 2,
  defaultContainerWidth: 0,
  onClickThumbnail: () => {},
  onSelectImage: () => {},
};

export default Gallery;
