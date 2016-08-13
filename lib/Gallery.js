'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _Image = require('./Image.js');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var update = require('react-addons-update');

var Gallery = function (_Component) {
    _inherits(Gallery, _Component);

    function Gallery(props) {
        _classCallCheck(this, Gallery);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gallery).call(this, props));

        _this.state = {
            lightboxIsOpen: _this.props.isOpen,
            selectedImages: _this.props.selectedImages,
            currentImage: _this.props.currentImage,
            containerWidth: 0
        };

        _this.handleResize = _this.handleResize.bind(_this);
        _this.closeLightbox = _this.closeLightbox.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrevious = _this.gotoPrevious.bind(_this);
        _this.handleClickImage = _this.handleClickImage.bind(_this);
        _this.openLightbox = _this.openLightbox.bind(_this);
        _this.onToggleSelected = _this.onToggleSelected.bind(_this);
        return _this;
    }

    _createClass(Gallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth) });
            window.addEventListener('resize', this.handleResize);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(np, ns) {
            if (this.state.selectedImages != ns.selectedImages) {
                if (this.props.onSelectedImagesChange) this.props.onSelectedImagesChange(ns.selectedImages);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (ReactDOM.findDOMNode(this).clientWidth !== this.state.containerWidth) {
                this.setState({ containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth) });
            }
        }
    }, {
        key: 'handleResize',
        value: function handleResize(e) {
            this.setState({ containerWidth: Math.floor(ReactDOM.findDOMNode(this).clientWidth) });
        }
    }, {
        key: 'openLightbox',
        value: function openLightbox(index, event) {
            event.preventDefault();
            this.setState({
                currentImage: index,
                lightboxIsOpen: true
            });
        }
    }, {
        key: 'closeLightbox',
        value: function closeLightbox() {
            this.setState({
                currentImage: 0,
                lightboxIsOpen: false
            });
        }
    }, {
        key: 'gotoPrevious',
        value: function gotoPrevious() {
            this.setState({
                currentImage: this.state.currentImage - 1
            });
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            this.setState({
                currentImage: this.state.currentImage + 1
            });
        }
    }, {
        key: 'handleClickImage',
        value: function handleClickImage() {
            if (this.state.currentImage === this.props.images.length - 1) return;
            this.gotoNext();
        }
    }, {
        key: 'onToggleSelected',
        value: function onToggleSelected(idx, isSelected) {
            if (isSelected) {
                if (this.state.selectedImages.indexOf(idx) === -1) {
                    this.setState({ selectedImages: update(this.state.selectedImages, { $push: [idx] }) });
                }
            } else {
                var i = this.state.selectedImages.indexOf(idx);
                if (i > -1) {
                    this.setState({
                        selectedImages: update(this.state.selectedImages, { $splice: [[i, 1]] }) });
                }
            }
        }

        /**
         * Distribute a delta (integer value) to n items based on
         * the size (width) of the items thumbnails.
         */

    }, {
        key: 'calculateCutOff',
        value: function calculateCutOff(len, delta, items) {
            // resulting distribution
            var cutoff = [];
            var cutsum = 0;

            // distribute the delta based on the proportion of
            // thumbnail size to length of all thumbnails.
            for (var i in items) {
                var item = items[i];
                var fractOfLen = item.scaletwidth / len;
                cutoff[i] = Math.floor(fractOfLen * delta);
                cutsum += cutoff[i];
            }

            // still more pixel to distribute because of decimal
            // fractions that were omitted.
            var stillToCutOff = delta - cutsum;
            while (stillToCutOff > 0) {
                for (i in cutoff) {
                    // distribute pixels evenly until done
                    cutoff[i]++;
                    cutsum++; //debug
                    stillToCutOff--;
                    if (stillToCutOff < 0) break;
                }
            }
            return cutoff;
        }

        /**
         * Takes images from the items array (removes them) as
         * long as they fit into a width of maxwidth pixels.
         */

    }, {
        key: 'buildImageRow',
        value: function buildImageRow(items) {
            var row = [];
            var len = 0;

            // left and right margin = 2x props.margin
            var imgMargin = 2 * this.props.margin;

            // Build a row of images until longer than maxwidth
            while (items.length > 0 && len < this.state.containerWidth) {
                var item = items.shift();
                row.push(item);
                len += item.scaletwidth + imgMargin;
            }

            // calculate by how many pixels too long...
            var delta = len - this.state.containerWidth;

            // if the line is too long, make images smaller
            if (row.length > 0 && delta > 0) {

                // calculate the distribution to each image in the row
                var cutoff = this.calculateCutOff(len, delta, row);

                for (var i in row) {
                    var pixelsToRemove = cutoff[i];
                    item = row[i];

                    // move the left border inwards by half the pixels
                    item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));

                    // shrink the width of the image by pixelsToRemove
                    item.vwidth = item.scaletwidth - pixelsToRemove;
                }
            } else {
                // all images fit in the row, set vx and vwidth
                for (var i in row) {
                    item = row[i];
                    item.marginLeft = 0;
                    item.vwidth = item.scaletwidth;
                }
            }
            return row;
        }

        /**
         * Scales thumbnails to match props.rowHeight
         */

    }, {
        key: 'scaleThumbs',
        value: function scaleThumbs(items) {
            for (var i in items) {
                items[i].scaletwidth = Math.floor(this.props.rowHeight * (items[i].thumbnailWidth / items[i].thumbnailHeight));
            }
            return items;
        }

        /**
         * Builds images and packs them in rows
         */

    }, {
        key: 'renderGallery',
        value: function renderGallery() {
            if (!this.props.images) return;
            if (this.state.containerWidth == 0) return;

            // Calculate new thumbnail size to match this.props.rowHeight
            var items = this.scaleThumbs(this.props.images.slice());

            // calculate rows of images
            var images = [];
            var rows = [];
            while (items.length > 0) {
                rows.push(this.buildImageRow(items));
            }

            var idx = 0;
            for (var r in rows) {
                for (var i in rows[r]) {
                    var item = rows[r][i];
                    // create image
                    images.push(_react2.default.createElement(_Image2.default, {
                        key: "Image-" + idx,
                        item: item,
                        index: idx,
                        margin: this.props.margin,
                        height: this.props.rowHeight,
                        isSelectable: this.props.enableImageSelection,
                        onClick: this.openLightbox,
                        onToggleSelected: this.onToggleSelected }));
                    idx++;
                }
            }
            return images;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'Gallery' },
                this.renderGallery(),
                _react2.default.createElement(_reactImages2.default, {
                    images: this.props.images,
                    backdropClosesModal: this.props.backdropClosesModal,
                    currentImage: this.state.currentImage,
                    customControls: this.props.customControls,
                    enableKeyboardInput: this.props.enableKeyboardInput,
                    imageCountSeparator: this.props.imageCountSeparator,
                    isOpen: this.state.lightboxIsOpen,
                    onClickImage: this.handleClickImage,
                    onClickNext: this.gotoNext,
                    onClickPrev: this.gotoPrevious,
                    onClose: this.closeLightbox,
                    showCloseButton: this.props.showCloseButton,
                    showImageCount: this.props.showImageCount
                })
            );
        }
    }]);

    return Gallery;
}(_react.Component);

;

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
    images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        src: _react.PropTypes.string.isRequired,
        thumbnail: _react.PropTypes.string.isRequired,
        srcset: _react.PropTypes.array,
        caption: _react.PropTypes.string,
        thumbnailWidth: _react.PropTypes.number,
        thumbnailHeight: _react.PropTypes.number
    })).isRequired,
    enableImageSelection: _react.PropTypes.bool,
    selectedImages: _react.PropTypes.arrayOf(_react.PropTypes.number),
    onSelectedImagesChange: _react.PropTypes.func,
    rowHeight: _react.PropTypes.number,
    margin: _react.PropTypes.number, // margin size for each image
    backdropClosesModal: _react.PropTypes.bool,
    currentImage: _react.PropTypes.number,
    customControls: _react.PropTypes.arrayOf(_react.PropTypes.node),
    enableKeyboardInput: _react.PropTypes.bool,
    imageCountSeparator: _react.PropTypes.string,
    isOpen: _react.PropTypes.bool,
    onClickImage: _react.PropTypes.func,
    onClickNext: _react.PropTypes.func,
    onClickPrev: _react.PropTypes.func,
    onClose: _react.PropTypes.func.isRequired,
    showCloseButton: _react.PropTypes.bool,
    showImageCount: _react.PropTypes.bool
};

Gallery.defaultProps = {
    enableImageSelection: true,
    selectedImages: [],
    rowHeight: 160,
    margin: 2,
    backdropClosesModal: false,
    currentImage: 0,
    enableKeyboardInput: true,
    imageCountSeparator: ' of ',
    isOpen: false,
    showCloseButton: true,
    showImageCount: true
};

module.exports = Gallery;