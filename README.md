# React Grid Gallery

Justified image gallery component for [React](http://facebook.github.io/react/) inspired by [Google Photos](https://photos.google.com/).

### :tada: v1.0.0 is out!

There are breaking changes with v0.5.x, check out the [migration guide](https://github.com/benhowell/react-grid-gallery/UPGRADE_GUIDE.md) to learn more. Documentation for v0.5.x is [here](https://github.com/benhowell/react-grid-gallery/tree/v0.5.6).

## Live Demo & Examples

https://benhowell.github.io/react-grid-gallery/
* [Main Demo](https://benhowell.github.io/react-grid-gallery/#demo)
* [Pre-selected Images](https://benhowell.github.io/react-grid-gallery/#pre-selected-images)
* [Permanently Selected Images](https://benhowell.github.io/react-grid-gallery/#permanently-selected-images)
* [Simple Gallery](https://benhowell.github.io/react-grid-gallery/#simple-gallery)
* [Custom Overlay](https://benhowell.github.io/react-grid-gallery/#custom-overlay)
* [Thumbnail Captions](https://benhowell.github.io/react-grid-gallery/#thumbnail-caption)


## Installation

Using [npm](https://www.npmjs.com/):

```shell
npm install --save react-grid-gallery
```

## Quick Start

```jsx
import { Gallery } from "react-grid-gallery";

const images = [
   {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      width: 320,
      height: 174,
      isSelected: true,
      caption: "After Rain (Jeshu John - designerspics.com)",
   },
   {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      width: 320,
      height: 212,
      tags: [
         { value: "Ocean", title: "Ocean" },
         { value: "People", title: "People" },
      ],
      alt: "Boats (Jeshu John - designerspics.com)",
   },

   {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      width: 320,
      height: 212,
   },
];

<Gallery images={images} />
```

## Image Options

| Property         | Type                    | Description                                                                                                                                                                                                                                                                                                                                                                                            |
|:-----------------|:------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src              | string                  | Required. A string referring to any valid image resource (file, url, etc).                                                                                                                                                                                                                                                                                                                             |
| width            | number                  | Required. Width of the image.                                                                                                                                                                                                                                                                                                                                                                          |
| height           | number                  | Required. Height of the image.                                                                                                                                                                                                                                                                                                                                                                         |
| nano             | string:base64           | Optional. Thumbnail Base64 image will be injected to background under the main image. This provides a base64, 4x4 generated image whilst the image is being loaded.                                                                                                                                                                                                                                    |
| alt              | string                  | Optional. Image alt attribute.                                                                                                                                                                                                                                                                                                                                                                         |
| tags             | array                   | Optional. An array of objects containing tag attributes (value, title and key if value is element). e.g. `{value: "foo", title: "bar"}` or `{value: <a href={tag.url}>{tag.name}</a>, title: tag.title, key: tag.key}`                                                                                                                                                                                 |
| isSelected       | bool                    | Optional. The selected state of the image.                                                                                                                                                                                                                                                                                                                                                             |
| caption          | string &#124; ReactNode | Optional. Image caption.                                                                                                                                                                                                                                                                                                                                                                               |
| customOverlay    | element                 | Optional. A custom element to be rendered as a thumbnail overlay on hover.                                                                                                                                                                                                                                                                                                                             |
| thumbnailCaption | string &#124; ReactNode | Optional. A thumbnail caption shown below thumbnail.                                                                                                                                                                                                                                                                                                                                                   |
| orientation      | number                  | Optional. Orientation of the image. Many newer digital cameras (both dSLR and Point & Shoot digicams) have a built-in orientation sensor. The output of this sensor is used to set the EXIF orientation flag in the image file's metatdata to reflect the positioning of the camera with respect to the ground (See [EXIF Orientation Page](http://jpegclub.org/exif_orientation.html) for more info). |

## Gallery Options

| Property                | Type                      | Description                                                                                                                                                                                                                                  |
|:------------------------|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| images                  | array                     | Required. An array of objects containing image properties (see Image Options above).                                                                                                                                                         |
| id                      | string                    | Optional, default `ReactGridGallery`. `id` attribute for `<Gallery>` tag. This prop may be useful for those who wish to discriminate between multiple galleries.                                                                             |
| enableImageSelection    | bool                      | Optional, default `true`. Allow images to be selectable. Setting this option to `false` whilst supplying images with `isSelected: true` will result in those images being permanently selected.                                              |
| onSelect                | func                      | Optional. Function to execute when an image is selected. Optional args: `index` (index of selected image in images array), `image` (the selected image), `event`. This function is only executable when `enableImageSelection: true`.        |
| rowHeight               | number                    | Optional, default `180`. The height of each row in the gallery.                                                                                                                                                                              |
| maxRows                 | number                    | Optional. The maximum number of rows to show in the gallery.                                                                                                                                                                                 |
| margin                  | number                    | Optional, default `2`. The margin around each image in the gallery.                                                                                                                                                                          |
| onClick                 | func                      | Optional. Function to execute when gallery image clicked. Optional args: `index` (index of selected image in images array), `image` (the clicked image), event (the click event).                                                            |
| tagStyle                | func &#124; CSSProperties | Optional. Style or function that returns style to pass to tag elements. Optional args: `item` (the image item in `images`). Overrides internal tag style.                                                                                    |
| tileViewportStyle       | func &#124; CSSProperties | Optional. Style or function to style the image tile viewport. Optional args: `item` (the image item in `images`). Overrides internal tileViewportStyle function.                                                                             |
| thumbnailStyle          | func &#124; CSSProperties | Optional. Style or function to style the image thumbnail. Optional args: `item` (the image item in `images`). Overrides internal thumbnailStyle function.                                                                                    |
| thumbnailImageComponent | React component           | Optional. Substitute in a React component that would get passed `imageProps` (the props that would have been passed to the `<img>` tag) and `item` (the original item in `images`) to be used to render thumbnails; useful for lazy loading. |
| defaultContainerWidth   | number                    | Optional. Set default width for the container. This option is useful during server-side rendering when we want to generate an initial markup before we can detect the actual container width.                                                |


### General Notes

 * [react-grid-gallery](https://github.com/benhowell/react-grid-gallery) is built for modern browsers and therefore IE support is limited to IE 11 and newer.

 * As the inspiration for this component comes from [Google Photos](https://photos.google.com/), very small thumbnails may not be the most aesthetically pleasing due to the border size applied when selected. A sensible rowHeight default of 180px has been chosen, but rowHeights down to 100px are still reasonable.

 * Gallery width is determined by the containing element. Therefore your containing element must have a width (%, em, px, whatever) **_before_** the gallery is loaded!

 * If you don't know your `width` and `height` values, you can find these out using any number of [javascript hacks](http://stackoverflow.com/a/1944298), bearing in mind the load penalty associated with these methods.


### Contributing
All contributions to [react-grid-gallery](https://github.com/benhowell/react-grid-gallery) are very welcome. Feature requests, issue reports and pull requests are greatly appreciated. Please follow the [contribution guidelines](https://github.com/benhowell/react-grid-gallery/blob/master/.github/contributing.md)


### License
React Grid Gallery is free to use for personal and commercial projects under the [MIT License](https://github.com/benhowell/react-grid-gallery/blob/master/LICENSE). Attribution is not required, but appreciated.


### Acknowledgements

 * Visual design inspired by [Google Photos](https://photos.google.com/).

 * Thumbnail viewport implementation inspired by [GPlusGallery](http://fmaul.de/gallery-grid-example/) by Florian Maul.

 * Backend lightbox functionality via [React Images](https://github.com/jossmac/react-images) by [jossmac](https://github.com/jossmac).

 * The following gallery functions were obtained from the [React Images example](https://github.com/jossmac/react-images/blob/b85bd83ae651d0fd373bb495ac88670ee4dfadab/examples/src/components/Gallery.js) demo: closeLightbox, gotoNext, gotoPrevious, handleClickImage, openLightbox.

 * [cust0dian](https://github.com/cust0dian) for critical bug fixes in [PR 6](https://github.com/benhowell/react-grid-gallery/pull/6) and [PR 7](https://github.com/benhowell/react-grid-gallery/pull/7).

 * [ValYouW](https://github.com/ValYouW) for lightboxWillOpen and lightBoxWillClose functionality [PR 20](https://github.com/benhowell/react-grid-gallery/pull/20) and customOverlay option: [PR 22](https://github.com/benhowell/react-grid-gallery/pull/22).

 * [danalloway](https://github.com/danalloway) for theme pass-through prop [PR 27](https://github.com/benhowell/react-grid-gallery/pull/27)

 * [SimeonC](https://github.com/SimeonC) for _update thumbnails when maxRows changes_ [PR 35](https://github.com/benhowell/react-grid-gallery/pull/35) and _resize on scrollbar presence change_ [PR 40](https://github.com/benhowell/react-grid-gallery/pull/40)

 * [jakub-tucek](https://github.com/jakub-tucek) for thumbnailCaption functionality [PR 42](https://github.com/benhowell/react-grid-gallery/pull/42)

 * [mis94](https://github.com/mis94) for EXIF image rotation functionality [PR 67](https://github.com/benhowell/react-grid-gallery/pull/67)

 * [forforf](https://github.com/forforf) for contentWindow check [PR 77](https://github.com/benhowell/react-grid-gallery/pull/77)

* [ScottMRafferty](https://github.com/ScottMRafferty) for preloadNextImage not propagating to Lightbox fix [PR 78](https://github.com/benhowell/react-grid-gallery/pull/78)

* [Approximator](https://github.com/approximator) for currentImageWillChange (Function to execute before lightbox image change) [PR 97](https://github.com/benhowell/react-grid-gallery/pull/97).

* [Vadimuz](https://github.com/vadimuz) for nano image props and functionality [PR 101](https://github.com/benhowell/react-grid-gallery/pull/101).

* [pxpeterxu](https://github.com/pxpeterxu) for adding functionality to inject a custom thumbnail image component (for lazy-loading) [PR 104](https://github.com/benhowell/react-grid-gallery/pull/104).

* [lryta](https://github.com/lryta) for fixing crash when this.props.images.length - 1 < this.state.currentImage [PR #111](https://github.com/benhowell/react-grid-gallery/pull/111).

* [jimishf](https://github.com/JimishF) for lightBoxProps option to assign any prop directly to lightbox [PR #121](https://github.com/benhowell/react-grid-gallery/pull/121).


 * Demo stock photos:
   * [Jeshu John - designerspics.com](https://designerspics.com)
   * [Gratisography](https://gratisography.com)
   * [Tom Eversley - isorepublic.com](https://isorepublic.com)
   * [Jan Vasek - jeshoots.com](https://unsplash.com/)
   * [moveast.me](https://moveast.me)
   * [贝莉儿 NG. - unsplash.com](https://unsplash.com/)
   * [Matthew Wiebe. - unsplash.com](https://unsplash.com/)
