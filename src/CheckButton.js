import React, { Component, PropTypes } from 'react';

class CheckButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            hover: this.props.hover
        };

        this.fill = this.fill.bind(this);
        this.svgBackgroundState = this.svgBackgroundState.bind(this);
        this.visibility = this.visibility.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    fill () {
        if (this.props.isSelected)
            return "#4285f4";
        else if (this.state.hover)
            return "rgba(255, 255, 255, 1)";
        return "rgba(255, 255, 255, 0.7)";
    }

    svgBackgroundState () {
        if (this.props.isSelected)
            return "block";
        return "none";
    }

    visibility () {
        if(this.props.isSelected || this.props.parentHover)
            return 'visible';
        return 'hidden';
    }

    onMouseOver () {
        this.setState({hover: true});
    }

    onMouseOut () {
        this.setState({hover: false});
    }

    render () {
        let circleStyle = {
            display: this.svgBackgroundState()
        };

        return (
                <div
            title="Select"
            style={{
                visibility: this.visibility(),
                background: 'none',
                width: '36px',
                height: '36px',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
                pointerEvents: 'visible'
            }}
            onClick={(e) => this.props.onClick(this.props.index, e)}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}>
                <svg
            fill={this.fill()}
            height="24" viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">

                <radialGradient
            id="shadow"
            cx="38"
            cy="95.488"
            r="10.488"
            gradientTransform="matrix(1 0 0 -1 -26 109)"
            gradientUnits="userSpaceOnUse">
                <stop
            offset=".832"
            stopColor="#010101">
                </stop>
                <stop
            offset="1"
            stopColor="#010101"
            stopOpacity="0">
                </stop>
                </radialGradient>

                <circle
            style={circleStyle}
            opacity=".26"
            fill="url(#shadow)"
            cx="12" cy="13.512"
            r="10.488">
                </circle>
                <circle
            style={circleStyle}
            fill="#FFF"
            cx="12"
            cy="12.2"
            r="8.292">
                </circle>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                </div>
        )
    }
}

CheckButton.propTypes = {index: PropTypes.number,
                         isSelected: PropTypes.bool,
                         parentHover: PropTypes.string,
                         hover: PropTypes.bool,
                         onClick: PropTypes.func};
CheckButton.defaultProps = {isSelected: false,
                            parentHover: false,
                            hover: false};

export default CheckButton;
