import React, { Component, PropTypes } from 'react';
import CheckButton from './CheckButton.js';

class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isSelected: this.props.isSelected,
            visibility: this.props.visibility,
            hover: false
        };

        this.onSelect = this.onSelect.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);


        this.style = {
            tileInner:
            {
                width: ""+this.props.item.vwidth+"px",
                height: this.props.height,
                overflow: "hidden"
            },
            tileInnerSelected: {
                width: ""+this.props.item.vwidth -32 +"px",
                height: this.props.height -32,
                margin: 16,
                overflow: "hidden"
            },
            thumbnail: {
                cursor: 'pointer',
                width: ""+this.props.item.scaletwidth+"px",
                height: this.props.height,
                marginLeft: ""+(this.props.item.vx ?
                                (-this.props.item.vx) : 0)+"px",
                marginTop: "" + 0 + "px"
            },
            thumbnailSelected: {
                cursor: 'pointer',
                width: ""+ this.props.item.scaletwidth - 32 +"px",
                height: this.props.height -32,
                marginLeft: ""+(this.props.item.vx ?
                                (-this.props.item.vx) : 0)+"px",
                marginTop: "" + 0 + "px"
            }
        };
    }

    componentWillUpdate (np, ns) {
        if(ns.isSelected != this.state.isSelected){
            this.props.onToggleSelected(this.props.index, ns.isSelected);
        }
    }

    toggleIsSelected () {
        this.setState({isSelected: !this.state.isSelected});
    }

    fill () {
        if (this.state.isSelected)
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

    onSelect (isSelected) {
        this.setState({isSelected: isSelected});
    }

    checkButtonVisibility () {
        if (this.state.hover)
            return 'visible';
        return 'hidden';
     }

    tileOverlayBackground () {
        if (this.state.hover && !this.state.isSelected)
            return 'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)';
        return 'none';
    }

    tileInnerStyle () {
        if (this.state.isSelected)
            return this.style.tileInnerSelected;
        return this.style.tileInner;
    }

    thumbnailStyle () {
        if (this.state.isSelected)
            return this.style.thumbnailSelected;
        return this.style.thumbnail;
    }


    render () {
        return (
                <div className="imageContainer"
            key={"imageOuter-"+this.props.index}
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

                <CheckButton key="Select"
            onClick={this.onSelect}
            visibility={this.checkButtonVisibility()}/>
                </div>

                <div style={
                    this.tileInnerStyle()
                }
                key={"imageInner-"+this.props.index}>


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

                <a className="viewImageAction"
            key={"viewImage-"+this.props.index}
            onClick={(e) => this.props.onClick(this.props.index, e)}>
                <img
            key={"img-"+this.props.index}
            src={this.props.item.thumbnail} title={this.props.item.caption}
            style={this.thumbnailStyle()} /></a>


                </div>
                </div>
        )
    }










}

Image.propTypes = {item: React.PropTypes.object,
                   index: React.PropTypes.number,
                   margin: React.PropTypes.number,
                   height: React.PropTypes.number,
                   onClick: React.PropTypes.func,
                   onToggleSelected: React.PropTypes.func};
Image.defaultProps = {isSelected: false,
                      hover: false};


export default Image;
