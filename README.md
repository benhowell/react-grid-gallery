# React Grid Gallery

Justified grid gallery component for React.js.

## Demo & Examples

Live demo: TODO.


## Quick start

```jsx
import React from 'react';
import Gallery from 'react-grid-gallery';

export default class Example extends React.Component {
  ...
  render() {
    return (
      <Gallery
        rowHeight: 240,
        margin: 2,
        images={[{
            src: "https://c1.staticflickr.com/9/8834/27980317100_4122816a5c_o.png",
            thumbnail: "https://c5.staticflickr.com/9/8834/27980317100_e87052d0b0_m.jpg",
            caption: "Warnie",
            thumbnailWidth: 240,
            thumbnailHeight: 165
          },
          {
            src: "https://c5.staticflickr.com/8/7635/28157459892_28f5784891_o.jpg",
            thumbnail: "https://c5.staticflickr.com/8/7635/28157459892_08d53d0a8d_m.jpg",
            caption: "Servo",
            thumbnailWidth: 240,
            thumbnailHeight: 160
          },
          {
            src: "https://c2.staticflickr.com/8/7515/28157459642_47f8e073ce_o.png",
            thumbnail: "https://c3.staticflickr.com/8/7515/28157459642_506a1008f2_m.jpg",
            caption: "Footy",
            thumbnailWidth: 240,
            thumbnailHeight: 207
          }]}
      />
    );
  }
}
```

## Image Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
src                     | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc.)
thumbnail               | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc.)
thumbnailWidth          | number        | undefined     | Required. Width of the thumbnail image
thumbnailHeight         | number        | undefined     | Required. Height of the thumbnail image
caption                 | string        | undefined     | Optional. Image caption
srcset 	                | array 	| undefined 	| Optional. Array of srcsets for lightbox


## Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
images                  | array         | undefined     | Required. An array of objects containing image properties (see Image Options above)
selectedImages          | array         | empty         | Optional. An array of image indicies to set as selected
rowHeight               | number        | 160           | Optional. The height of each row of images in the gallery
margin                  | number        | 2             | Optional. The margin around each image in the gallery
backdropClosesModal	|	bool	| false	        | Optional. Allow users to exit the lightbox by clicking the backdrop
currentImage            | number        | 0             | Optional. The index of the image to display initially (only relevant when used in conjunction with `isOpen: true` property)
customControls          | array         | undefined     | Optional. An array of elements to display as custom controls on the top of lightbox
enableKeyboardInput     | bool          | true          | Optional. Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>
imageCountSeparator     | string        | ' of '        | Optional. Customize separator in the image count
isOpen                  | bool          | false         | Optional. Whether or not the lightbox is displayed when gallery first rendered (can be used in conjunction with `currentImage` property, otherwise the first image will be diplayed)
showCloseButton         | bool          | true          | Optional. Display a close "X" button in top right corner
showImageCount          | bool          | true          | Optional. Display image index, e.g., "3 of 20"





### Using srcset:

```jsx
images={[{
  src: 'http://example.com/example/img1.jpg',
  srcset: [
    'http://example.com/example/img1_1024.jpg 1024w',
    'http://example.com/example/img1_800.jpg 800w',
    'http://example.com/example/img1_500.jpg 500w',
    'http://example.com/example/img1_320.jpg 320w',
  ],
  thumbnail: 'http://example.com/example/thumbnailImg1.jpg',
  caption: "Image 1",
  thumbnailWidth: 180,
  thumbnailHeight: 320
},
{
  src: 'http://example.com/example/img2.jpg',
  srcset: [
    'http://example.com/example/img2_1024.jpg 1024w',
    'http://example.com/example/img2_800.jpg 800w',
    'http://example.com/example/img2_500.jpg 500w',
    'http://example.com/example/img2_320.jpg 320w',
  ],
  thumbnail: 'http://example.com/example/thumbnailImg2.jpg',
  caption: "Image 2",
  thumbnailWidth: 240,
  thumbnailHeight: 165
}

```

Notes on srcset support:

The srcset attribute is supported by some modern browsers.  Results of browser implementation and behaviour may vary. The sizes attribute uses the default maxWidth CSS property set to the image.  By default this is 80% so 80vw.

Another thing to note is that 'h' or height in the srcset attribute does not yet exist. Because of the nature of the fixed height of a Lightbox this is problematic for portrait sized images.  You will need to calculate what the best 'w' size for a portrait size ought to be given the height of the fixed viewport otherwise unnecessarily large images will be fetched. See issue: [https://github.com/ResponsiveImagesCG/picture-element/issues/86](https://github.com/ResponsiveImagesCG/picture-element/issues/86)

Read more about the srcset and sizes attributes here: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).


### Acknowledgements

Gallery design inspired by [Google Photos](https://photos.google.com/).

Gallery viewport implementation inspired by [GPlusGallery](http://fmaul.de/gallery-grid-example/) by Florian Maul.

Backend lightbox functionality by [React Images](https://github.com/jossmac/react-images) by [@jossmac](https://github.com/jossmac).
