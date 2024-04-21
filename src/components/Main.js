import React from 'react';
// import CanvasComponent from './Canvas';

import '../assets/css/index.css';
import CanvasComponent from './Canvas';
// import SideComponent from './Side';
import { colorInfo } from '../data/constant';
import LoadingComponent from './Loading';

function getWSize(wWidth, wHeight) {
	var width = wWidth, height = wHeight;
	return {width, height};
}

const testUI = false;

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		colorInfo.forEach(item => {
			item.str = '#'+item.piece;
			item.hex = parseInt(item.piece, 16);
			item.key = item.name;
		});
		this.state = {loading:true, loadPro:0, pageKey:'canvas', wSize:getWSize(window.innerWidth, window.innerHeight), colArr:colorInfo};
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

	render() {
		const {loading, loadPro, pageKey, wSize, colArr} = this.state;
		return (
			<div className={`page-wrapper small-scale`}>
				<CanvasComponent
					pageKey={pageKey}
					wSize={wSize}
					colArr={colArr}
					testUI={testUI}
					setLoading={loading=>this.setState({loading})}
					setLoadPro={loadPro=>this.setState({loadPro})}
				></CanvasComponent>
				<LoadingComponent
					loading={loading}
					loadPro={loadPro}
				></LoadingComponent>
			</div>
		);
	}
}
