'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckButton = function (_Component) {
    _inherits(CheckButton, _Component);

    function CheckButton(props) {
        _classCallCheck(this, CheckButton);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckButton).call(this, props));

        _this.state = {
            hover: _this.props.hover
        };

        _this.fill = _this.fill.bind(_this);
        _this.visibility = _this.visibility.bind(_this);
        return _this;
    }

    _createClass(CheckButton, [{
        key: 'fill',
        value: function fill() {
            if (this.props.isSelected) return this.props.selectedColor;else if (this.state.hover) return this.props.hoverColor;
            return this.props.color;
        }
    }, {
        key: 'visibility',
        value: function visibility() {
            if (this.props.isSelected || this.props.isSelectable && this.props.parentHover) return 'visible';
            return 'hidden';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var circleStyle = {
                display: this.props.isSelected ? "block" : "none"
            };

            return _react2.default.createElement(
                'div',
                {
                    title: 'Select',
                    style: {
                        visibility: this.visibility(),
                        background: 'none',
                        float: 'left',
                        width: '36px',
                        height: '36px',
                        border: 'none',
                        padding: '6px',
                        cursor: 'pointer',
                        pointerEvents: 'visible'
                    },
                    onClick: this.props.onClick ? function (e) {
                        return _this2.props.onClick(_this2.props.index, e);
                    } : null,
                    onMouseOver: function onMouseOver(e) {
                        return _this2.setState({ hover: true });
                    },
                    onMouseOut: function onMouseOut(e) {
                        return _this2.setState({ hover: false });
                    } },
                _react2.default.createElement(
                    'svg',
                    {
                        fill: this.fill(),
                        height: '24', viewBox: '0 0 24 24',
                        width: '24',
                        xmlns: 'http://www.w3.org/2000/svg' },
                    _react2.default.createElement(
                        'radialGradient',
                        {
                            id: 'shadow',
                            cx: '38',
                            cy: '95.488',
                            r: '10.488',
                            gradientTransform: 'matrix(1 0 0 -1 -26 109)',
                            gradientUnits: 'userSpaceOnUse' },
                        _react2.default.createElement('stop', {
                            offset: '.832',
                            stopColor: '#010101' }),
                        _react2.default.createElement('stop', {
                            offset: '1',
                            stopColor: '#010101',
                            stopOpacity: '0' })
                    ),
                    _react2.default.createElement('circle', {
                        style: circleStyle,
                        opacity: '.26',
                        fill: 'url(#shadow)',
                        cx: '12', cy: '13.512',
                        r: '10.488' }),
                    _react2.default.createElement('circle', {
                        style: circleStyle,
                        fill: '#FFF',
                        cx: '12',
                        cy: '12.2',
                        r: '8.292' }),
                    _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
                    _react2.default.createElement('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' })
                )
            );
        }
    }]);

    return CheckButton;
}(_react.Component);

CheckButton.propTypes = { index: _propTypes2.default.number,
    color: _propTypes2.default.string,
    isSelectable: _propTypes2.default.bool,
    isSelected: _propTypes2.default.bool,
    selectedColor: _propTypes2.default.string,
    parentHover: _propTypes2.default.bool,
    hover: _propTypes2.default.bool,
    hoverColor: _propTypes2.default.string,
    onClick: _propTypes2.default.func };

CheckButton.defaultProps = { isSelectable: true,
    isSelected: false,
    parentHover: false,
    hover: false };

module.exports = CheckButton;