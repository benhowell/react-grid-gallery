import renderThumbs, { RenderThumbsParams } from "../src/renderThumbs";
import { Image } from "../src/types";

const image100x100 = {
  thumbnailWidth: 100,
  thumbnailHeight: 100,
} as Image;

describe("renderThumbs", () => {
  it("should return empty array when images param not passed", () => {
    const images = undefined as [];
    const options = { containerWidth: 1000 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([]);
  });

  it("should return empty array when containerWidth isn't defined", () => {
    const images = [image100x100];
    const options = {} as RenderThumbsParams;

    const result = renderThumbs(images, options);

    expect(result).toEqual([]);
  });

  it("should return empty array when containerWidth is 0", () => {
    const images = [image100x100];
    const options = { containerWidth: 0 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([]);
  });

  it("should not modify passed images array", () => {
    const images = [image100x100];
    const options = { containerWidth: 100 };

    const result = renderThumbs(images, options);

    expect(result).not.toBe(images);
  });

  it("should limit number of items when maxRows param passed", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = {
      containerWidth: 100,
      rowHeight: 100,
      margin: 0,
      maxRows: 1,
    };

    const result = renderThumbs(images, options);

    expect(result).toEqual([expect.objectContaining({ rowIndex: 0 })]);
  });

  it("should not compress image when it's narrower than container", () => {
    const images = [image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 0 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0, vwidth: 100, marginLeft: 0 }),
    ]);
  });

  it("should compress image and calculate cut off when it's wider the container", () => {
    const images = [image100x100];
    const options = { containerWidth: 50, rowHeight: 100, margin: 0 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0, vwidth: 50, marginLeft: -25 }),
    ]);
  });

  it("should build a single row when images fit into it", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 201, rowHeight: 100, margin: 0 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0, marginLeft: -16 }),
      expect.objectContaining({ rowIndex: 0, marginLeft: -16 }),
      expect.objectContaining({ rowIndex: 0, marginLeft: -16 }),
    ]);
  });

  it("should build multiple rows when images don't fit into a single row", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 0 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0 }),
      expect.objectContaining({ rowIndex: 0 }),
      expect.objectContaining({ rowIndex: 1 }),
    ]);
  });

  it("should build multiple rows when images could fit into a single row but also the margin is specified", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 5 };

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0, marginLeft: -5, vwidth: 90 }),
      expect.objectContaining({ rowIndex: 0, marginLeft: -5, vwidth: 90 }),
      expect.objectContaining({ rowIndex: 1, marginLeft: 0, vwidth: 100 }),
    ]);
  });

  it("should fit multiple images into one row and calculate scaled width when rowHeight is specified", () => {
    const options = { containerWidth: 201, rowHeight: 50, margin: 0 };
    const images = [image100x100, image100x100, image100x100, image100x100];

    const result = renderThumbs(images, options);

    expect(result).toEqual([
      expect.objectContaining({ rowIndex: 0, scaletwidth: 50, vwidth: 50 }),
      expect.objectContaining({ rowIndex: 0, scaletwidth: 50, vwidth: 50 }),
      expect.objectContaining({ rowIndex: 0, scaletwidth: 50, vwidth: 50 }),
      expect.objectContaining({ rowIndex: 0, scaletwidth: 50, vwidth: 50 }),
    ]);
  });
});
