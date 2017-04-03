import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import Image from './Image.js';

class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            images: this.props.images,
            thumbnails: [],
            lightboxIsOpen: this.props.isOpen,
            currentImage: this.props.currentImage,
            containerWidth: 0
        };

        this.onResize = this.onResize.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.onClickImage = this.onClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.onSelectImage = this.onSelectImage.bind(this);
    }

    componentDidMount () {
        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    componentWillReceiveProps (np) {
        if(this.state.images != np.images){
            this.setState({
                images: np.images,
                thumbnails: this.renderThumbs(this._gallery.clientWidth,
                                              np.images)
            });
        }
    }

    componentDidUpdate () {
        if (!this._gallery) return;
        if (this._gallery.clientWidth
            !== this.state.containerWidth){
            this.onResize();
        }
    }

    onResize () {
        if (!this._gallery) return;
        this.setState({
            containerWidth: Math.floor(this._gallery.clientWidth),
            thumbnails: this.renderThumbs(this._gallery.clientWidth)
        });
    }

    openLightbox (index, event) {
        event.preventDefault();
        if (this.props.lightboxWillOpen) {
            this.props.lightboxWillOpen(index);
        }

        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    closeLightbox () {
        if (this.props.lightboxWillClose) {
            this.props.lightboxWillClose();
        }

        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    gotoPrevious () {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext () {
        this.setState({
            currentImage: this.state.currentImage + 1
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
            this.props.onSelectImage(index, this.state.images[index]);
    }

    getOnClickThumbnailFn () {
        if(!this.props.onClickThumbnail && this.props.enableLightbox)
            return this.openLightbox;
        if(this.props.onClickThumbnail)
            return this.props.onClickThumbnail;
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

    calculateCutOff (len, delta, items) {
        var cutoff = [];
        var cutsum = 0;
        for(var i in items) {
            var item = items[i];
            var fractOfLen = item.scaletwidth / len;
            cutoff[i] = Math.floor(fractOfLen * delta);
            cutsum += cutoff[i];
        }

        var stillToCutOff = delta - cutsum;
        while(stillToCutOff > 0) {
            for(i in cutoff) {
                cutoff[i]++;
                stillToCutOff--;
                if (stillToCutOff < 0) break;
            }
        }
        return cutoff;
    }

    buildImageRow (items, containerWidth) {
        var row = [];
        var len = 0;
        var imgMargin = 2 * this.props.margin;
        while(items.length > 0 && len < containerWidth) {
            var item = items.shift();
            row.push(item);
            len += (item.scaletwidth + imgMargin);
        }

        var delta = len - containerWidth;
        if(row.length > 0 && delta > 0) {
            var cutoff = this.calculateCutOff(len, delta, row);
            for(var i in row) {
                var pixelsToRemove = cutoff[i];
                item = row[i];
                item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));
                item.vwidth = item.scaletwidth - pixelsToRemove;
            }
        }
        else {
            for(var j in row) {
                item = row[j];
                item.marginLeft = 0;
                item.vwidth = item.scaletwidth;
            }
        }
        return row;
    }

    setThumbScale (item) {
        item.scaletwidth =
            Math.floor(this.props.rowHeight
                       * (item.thumbnailWidth / item.thumbnailHeight));
    }

    renderThumbs (containerWidth, images = this.state.images) {
        if (!images) return [];
        if (containerWidth == 0) return [];

        var items = images.slice();
        for (var t in items) {
            this.setThumbScale(items[t]);
        }

        var thumbs = [];
        var rows = [];
        while(items.length > 0) {
            rows.push(this.buildImageRow(items, containerWidth));
        }

        for(var r in rows) {
            for(var i in rows[r]) {
                var item = rows[r][i];
                thumbs.push(item);
            }
        }
        return thumbs;
    }

    render () {
        var images = this.state.thumbnails.map((item, idx) => {
            return <Image
            key={"Image-"+idx+"-"+item.src}
            item={item}
            index={idx}
            margin={this.props.margin}
            height={this.props.rowHeight}
            isSelectable={this.props.enableImageSelection}
            onClick={this.getOnClickThumbnailFn()}
            onSelectImage={this.onSelectImage}
                />;});

        return (
                <div id="Gallery" ref={(c) => this._gallery = c}>
                {images}
                <Lightbox
            images={this.props.images}
            backdropClosesModal={this.props.backdropClosesModal}
            currentImage={this.state.currentImage}
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
                />
                </div>
        );
    }
};

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired
                })
            ),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool
        })
    ).isRequired,
    enableImageSelection: PropTypes.bool,
    onSelectImage: PropTypes.func,
    rowHeight: PropTypes.number,
    margin: PropTypes.number,
    onClickThumbnail: PropTypes.func,
    lightboxWillOpen: PropTypes.func,
    lightboxWillClose: PropTypes.func,
    enableLightbox: PropTypes.bool,
    backdropClosesModal: PropTypes.bool,
    currentImage: PropTypes.number,
    preloadNextImage: PropTypes.bool,
    customControls: PropTypes.arrayOf(PropTypes.node),
    enableKeyboardInput: PropTypes.bool,
    imageCountSeparator: PropTypes.string,
    isOpen: PropTypes.bool,
    onClickImage: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickPrev: PropTypes.func,
    onClose: PropTypes.func,
    showCloseButton: PropTypes.bool,
    showImageCount: PropTypes.bool,
    lightboxWidth: PropTypes.number
};

Gallery.defaultProps = {
    enableImageSelection: true,
    rowHeight: 180,
    margin: 2,
    enableLightbox: true,
    backdropClosesModal: false,
    currentImage: 0,
    preloadNextImage: true,
    enableKeyboardInput: true,
    imageCountSeparator: ' of ',
    isOpen: false,
    showCloseButton: true,
    showImageCount: true,
    lightboxWidth: 1024
};

module.exports = Gallery;
