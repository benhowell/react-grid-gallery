import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Image from './Image.js';
import renderThumbs from "./renderThumbs";

class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            containerWidth: this.props.defaultContainerWidth,
        };

        this.onResize = this.onResize.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    componentDidMount () {
        this.onResize();
    }

    componentDidUpdate () {
        if (!this._gallery) return;
        if (this.getContainerWidth()
            !== this.state.containerWidth){
            this.onResize();
        }
    }

    onResize () {
        if (!this._gallery) return;
        const containerWidth = this.getContainerWidth();
        this.setState({ containerWidth });
    }

    getContainerWidth() {
        let width = this._gallery.clientWidth;
        try {
            width = this._gallery.getBoundingClientRect().width;
        } catch (err) {}
        return Math.floor(width);
    }

    onSelectImage (index, event) {
        event.preventDefault();
        if(this.props.onSelectImage)
            this.props.onSelectImage.call(this, index, this.props.images[index]);
    }

    getOnClickThumbnailFn () {
        if(this.props.onClickThumbnail)
            return this.props.onClickThumbnail;
        return null;
    }

    render () {
        const { maxRows, rowHeight, margin } = this.props
        const { containerWidth } = this.state
        const thumbnails = renderThumbs(this.props.images, { containerWidth, maxRows, rowHeight, margin })
        var images = thumbnails.map((item, idx) => {
            return <Image
            key={"Image-"+idx+"-"+item.src}
            item={item}
            index={idx}
            margin={this.props.margin}
            height={this.props.rowHeight}
            isSelectable={this.props.enableImageSelection}
            onClick={this.getOnClickThumbnailFn()}
            onSelectImage={this.onSelectImage}
            tagStyle={this.props.tagStyle}
            tileViewportStyle={this.props.tileViewportStyle}
            thumbnailStyle={this.props.thumbnailStyle}
            thumbnailImageComponent={this.props.thumbnailImageComponent}
                />;});
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
        return (
            <div id={this.props.id} className="ReactGridGallery" ref={(c) => this._gallery = c}>
                <iframe style={resizeIframeStyles} ref={(c) => c && c.contentWindow && c.contentWindow.addEventListener('resize', this.onResize) } />
                {images}
            </div>
        );
    }
}

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            nano: PropTypes.string,
            alt: PropTypes.string,
            thumbnail: PropTypes.string.isRequired,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.element
                    ]).isRequired,
                    title: PropTypes.string.isRequired,
                    key: PropTypes.string
                })
            ),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool,
            thumbnailCaption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ])
        })
    ).isRequired,
    id: PropTypes.string,
    enableImageSelection: PropTypes.bool,
    onSelectImage: PropTypes.func,
    rowHeight: PropTypes.number,
    maxRows: PropTypes.number,
    margin: PropTypes.number,
    defaultContainerWidth: PropTypes.number,
    onClickThumbnail: PropTypes.func,
    tileViewportStyle: PropTypes.func,
    thumbnailStyle: PropTypes.func,
    tagStyle: PropTypes.object,
    thumbnailImageComponent: PropTypes.func,
};

Gallery.defaultProps = {
    id: "ReactGridGallery",
    enableImageSelection: true,
    rowHeight: 180,
    margin: 2,
    defaultContainerWidth : 0,
};

export default Gallery;
