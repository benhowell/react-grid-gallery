# React Grid Gallery

Justified image gallery component for [React](http://facebook.github.io/react/) inspired by [Google Photos](https://photos.google.com/) and based upon [React Images](https://github.com/jossmac/react-images).

## Live Demo & Examples

https://benhowell.github.io/react-grid-gallery/
* [Main Demo](https://benhowell.github.io/react-grid-gallery/#demo)
* [Pre-selected Images](https://benhowell.github.io/react-grid-gallery/#pre-selected-images)
* [Permanently Selected Images](https://benhowell.github.io/react-grid-gallery/#permanently-selected-images)
* [Simple Gallery](https://benhowell.github.io/react-grid-gallery/#simple-gallery)
* [Main Demo Code](https://benhowell.github.io/react-grid-gallery/#code-sample)

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
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)"
},
{
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
        caption: "Boats (Jeshu John - designerspics.com)"
},

{
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212
}]

render(
        <Gallery images={IMAGES}/>,     
        document.getElementById('example-0')
);
```

## Image Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
src                     | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc).
thumbnail               | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc).
thumbnailWidth          | number        | undefined     | Required. Width of the thumbnail image.
thumbnailHeight         | number        | undefined     | Required. Height of the thumbnail image.
tags                    | array         | undefined     | Optional. An array of objects containing tag attributes (value and title). e.g. `{value: "foo", title: "bar"}`
isSelected              | bool          | undefined     | Optional. The selected state of the image.
caption                 | string        | undefined     | Optional. Image caption.
srcset 	                | array 	| undefined 	| Optional. Array of srcsets for lightbox.


## Gallery Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
images                  | array         | undefined     | Required. An array of objects containing image properties (see Image Options above).
enableImageSelection    | bool          | true          | Optional. Allow images to be selectable. Setting this option to `false` whilst supplying images with `isSelected: true` will result in those images being permanently selected.
onSelectImage           | func          | undefined     | Optional. Function to execute when an image is selected. Optional args: index (index of selected image in images array), image (the selected image). This function is only executable when `enableImageSelection: true`. 
rowHeight               | number        | 180           | Optional. The height of each row in the gallery.
margin                  | number        | 2             | Optional. The margin around each image in the gallery.
enableLightbox          | bool          | true          | Optional. Enable lightbox display of full size image when thumbnail clicked.
onClickThumbnail        | func          | openLightbox  | Optional. Function to execute when gallery thumbnail clicked. Optional args: index (index of selected image in images array), event (the click event). Overrides openLightbox.
lightboxWillOpen        | func          | undefined     | Optional. Function to be called before opening lightbox. Optional arg: index (index of selected image in images array).
lightboxWillClose       | func          | undefined     | Optional. Function to be called before closing lightbox.

## Lightbox Options
NOTE: these options are passed inside the Gallery tag.

e.g.
```js
<Gallery images={IMAGES} backdropClosesModal={true}/>
```

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
backdropClosesModal	| bool          | false	        | Optional. Allow users to exit the lightbox by clicking the backdrop.
currentImage            | number        | 0             | Optional. The index of the image to display initially (only relevant when used in conjunction with `isOpen: true` property).
preloadNextImage        | bool          | true          | Optional. Based on the direction the user is navigating, preload the next available image.
customControls          | array         | undefined     | Optional. An array of elements to display as custom controls on the top of lightbox.
enableKeyboardInput     | bool          | true          | Optional. Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>.
imageCountSeparator     | string        | ' of '        | Optional. Customize separator in the image count.
isOpen                  | bool          | false         | Optional. Whether or not the lightbox is displayed when gallery first rendered (can be used in conjunction with `currentImage` property, otherwise the first image will be diplayed).
showCloseButton         | bool          | true          | Optional. Display a close "X" button in top right corner.
showImageCount          | bool          | true          | Optional. Display image index, e.g., "3 of 20".
onClickImage            | func          | onClickImage  | Optional. Function to execute when lightbox image clicked. Overrides internal implementation of onClickImage.
onClickPrev             | func          | onClickPrev   | Optional. Function to execute when lightbox left arrow clicked. Overrides internal implementation of onClickPrev.
onClickNext             | func          | onClickNext   | Optional. Function to execute when lightbox right arrow clicked. Overrides internal implementation of onClickNext.
lightboxWidth 	        | number 	| 1024 	        | Optional. Maximum width of the lightbox carousel; defaults to 1024px


### General Notes

 * As the inspiration for this component comes from [Google Photos](https://photos.google.com/), very small thumbnails may not be the most aesthetically pleasing due to the border size applied when selected. A sensible rowHeight default of 180px has been chosen, but rowHeights down to 100px are still reasonable.

 * Gallery width is determined by the containing element.

 * Image Options: `thumbnail` can point to the same resource as `src`, bearing in mind the resultant data size of the gallery and page load cost. Thumbnails of whatever size will be scaled to match `rowHeight`.

* If you don't know your `thumbnailWidth` and `thumbnailHeight` values, you can find these out using any number of [javascript hacks](http://stackoverflow.com/a/1944298), bearing in mind the load penalty associated with these methods.


### License
React Grid Gallery is free to use for personal and commercial projects under the [MIT License](https://github.com/benhowell/react-grid-gallery/blob/master/LICENSE). Attribution is not required, but appreciated.


### Acknowledgements

 * Visual design inspired by [Google Photos](https://photos.google.com/).

 * Thumbnail viewport implementation inspired by [GPlusGallery](http://fmaul.de/gallery-grid-example/) by Florian Maul.

 * Backend lightbox functionality via [React Images](https://github.com/jossmac/react-images) by [jossmac](https://github.com/jossmac).

 * The following gallery functions were obtained from the [React Images example](https://github.com/jossmac/react-images/blob/b85bd83ae651d0fd373bb495ac88670ee4dfadab/examples/src/components/Gallery.js) demo: closeLightbox, gotoNext, gotoPrevious, handleClickImage, openLightbox.

 * [cust0dian](https://github.com/cust0dian) for critical bug fixes in [PR 6](https://github.com/benhowell/react-grid-gallery/pull/6) and [PR 7](https://github.com/benhowell/react-grid-gallery/pull/7).

 * [ValYouW](https://github.com/ValYouW) for lightboxWillOpen and lightBoxWillClose functionality [PR 20](https://github.com/benhowell/react-grid-gallery/pull/20).
 

 * Demo stock photos:
   * [Jeshu John - designerspics.com](http://designerspics.com)
   * [Gratisography](http://gratisography.com)
   * [Tom Eversley - isorepublic.com](http://isorepublic.com)
   * [Jan Vasek - jeshoots.com](http://jeshoots.com)
   * [moveast.me](http://moveast.me)
   * [贝莉儿 NG. - unsplash.com](http://unsplash.com)
   * [Matthew Wiebe. - unsplash.com](unsplash.com)

