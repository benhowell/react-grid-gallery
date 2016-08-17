# React Grid Gallery

Justified grid gallery component for [React.js](http://facebook.github.io/react/). No careful image selection, no specific ordering and no tricks, just beautifully justified images.

## Live Demo & Examples

https://benhowell.github.io/react-grid-gallery/

## Quick start

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images,
        };
    }

    render () {
        return (
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <div style={{
                    padding: "4px",
                    color: "#777"
                }}>Selected images: {this.getSelected()}</div>
                <Gallery
            images={this.state.images}
            onSelectedImagesChange={this.setSelected}/>
                </div>
        );
    }
}

App.propTypes = {
    images: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            src: React.PropTypes.string.isRequired,
            thumbnail: React.PropTypes.string.isRequired,
            srcset: React.PropTypes.array,
            caption: React.PropTypes.string,
            thumbnailWidth: React.PropTypes.number.isRequired,
            thumbnailHeight: React.PropTypes.number.isRequired
        })
    ).isRequired
};

App.defaultProps = {
    images: [
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "Boats (Jeshu John - designerspics.com)"
        },
        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "Color Pencils (Jeshu John - designerspics.com)"
        }

    ]
};

ReactDOM.render(<App />, document.getElementById('app'));

```

## Image Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
src                     | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc).
thumbnail               | string        | undefined     | Required. A string referring to any valid image resource (file, url, etc).
thumbnailWidth          | number        | undefined     | Required. Width of the thumbnail image.
thumbnailHeight         | number        | undefined     | Required. Height of the thumbnail image.
caption                 | string        | undefined     | Optional. Image caption.
srcset 	                | array 	| undefined 	| Optional. Array of srcsets for lightbox.


## General Options

Property	|	Type		|	Default		|	Description
:-----------------------|:--------------|:--------------|:--------------------------------
images                  | array         | undefined     | Required. An array of objects containing image properties (see Image Options above).
enableImageSelection    | bool          | true          | Optional. Allow images to be selectable. Setting this option to `false` whilst supplying a non empty `selectedImages` array will result in those images being permanently selected. 
selectedImages          | array         | empty         | Optional. An array of image indicies to set as selected upon gallery creation (Note: this selection is permanent if `enableImageSelection: false`).
onSelectedImagesChange  | func          | undefined     | Optional. Function to execute when selectedImages array changes (i.e. image selection has been updated). Optional arg: selectedImages array. This function is only executable when `enableImageSelection: true`. 
rowHeight               | number        | 180           | Optional. The height of each row in the gallery.
margin                  | number        | 2             | Optional. The margin around each image in the gallery.
backdropClosesModal	| bool          | false	        | Optional. Allow users to exit the lightbox by clicking the backdrop.
currentImage            | number        | 0             | Optional. The index of the image to display initially (only relevant when used in conjunction with `isOpen: true` property).
preloadNextImage        | bool          | true          | Optional. Based on the direction the user is navigating, preload the next available image.
customControls          | array         | undefined     | Optional. An array of elements to display as custom controls on the top of lightbox.
enableKeyboardInput     | bool          | true          | Optional. Supports keyboard input - <code>esc</code>, <code>arrow left</code>, and <code>arrow right</code>.
imageCountSeparator     | string        | ' of '        | Optional. Customize separator in the image count.
isOpen                  | bool          | false         | Optional. Whether or not the lightbox is displayed when gallery first rendered (can be used in conjunction with `currentImage` property, otherwise the first image will be diplayed).
showCloseButton         | bool          | true          | Optional. Display a close "X" button in top right corner.
showImageCount          | bool          | true          | Optional. Display image index, e.g., "3 of 20".


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

### Notes on srcset Support

The srcset attribute is supported by some modern browsers.  Results of browser implementation and behaviour may vary. The sizes attribute uses the default maxWidth CSS property set to the image.  By default this is 80% so 80vw.

Another thing to note is that 'h' or height in the srcset attribute does not yet exist. Because of the nature of the fixed height of a Lightbox this is problematic for portrait sized images.  You will need to calculate what the best 'w' size for a portrait size ought to be given the height of the fixed viewport otherwise unnecessarily large images will be fetched. See issue: [https://github.com/ResponsiveImagesCG/picture-element/issues/86](https://github.com/ResponsiveImagesCG/picture-element/issues/86)

Read more about the srcset and sizes attributes here: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).


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

 * Backend lightbox functionality via [React Images](https://github.com/jossmac/react-images) by [@jossmac](https://github.com/jossmac).

 * Demo stock photos:
   * [Jeshu John - designerspics.com](http://designerspics.com)
   * [Gratisography](http://gratisography.com)
   * [Tom Eversley - isorepublic.com](http://isorepublic.com)
   * [Jan Vasek - jeshoots.com](http://jeshoots.com)
   * [moveast.me](http://moveast.me)
   * [贝莉儿 NG. - unsplash.com](http://unsplash.com)
   * [Matthew Wiebe. - unsplash.com](unsplash.com)
