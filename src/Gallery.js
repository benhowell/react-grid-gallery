import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Lightbox from 'react-images';
import Image from './Image.js';
import renderThumbs from "./renderThumbs";

class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lightboxIsOpen: this.props.isOpen,
            currentImage: this.props.currentImage,
            containerWidth: this.props.defaultContainerWidth,
        };

        this.onResize = this.onResize.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoImage = this.gotoImage.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.onClickImage = this.onClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
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

    getCurrentImageIndex() {
        return Math.min(this.state.currentImage, this.props.images.length - 1)
    }

    openLightbox (index, event) {
        if (event) {
            event.preventDefault();
        }
        if (this.props.lightboxWillOpen) {
            this.props.lightboxWillOpen.call(this, index);
        }
        if (this.props.currentImageWillChange) {
            this.props.currentImageWillChange.call(this, index);
        }

        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    closeLightbox () {
        if (this.props.lightboxWillClose) {
            this.props.lightboxWillClose.call(this);
        }
        if (this.props.currentImageWillChange) {
            this.props.currentImageWillChange.call(this, 0);
        }

        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    gotoPrevious () {
        if (this.props.currentImageWillChange) {
            this.props.currentImageWillChange.call(this, this.getCurrentImageIndex() - 1);
        }
        this.setState({
            currentImage: this.getCurrentImageIndex() - 1
        });
    }

    gotoNext () {
        if (this.props.currentImageWillChange) {
            this.props.currentImageWillChange.call(this, this.getCurrentImageIndex() + 1);
        }
        this.setState({
            currentImage: this.getCurrentImageIndex() + 1
        });
    }

    onClickImage () {
        if (this.state.currentImage === this.props.images.length - 1)
            return;
        this.gotoNext();
    }

    onSelectImage (index, event) {
        event.preventDefault();
        if(this.props.onSelectImage)
            this.props.onSelectImage.call(this, index, this.props.images[index]);
    }

    gotoImage (index) {
        if (this.props.currentImageWillChange) {
            this.props.currentImageWillChange.call(this, index);
        }
        this.setState({
            currentImage: index
        });
    }

    getOnClickThumbnailFn () {
        if(!this.props.onClickThumbnail && this.props.enableLightbox)
            return this.openLightbox;
        if(this.props.onClickThumbnail)
            return this.props.onClickThumbnail;
        return null;
    }

    getOnClickLightboxThumbnailFn () {
        if(!this.props.onClickLightboxThumbnail
           && this.props.showLightboxThumbnails)
            return this.gotoImage;
        if(this.props.onClickLightboxThumbnail
           && this.props.showLightboxThumbnails)
            return this.props.onClickLightboxThumbnail;
        return null;
    }

    getOnClickImageFn () {
        if(this.props.onClickImage)
            return this.props.onClickImage;
        return this.onClickImage;
    }

    getOnClickPrevFn () {
        if(this.props.onClickPrev)
            return this.props.onClickPrev;
        return this.gotoPrevious;
    }

    getOnClickNextFn () {
        if(this.props.onClickNext)
            return this.props.onClickNext;
        return this.gotoNext;
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
                <div id={this.props.id}
            className="ReactGridGallery"
            ref={(c) => this._gallery = c}>
                <iframe style={resizeIframeStyles}
            ref={(c) => c && c.contentWindow
                 && c.contentWindow.addEventListener('resize', this.onResize) } />
                {images}
                <Lightbox
            images={this.props.images}
            backdropClosesModal={this.props.backdropClosesModal}
            currentImage={this.getCurrentImageIndex()}
	    preloadNextImage={this.props.preloadNextImage}
            customControls={this.props.customControls}
            enableKeyboardInput={this.props.enableKeyboardInput}
            imageCountSeparator={this.props.imageCountSeparator}
            isOpen={this.state.lightboxIsOpen}
            onClickImage={this.getOnClickImageFn()}
            onClickNext={this.getOnClickNextFn()}
            onClickPrev={this.getOnClickPrevFn()}
            showCloseButton={this.props.showCloseButton}
            showImageCount={this.props.showImageCount}
            onClose={this.closeLightbox}
            width={this.props.lightboxWidth}
            theme={this.props.theme}
            onClickThumbnail={this.getOnClickLightboxThumbnailFn()}
            showThumbnails={this.props.showLightboxThumbnails}
		{...this.props.lightBoxProps}
                />
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
            srcset: PropTypes.array,
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
    lightboxWillOpen: PropTypes.func,
    lightboxWillClose: PropTypes.func,
    enableLightbox: PropTypes.bool,
    backdropClosesModal: PropTypes.bool,
    currentImage: PropTypes.number,
    preloadNextImage: PropTypes.bool,
    customControls: PropTypes.arrayOf(PropTypes.node),
    currentImageWillChange: PropTypes.func,
    enableKeyboardInput: PropTypes.bool,
    imageCountSeparator: PropTypes.string,
    isOpen: PropTypes.bool,
    onClickImage: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickPrev: PropTypes.func,
    onClose: PropTypes.func,
    showCloseButton: PropTypes.bool,
    showImageCount: PropTypes.bool,
    lightboxWidth: PropTypes.number,
    tileViewportStyle: PropTypes.func,
    thumbnailStyle: PropTypes.func,
    showLightboxThumbnails: PropTypes.bool,
    onClickLightboxThumbnail: PropTypes.func,
    tagStyle: PropTypes.object,
    thumbnailImageComponent: PropTypes.func,
    lightBoxProps : PropTypes.object,
};

Gallery.defaultProps = {
    id: "ReactGridGallery",
    enableImageSelection: true,
    rowHeight: 180,
    margin: 2,
    defaultContainerWidth : 0,
    enableLightbox: true,
    backdropClosesModal: false,
    currentImage: 0,
    preloadNextImage: true,
    enableKeyboardInput: true,
    imageCountSeparator: ' of ',
    isOpen: false,
    showCloseButton: true,
    showImageCount: true,
    lightboxWidth: 1024,
    showLightboxThumbnails: false,
    lightBoxProps : {},
};

export default Gallery;
