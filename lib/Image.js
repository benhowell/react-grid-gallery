'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckButton = require('./CheckButton.js');

var _CheckButton2 = _interopRequireDefault(_CheckButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = function (_Component) {
    _inherits(Image, _Component);

    function Image(props) {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Image).call(this, props));

        _this.state = {
            hover: false
        };
        return _this;
    }

    _createClass(Image, [{
        key: 'tagStyle',
        value: function tagStyle() {
            if (this.props.tagStyle) return this.props.tagStyle;
            return {
                display: "inline",
                padding: ".2em .6em .3em",
                fontSize: "75%",
                fontWeight: "600",
                lineHeight: "1",
                color: "yellow",
                background: "rgba(0,0,0,0.65)",
                textAlign: "center",
                whiteSpace: "nowrap",
                verticalAlign: "baseline",
                borderRadius: ".25em"
            };
        }
    }, {
        key: 'tileViewportStyle',
        value: function tileViewportStyle() {
            if (this.props.tileViewportStyle) return this.props.tileViewportStyle.call(this);
            if (this.props.item.isSelected) return {
                width: this.props.item.vwidth - 32,
                height: this.props.height - 32,
                margin: 16,
                overflow: "hidden"
            };
            return {
                width: this.props.item.vwidth,
                height: this.props.height,
                overflow: "hidden"
            };
        }
    }, {
        key: 'thumbnailStyle',
        value: function thumbnailStyle() {
            if (this.props.thumbnailStyle) return this.props.thumbnailStyle.call(this);

            var rotationTransformValue = undefined;
            switch (this.props.item.orientation) {
                case 3:
                    rotationTransformValue = "rotate(180deg)";
                    break;
                case 6:
                    rotationTransformValue = "rotate(90deg)";
                    break;
                case 8:
                    rotationTransformValue = "rotate(270deg)";
                    break;
                case 2:
                    rotationTransformValue = "rotateY(180deg)";
                    break;
                case 4:
                    rotationTransformValue = "rotate(180deg) rotateY(180deg)";
                    break;
                case 5:
                    rotationTransformValue = "rotate(270deg) rotateY(180deg)";
                    break;
                case 7:
                    rotationTransformValue = "rotate(90deg) rotateY(180deg)";
                    break;
            }
            if (this.props.item.isSelected) {
                var ratio = this.props.item.scaletwidth / this.props.height;
                var height = 0;
                var width = 0;
                var viewportHeight = this.props.height - 32;
                var viewportWidth = this.props.item.vwidth - 32;

                if (this.props.item.scaletwidth > this.props.height) {
                    width = this.props.item.scaletwidth - 32;
                    height = Math.floor(width / ratio);
                } else {
                    height = this.props.height - 32;
                    width = Math.floor(height * ratio);
                }

                var marginTop = -Math.abs(Math.floor((viewportHeight - height) / 2));
                var marginLeft = -Math.abs(Math.floor((viewportWidth - width) / 2));
                return {
                    cursor: 'pointer',
                    width: width,
                    height: height,
                    marginLeft: marginLeft,
                    marginTop: marginTop,
                    transform: rotationTransformValue
                };
            }
            return {
                cursor: 'pointer',
                width: this.props.item.scaletwidth,
                height: this.props.height,
                marginLeft: this.props.item.marginLeft,
                marginTop: 0,
                transform: rotationTransformValue
            };
        }
    }, {
        key: 'renderCheckButton',
        value: function renderCheckButton() {
            return _react2.default.createElement(_CheckButton2.default, { key: 'Select',
                index: this.props.index,
                color: "rgba(255, 255, 255, 0.7)",
                selectedColor: "#4285f4",
                hoverColor: "rgba(255, 255, 255, 1)",
                isSelected: this.props.item.isSelected,
                isSelectable: this.props.isSelectable,
                onClick: this.props.isSelectable ? this.props.onSelectImage : null,
                parentHover: this.state.hover });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var alt = this.props.item.alt ? this.props.item.alt : "";
            var tags = typeof this.props.item.tags === 'undefined' ? _react2.default.createElement('noscript', null) : this.props.item.tags.map(function (tag) {
                return _react2.default.createElement(
                    'div',
                    { title: tag.title,
                        key: "tag-" + tag.value,
                        style: { display: "inline-block",
                            cursor: 'pointer',
                            pointerEvents: 'visible',
                            margin: "2px" } },
                    _react2.default.createElement(
                        'span',
                        { style: _this2.tagStyle() },
                        tag.value
                    )
                );
            });

            var customOverlay = typeof this.props.item.customOverlay === 'undefined' ? _react2.default.createElement('noscript', null) : _react2.default.createElement(
                'div',
                { className: 'custom-overlay',
                    key: "custom-overlay-" + this.props.index,
                    style: {
                        pointerEvents: "none",
                        opacity: this.state.hover ? 1 : 0,
                        position: "absolute",
                        height: "100%",
                        width: "100%" } },
                this.props.item.customOverlay
            );

            return _react2.default.createElement(
                'div',
                { className: 'tile',
                    key: "tile-" + this.props.index,
                    onMouseEnter: function onMouseEnter(e) {
                        return _this2.setState({ hover: true });
                    },
                    onMouseLeave: function onMouseLeave(e) {
                        return _this2.setState({ hover: false });
                    },
                    style: {
                        margin: this.props.margin,
                        WebkitUserSelect: "none",
                        position: "relative",
                        float: "left",
                        background: "#eee",
                        padding: "0px" } },
                _react2.default.createElement(
                    'div',
                    { className: 'tile-icon-bar',
                        key: "tile-icon-bar-" + this.props.index,
                        style: {
                            pointerEvents: "none",
                            opacity: 1,
                            position: "absolute",
                            height: "36px",
                            width: "100%" } },
                    this.renderCheckButton()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'tile-bottom-bar',
                        key: "tile-bottom-bar-" + this.props.index,
                        style: {
                            padding: "2px",
                            pointerEvents: "none",
                            position: "absolute",
                            minHeight: "0px",
                            maxHeight: "160px",
                            width: "100%",
                            bottom: "0px",
                            overflow: "hidden"
                        } },
                    tags
                ),
                customOverlay,
                _react2.default.createElement('div', { className: 'tile-overlay',
                    key: "tile-overlay-" + this.props.index,
                    style: {
                        pointerEvents: "none",
                        opacity: 1,
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        background: this.state.hover && !this.props.item.isSelected && this.props.isSelectable ? 'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)' : 'none' } }),
                _react2.default.createElement(
                    'div',
                    { className: 'tile-viewport',
                        style: this.tileViewportStyle(),
                        key: "tile-viewport-" + this.props.index,
                        onClick: this.props.onClick ? function (e) {
                            return _this2.props.onClick.call(_this2, _this2.props.index, e);
                        } : null },
                    _react2.default.createElement('img', {
                        key: "img-" + this.props.index,
                        src: this.props.item.thumbnail,
                        alt: alt,
                        title: this.props.item.caption,
                        style: this.thumbnailStyle() })
                ),
                this.props.item.thumbnailCaption && _react2.default.createElement(
                    'div',
                    { className: 'tile-description',
                        style: {
                            background: "white",
                            height: "100%",
                            width: "100%",
                            margin: 0,
                            userSelect: "text",
                            WebkitUserSelect: "text",
                            MozUserSelect: "text",
                            overflow: "hidden"
                        } },
                    this.props.item.thumbnailCaption
                )
            );
        }
    }]);

    return Image;
}(_react.Component);

Image.propTypes = {
    item: _propTypes2.default.object,
    index: _propTypes2.default.number,
    margin: _propTypes2.default.number,
    height: _propTypes2.default.number,
    isSelectable: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    onSelectImage: _propTypes2.default.func,
    tileViewportStyle: _propTypes2.default.func,
    thumbnailStyle: _propTypes2.default.func,
    tagStyle: _propTypes2.default.object,
    customOverlay: _propTypes2.default.element
};

Image.defaultProps = {
    isSelectable: true,
    hover: false
};

exports.default = Image;