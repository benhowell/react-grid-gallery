'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var Gallery = function (_Component) {
    _inherits(Gallery, _Component);

    function Gallery(props) {
        _classCallCheck(this, Gallery);

        var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

        _this.state = {
            images: _this.props.images,
            thumbnails: [],
            lightboxIsOpen: _this.props.isOpen,
            currentImage: _this.props.currentImage,
            containerWidth: 0
        };

        _this.onResize = _this.onResize.bind(_this);
        _this.closeLightbox = _this.closeLightbox.bind(_this);
        _this.gotoImage = _this.gotoImage.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrevious = _this.gotoPrevious.bind(_this);
        _this.onClickImage = _this.onClickImage.bind(_this);
        _this.openLightbox = _this.openLightbox.bind(_this);
        _this.onSelectImage = _this.onSelectImage.bind(_this);
        return _this;
    }

    _createClass(Gallery, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onResize();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            if (this.state.currentImage > np.images.length - 1) {
                this.setState({ currentImage: np.images.length - 1 });
            }
            if (this.state.images != np.images || this.props.maxRows != np.maxRows) {
                this.setState({
                    images: np.images,
                    thumbnails: this.renderThumbs(this._gallery.clientWidth, np.images)
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (!this._gallery) return;
            if (this._gallery.clientWidth !== this.state.containerWidth) {
                this.onResize();
            }
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            if (!this._gallery) return;
            this.setState({
                containerWidth: Math.floor(this._gallery.clientWidth),
                thumbnails: this.renderThumbs(this._gallery.clientWidth)
            });
        }
    }, {
        key: 'openLightbox',
        value: function openLightbox(index, event) {
            if (event) {
                event.preventDefault();
            }
            if (this.props.lightboxWillOpen) {
                this.props.lightboxWillOpen.call(this, index);
            }
            if (this.props.currentImageWillChange) {
                this.props.currentImageWillChange.call(this, index);
            }

            this.setState({
                currentImage: index,
                lightboxIsOpen: true
            });
        }
    }, {
        key: 'closeLightbox',
        value: function closeLightbox() {
            if (this.props.lightboxWillClose) {
                this.props.lightboxWillClose.call(this);
            }
            if (this.props.currentImageWillChange) {
                this.props.currentImageWillChange.call(this, 0);
            }

            this.setState({
                currentImage: 0,
                lightboxIsOpen: false
            });
        }
    }, {
        key: 'gotoPrevious',
        value: function gotoPrevious() {
            if (this.props.currentImageWillChange) {
                this.props.currentImageWillChange.call(this, this.state.currentImage - 1);
            }
            this.setState({
                currentImage: this.state.currentImage - 1
            });
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext() {
            if (this.props.currentImageWillChange) {
                this.props.currentImageWillChange.call(this, this.state.currentImage + 1);
            }
            this.setState({
                currentImage: this.state.currentImage + 1
            });
        }
    }, {
        key: 'onClickImage',
        value: function onClickImage() {
            if (this.state.currentImage === this.props.images.length - 1) return;
            this.gotoNext();
        }
    }, {
        key: 'onSelectImage',
        value: function onSelectImage(index, event) {
            event.preventDefault();
            if (this.props.onSelectImage) this.props.onSelectImage.call(this, index, this.state.images[index]);
        }
    }, {
        key: 'gotoImage',
        value: function gotoImage(index) {
            if (this.props.currentImageWillChange) {
                this.props.currentImageWillChange.call(this, index);
            }
            this.setState({
                currentImage: index
            });
        }
    }, {
        key: 'getOnClickThumbnailFn',
        value: function getOnClickThumbnailFn() {
            if (!this.props.onClickThumbnail && this.props.enableLightbox) return this.openLightbox;
            if (this.props.onClickThumbnail) return this.props.onClickThumbnail;
            return null;
        }
    }, {
        key: 'getOnClickLightboxThumbnailFn',
        value: function getOnClickLightboxThumbnailFn() {
            if (!this.props.onClickLightboxThumbnail && this.props.showLightboxThumbnails) return this.gotoImage;
            if (this.props.onClickLightboxThumbnail && this.props.showLightboxThumbnails) return this.props.onClickLightboxThumbnail;
            return null;
        }
    }, {
        key: 'getOnClickImageFn',
        value: function getOnClickImageFn() {
            if (this.props.onClickImage) return this.props.onClickImage;
            return this.onClickImage;
        }
    }, {
        key: 'getOnClickPrevFn',
        value: function getOnClickPrevFn() {
            if (this.props.onClickPrev) return this.props.onClickPrev;
            return this.gotoPrevious;
        }
    }, {
        key: 'getOnClickNextFn',
        value: function getOnClickNextFn() {
            if (this.props.onClickNext) return this.props.onClickNext;
            return this.gotoNext;
        }
    }, {
        key: 'calculateCutOff',
        value: function calculateCutOff(len, delta, items) {
            var cutoff = [];
            var cutsum = 0;
            for (var i in items) {
                var item = items[i];
                var fractOfLen = item.scaletwidth / len;
                cutoff[i] = Math.floor(fractOfLen * delta);
                cutsum += cutoff[i];
            }

            var stillToCutOff = delta - cutsum;
            while (stillToCutOff > 0) {
                for (i in cutoff) {
                    cutoff[i]++;
                    stillToCutOff--;
                    if (stillToCutOff < 0) break;
                }
            }
            return cutoff;
        }
    }, {
        key: 'buildImageRow',
        value: function buildImageRow(items, containerWidth) {
            var row = [];
            var len = 0;
            var imgMargin = 2 * this.props.margin;
            while (items.length > 0 && len < containerWidth) {
                var item = items.shift();
                row.push(item);
                len += item.scaletwidth + imgMargin;
            }

            var delta = len - containerWidth;
            if (row.length > 0 && delta > 0) {
                var cutoff = this.calculateCutOff(len, delta, row);
                for (var i in row) {
                    var pixelsToRemove = cutoff[i];
                    item = row[i];
                    item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));
                    item.vwidth = item.scaletwidth - pixelsToRemove;
                }
            } else {
                for (var j in row) {
                    item = row[j];
                    item.marginLeft = 0;
                    item.vwidth = item.scaletwidth;
                }
            }
            return row;
        }
    }, {
        key: 'setThumbScale',
        value: function setThumbScale(item) {
            item.scaletwidth = Math.floor(this.props.rowHeight * (item.thumbnailWidth / item.thumbnailHeight));
        }
    }, {
        key: 'renderThumbs',
        value: function renderThumbs(containerWidth) {
            var images = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.images;

            if (!images) return [];
            if (containerWidth == 0) return [];

            var items = images.slice();
            for (var t in items) {
                this.setThumbScale(items[t]);
            }

            var thumbs = [];
            var rows = [];
            while (items.length > 0) {
                rows.push(this.buildImageRow(items, containerWidth));
            }

            for (var r in rows) {
                for (var i in rows[r]) {
                    var item = rows[r][i];
                    if (this.props.maxRows) {
                        if (r < this.props.maxRows) {
                            thumbs.push(item);
                        }
                    } else {
                        thumbs.push(item);
                    }
                }
            }
            return thumbs;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var images = this.state.thumbnails.map(function (item, idx) {
                return _react2.default.createElement(_Image2.default, {
                    key: "Image-" + idx + "-" + item.src,
                    item: item,
                    index: idx,
                    margin: _this2.props.margin,
                    height: _this2.props.rowHeight,
                    isSelectable: _this2.props.enableImageSelection,
                    onClick: _this2.getOnClickThumbnailFn(),
                    onSelectImage: _this2.onSelectImage,
                    tagStyle: _this2.props.tagStyle,
                    tileViewportStyle: _this2.props.tileViewportStyle,
                    thumbnailStyle: _this2.props.thumbnailStyle,
                    thumbnailImageComponent: _this2.props.thumbnailImageComponent
                });
            });
            var resizeIframeStyles = {
                height: 0,
                margin: 0,
                padding: 0,
                overflow: "hidden",
                borderWidth: 0,
                position: "fixed",
                backgroundColor: "transparent",
                width: "100%"
            };
            return _react2.default.createElement(
                'div',
                { id: this.props.id,
                    className: 'ReactGridGallery',
                    ref: function ref(c) {
                        return _this2._gallery = c;
                    } },
                _react2.default.createElement('iframe', { style: resizeIframeStyles,
                    ref: function ref(c) {
                        return c && c.contentWindow && c.contentWindow.addEventListener('resize', _this2.onResize);
                    } }),
                images,
                _react2.default.createElement(_reactImages2.default, _extends({
                    images: this.props.images,
                    backdropClosesModal: this.props.backdropClosesModal,
                    currentImage: this.state.currentImage,
                    preloadNextImage: this.props.preloadNextImage,
                    customControls: this.props.customControls,
                    enableKeyboardInput: this.props.enableKeyboardInput,
                    imageCountSeparator: this.props.imageCountSeparator,
                    isOpen: this.state.lightboxIsOpen,
                    onClickImage: this.getOnClickImageFn(),
                    onClickNext: this.getOnClickNextFn(),
                    onClickPrev: this.getOnClickPrevFn(),
                    showCloseButton: this.props.showCloseButton,
                    showImageCount: this.props.showImageCount,
                    onClose: this.closeLightbox,
                    width: this.props.lightboxWidth,
                    theme: this.props.theme,
                    onClickThumbnail: this.getOnClickLightboxThumbnailFn(),
                    showThumbnails: this.props.showLightboxThumbnails
                }, this.props.lightBoxProps))
            );
        }
    }]);

    return Gallery;
}(_react.Component);

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
    images: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        src: _propTypes2.default.string.isRequired,
        nano: _propTypes2.default.string,
        alt: _propTypes2.default.string,
        thumbnail: _propTypes2.default.string.isRequired,
        srcset: _propTypes2.default.array,
        caption: _propTypes2.default.string,
        tags: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            value: _propTypes2.default.string.isRequired,
            title: _propTypes2.default.string.isRequired
        })),
        thumbnailWidth: _propTypes2.default.number.isRequired,
        thumbnailHeight: _propTypes2.default.number.isRequired,
        isSelected: _propTypes2.default.bool,
        thumbnailCaption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
    })).isRequired,
    id: _propTypes2.default.string,
    enableImageSelection: _propTypes2.default.bool,
    onSelectImage: _propTypes2.default.func,
    rowHeight: _propTypes2.default.number,
    maxRows: _propTypes2.default.number,
    margin: _propTypes2.default.number,
    onClickThumbnail: _propTypes2.default.func,
    lightboxWillOpen: _propTypes2.default.func,
    lightboxWillClose: _propTypes2.default.func,
    enableLightbox: _propTypes2.default.bool,
    backdropClosesModal: _propTypes2.default.bool,
    currentImage: _propTypes2.default.number,
    preloadNextImage: _propTypes2.default.bool,
    customControls: _propTypes2.default.arrayOf(_propTypes2.default.node),
    currentImageWillChange: _propTypes2.default.func,
    enableKeyboardInput: _propTypes2.default.bool,
    imageCountSeparator: _propTypes2.default.string,
    isOpen: _propTypes2.default.bool,
    onClickImage: _propTypes2.default.func,
    onClickNext: _propTypes2.default.func,
    onClickPrev: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    showCloseButton: _propTypes2.default.bool,
    showImageCount: _propTypes2.default.bool,
    lightboxWidth: _propTypes2.default.number,
    tileViewportStyle: _propTypes2.default.func,
    thumbnailStyle: _propTypes2.default.func,
    showLightboxThumbnails: _propTypes2.default.bool,
    onClickLightboxThumbnail: _propTypes2.default.func,
    tagStyle: _propTypes2.default.object,
    thumbnailImageComponent: _propTypes2.default.func,
    lightBoxProps: _propTypes2.default.object
};

Gallery.defaultProps = {
    id: "ReactGridGallery",
    enableImageSelection: true,
    rowHeight: 180,
    margin: 2,
    enableLightbox: true,
    backdropClosesModal: false,
    currentImage: 0,
    preloadNextImage: true,
    enableKeyboardInput: true,
    imageCountSeparator: ' of ',
    isOpen: false,
    showCloseButton: true,
    showImageCount: true,
    lightboxWidth: 1024,
    showLightboxThumbnails: false,
    lightBoxProps: {}
};

module.exports = Gallery;