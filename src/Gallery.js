import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import CheckButton from './CheckButton.js';

class Gallery extends Component {
    constructor () {
        super();

        this.state = {
            lightboxIsOpen: false,
            thumbHover: null,
            selectedImages: [],
            currentImage: 0,
            containerWidth: 0
        };

        this.handleResize = this.handleResize.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.handleClickImage = this.handleClickImage.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.visibility = this.visibility.bind(this);
    }

    componentDidMount () {
        this.setState(
            {containerWidth:
             Math.floor(ReactDOM.findDOMNode(this).clientWidth)});
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(){
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

    onSelect (idx, isSelected) {
        if(isSelected){
            if(this.state.selectedImages.indexOf(idx) === -1){
                this.setState({selectedImages:
                               this.state.selectedImages.concat([idx])});
            }
        }
        else {
            var i = this.state.selectedImages.indexOf(idx);
            if(i > -1){
                this.setState({selectedImages:
                               this.state.selectedImages.splice(i,1)});
            }
        }
    }

    onMouseEnter (idx) {
        this.setState({
            thumbHover: idx
        });
    }

    onMouseLeave (idx) {
        this.setState({
            thumbHover: null
        });
    }

    visibility (idx) {
        if (this.state.thumbHover == idx)
            return 'visible';
        return 'hidden';
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
                item.vx = Math.floor(pixelsToRemove / 2);

                // shrink the width of the image by pixelsToRemove
                item.vwidth = item.scaletwidth - pixelsToRemove;
            }
        }
        else {
            // all images fit in the row, set vx and vwidth
            for(var i in row) {
                item = row[i];
                item.vx = 0;
                item.vwidth = item.scaletwidth;
            }
        }
        return row;
    }

    /**
     * Creates a new thumbnail in the image area. An attaches a fade in animation
     * to the image.
     */
    createImageElement (item, idx) {

        return (<div className="imageContainer"
                key={"imageOuter-"+idx}
                onMouseEnter={this.onMouseEnter.bind(this, idx)}
                onMouseLeave={this.onMouseLeave.bind(this, idx)}
                style={{
                    margin: ""+this.props.margin+"px",
                    WebkitUserSelect: "none",
                    position: "relative",
                    float: "left",
                    padding: "0px"}}>
                <div style={{width: ""+item.vwidth+"px",
                             height: this.props.rowHeight,
                             overflow: "hidden"}}
                key={"imageInner-"+idx}>


                <div className="tile-icon-bar"
                style={{opacity: 1,
                        position: "absolute",
                        height: "36px",
                        width: "100%",
                        background: "transparent linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent) repeat scroll 0% 0%"
                       }}>

                <CheckButton key="Select"
                onClick={this.onSelect.bind(this, idx)}
                visibility={this.visibility(idx)}/>

                </div>



                <a className="viewImageAction"
                key={"viewImage-"+idx}
                onClick={(e) => this.openLightbox(idx, e)}>
                <img src={item.thumbnail} title={item.caption}
                style={{width: ""+item.scaletwidth+"px",
                        height: this.props.rowHeight,
                        marginLeft: ""+(item.vx ? (-item.vx) : 0)+"px",
                        marginTop: "" + 0 + "px"
                       }}
                />
                </a>


                </div>
                </div>
               );
    }

    /**
     * Scales thumbnails to match props.rowHeight
     */
    scaleThumbs (items) {
        for (var i in items) {
            var ratio = (items[i].twidth / items[i].theight);
            items[i].scaletwidth = Math.floor(this.props.rowHeight * ratio);
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
                item.el = this.createImageElement(item, idx);
                images.push(item.el);
                idx++;
            }
        }
        return images;
    }

    render () {
        /*let customControls = [
                <DownloadButton key="Download"
            handler={this.handleDownload.bind(this)} />,
            ];*/

        /* custom controls param goes in lightbox below
         {customControls={customControls} */
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
    rowHeight: PropTypes.number,
    margin: PropTypes.number // margin size for each image
};


module.exports = Gallery;
