import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import Gallery from "../src/Gallery";

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

const getItems = () => screen.getAllByTestId("grid-gallery-item");
const getItem = () => screen.getByTestId("grid-gallery-item");
const getItemThumbnail = () =>
  screen.getByTestId("grid-gallery-item_thumbnail");
const getItemViewport = () => screen.getByTestId("grid-gallery-item_viewport");
const getItemCheckButton = () =>
  screen.getByTestId("grid-gallery-item_check-button");

// emulating server-side rendering
// https://github.com/testing-library/react-testing-library/issues/561#issuecomment-1189796200
const renderStatic = (element) =>
  render(<div dangerouslySetInnerHTML={{ __html: renderToString(element) }} />);

describe("Gallery Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // define clientWidth for gallery root element
    Object.defineProperty(Element.prototype, "clientWidth", { value: 400 });
    Element.prototype.getBoundingClientRect = jest.fn(() => ({ width: 400 }));
  });

  it("should assign default id value", () => {
    render(<Gallery images={[image1, image2]} />);

    expect(document.querySelector("#ReactGridGallery")).toBeInTheDocument();
  });

  it("should assign provided id value instead of default one", () => {
    const id = "customId";

    render(<Gallery images={[image1, image2]} id={id} />);

    expect(document.querySelector("#ReactGridGallery")).not.toBeInTheDocument();
    expect(document.getElementById(id)).toBeInTheDocument();
  });

  it("should set item height based on rowHeight prop", () => {
    render(<Gallery images={[image1]} rowHeight={100} />);

    expect(getItemThumbnail()).toHaveStyle({ height: "100px" });
  });

  it("should render all provided images when maxRows is not passed", () => {
    const images = Array.from({ length: 20 }, () => image1);

    render(<Gallery images={images} />);

    expect(getItems().length).toEqual(20);
  });

  it("should render only some of provided images when maxRows is passed", () => {
    const images = Array.from({ length: 20 }, () => image1);

    render(<Gallery images={images} maxRows={1} />);

    expect(getItems().length).toBeLessThan(20);
  });

  it("should render element with custom properties provided via thumbnailImageComponent prop", () => {
    const thumbnailImageComponent = (props) => (
      <img {...props.imageProps} className="lazyload" />
    );

    render(
      <Gallery
        images={[image1]}
        thumbnailImageComponent={thumbnailImageComponent}
      />
    );

    expect(getItemThumbnail()).toHaveClass("lazyload");
  });

  it("should set styles provided via thumbnailStyle prop on thumbnail element", () => {
    const thumbnailStyle = { background: "black", opacity: 0.42 };

    render(<Gallery images={[image1]} thumbnailStyle={() => thumbnailStyle} />);

    expect(getItemThumbnail()).toHaveStyle(thumbnailStyle);
  });

  it("should set styles provided via tileViewportStyle prop on viewport element", () => {
    const tileViewportStyle = { background: "black", opacity: 0.42 };

    render(
      <Gallery images={[image1]} tileViewportStyle={() => tileViewportStyle} />
    );

    expect(getItemViewport()).toHaveStyle(tileViewportStyle);
  });

  it("should set styles provided via tagStyle prop on tag element", () => {
    const tagStyle = { background: "black", opacity: 0.42 };
    const image = {
      ...image1,
      tags: [{ value: "Vegetable", title: "Vegetable" }],
    };

    render(<Gallery images={[image]} tagStyle={tagStyle} />);

    expect(screen.getByText("Vegetable")).toHaveStyle(tagStyle);
  });

  it("should render all passed images after rerender", () => {
    const { rerender } = render(<Gallery images={[image1]} />);

    expect(getItems().length).toEqual(1);

    rerender(<Gallery images={[image1, image2]} />);

    expect(getItems().length).toEqual(2);
  });

  it("should render thumbnails on server-side when defaultContainerWidth prop is passed", () => {
    renderStatic(
      <Gallery images={[image1, image2]} defaultContainerWidth={400} />
    );

    expect(getItems().length).toEqual(2);
  });

  describe("Image Options", () => {
    it("should set thumbnail image src attribute based on thumbnail prop", () => {
      render(<Gallery images={[image1]} />);

      expect(getItemThumbnail()).toHaveAttribute("src", image1.thumbnail);
    });

    it("should set thumbnail image alt attribute based on alt prop", () => {
      const alt = "Image of apples";
      const image = { ...image1, alt };

      render(<Gallery images={[image]} />);

      expect(getItemThumbnail()).toHaveAttribute("alt", alt);
    });

    it("should set thumbnail image title attribute based on caption prop", () => {
      const caption = "Apples";
      const image = { ...image1, caption };

      render(<Gallery images={[image]} />);

      expect(getItemThumbnail()).toHaveAttribute("title", caption);
    });

    it("should not set thumbnail image title attribute when caption prop value is a react element", () => {
      const caption = <b>Apples</b>;
      const image = { ...image1, caption };

      render(<Gallery images={[image]} />);

      expect(getItemThumbnail()).not.toHaveAttribute("title");
    });

    it("should render tag element", () => {
      const image = { ...image1, tags: [{ value: "Fruit", title: "Fruit" }] };

      render(<Gallery images={[image]} />);

      expect(screen.getByText("Fruit")).toBeVisible();
    });

    it("should render tag element when tag value is a react element", () => {
      const tag1 = {
        value: <a href="https://example.com">Fruit</a>,
        title: "Fruit",
        key: "1",
      };
      const image = {
        ...image1,
        tags: [tag1],
      };

      render(<Gallery images={[image]} />);

      expect(screen.getByText("Fruit")).toBeInTheDocument();
    });

    it("should add background to viewport element based on nano prop", () => {
      const nano =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQYV2NkQAX/GZH4/xkYGBhhAmAOSBJEwDkgAQCCrgQEjpMcPgAAAABJRU5ErkJggg==";
      const image = { ...image1, nano };

      render(<Gallery images={[image]} />);

      expect(getItemViewport()).toHaveStyle(`background: url(${nano})`);
    });

    it("should not show overlay when gallery item is not hovered over", () => {
      const customOverlay = <b>Custom Overlay</b>;
      const image = { ...image1, customOverlay };

      render(<Gallery images={[image]} />);

      expect(screen.getByText("Custom Overlay")).not.toBeVisible();
    });

    it("should show overlay when gallery item is hovered over", () => {
      const customOverlay = <b>Custom Overlay</b>;
      const image = { ...image1, customOverlay };

      render(<Gallery images={[image]} />);
      fireEvent.mouseOver(getItem());

      expect(screen.getByText("Custom Overlay")).toBeVisible();
    });

    it("should add thumbnail caption provided via thumbnailCaption prop", () => {
      const thumbnailCaption = <i>Thumbnail Caption</i>;
      const image = { ...image1, thumbnailCaption };

      render(<Gallery images={[image]} />);

      expect(screen.getByText("Thumbnail Caption")).toBeVisible();
    });

    it("should transform image based on orientation prop value", () => {
      const image = { ...image1, orientation: 3 };

      render(<Gallery images={[image]} />);

      expect(getItemThumbnail()).toHaveStyle(`transform: rotate(180deg)`);
    });
  });

  describe("Selection", () => {
    it("should show check-button when item is selected", () => {
      const image = { ...image1, isSelected: true };

      render(<Gallery images={[image]} />);

      expect(getItemCheckButton()).toBeVisible();
    });

    it("should not show check-button when item is not selected", () => {
      render(<Gallery images={[image1]} />);

      expect(getItemCheckButton()).not.toBeVisible();
    });

    it("should show check-button when item is hovered over and image selection is enabled", () => {
      render(<Gallery images={[image1]} enableImageSelection={true} />);
      fireEvent.mouseOver(getItem());

      expect(getItemCheckButton()).toBeVisible();
    });

    it("should not show check-button when item is hovered over and image selection isn't enabled", () => {
      render(<Gallery images={[image1]} enableImageSelection={false} />);
      fireEvent.mouseOver(getItem());

      expect(getItemCheckButton()).not.toBeVisible();
    });

    it("should call onSelectImage with index and image object arguments passed", () => {
      const handleSelectImage = jest.fn();

      render(
        <Gallery
          images={[image1]}
          enableImageSelection={true}
          onSelectImage={handleSelectImage}
        />
      );
      fireEvent.click(getItemCheckButton());

      expect(handleSelectImage.mock.calls).toEqual([
        [0, expect.objectContaining(image1)],
      ]);
    });
  });
});
