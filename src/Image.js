import React, { Component, PropTypes } from 'react';
import CheckButton from './CheckButton.js';

class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            hover: false
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    fill () {
        if (this.props.isSelected)
            return "#4285f4";
        else if (this.state.hover)
            return "rgba(255, 255, 255, 1)";
        return "rgba(255, 255, 255, 0.7)";
    }

    onMouseEnter () {
        this.setState({hover: true});
    }

    onMouseLeave () {
        this.setState({hover: false});
    }

    checkButtonVisibility () {
        if (this.state.hover)
            return 'visible';
        return 'hidden';
     }

    tileOverlayBackground () {
        if (this.state.hover && !this.props.isSelected)
            return 'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)';
        return 'none';
    }

    tileViewportStyle () {
        if (this.props.isSelected)
            return {
                width: this.props.item.vwidth -32,
                height: this.props.height -32,
                margin: 16,
                overflow: "hidden"
            };
        return {
            width: ""+this.props.item.vwidth+"px",
            height: this.props.height,
            overflow: "hidden"
        };
    }

    thumbnailStyle () {
        if (this.props.isSelected){
            var ratio = (this.props.item.scaletwidth / this.props.height);
            var height = 0;
            var width = 0;
            var viewportHeight = (this.props.height - 32);
            var viewportWidth = (this.props.item.vwidth -32);

            if(this.props.item.scaletwidth > this.props.height){
                width = this.props.item.scaletwidth -32;
                height = Math.floor(width / ratio);
            }
            else {
                height = this.props.height -32;
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

    renderCheckButton () {
        if(this.props.isSelectable)
            return (
                    <CheckButton key="Select"
                index={this.props.index}
                isSelected={this.props.isSelected}
                onClick={this.props.onToggleSelected}
                parentHover={this.state.hover}/>
            );
        return (<div/>);
    }

    render () {
        return (
                <div className="tile"
            key={"tile-"+this.props.index}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            style={{
                margin: ""+this.props.margin+"px",
                WebkitUserSelect: "none",
                position: "relative",
                float: "left",
                background: "#eee",
                padding: "0px"}}>

                <div className="tile-icon-bar"
            key={"tile-icon-bar-"+this.props.index}
            style={{
                pointerEvents: "none",
                opacity: 1,
                position: "absolute",
                height: "36px",
                width: "100%"}}>
                {this.renderCheckButton()}
                </div>

                <div className="tile-overlay"
            key={"tile-overlay-"+this.props.index}
            style={{
                pointerEvents: "none",
                opacity: 1,
                position: "absolute",
                height: "100%",
                width: "100%",
                background: this.tileOverlayBackground()}}>
                </div>

                <div className="tile-viewport"
            style={
                this.tileViewportStyle()
            }
            key={"tile-viewport-"+this.props.index}
            onClick={(e) => this.props.onClick(this.props.index, e)}>

                <img
            key={"img-"+this.props.index}
            src={this.props.item.thumbnail} title={this.props.item.caption}
            style={this.thumbnailStyle()} />
                </div>
                </div>
        )
    }
}

Image.propTypes = {item: PropTypes.object,
                   index: PropTypes.number,
                   margin: PropTypes.number,
                   height: PropTypes.number,
                   isSelectable: PropTypes.bool,
                   isSelected: PropTypes.bool,
                   onClick: PropTypes.func,
                   onToggleSelected: PropTypes.func};

Image.defaultProps = {isSelectable: true,
                      isSelected: false,
                      hover: false};

export default Image;
