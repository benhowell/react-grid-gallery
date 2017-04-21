import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from '../src/Gallery';


class Demo4 extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			images: this.props.images
		};

	}

	render () {
		var captionStyle = {
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
			maxHeight: '240px',
			overflow: 'auto',
			position: 'absolute',
			bottom: '0',
			width: '100%',
			color: 'white',
			padding: '3px',
			fontSize: '0.8em'
		};

		var imageTitleStyle = {
			fontSize: '1.5em'
		};

		var chipStyle = {
			display: 'inline-block',
			backgroundColor: '#fff',
			height: 'auto',
			lineHeight: 'inherit',
			padding: '2px 2px',
			borderRadius: '2px',
			color: 'black',
			marginRight: '3px'
		};

		var images = this.state.images.map(i => {
			i.customOverlay = (
				<div style={captionStyle}>
					<div style={imageTitleStyle}>
						<span>{i.name}</span>
					</div>
					<div>
						by: {i.artist}
					</div>
					<p>{i.caption}</p>
					<div className="tags">
						{i.tags ? i.tags.map(t => {
							return (<div key={t.value} style={chipStyle}>{t.title}</div>);
						}) : ''}
					</div>
				</div>
			);
			i.tags = [];
			return i;
		});

		return (
			<div style={{
				display: "block",
				minHeight: "1px",
				width: "100%",
				border: "1px solid #ddd",
				overflow: "auto"}}>
				<Gallery
					images={images}
					rowHeight={240}
					enableImageSelection={false}/>
			</div>
		);
	}
}

Demo4.propTypes = {
	images: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			src: React.PropTypes.string.isRequired,
			thumbnail: React.PropTypes.string.isRequired,
			srcset: React.PropTypes.array,
			caption: React.PropTypes.string,
			thumbnailWidth: React.PropTypes.number.isRequired,
			thumbnailHeight: React.PropTypes.number.isRequired
		})
	).isRequired
};

Demo4.defaultProps = {
	images: shuffleArray([
		{
			src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
			thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
			thumbnailWidth: 320,
			thumbnailHeight: 174,
			tags: [{value: "Nature", title: "Nature"}, {value: "Flora", title: "Flora"}],
			name: 'After Rain',
			caption: "After Rain (Jeshu John - designerspics.com)",
			artist: 'Jeshu John'
		},
		{
			src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
			thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
			thumbnailWidth: 240,
			thumbnailHeight: 320,
			tags: [{value: "Nature", title: "Nature"}, {value: "Water", title: "Water"}],
			name: '8H',
			caption: "8H (gratisography.com)",
			artist: 'gratisography.com'
		},
		{
			src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
			thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
			thumbnailWidth: 320,
			thumbnailHeight: 148,
			tags: [{value: "People", title: "People"}],
			name: '315H',
			caption: "315H (gratisography.com)",
			artist: 'gratisography.com'
		}
	])
};

ReactDOM.render(<Demo4 />, document.getElementById('demo4'));
