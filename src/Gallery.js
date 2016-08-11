import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import Image from './Image.js';

var update = require('react-addons-update');

class Gallery extends Component {
    constructor (props) {
        super(props);

        this.state = {
            lightboxIsOpen: false,
            thumbHover: null,
            selectedImages: this.props.selectedImages,
            currentImage: 0,
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
        this.setState(
            {containerWidth:
             Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUpdate (np, ns) {
        console.log("selectedImages: " + ns.selectedImages);
    }

    componentDidUpdate () {
        if (ReactDOM.findDOMNode(this).clientWidth
            !== this.state.containerWidth){
            this.setState(
                {containerWidth:
                 Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
        }
    }

    handleResize (e) {
        this.setState(
            {containerWidth:
             Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
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
        if (this.state.currentImage === this.props.images.length - 1) return;
        this.gotoNext();
    }

    onToggleSelected (idx, isSelected) {
        if(isSelected){
            if(this.state.selectedImages.indexOf(idx) === -1){
                this.setState({selectedImages:
                               update(this.state.selectedImages,
                                      {$push: [idx]})});
            }
        }
        else {
            var i = this.state.selectedImages.indexOf(idx);
            if(i > -1){
                this.setState({
                    selectedImages: update(this.state.selectedImages,
                                           {$splice: [[i, 1]]})});
            }
        }
    }

    /**
     * Distribute a delta (integer value) to n items based on
     * the size (width) of the items thumbnails.
     */
    calculateCutOff (len, delta, items) {
        // resulting distribution
        var cutoff = [];
        var cutsum = 0;

        // distribute the delta based on the proportion of
        // thumbnail size to length of all thumbnails.
        for(var i in items) {
            var item = items[i];
            var fractOfLen = item.scaletwidth / len;
            cutoff[i] = Math.floor(fractOfLen * delta);
            cutsum += cutoff[i];
        }

        // still more pixel to distribute because of decimal
        // fractions that were omitted.
        var stillToCutOff = delta - cutsum;
        while(stillToCutOff > 0) {
            for(i in cutoff) {
                // distribute pixels evenly until done
                cutoff[i]++;
                cutsum++; //debug
                stillToCutOff--;
                if (stillToCutOff < 0) break;
            }
        }
        return cutoff;
    }

    /**
     * Takes images from the items array (removes them) as
     * long as they fit into a width of maxwidth pixels.
     */
    buildImageRow (items) {
        var row = [];
        var len = 0;

        // left and right margin = 2x props.margin
        var imgMargin = 2 * this.props.margin;

        // Build a row of images until longer than maxwidth
        while(items.length > 0 && len < this.state.containerWidth) {
            var item = items.shift();
            row.push(item);
            len += (item.scaletwidth + imgMargin);
        }

        // calculate by how many pixels too long...
        var delta = len - this.state.containerWidth;

        // if the line is too long, make images smaller
        if(row.length > 0 && delta > 0) {

            // calculate the distribution to each image in the row
            var cutoff = this.calculateCutOff(len, delta, row);

            for(var i in row) {
                var pixelsToRemove = cutoff[i];
                item = row[i];

                // move the left border inwards by half the pixels
                item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));

                // shrink the width of the image by pixelsToRemove
                item.vwidth = item.scaletwidth - pixelsToRemove;
            }
        }
        else {
            // all images fit in the row, set vx and vwidth
            for(var i in row) {
                item = row[i];
                item.marginLeft = 0;
                item.vwidth = item.scaletwidth;
            }
        }
        return row;
    }

    /**
     * Scales thumbnails to match props.rowHeight
     */
    scaleThumbs (items) {
        for (var i in items) {
            items[i].scaletwidth =
                Math.floor(this.props.rowHeight *
                           (items[i].twidth / items[i].theight));
        }
        return items;
    }

    /**
     * Builds images and packs them in rows
     */
    renderGallery () {
        if (!this.props.images) return;
        if (this.state.containerWidth == 0) return;

        // Calculate new thumbnail size to match this.props.rowHeight
        var items = this.scaleThumbs(this.props.images.slice());

        // calculate rows of images
        var images = [];
        var rows = [];
        while(items.length > 0) {
            rows.push(this.buildImageRow(items));
        }

        var idx = 0;
        for(var r in rows) {
            for(var i in rows[r]) {
                var item = rows[r][i];
                // create image
                images.push(
                        <Image
                    key={"Image-"+idx}
                    item={item}
                    index={idx}
                    margin={this.props.margin}
                    height={this.props.rowHeight}
                    onClick={this.openLightbox}
                    onToggleSelected={this.onToggleSelected}/>
                );
                idx++;
            }
        }
        return images;
    }

    render () {
        return (
                <div id="Gallery">
                {this.renderGallery()}
                <Lightbox
            currentImage={this.state.currentImage}
            images={this.props.images}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClickImage={this.handleClickImage}
            onClose={this.closeLightbox}
            theme={this.props.theme}
                />
                </div>
        );
    }
};

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
    images: PropTypes.array,
    selectedImages: PropTypes.array,
    rowHeight: PropTypes.number,
    margin: PropTypes.number // margin size for each image
};
Gallery.defaultProps = {selectedImages: [],
                        rowHeight: 120,
                        margin: 2};

module.exports = Gallery;
