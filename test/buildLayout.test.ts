import {
  buildLayout,
  buildLayoutFlat,
  BuildLayoutOptions,
  Image,
} from "../src";

const image100x100 = {
  src: "",
  width: 100,
  height: 100,
};

describe("buildLayout", () => {
  it("should return empty array when images param not passed", () => {
    const images = undefined as [];
    const options = { containerWidth: 1000 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([]);
  });

  it("should return empty array when containerWidth isn't defined", () => {
    const images = [image100x100];
    const options = {} as BuildLayoutOptions;

    const rows = buildLayout(images, options);

    expect(rows).toEqual([]);
  });

  it("should return empty array when containerWidth is 0", () => {
    const images = [image100x100];
    const options = { containerWidth: 0 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([]);
  });

  it("should not modify passed images array", () => {
    const images = [image100x100];
    const options = { containerWidth: 100 };

    const rows = buildLayout(images, options);

    expect(rows).not.toBe(images);
  });

  it("should return custom image attributes", () => {
    interface MyImage extends Image {
      customAttr: string;
    }
    const image: MyImage = {
      customAttr: "imageId",
      src: "",
      width: 100,
      height: 100,
    };
    const options = { containerWidth: 100 };

    const rows = buildLayout<MyImage>([image], options);

    expect(rows[0][0].customAttr).toBe("imageId");
  });

  it("should limit number of items when maxRows param passed", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = {
      containerWidth: 100,
      rowHeight: 100,
      margin: 0,
      maxRows: 1,
    };

    const rows = buildLayout(images, options);

    expect(rows.length).toEqual(1);
  });

  it("should not compress image when it's narrower than container", () => {
    const images = [image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 0 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([
      [
        expect.objectContaining({
          viewportWidth: 100,
          marginLeft: 0,
        }),
      ],
    ]);
  });

  it("should compress image and calculate cut off when it's wider the container", () => {
    const images = [image100x100];
    const options = { containerWidth: 50, rowHeight: 100, margin: 0 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([
      [
        expect.objectContaining({
          viewportWidth: 50,
          marginLeft: -25,
        }),
      ],
    ]);
  });

  it("should build a single row when images fit into it", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 201, rowHeight: 100, margin: 0 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([
      [
        expect.objectContaining({ marginLeft: -16 }),
        expect.objectContaining({ marginLeft: -16 }),
        expect.objectContaining({ marginLeft: -16 }),
      ],
    ]);
  });

  it("should build multiple rows when images don't fit into a single row", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 0 };

    const rows = buildLayout(images, options);

    expect(rows.length).toEqual(2);
  });

  it("should build multiple rows when images could fit into a single row but also the margin is specified", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 5 };

    const rows = buildLayout(images, options);

    expect(rows).toEqual([
      [
        expect.objectContaining({
          marginLeft: -5,
          viewportWidth: 90,
        }),
        expect.objectContaining({
          marginLeft: -5,
          viewportWidth: 90,
        }),
      ],
      [
        expect.objectContaining({
          marginLeft: 0,
          viewportWidth: 100,
        }),
      ],
    ]);
  });

  it("should fit multiple images into one row and calculate scaled width when rowHeight is specified", () => {
    const options = { containerWidth: 201, rowHeight: 50, margin: 0 };
    const images = [image100x100, image100x100, image100x100, image100x100];

    const rows = buildLayout(images, options);

    expect(rows).toEqual([
      [
        expect.objectContaining({
          scaledWidth: 50,
          viewportWidth: 50,
        }),
        expect.objectContaining({
          scaledWidth: 50,
          viewportWidth: 50,
        }),
        expect.objectContaining({
          scaledWidth: 50,
          viewportWidth: 50,
        }),
        expect.objectContaining({
          scaledWidth: 50,
          viewportWidth: 50,
        }),
      ],
    ]);
  });
});

describe("buildLayoutFlat", () => {
  it("should return all row items as a flat list", () => {
    const images = [image100x100, image100x100, image100x100];
    const options = { containerWidth: 200, rowHeight: 100, margin: 0 };

    const rows = buildLayoutFlat(images, options);

    expect(rows.length).toEqual(3);
  });
});
