import React from 'react';
// import CanvasComponent from './Canvas';

import '../assets/css/index.css';
import CanvasComponent from './Canvas';
// import SideComponent from './Side';
import LoadingComponent from './Loading';
import imgLogo from '../assets/images/logo.png';
import ModalComponent from './Modal';
import mp3BackSound from '../assets/sound/back-sound.mp3';
import SideRightComponent from './SideRight';

function getWSize(wWidth, wHeight) {
	var width = wWidth, height = wHeight;
	return {width, height};
}

export const testUI = false, testSoul = false;

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loading:true, loadPro:0, pageKey:'canvas', wSize:getWSize(window.innerWidth, window.innerHeight), gameMode:false, modalKey:false, modalInner:false, sideRight:false, soulMode:testSoul, sceneTrans:false};
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

	openModal = (modalKey) => {
		this.setState({modalKey}, ()=>this.setState({modalInner:true}));
	}

	render() {
		const {loading, loadPro, pageKey, wSize, gameMode, modalKey, modalInner, sideRight, soulMode, sceneTrans} = this.state;
		return (
			<div className={`page-wrapper small-scale`}>
				<CanvasComponent
					pageKey={pageKey}
					wSize={wSize}
					gameMode={gameMode}
					soulMode={soulMode}
					testUI={testUI}
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
				<div className='main-logo flex'>
					<img src={imgLogo}></img>
				</div>
			</div>
		);
	}
}
