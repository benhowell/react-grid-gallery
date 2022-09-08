import { thumbnail, tileViewport, getStyle } from "../src/styles";
import { ImageExtended } from "../src";

const baseItem: ImageExtended = {
  src: "",
  thumbnail: "",
  isSelected: false,
  thumbnailWidth: 100,
  thumbnailHeight: 100,
  scaledWidth: 100,
  scaledHeight: 100,
  marginLeft: 0,
  viewportWidth: 100,
};

describe("styles", () => {
  describe("thumbnail", () => {
    it("should add transform property based on item.orientation", () => {
      const item = { ...baseItem, orientation: 3 };

      const result = thumbnail({ item });

      expect(result.transform).toEqual("rotate(180deg)");
    });

    it("should return styles when image is not selected", () => {
      const result = thumbnail({ item: baseItem });

      expect(result).toEqual({
        cursor: "pointer",
        maxWidth: "none",
        height: 100,
        marginLeft: 0,
        marginTop: 0,
        width: 100,
      });
    });

    it("should return styles when image is horizontal and selected", () => {
      const item = {
        ...baseItem,
        scaledWidth: 200,
        viewportWidth: 200,
        isSelected: true,
      };

      const result = thumbnail({ item });

      expect(result).toEqual({
        cursor: "pointer",
        maxWidth: "none",
        height: 84,
        marginLeft: 0,
        marginTop: -8,
        width: 168,
      });
    });

    it("should return styles when image is vertical and selected", () => {
      const item = {
        ...baseItem,
        scaledWidth: 50,
        viewportWidth: 50,
        isSelected: true,
      };

      const result = thumbnail({ item });

      expect(result).toEqual({
        cursor: "pointer",
        maxWidth: "none",
        height: 68,
        marginLeft: -8,
        marginTop: 0,
        width: 34,
      });
    });
  });

  describe("tileViewport", () => {
    it("should add background properties based on item.nano", () => {
      const item = { ...baseItem, nano: "data:image/png;base64" };

      const result = tileViewport({ item });

      expect(result).toEqual(
        expect.objectContaining({
          background: "url(data:image/png;base64)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        })
      );
    });

    it("should return styles when item is not selected", () => {
      const result = tileViewport({ item: baseItem });

      expect(result).toEqual({
        height: 100,
        overflow: "hidden",
        width: 100,
      });
    });

    it("should return styles when item is selected", () => {
      const item = { ...baseItem, isSelected: true };

      const result = tileViewport({ item });

      expect(result).toEqual({
        height: 68,
        margin: 16,
        overflow: "hidden",
        width: 68,
      });
    });
  });

  describe("getStyle", () => {
    it("should return styles provided by style prop function", () => {
      const styleProp = () => ({ display: "flex" });
      const fallback = () => ({ display: "none" });

      const style = getStyle(styleProp, fallback, { item: baseItem });

      expect(style).toEqual({ display: "flex" });
    });

    it("should return styles provided by style prop object", () => {
      const styleProp = { display: "flex" };
      const fallback = () => ({ display: "none" });

      const style = getStyle(styleProp, fallback, { item: baseItem });

      expect(style).toEqual({ display: "flex" });
    });

    it("should return styles provided by style fallback function", () => {
      const fallback = () => ({ display: "none" });

      const style = getStyle(undefined, fallback, { item: baseItem });

      expect(style).toEqual({ display: "none" });
    });
  });
});
