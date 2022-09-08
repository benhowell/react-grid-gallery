# React Grid Gallery

Justified image gallery component for [React](http://facebook.github.io/react/) inspired by [Google Photos](https://photos.google.com/) ~~and based upon React Images~~.

### :soon: First major release is coming

Read [this discussion](https://github.com/benhowell/react-grid-gallery/discussions/179) for more information and [this pull request](https://github.com/benhowell/react-grid-gallery/pull/183) for tracking progress! 

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

    npm install --save react-grid-gallery

## Quick (and dirty) Start

```jsx
import React from 'react';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

const IMAGES =
[{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        width: 320,
        height: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        width: 320,
        height: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        width: 320,
        height: 212
}]

render(
        <Gallery images={IMAGES}/>,
        document.getElementById('example-0')
);
```

## Image Options

| Property         | Type                | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                            |
|:-----------------|:--------------------|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| src              | string              | undefined | Required. A string referring to any valid image resource (file, url, etc).                                                                                                                                                                                                                                                                                                                             |
| width            | number              | undefined | Required. Width of the image.                                                                                                                                                                                                                                                                                                                                                                          |
| height           | number              | undefined | Required. Height of the image.                                                                                                                                                                                                                                                                                                                                                                         |
| nano             | string:base64       | undefined | Optional. Thumbnail Base64 image will be injected to background under the main image. This provides a base64, 4x4 generated image whilst the image is beong loaded.                                                                                                                                                                                                                                    |
| alt              | string              | ""        | Optional. Image alt attribute.                                                                                                                                                                                                                                                                                                                                                                         |
| tags             | array               | undefined | Optional. An array of objects containing tag attributes (value, title and key if value is element). e.g. `{value: "foo", title: "bar"}` or `{value: <a href={tag.url}>{tag.name}</a>, title: tag.title, key: tag.key}`                                                                                                                                                                                 |
| isSelected       | bool                | undefined | Optional. The selected state of the image.                                                                                                                                                                                                                                                                                                                                                             |
| caption          | string&#124;element | undefined | Optional. Image caption.                                                                                                                                                                                                                                                                                                                                                                               |
| customOverlay    | element             | undefined | Optional. A custom element to be rendered as a thumbnail overlay on hover.                                                                                                                                                                                                                                                                                                                             |
| thumbnailCaption | string&#124;element | undefined | Optional. A thumbnail caption shown below thumbnail.                                                                                                                                                                                                                                                                                                                                                   |
| orientation      | number              | undefined | Optional. Orientation of the image. Many newer digital cameras (both dSLR and Point & Shoot digicams) have a built-in orientation sensor. The output of this sensor is used to set the EXIF orientation flag in the image file's metatdata to reflect the positioning of the camera with respect to the ground (See [EXIF Orientation Page](http://jpegclub.org/exif_orientation.html) for more info). |

## Gallery Options

| Property                | Type               | Default            | Description                                                                                                                                                                                                                                                                                                                                            |
|:------------------------|:-------------------|:-------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| images                  | array              | undefined          | Required. An array of objects containing image properties (see Image Options above).                                                                                                                                                                                                                                                                   |
| id                      | string             | "ReactGridGallery" | Optional. `id` attribute for `<Gallery>` tag. This prop may be useful for those who wish to discriminate between multiple galleries.                                                                                                                                                                                                                   |
| enableImageSelection    | bool               | true               | Optional. Allow images to be selectable. Setting this option to `false` whilst supplying images with `isSelected: true` will result in those images being permanently selected.                                                                                                                                                                        |
| onSelect                | func               | undefined          | Optional. Function to execute when an image is selected. Allows access to image object using `this` (See [Programmers notes](#programmers-notes) for more info about implicit `this`). Optional args: index (index of selected image in images array), image (the selected image). This function is only executable when `enableImageSelection: true`. |
| rowHeight               | number             | 180                | Optional. The height of each row in the gallery.                                                                                                                                                                                                                                                                                                       |
| maxRows                 | number             | undefined          | Optional. The maximum number of rows to show in the gallery.                                                                                                                                                                                                                                                                                           |
| margin                  | number             | 2                  | Optional. The margin around each image in the gallery.                                                                                                                                                                                                                                                                                                 |
| onClick                 | func               | undefined          | Optional. Function to execute when gallery thumbnail clicked. Allows access to image object using `this` (See [Programmers notes](#programmers-notes) for more info about implicit `this`). Optional args: index (index of selected image in images array), event (the click event).                                                                   |
| tagStyle                | func &#124; object | tagStyle           | Optional. Style to pass to tag elements. Overrides internal tag style.                                                                                                                                                                                                                                                                                 |
| tileViewportStyle       | func &#124; object | tileViewportStyle  | Optional. Function to style the image tile viewport. Allows access to image object using `this` (See [Programmers notes](#programmers-notes) for more info about implicit `this`). Overrides internal tileViewportStyle function.                                                                                                                      |
| thumbnailStyle          | func &#124; object | thumbnailStyle     | Optional. Function to style the image thumbnail. Allows access to image object using `this` (See [Programmers notes](#programmers-notes) for more info about implicit `this`). Overrides internal thumbnailStyle function.                                                                                                                             |
| thumbnailImageComponent | React component    | undefined          | Optional. Substitute in a React component that would get passed `imageProps` (the props that would have been passed to the `<img>` tag) and `item` (the original item in `images`) to be used to render thumbnails; useful for lazy loading.                                                                                                           |
| defaultContainerWidth   | number             | 0                  | Optional. Set default width for the container. This option is useful during server-side rendering when we want to generate an initial markup before we can detect the actual container width.                                                                                                                                                          |


### General Notes

 * [react-grid-gallery](https://github.com/benhowell/react-grid-gallery) is built for modern browsers and therefore IE support is limited to IE 11 and newer.

 * As the inspiration for this component comes from [Google Photos](https://photos.google.com/), very small thumbnails may not be the most aesthetically pleasing due to the border size applied when selected. A sensible rowHeight default of 180px has been chosen, but rowHeights down to 100px are still reasonable.

 * Gallery width is determined by the containing element. Therefore your containing element must have a width (%, em, px, whatever) **_before_** the gallery is loaded!


### Programmers Notes

 * User defined functions that allow access to `this` via [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) do not require you to declare or pass `this` as a parameter. `this` will be defined at the time the function is called.

e.g.
```js
// somewhere in your code...
function myTileViewportStyleFn() {
  if (this.props.item.isSelected)
    return {
           // something stylish...
            };
}

<Gallery images={IMAGES} tileViewportStyle={myTileViewportStyleFn}/>


// internally, within the react-grid-gallery component it will be called like so:
myTileViewportStyleFn.call(this); // this now refers to the image to be styled

```

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
   * [Jeshu John - designerspics.com](http://designerspics.com)
   * [Gratisography](http://gratisography.com)
   * [Tom Eversley - isorepublic.com](http://isorepublic.com)
   * [Jan Vasek - jeshoots.com](http://jeshoots.com)
   * [moveast.me](http://moveast.me)
   * [贝莉儿 NG. - unsplash.com](http://unsplash.com)
   * [Matthew Wiebe. - unsplash.com](unsplash.com)
