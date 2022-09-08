import * as React from "react";
import * as ReactDOM from "react-dom";
import { Gallery } from "../src";

const image1 = {
  src: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Apples.jpg",
  thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/320px-Apples.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 480,
};

const image2 = {
  src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg",
  thumbnail:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/320px-Bananas.jpg",
  thumbnailWidth: 320,
  thumbnailHeight: 213,
};

const images = [image1, image2];

function App(): JSX.Element {
  return (
    <div>
      <Gallery images={images} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
