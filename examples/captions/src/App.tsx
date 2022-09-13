import { Gallery } from "react-grid-gallery";
import { images } from "./images";

export default function App() {
  return (
    <div>
      <Gallery images={images} enableImageSelection={false} />
    </div>
  );
}
