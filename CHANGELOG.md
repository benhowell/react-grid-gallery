# react-grid-gallery

### v0.5.1 / 2018-06-29

* Moved prop-types dependency from dev dependencies to dependencies


### v0.5.0 / 2018-06-26

* Bumped [react-images](https://github.com/jossmac/react-images) to 0.5.16 to address [issue #83](https://github.com/benhowell/react-grid-gallery/issues/83). See https://github.com/jossmac/react-images/pull/172 for details.


### v0.4.11 / 2018-04-29

* Fixed bug: propagate preloadNextImage to Lightbox [PR 78](https://github.com/benhowell/react-grid-gallery/pull/78). Thanks [ScottMRafferty](https://github.com/ScottMRafferty).


### v0.4.10 / 2018-04-29

* Add contentWindow check [PR 77](https://github.com/benhowell/react-grid-gallery/pull/77). Thanks [forforf](https://github.com/forforf).


### v0.4.9 / 2018-04-27

* Added optional alt tag to image props (defaults to empty string).


### v0.4.8 / 2018-01-20

* Added image rotation/transformation functionality based upon EXIF orientation passed in the image `orientation` prop [PR 67](https://github.com/benhowell/react-grid-gallery/pull/67). Thanks [mis94](https://github.com/mis94).


### v0.4.7 / 2017-11-20

* Added className to custom overlay.


### v0.4.6 / 2017-10-02

* Added vendor specific prefixes to userSelect styling.


### v0.4.5 / 2017-10-02

* Added ability to select thumbnailCaption text [PR 43](https://github.com/benhowell/react-grid-gallery/pull/43). Thanks [jakub-tucek](https://github.com/jakub-tucek).


### v0.4.4 / 2017-09-29

* Added optional thumbnailCaption functionality [PR 42](https://github.com/benhowell/react-grid-gallery/pull/42). Thanks [jakub-tucek](https://github.com/jakub-tucek).

* Updated acknowledgements.

* Updated documentation.


### v0.4.3 / 2017-09-15

* Fixed resize event not triggering on scroll bar presence change [PR 40](https://github.com/benhowell/react-grid-gallery/pull/40). Thanks [SimeonC](https://github.com/SimeonC).

* Updated acknowledgements.


### v0.4.2 / 2017-07-23

* Added optional `id` prop for the id attribute of the `<Gallery>` tag.

* Added className attribute for the `<Gallery>` tag.

* Updated documentation.


### v0.4.1 / 2017-07-20

* Fixed `maxRows` not updating bug [PR 35](https://github.com/benhowell/react-grid-gallery/pull/35). Thanks [SimeonC](https://github.com/SimeonC).

* Updated documentation.


### v0.4.0 / 2017-06-29

* Added optional `tileViewportStyle` prop as a function to determine style of tile viewport. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

* Added optional `thumbnailStyle` prop as a function to determine style of each gallery thumbnail. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

* Refactored implementation of `onSelectImage` prop. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

* Refactored implementation of `onClickThumbnail` prop. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

* Refactored implementation of `lightboxWillOpen` prop. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).

* Refactored implementation of `lightboxWillClose` prop. This function leverages [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).


### v0.3.7 / 2017-06-26

* Added optional `tagStyle` prop to style thumbnail tags.


### v0.3.6 / 2017-06-07

* Added optional lightbox prop `showLightboxThumbnails` to display thumbnails beneath the Lightbox image.

* Added optional lightbox prop `onClickLightboxThumbnail` as a fn to execute when lightbox thumbnail clicked. Overrides internal function: gotoImage.


### v0.3.5 / 2017-06-04

* Refactored for react 16 (moved from PropTypes to prop-types package).

* Bumped [react-images](https://github.com/jossmac/react-images) to 0.5.4 which has been refactored for react 16.

* Added `theme` pass-though prop [PR 27](https://github.com/benhowell/react-grid-gallery/pull/27). Thanks [danalloway](https://github.com/danalloway).

* Updated acknowledgements.


### v0.3.4 / 2017-05-05

* Bumped to react 15.5.4

* Refactored to use new prop-types package (React.PropTyes deprecated).


### v0.3.3 / 2017-04-22

* Added `customOverlay` functionality [PR 22](https://github.com/benhowell/react-grid-gallery/pull/22). Thanks [ValYouW](https://github.com/ValYouW).

* Added demo to project page for `customOverlay`.

* Updated documentation

* Updated acknowledgements


### v0.3.2 / 2017-04-07

* Added `maxRows` functionality [issue #21](https://github.com/benhowell/react-grid-gallery/issues/21).


### v0.3.1 / 2017-04-04

* Added `lightboxWillOpen` and `lightBoxWillClose` functionality [PR 20](https://github.com/benhowell/react-grid-gallery/pull/20). Thanks [ValYouW](https://github.com/ValYouW).

* Updated documentation for onClickThumbnail fn [issue #19](https://github.com/benhowell/react-grid-gallery/issues/19)

* Updated acknowledgements


### v0.3.0 / 2017-01-14

* Fixed bug where lightboxWidth does not exceed 1024px

* Bumped [react-images](https://github.com/jossmac/react-images) to 0.5.2


### v0.2.10 / 2017-01-13

* Fixed bug in passing lightboxWidth prop

### v0.2.9 / 2016-12-21

* Added prop to set maximum width of lightbox. Defaults to 1024px.


### v0.2.8 / 2016-12-10

* Updated documentation including correction of `onSelectImage` prop documentation.

* More descriptive package keywords.

* Grammatical tweaks.


### v0.2.7 / 2016-11-04

### Breaking Changes

* Consistent naming scheme implemented both internally and externally. External breaking change to the `onImageSelected` prop which has been renamed `onSelectImage`. All internal instances of `Func` refactored to `Fn`. `handleClickImage` refactored to `onClickImage`. `handleResize` refactored to `onResize`.

The following changes in v0.2.7 allow react-grid-gallery to be used in an (optionally) stateless way.

* Added optional prop `onClickImage`. This prop takes a function and is triggered when a lightbox displayed image is clicked. Supplying this prop will override the default `onClickImage` function.

* Added optional prop `onClickPrev`. This prop takes a function and is triggered when the left arrow in lightbox is clicked. Supplying this prop will override the default `onClickPrev` function.

* Added optional prop `onClickNext`. This prop takes a function and is triggered when the right arrow in lightbox is clicked. Supplying this prop will override the default `onClickNext` function.

* Added explicit `closeLightbox` function to the lightbox `onClose` prop.


### v0.2.6 / 2016-10-25

* Added acknowledgements to docs.

* Fixed [unitless style warning](https://github.com/benhowell/react-grid-gallery/pull/9). Thanks @szromek.

### v0.2.5 / 2016-09-26

* Added image tagging functionality. Optional `tags` prop takes an array of objects containing tag attributes. `value` prop is the text shown on the tag and `title` prop is the text shown when hovering over the tag. e.g. `tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}]`

### v0.2.4 / 2016-09-17

* `onImageSelected` prop function now takes two optional args, index (index of selected image in images array) and image (the selected image object).

### v0.2.3 / 2016-09-16

### Breaking changes

* Image selection state now handled within image object by optional boolean prop `isSelected`. This greatly reduces complexity both within and outside the component as the image itself carries it's selected state. Therefore `selectedImages` prop has been removed.

* `onSelectedImagesChange` prop removed due to the changes outlined above.

* Optional `onImageSelected` prop added. This prop takes a function and an optional image object as a parameter.

* `isSelected` removed as first class prop on Image (now a prop on the image item passed in)

* Image `onToggleSelected` renamed to `onImageSelected`.

### v0.2.2 / 2016-09-11

* Fixes [bug](https://github.com/benhowell/react-grid-gallery/issues/8) on small edge case whereby duplicate images causes an error (two children cannot have the same key) and subsequently only the first of any repeated image src can be rendered.

### v0.2.1 / 2016-09-11

* Fixes [Bug](https://github.com/benhowell/react-grid-gallery/pull/7) where updating an image caused wrong aspect due to thumb not resizing. Bug caused by using array index as react key rather than something unique to the image. Thanks to [cust0dian](https://github.com/cust0dian) for the [pull request](https://github.com/benhowell/react-grid-gallery/pull/7) which fixes this issue by assigning src attribute as key.

* Fixes [bug](https://github.com/benhowell/react-grid-gallery/pull/6) where only thumbnails are updated when images props changes, meaning re-render doesn't happen until window is resized. Thanks again to [cust0dian](https://github.com/cust0dian) for the [pull request](https://github.com/benhowell/react-grid-gallery/pull/6) which fixes this issue.

### v0.2.0 / 2016-09-03

* Construction of thumbnail images and image rows removed from render. Thumbnails and rows now only rebuilt when container size changes.

* `selectedImages` state now set via props change.

* `onSelectedImagesChange` callback now called directly from `onToggleSelected`. Previously, a combination of setting `selectedImages` state and triggering `onSelectedImagesChange` inside `componentWillUpdate` caused a double render.

* Internal image access now via state instead of props.

* Thumbnail generation now atomic function rather than whole array at once.

* * *

### v0.1.14 / 2016-08-22

* `selectedImages` state set on `componentWillReceiveProps` allowing selections from outside component to trigger state update.

### v0.1.13 / 2016-08-22

* Replaced legacy `ref` string with `ref` callback. Fixes multiple react owner issue when using [react-grid-gallery](https://github.com/benhowell/react-grid-gallery) inside a [reagent](https://github.com/reagent-project/reagent) project :)

### v0.1.12 / 2016-08-22

* Replaced `ReactDOM.findDOMNode(this)` with ref, removed react-dom deps
* Added conditional to ensure image onClick not fired when no function specified
* Moved CheckButton styling (color, hoverColor, selectedColor) to props

### v0.1.11 / 2016-08-21

* Fixed react-dom typo

### v0.1.10 / 2016-08-21

* Added option to allow disabling of lightbox image display. `enableLightbox` (PropType.bool, default `true`)

* Added option to allow passing in of function to execute on thumbnail click. `onClickThumbnail` (PropType.func, default `openLightbox`)

### v0.1.9 / 2016-08-19

* Removed darkening effect on thumbnail hover when `enableImageSelection: false`

### v0.1.8 / 2016-08-17

* Handful of code samples and demos added to project page.
* PropType bugs fixed on Gallery and Image

### v0.1.7 / 2016-08-16

* Gulp task ensenble to clean/build/deploy lib, web (gh-pages) and hacked up cljs js lib
* Project page with examples, docs etc.
* Updated options documentation

### v0.1.6 / 2016-08-15

* Bumped [react-images](https://github.com/jossmac/react-images/) to v0.4.11
* Enabled preloadNextImage option from [react-images](https://github.com/jossmac/react-images/)

### v0.1.5 / 2016-08-13

* Removed commentary and dead code
* Replaced simple functions with anonymous inline functions

### v0.1.4 / 2016-08-13

* Added support for disabling image selection (optional)
* Updated options documentation


### v0.1.3 / 2016-08-13

* Added support for disabling image selection (optional)
* Updated options documentation


### v0.1.2 / 2016-08-13

* Added support for onSelectedImagesChange function (optional)
* Updated options documentation


### v0.1.1 / 2016-08-11

* Added support for all functional lightbox options
* Updated README with options documentation

### v0.1.0 / 2016-08-11

* Simplified thumbnail viewport
* Fixed aspect bug on shrinkage effect on thumbnail selection

* * *

### v0.0.4 / 2016-08-10

* Shrinkage effect on thumbnail selection

### v0.0.3 / 2016-08-09

* Darkening effect on thumbnail hover (increases visibility of check button)
* Pointer cursor on thumbnail hover


### v0.0.2 / 2016-08-08

* Full lightbox functionality provided by [react-images](https://github.com/jossmac/react-images/) by [@jossmac](https://github.com/jossmac)
* Auto scaled, clipped and justified images to fit rowHeight prop
* Image selection and gallery level reference to list of selected images
