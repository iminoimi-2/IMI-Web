import React from 'react';
// import CanvasComponent from './Canvas';

import '../../assets/css/world.css';
import CanvasComponent from './Canvas';
// import SideComponent from './Side';
import LoadingComponent from './Loading';
import imgLogo from '../../assets/images/logo.png';
import ModalComponent from './Modal';
import mp3BackSound from '../../assets/sound/back-sound.mp3';
import SideRightComponent from './SideRight';
import { onePageMode } from '../../data/constant';

function getWSize(wWidth, wHeight) {
	var width = wWidth, height = wHeight;
	return {width, height};
}

export const testUI = false, testSoul = false;

export default class WorldComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		this.state = {loading:true, loadPro:0, pageKey, wSize:getWSize(window.innerWidth, window.innerHeight), gameMode:false, modalKey:false, modalInner:false, sideRight:false, soulMode:testSoul, sceneTrans:false};
	}

	componentDidMount() {
		if (testUI) {
			for (let i = 0; i <= 100; i++) {
				setTimeout(() => {
					this.setState({loadPro:i});
					if (i===100) this.setState({loading:false});
				}, 10 * i);
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		['pageKey'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, e=> {
				})
			}
		});
	}

	openModal = (modalKey) => {
		this.setState({modalKey}, ()=>this.setState({modalInner:true}));
	}

	gotoHome = () => {
		if (onePageMode) {
			this.props.setPageKey('home');
		} else {
			const {origin} = window.location;
			window.location.href = origin;
		}
	}

	render() {
		const {loading, loadPro, wSize, gameMode, modalKey, modalInner, sideRight, soulMode, sceneTrans, pageKey} = this.state;
		return (
			<div className={`page-wrapper world-wrapper ${pageKey==='world'?'active':''}`}>
				<CanvasComponent
					wSize={wSize}
					gameMode={gameMode}
					soulMode={soulMode}
					testUI={testUI}
					pageKey={pageKey}
					setLoading={loading=>this.setState({loading})}
					setLoadPro={loadPro=>this.setState({loadPro})}
					openModal={modalKey=>this.openModal(modalKey)}
					showSideRight={sideRight=>this.setState({sideRight})}
					setSceneTrans={sceneTrans=>this.setState({sceneTrans})}
				></CanvasComponent>
				<SideRightComponent
					sideRight={sideRight}
					gameMode={gameMode}
					soulMode={soulMode}
					setSoulMode={soulMode=>{
						if (sceneTrans) return;
						this.setState({soulMode})
					}}
				></SideRightComponent>
				<ModalComponent
					modalKey={modalKey}
					modalInner={modalInner}
					closeModal={e=>{
						this.setState({modalInner:false});
						setTimeout(() => {
							this.setState({modalKey:false})
						}, 500);
					} }
				></ModalComponent>
				<LoadingComponent
					gameMode={gameMode}
					loading={loading}
					loadPro={loadPro}
					sideRight={sideRight}
					setGameMode={gameMode=>this.setState({gameMode})}
					showSideRight={sideRight=>this.setState({sideRight})}
				></LoadingComponent>

				{!testSoul && <audio id='mp3BackSound' autoPlay loop>
					<source src={mp3BackSound} type="audio/mpeg"></source>
				</audio> }
				<div className='main-logo canvas-logo flex' onClick={e=>this.gotoHome()}>
					<img src={imgLogo}></img>
				</div>
			</div>
		);
	}
}
