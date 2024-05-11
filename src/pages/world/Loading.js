import React from 'react';
import imgBackLoading from '../../assets/images/back-loading.jpg';
import videoTitle from '../../assets/video/title.mp4';
import imgSubTitle from '../../assets/images/sub-title-logo.png';
import { testSoul } from './World';

export default class LoadingComponent extends React.Component {
	constructor(props) {
		super(props);
		const {loading, loadPro} = props;
		this.state = {loading, loadPro, gameMode:false, hideSide0:true, hideSide1:true, hideSide2:true, hideSide3:true};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		['loading', 'loadPro'].forEach(key => { 
			if (this.state[key] !== nextProps[key]) {
				if (this.state.loading && !nextProps.loading) {
					this.props.showSideRight(true);
					const videoTitle = document.getElementById('videoTitle');
					if (videoTitle) videoTitle.play();
				}
				this.setState({[key]:nextProps[key]}, () => {
				});
			}
		});
	}

	setGameMode = () => {
		this.setState({hideMainTitle:true, hideSideBar:true});
		const mp3BackSound = document.getElementById('mp3BackSound');
		if (mp3BackSound) mp3BackSound.play();
	
		setTimeout(() => { this.setState({gameMode:true}); }, 1200);
		this.props.showSideRight(false);
		setTimeout(() => { this.props.setGameMode(true); }, 1000);
	}

	render() {
		const {loading, loadPro, hideMainTitle, hideSideBar, gameMode} = this.state;
		return (
			<div className={`back-board loading-page ${gameMode?'':'show'} ${loading?'loading':'available'} flex`}>
				<div className={`img-back-loading ${loading?'':'trans'}`} style={{ backgroundImage: `url(${imgBackLoading})` }}></div>
				<div className={`loading-trans-board ${loading?'':'ready'} ${hideSideBar?'trans':''}`}></div>
				{loading &&
					<div className='loading-bar-outer'>
						<div className='loading-bar-wrapper'>
							<div className='loading-box'></div>
							<div className='loading-bar' style={{width:loadPro+'%'}}></div>
						</div>
					</div>
				}
				<div className={`main-title ${hideMainTitle?'hide':''}`} onClick={e=>this.setGameMode()}>
					{/* <img src={imgLogoTitle}></img> */}
					<div className='title-wrapper'>
						{!testSoul && <video muted autoPlay={false} id='videoTitle'>
							<source src={videoTitle} type="video/mp4"></source>
						</video>}
						<div className='title-mark'></div>
						<img className='sub-title' src={imgSubTitle}></img>
					</div>
				</div>
			</div>
		);
	}
}
