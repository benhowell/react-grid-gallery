import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import Image from './Image.js';

var update = require('react-addons-update');

class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lightboxIsOpen: this.props.isOpen,
            selectedImages: this.props.selectedImages,
            currentImage: this.props.currentImage,
            containerWidth: 0
        };

        this.handleResize = this.handleResize.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.onToggleSelected = this.onToggleSelected.bind(this);
    }

    componentDidMount () {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUpdate (np, ns) {
        if(this.state.selectedImages != ns.selectedImages){
            if(this.props.onSelectedImagesChange)
                this.props.onSelectedImagesChange(ns.selectedImages);
        }
    }

    componentDidUpdate () {
        if (this.refs.gallery.clientWidth
            !== this.state.containerWidth){
            this.handleResize();
        }
    }

    handleResize () {
        this.setState({
            containerWidth:
            Math.floor(this.refs.gallery.clientWidth)
        });
    }

    openLightbox (index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    closeLightbox () {
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

    handleClickImage () {
        if (this.state.currentImage === this.props.images.length - 1)
            return;
        this.gotoNext();
    }

    onToggleSelected (index, event) {
        event.preventDefault();
        var i = this.state.selectedImages.indexOf(index);
        if(i == -1){
            this.setState({selectedImages:
                           update(this.state.selectedImages,
                                  {$push: [index]})});
        }
        else {
            this.setState({
                selectedImages: update(this.state.selectedImages,
                                       {$splice: [[i, 1]]})
            });
        }
    }

    getOnClickThumbnailFunc () {
        if(!this.props.onClickThumbnail && this.props.enableLightbox)
            return this.openLightbox;
        if(this.props.onClickThumbnail)
            return this.props.onClickThumbnail;
        return null;
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

    buildImageRow (items) {
        var row = [];
        var len = 0;
        var imgMargin = 2 * this.props.margin;
        while(items.length > 0 && len < this.state.containerWidth) {
            var item = items.shift();
            row.push(item);
            len += (item.scaletwidth + imgMargin);
        }

        var delta = len - this.state.containerWidth;
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
            for(var i in row) {
                item = row[i];
                item.marginLeft = 0;
                item.vwidth = item.scaletwidth;
            }
        }
        return row;
    }

    scaleThumbs (items) {
        for (var i in items) {
            items[i].scaletwidth =
                Math.floor(this.props.rowHeight * (items[i].thumbnailWidth
                                                   / items[i].thumbnailHeight));
        }
        return items;
    }

    renderGallery () {
        if (!this.props.images) return;
        if (this.state.containerWidth == 0) return;
        var items = this.scaleThumbs(this.props.images.slice());
        var images = [];
        var rows = [];
        while(items.length > 0) {
            rows.push(this.buildImageRow(items));
        }

        var idx = 0;
        for(var r in rows) {
            for(var i in rows[r]) {
                var item = rows[r][i];
                images.push(
                        <Image
                    key={"Image-"+idx}
                    item={item}
                    index={idx}
                    margin={this.props.margin}
                    height={this.props.rowHeight}
                    isSelectable={this.props.enableImageSelection}
                    isSelected={(this.state.selectedImages.indexOf(idx) > -1) ?
                                true : false}
                    onClick={this.getOnClickThumbnailFunc()}
                    onToggleSelected={this.onToggleSelected}/>
                );
                idx++;
            }
        }
        return images;
    }

    render () {
        return (
                <div id="Gallery" ref="gallery">
                {this.renderGallery()}
                <Lightbox
            images={this.props.images}
            backdropClosesModal={this.props.backdropClosesModal}
            currentImage={this.state.currentImage}
            customControls={this.props.customControls}
            enableKeyboardInput={this.props.enableKeyboardInput}
            imageCountSeparator={this.props.imageCountSeparator}
            isOpen={this.state.lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClose={this.closeLightbox}
            showCloseButton={this.props.showCloseButton}
            showImageCount={this.props.showImageCount}
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
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired,
    enableImageSelection: PropTypes.bool,
    selectedImages: PropTypes.arrayOf(PropTypes.number),
    onSelectedImagesChange: PropTypes.func,
    rowHeight: PropTypes.number,
    margin: PropTypes.number,
    onClickThumbnail: PropTypes.func,
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
    showImageCount: PropTypes.bool
};

Gallery.defaultProps = {
    enableImageSelection: true,
    selectedImages: [],
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
    showImageCount: true
};

module.exports = Gallery;
