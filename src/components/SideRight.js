import React from 'react';
import imgSide0 from '../assets/images/sidebar/icon-0.jpg';
import imgSide1 from '../assets/images/sidebar/icon-1.jpg';
import imgSide2 from '../assets/images/sidebar/icon-2.jpg';
import imgSide3 from '../assets/images/sidebar/icon-3.jpg';

const sideButtonArr = [
	{key:'soulMode', label:'Button 1', icon:imgSide0},
	{key:'btn1', label:'Button 2', icon:imgSide1},
	{key:'btn2', label:'Button 3', icon:imgSide2},
	{key:'btn3', label:'Button 4', icon:imgSide3},
]

export default class SideRightComponent extends React.Component {
	constructor(props) {
		super(props);
		const {sideRight, gameMode, soulMode} = props;
		this.state = {sideRight, gameMode, soulMode, hideSide0:true, hideSide1:true, hideSide2:true, hideSide3:true};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		['sideRight', 'gameMode', 'soulMode'].forEach(key => { 
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
					if (key==='sideRight') this.showSideIcons(this.state.sideRight);
				});
			}
		});
	}

	showSideIcons = (value) => {
		for (let i = 0; i < 4; i++) {
			setTimeout(() => { this.setState({['hideSide'+i]:!value}); }, 200 * i);
		}
	}

	onClickBtn = (btnKey) => {
		const {gameMode, soulMode} = this.state;
		if (btnKey==='soulMode') {
			if (!gameMode) return;
			this.props.setSoulMode(!soulMode);
		}
	}

	render() {
		const {sideRight} = this.state;
		return (
			<div className={`side-right flex`}>
				{sideButtonArr.map((btn, idx)=>
					<div className={`side-button flex ${this.state[btn.key]?'trans':''} ${this.state['hideSide'+idx]?'hide':''}`} key={idx} onClick={e=>this.onClickBtn(btn.key)}>
						<img src={btn.icon}></img>
					</div>
				)}
			</div>
		);
	}
}
