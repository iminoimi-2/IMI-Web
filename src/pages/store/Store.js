import React from 'react';

import HeaderComponent from '../../components/Header';
import '../../assets/css/store.css';
import imgAvatar from '../../assets/images/store/avatar-circle-white.png';
import imgMarketBack from '../../assets/images/store/pink-back.png';
import imgCard0 from '../../assets/images/welcome/card-0.jpg';
import imgCard1 from '../../assets/images/welcome/card-1.jpg';
import imgCard2 from '../../assets/images/welcome/card-2.jpg';
import imgCard3 from '../../assets/images/welcome/card-3.jpg';
import imgCard4 from '../../assets/images/welcome/card-4.jpg';
import imgCard5 from '../../assets/images/welcome/card-5.jpg';
import imgCard6 from '../../assets/images/welcome/card-6.jpg';
import imgCard7 from '../../assets/images/welcome/card-7.jpg';
import imgCard8 from '../../assets/images/welcome/card-8.png';
import imgCard9 from '../../assets/images/welcome/card-9.jpg';
import imgCard10 from '../../assets/images/welcome/card-10.jpg';

const virNameSource = [ 'Russell', 'Adil', 'Seth', 'James', 'Douglas', 'Jasper', 'Caleb', 'Herbert', 'Dale', 'Jerry'],
	hexStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
	departArr = ['All', 'Art', 'Photos', 'Games', 'Music', 'Domains', 'Memes', 'Sports', 'Trading cards'];
function GetVirtualName() {
	const namelength = virNameSource.length,
		firstNameIdx = Math.floor(Math.random()*namelength),
		lastNameIdx = Math.floor(Math.random()*namelength);
	return virNameSource[firstNameIdx] + ' ' + virNameSource[lastNameIdx];
}

function GetRandomCol() {
	var colStr = '#';
	for (let i = 0; i < 6; i++) {
		colStr += hexStrArr[Math.floor(Math.random()*16)];
	}
	return colStr
}

function GetRandomVal(init = 300, range = 300, digit = 2) {
	const pow = Math.pow(10, digit);
	return init + Math.floor(Math.random() * range * pow)/pow;
}

function GetRandomSeller(iNum, jNum) {
	return {num:3+iNum * 3 + jNum, name:GetVirtualName(), colStr:GetRandomCol(), amount:GetRandomVal().toFixed(2)};
}

const sellersTop = [ ], sellersOther = [];

for (let i = 0; i < 3; i++) {
	sellersOther[i] = [];
	for (let j = 0; j < 3; j++) {
		if (i===0) sellersTop.push(GetRandomSeller(-1, j));
		sellersOther[i].push(GetRandomSeller(i, j));
	}
}

const cardSource = [
	[
		{key:'card0', title:'Card 0', des:'description 0', img:imgCard0},
		{key:'card1', title:'Card 1', des:'description 1', img:imgCard1},
		{key:'card2', title:'Card 2', des:'description 2', img:imgCard2},
		{key:'card3', title:'Card 3', des:'description 3', img:imgCard3},
	], [
		{key:'card4', title:'Card 4', des:'description 4', img:imgCard4},
		{key:'card5', title:'Card 5', des:'description 5', img:imgCard5},
		{key:'card6', title:'Card 6', des:'description 6', img:imgCard6},
		{key:'card7', title:'Card 7', des:'description 7', img:imgCard7},
	], [
		{key:'card8', title:'Card 8', des:'description 8', img:imgCard8},
		{key:'card9', title:'Card 9', des:'description 9', img:imgCard9},
		{key:'card10', title:'Card 10', des:'description 10', img:imgCard10},
		{key:'card11', title:'Card 11', des:'description 11', img:imgCard0},
	],
]

const {origin} = window.location;

export default class StoreComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		this.state = {pageKey, marketSwitch:false, selDepart:departArr[0]};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		['pageKey'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, e=> {
				})
			}
		});
	}

	onClickLogo = () => {
		window.location.href = origin+'/world';
	}

	
	render() {
		const {pageKey, marketSwitch, selDepart} = this.state;
		return (
			<div className={`page-wrapper store-wrapper flex ${pageKey==='store'?'active':''}`}>
				<HeaderComponent
					pageName={'store'}
					setPageKey={this.props.setPageKey}
				></HeaderComponent>
				<div className='page-content store flex'>
					<div className='main-content scroll-hide'>
						<div className='top-sellers'>
							<div className='title'>Top Sellers this month</div>
							<div className='seller-wrapper'>
								<div className='seller-part seller-left'>
									<div className='seller-column'>
										{sellersTop.map((item, idx)=>
											<Seller key={idx} info={item}></Seller>
										)}
									</div>
								</div>
								<div className='seller-part seller-right flex-row'>
									{sellersOther.map((column, cIdx) =>
										<div className='seller-column' key={cIdx}>
											{column.map((item, idx)=>
												<Seller key={idx} info={item}></Seller>
											)}
										</div>

									)}
								</div>
							</div>
						</div>
						
						<div className='market-wrapper flex-row'>
							<div className='market-title'>
								<div className='big-title'>The best</div>
								<div className='big-title'>marketplace, start</div>
								<div className='big-title'>explore right now!</div>
								<div className='title sub-first'>We can help you buy, sell and discover new</div>
								<div className='title'>and rare digital items</div>
							</div>
							<div className='market-modal flex'>
								<div className='pink-wrapper flex'>
									<div className='market-frame flex '>
										<div className={`switch-wrapper ${marketSwitch?'active':''}`} onClick={e=>{
											this.setState({marketSwitch:!this.state.marketSwitch})
										}}>
											<div className='switch-inner'></div>
										</div>
										<div className='market-value flex-row'>
											{[0, 1, 2, 3].map((item, idx) =>
												<div className='title' key={idx}>{GetRandomVal(2000, 4000, 0).toFixed(0)}</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='explore-wrapper'>
							<div className='big-title'>Explore</div>
							<div className='depart-wrapper'>
								{departArr.map((item, idx) => 
									<div className={`depart-item flex ${item===selDepart?'active':''} hover-scale`} key={idx} onClick={e=>this.setState({selDepart:item})}>{item}</div>
								)}
							</div>
						</div>

						<div className='card-sections'>
							{cardSource.map((row, rIdx)=>
								<div className='card-row flex-row' key={rIdx}>
									{row.map((card, cIdx)=>
										<div className='card-wrapper' key={cIdx}>
											<div className='card-image' style={{backgroundImage:`url(${card.img})`}}></div>
											<div className='card-info'>
												<div className='card-main-info flex-row'>
													<div className='user-logo'></div>
													<div className='user-name'>User Name</div>
													<div className='card-time'>2024-03-28</div>
												</div>
												<div className='card-title sub-title'>{card.title}</div>
												<div className='card-sub-info flex-row'>
													<div className='card-des'>{card.des}</div>
													<div className='card-button flex'>Detail View</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Seller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() { }
	componentWillUnmount() { };

	UNSAFE_componentWillReceiveProps(nextProps) {
		[].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => { });
			}
		});
	}

	render() {
		const {num, name, amount, colStr} = this.props.info;

		return (
			<div className='seller hover-scale'>
				<div className='num'>{num+1}</div>
				<div className='avatar' style={{backgroundColor:colStr}}>
					<img src={imgAvatar}></img>
					{/* <div className='avatar-color'></div> */}
				</div>
				<div className='labels'>
					<div className='name'>{name}</div>
					<div className='amount'>{amount} ETH</div>
				</div>
			</div>
		);
	}
}
