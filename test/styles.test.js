import { thumbnail, tileViewport } from "../src/styles";

const baseItem = {
  isSelected: false,
  thumbnailWidth: 100,
  thumbnailHeight: 100,
  scaletwidth: 100,
  marginLeft: 0,
  vwidth: 100,
  rowIndex: 0,
};

const rowHeight = 100;

describe("styles", () => {
  describe("thumbnail", () => {
    it("should add transform property based on item.orientation", () => {
      const item = { ...baseItem, orientation: 3 };

      const result = thumbnail({ item, rowHeight });

      expect(result.transform).toEqual("rotate(180deg)");
    });

    it("should return styles when image is not selected", () => {
      const result = thumbnail({ item: baseItem, rowHeight });

      expect(result).toEqual({
        cursor: "pointer",
        height: 100,
        marginLeft: 0,
        marginTop: 0,
        width: 100,
      });
    });

    it("should return styles when image is horizontal and selected", () => {
      const item = {
        ...baseItem,
        scaletwidth: 200,
        vwidth: 200,
        isSelected: true,
      };

      const result = thumbnail({ item, rowHeight });

      expect(result).toEqual({
        cursor: "pointer",
        height: 84,
        marginLeft: 0,
        marginTop: -8,
        width: 168,
      });
    });

    it("should return styles when image is vertical and selected", () => {
      const item = {
        ...baseItem,
        scaletwidth: 50,
        vwidth: 50,
        isSelected: true,
      };

      const result = thumbnail({ item, rowHeight });

      expect(result).toEqual({
        cursor: "pointer",
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

      const result = tileViewport({ item, rowHeight });

      expect(result).toEqual(
        expect.objectContaining({
          background: "url(data:image/png;base64)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        })
      );
    });

    it("should return styles when item is not selected", () => {
      const result = tileViewport({ item: baseItem, rowHeight });

      expect(result).toEqual({
        height: 100,
        overflow: "hidden",
        width: 100,
      });
    });

    it("should return styles when item is selected", () => {
      const item = { ...baseItem, isSelected: true };

      const result = tileViewport({ item, rowHeight });

      expect(result).toEqual({
        height: 68,
        margin: 16,
        overflow: "hidden",
        width: 68,
      });
    });
  });
});
