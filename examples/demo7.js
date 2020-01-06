import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from '../src/Gallery';

class ImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render () {
        if (this.state.show) {
            return <img {...this.props.imageProps} />;
        } else {
            return (
                <div
                    style={Object.assign({}, this.props.imageProps.style, { textAlign: 'center' })}
                    onMouseOver={() => this.setState({ show: true })}
                >
                    Hover to show
                </div>
            );
        }
    }
}

class Demo7 extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images
        };
    }

    render () {
        return (
                <div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                <Gallery
            images={this.state.images}
            lightboxWidth={1536}
            thumbnailImageComponent={ImageComponent}
            enableLightbox={true}
            enableImageSelection={false}
                />
                </div>
        );
    }
}

Demo7.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool
        })
    ).isRequired
};

Demo7.defaultProps = {
    images: shuffleArray([
        {
            src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
            thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
            thumbnailWidth: 240,
            thumbnailHeight: 320,
            caption: "8H (gratisography.com)"
        },
        {
            src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
            thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 190,
            caption: "286H (gratisography.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 148,
            caption: "315H (gratisography.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "201H (gratisography.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            thumbnailWidth: 248,
            thumbnailHeight: 320,
            caption: "Big Ben (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 113,
            caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
            thumbnailWidth: 313,
            thumbnailHeight: 320,
            caption: "Wood Glass (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        }
    ])
};

ReactDOM.render(<Demo7 />, document.getElementById('demo7'));
