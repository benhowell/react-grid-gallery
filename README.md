# React Grid Gallery

Justified grid gallery react component inspired by [google photos](https://photos.google.com/) and [GPlusGallery](http://fmaul.de/gallery-grid-example/) by Florian Maul.

Backend lightbox functionality by [React Images](https://github.com/jossmac/react-images).



## Quick start

```jsx
import React from 'react';
import Gallery from 'react-grid-gallery';

export default class ReactGridGallery extends React.Component {
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
            twidth: 240,
            theight: 165
          },
          {
            src: "https://c5.staticflickr.com/8/7635/28157459892_28f5784891_o.jpg",
            thumbnail: "https://c5.staticflickr.com/8/7635/28157459892_08d53d0a8d_m.jpg",
            caption: "Servo",
            twidth: 240,
            theight: 160
          },
          {
            src: "https://c2.staticflickr.com/8/7515/28157459642_47f8e073ce_o.png",
            thumbnail: "https://c3.staticflickr.com/8/7515/28157459642_506a1008f2_m.jpg",
            caption: "Footy",
            twidth: 240,
            theight: 207
          }]}
      />
    );
  }
}
```


## Demo & Examples

Live demo: TODO.

### Using srcset: TODO.


```

Notes on srcset support:

The srcset attribute is supported by some modern browsers.  Results of browser implementation and behaviour may vary. The sizes attribute uses the default maxWidth CSS property set to the image.  By default this is 80% so 80vw.

Another thing to note is that 'h' or height in the srcset attribute does not yet exist. Because of the nature of the fixed height of a Lightbox this is problematic for portrait sized images.  You will need to calculate what the best 'w' size for a portrait size ought to be given the height of the fixed viewport otherwise unnecessarily large images will be fetched. See issue: [https://github.com/ResponsiveImagesCG/picture-element/issues/86](https://github.com/ResponsiveImagesCG/picture-element/issues/86)

Read more about the srcset and sizes attributes here: [https://ericportis.com/posts/2014/srcset-sizes/](https://ericportis.com/posts/2014/srcset-sizes/).


### Captions: TODO.


