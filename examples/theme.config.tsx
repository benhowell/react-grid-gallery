export default {
  project: { link: "https://github.com/benhowell/react-grid-gallery" },
  docsRepositoryBase:
    "https://github.com/benhowell/react-grid-gallery/blob/master/examples",
  titleSuffix: " – React Grid Gallery",
  unstable_faviconGlyph: "👋",
  footer: {
    text: (
      <span>
        Maintained by{" "}
        <a
          className="dark:text-gray-200 hover:opacity-70 text-gray-500 text-gray-900"
          target="_blank"
          href="https://github.com/benhowell"
        >
          Ben Howell
        </a>{" "}
        and{" "}
        <a
          className="dark:text-gray-200 hover:opacity-70 text-gray-500 text-gray-900"
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
      <span className="mr-2 hidden font-extrabold md:inline">
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
    </>
  ),
};
