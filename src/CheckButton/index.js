import React, { Component, PropTypes } from 'react';


class CheckButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            selected: this.props.selected,
            hover: this.props.hover,
            onClick: this.props.onClick
        };

        this.select = this.select.bind(this);
        this.fill = this.fill.bind(this);
        this.tickFill = this.tickFill.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    componentDidUpdate (pProps, cProps) {
        if(pProps.selected != cProps.selected)
            this.props.onClick(this.state.selected);
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

    tickFill () {
        if (this.state.selected)
            return "rgba(255, 255, 255, 1)";
        return "none";
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
                         hover: React.PropTypes.bool,
                         onClick: React.PropTypes.func};
CheckButton.defaultProps = {selected: false,
                            hover: false};

export default CheckButton;
