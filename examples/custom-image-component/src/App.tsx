import { Gallery, ThumbnailImageProps } from "react-grid-gallery";
import { images } from "./images";
import { useState } from "react";

const ImageComponent = (props: ThumbnailImageProps) => {
  const [show, setShow] = useState(false);

  const { src, alt, style, title } = props.imageProps;
  if (show) {
    return <img alt={alt} src={src} title={title || ""} style={style} />;
  }

  return (
    <div
      style={{ ...style, textAlign: "center" }}
      onMouseOver={() => setShow(true)}
    >
      Hover to show
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Gallery
        images={images}
        thumbnailImageComponent={ImageComponent}
        enableImageSelection={false}
      />
    </div>
  );
}
