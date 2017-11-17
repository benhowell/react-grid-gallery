import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CheckButton from './CheckButton.js';

class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            hover: false
        };
    }

    tagStyle () {
        if (this.props.tagStyle)
            return this.props.tagStyle;
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

    tileViewportStyle () {
        if (this.props.tileViewportStyle)
            return this.props.tileViewportStyle.call(this);
        if (this.props.item.isSelected)
            return {
                width: this.props.item.vwidth -32,
                height: this.props.height -32,
                margin: 16,
                overflow: "hidden"
            };
        return {
            width: this.props.item.vwidth,
            height: this.props.height,
            overflow: "hidden"
        };
    }

    thumbnailStyle () {
        if (this.props.thumbnailStyle)
            return this.props.thumbnailStyle.call(this);
        if (this.props.item.isSelected){
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
        return (
                <CheckButton key="Select"
            index={this.props.index}
            color={"rgba(255, 255, 255, 0.7)"}
            selectedColor={this.props.selectedIconColor ? 
                           this.props.selectedIconColor : "#4285f4"}
            hoverColor={"rgba(255, 255, 255, 1)"}
            isSelected={this.props.item.isSelected}
            isSelectable={this.props.isSelectable}
            onClick={this.props.isSelectable ?
                     this.props.onSelectImage : null}
            parentHover={this.state.hover}/>
        );
    }

    render () {
        var tags = (typeof this.props.item.tags === 'undefined') ? <noscript/> :
                this.props.item.tags.map((tag) => {
                    return <div title={tag.title}
                    key={"tag-"+tag.value}
                    style={{display: "inline-block",
                            cursor: 'pointer',
                            pointerEvents: 'visible',
                            margin: "2px"}}>
                        <span style={this.tagStyle()}>{tag.value}</span>
                        </div>;
                });

        var customOverlay = (typeof this.props.item.customOverlay === 'undefined')
                ? <noscript/> :
                <div style={{
                    pointerEvents: "none",
                    opacity: this.state.hover ? 1 : 0,
                    position: "absolute",
                    height: "100%",
                    width: "100%"}}>
                {this.props.item.customOverlay}
            </div>;

        return (
                <div className="tile"
            key={"tile-"+this.props.index}
            onMouseEnter={(e) => this.setState({hover: true})}
            onMouseLeave={(e) => this.setState({hover: false})}
            style={{
                margin: this.props.margin,
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

                <div className="tile-bottom-bar"
            key={"tile-bottom-bar-"+this.props.index}
            style={{
                padding: "2px",
                pointerEvents: "none",
                position: "absolute",
                minHeight: "0px",
                maxHeight: "160px",
                width: "100%",
                bottom: "0px",
                overflow: "hidden"
            }}>
                {tags}
            </div>

                {customOverlay}

                <div className="tile-overlay"
            key={"tile-overlay-"+this.props.index}
            style={{
                pointerEvents: "none",
                opacity: 1,
                position: "absolute",
                height: "100%",
                width: "100%",
                background: (this.state.hover
                             && !this.props.item.isSelected
                             && this.props.isSelectable) ?
                    'linear-gradient(to bottom,rgba(0,0,0,0.26),transparent 56px,transparent)' : 'none'}}>
                </div>

                <div className="tile-viewport"
            style={this.tileViewportStyle()}
            key={"tile-viewport-"+this.props.index}
            onClick={this.props.onClick ?
                     (e) => this.props.onClick.call(this, this.props.index, e) : null}>
                <img
            key={"img-"+this.props.index}
            src={this.props.item.thumbnail} title={this.props.item.caption}
            style={this.thumbnailStyle()} oncontextmenu={this.props.disableContextMenu ? 'return false' : null} />
                </div>
                {this.props.item.thumbnailCaption && (
                        <div className="tile-description"
                    style={{
                        background: "white",
                        height: "100%",
                        width: "100%",
                        margin: 0,
                        userSelect: "text",
                        WebkitUserSelect: "text",
                        MozUserSelect: "text",
                        overflow: "hidden"
                    }}>
                        {this.props.item.thumbnailCaption}
                    </div>
                )}
            </div>
        );
    }
}

Image.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    margin: PropTypes.number,
    height: PropTypes.number,
    isSelectable: PropTypes.bool,
    onClick: PropTypes.func,
    onSelectImage: PropTypes.func,
    tileViewportStyle: PropTypes.func,
    thumbnailStyle: PropTypes.func,
    tagStyle: PropTypes.object,
    customOverlay: PropTypes.element,
    disableContextMenu: PropTypes.bool
};

Image.defaultProps = {
    isSelectable: true,
    hover: false
};

export default Image;
