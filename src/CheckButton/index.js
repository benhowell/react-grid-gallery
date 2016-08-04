import React, { Component, PropTypes } from 'react';


class CheckButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selected: this.props.selected,
            visibility: this.props.visibility,
            hover: this.props.hover,
            onClick: this.props.onClick
        };

        this.select = this.select.bind(this);
        this.fill = this.fill.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentDidUpdate (pProps, cProps) {
        console.log("cProps= " + cProps);
        if(pProps.selected != cProps.selected)
            this.props.onClick(this.state.selected);
        this.setState({visibility: cProps.visibility});
    }

    select () {
        this.setState({selected: !this.state.selected});
    }

    fill () {
        if (this.state.selected)
            return "#4285f4";
        else if (this.state.hover)
            return "rgba(255, 255, 255, 1)";
        return "rgba(255, 255, 255, 0.7)";
    }

    onMouseOver () {
        this.setState({hover: true});
    }

    onMouseOut () {
        this.setState({hover: false});
    }

    render () {
        return (
                <button
            title="Select"
            style={{
                visibility: this.state.visibility,
                background: 'none',
                border: 'none',
                paddingTop: '6px'}}
            onClick={this.select}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}>
                <svg fill={this.fill()} height="24" viewBox="0 0 24 24"
            width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>

                </button>
        )
    }
}

CheckButton.propTypes = {selected: React.PropTypes.bool,
                         visibility: React.PropTypes.string,
                         hover: React.PropTypes.bool,
                         onClick: React.PropTypes.func};
CheckButton.defaultProps = {selected: false,
                            visibility: 'visible',
                            hover: false};

export default CheckButton;
