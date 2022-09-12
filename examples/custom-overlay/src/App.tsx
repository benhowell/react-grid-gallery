import { Gallery } from "react-grid-gallery";
import { images as IMAGES } from "./images";

const images = IMAGES.map((image) => ({
  ...image,
  customOverlay: (
    <div className="custom-overlay__caption">
      <div>{image.caption}</div>
      {image.tags &&
        image.tags.map((t, index) => (
          <div key={index} className="custom-overlay__tag">
            {t.title}
          </div>
        ))}
    </div>
  ),
}));

export default function App() {
  return (
    <div>
      <Gallery images={images} enableImageSelection={false} />
    </div>
  );
}
