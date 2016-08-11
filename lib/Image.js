'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            isSelected: _this.props.isSelected,
            visibility: _this.props.visibility,
            hover: false
        };

        _this.onSelect = _this.onSelect.bind(_this);
        _this.onMouseEnter = _this.onMouseEnter.bind(_this);
        _this.onMouseLeave = _this.onMouseLeave.bind(_this);

        return _this;
    }

    _createClass(Image, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(np, ns) {
            if (ns.isSelected != this.state.isSelected) {
                this.props.onToggleSelected(this.props.index, ns.isSelected);
            }
        }
    }, {
        key: 'toggleIsSelected',
        value: function toggleIsSelected() {
            this.setState({ isSelected: !this.state.isSelected });
        }
    }, {
        key: 'fill',
        value: function fill() {
            if (this.state.isSelected) return "#4285f4";else if (this.state.hover) return "rgba(255, 255, 255, 1)";
            return "rgba(255, 255, 255, 0.7)";
        }
    }, {
        key: 'onMouseEnter',
        value: function onMouseEnter() {
            this.setState({ hover: true });
        }
    }, {
        key: 'onMouseLeave',
        value: function onMouseLeave() {
            this.setState({ hover: false });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(isSelected) {
            this.setState({ isSelected: isSelected });
        }
    }, {
        key: 'checkButtonVisibility',
        value: function checkButtonVisibility() {
            if (this.state.hover) return 'visible';
            return 'hidden';
        }
    }, {
        key: 'tileOverlayBackground',
        value: function tileOverlayBackground() {
            if (this.state.hover && !this.state.isSelected) return 'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)';
            return 'none';
        }
    }, {
        key: 'tileViewportStyle',
        value: function tileViewportStyle() {
            if (this.state.isSelected) return {
                width: this.props.item.vwidth - 32,
                height: this.props.height - 32,
                margin: 16,
                overflow: "hidden"
            };
            return {
                width: "" + this.props.item.vwidth + "px",
                height: this.props.height,
                overflow: "hidden"
            };
        }
    }, {
        key: 'thumbnailStyle',
        value: function thumbnailStyle() {
            if (this.state.isSelected) {

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
                    marginTop: marginTop
                };
            }
            return {
                cursor: 'pointer',
                width: this.props.item.scaletwidth,
                height: this.props.height,
                marginLeft: this.props.item.marginLeft,
                marginTop: 0
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'tile',
                    key: "tile-" + this.props.index,
                    onMouseEnter: this.onMouseEnter,
                    onMouseLeave: this.onMouseLeave,
                    style: {
                        margin: "" + this.props.margin + "px",
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
                    _react2.default.createElement(_CheckButton2.default, { key: 'Select',
                        onClick: this.onSelect,
                        visibility: this.checkButtonVisibility() })
                ),
                _react2.default.createElement('div', { className: 'tile-overlay',
                    key: "tile-overlay-" + this.props.index,
                    style: {
                        pointerEvents: "none",
                        opacity: 1,
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        background: this.tileOverlayBackground() } }),
                _react2.default.createElement(
                    'div',
                    { className: 'tile-viewport',
                        style: this.tileViewportStyle(),
                        key: "tile-viewport-" + this.props.index,
                        onClick: function onClick(e) {
                            return _this2.props.onClick(_this2.props.index, e);
                        } },
                    _react2.default.createElement('img', {
                        key: "img-" + this.props.index,
                        src: this.props.item.thumbnail, title: this.props.item.caption,
                        style: this.thumbnailStyle() })
                )
            );
        }
    }]);

    return Image;
}(_react.Component);

Image.propTypes = { item: _react2.default.PropTypes.object,
    index: _react2.default.PropTypes.number,
    margin: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number,
    onClick: _react2.default.PropTypes.func,
    onToggleSelected: _react2.default.PropTypes.func };

Image.defaultProps = { isSelected: false,
    hover: false };

exports.default = Image;