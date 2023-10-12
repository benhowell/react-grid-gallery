export default {
  project: { link: "https://github.com/benhowell/react-grid-gallery" },
  docsRepositoryBase:
    "https://github.com/benhowell/react-grid-gallery/blob/master/examples",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – React Grid Gallery",
    };
  },
  faviconGlyph: "👋",
  footer: {
    text: (
      <span>
        Maintained by{" "}
        <a
          className="dark:nx-text-gray-200 hover:nx-opacity-70 nx-text-gray-500 nx-text-gray-900"
          target="_blank"
          href="https://github.com/benhowell"
        >
          Ben Howell
        </a>{" "}
        and{" "}
        <a
          className="dark:nx-text-gray-200 hover:nx-opacity-70 nx-text-gray-500 nx-text-gray-900"
          target="_blank"
          href="https://github.com/itoldya"
        >
          Igor Isaev
        </a>
        .
      </span>
    ),
  },
  logo: (
    <>
      <span className="nx-mr-2 hidden nx-font-extrabold md:nx-inline">
        React Grid Gallery
      </span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="React Grid Gallery: justified gallery component for React"
      />
      <meta
        name="og:title"
        content="React Grid Gallery: justified gallery component for React"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://benhowell.github.io/react-grid-gallery/favicon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://benhowell.github.io/react-grid-gallery/favicon.png"
      />
    </>
  ),
};
