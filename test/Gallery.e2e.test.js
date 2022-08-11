/**
 * @jest-environment puppeteer
 */
import { toMatchImageSnapshot } from "jest-image-snapshot";
expect.extend({ toMatchImageSnapshot });
import images from "./images.json";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
const redPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L+7yHwAF0gJbauK6vQAAAABJRU5ErkJggg==";
const bluePixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0jfr3HwAFBwKW6YMOIwAAAABJRU5ErkJggg==";

const tags1 = [
  // avoid using any symbols because of the difference in font rendering on the local OS and CI ubuntu
  { value: "     ", title: "     " },
  { value: "     ", title: "     " },
];

const getGalleryBrowserBuildPath = () => {
  try {
    return require.resolve("./../dist/react-grid-gallery.umd.js");
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.error(
        `Gallery build file isn't found! Don't forget to perform "npm run build" before running e2e tests.`
      );
    }
    throw error;
  }
};

const renderGallery = async (props, options = {}) => {
  const reactVersion = options.reactVersion || 18;
  const timeout = options.timeout || 10000;
  const styles = options.styles || "";

  await page.setContent('<html><div id="root"></div></html>');
  const reactScript = `https://unpkg.com/react@${reactVersion}/umd/react.development.js`;
  await page.addScriptTag({ url: reactScript });
  const reactDOMScript = `https://unpkg.com/react-dom@${reactVersion}/umd/react-dom.development.js`;
  await page.addScriptTag({ url: reactDOMScript });
  await page.addScriptTag({ path: getGalleryBrowserBuildPath() });
  if (styles) {
    await page.addStyleTag({ content: styles });
  }

  const latestReactRender = (props) => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(React.createElement(Gallery, props, null));
  };

  const previousReactRender = (props) => {
    const root = document.getElementById("root");
    ReactDOM.render(React.createElement(Gallery, props, null), root);
  };

  const renderFunction =
    reactVersion >= 18 ? latestReactRender : previousReactRender;
  await page.evaluate(renderFunction, props);

  const imagesHaveLoaded = () =>
    Array.from(document.images).every((i) => i.complete);
  await page.waitForFunction(imagesHaveLoaded, { timeout });
};

describe("Gallery is visually correct", () => {
  beforeEach(async () => {
    await page.setViewport({ width: 800, height: 800 });
  });

  it("on react16", async () => {
    await renderGallery({ images }, { reactVersion: 16 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("on react17", async () => {
    await renderGallery({ images }, { reactVersion: 17 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("on react18", async () => {
    await renderGallery({ images }, { reactVersion: 18 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("after viewport resize", async () => {
    const sizes = [
      [320, 570],
      [360, 640],
      [480, 854],
      [960, 540],
      [1024, 640],
      [1366, 768],
      [1920, 1080],
    ];
    await renderGallery({ images });

    for (const [width, height] of sizes) {
      await page.setViewport({ width, height });

      expect(await page.screenshot()).toMatchImageSnapshot();
    }
  });

  it("when rowHeight is 100", async () => {
    await renderGallery({ images, rowHeight: 100 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when margin is 10", async () => {
    await renderGallery({ images, margin: 10 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when maxRows is 2", async () => {
    await renderGallery({ images, maxRows: 2 });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when images are selected", async () => {
    const imagesWithSelection = images.map((i) => ({ ...i, isSelected: true }));

    await renderGallery({ images: imagesWithSelection });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when images are transparent", async () => {
    const transparentImages = images.map((i) => ({
      ...i,
      thumbnail: transparentPixel,
    }));

    await renderGallery({ images: transparentImages });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when nano prop passed", async () => {
    const imagesWithNano = images.map((i, index) => ({
      ...i,
      thumbnail: transparentPixel,
      nano: index % 2 ? redPixel : bluePixel,
    }));

    await renderGallery({ images: imagesWithNano });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when images have tags", async () => {
    const imagesWithTags = images.map((i, index) => ({
      ...i,
      tags: index % 2 ? tags1 : [],
    }));

    await renderGallery({ images: imagesWithTags });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when images have tags and tagStyle prop passed", async () => {
    const imagesWithTags = images.map((i, index) => ({
      ...i,
      tags: index % 2 ? tags1 : [],
    }));
    const tagStyle = {
      background: "white",
      padding: 10,
      opacity: 1,
    };

    await renderGallery({ images: imagesWithTags, tagStyle });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });

  it("when container width is decimal", async () => {
    const styles = "#root { width: 474.7px }";

    await renderGallery({ images }, { styles });

    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
