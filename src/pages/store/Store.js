import React from 'react';
import jQuery from 'jquery';

import HeaderComponent from '../../components/Header';
import '../../assets/css/store.css';
import imgAvatar from '../../assets/images/store/avatar-circle-white.png';
import imgMarketBack from '../../assets/images/store/back-main.png';
import imgPinkDrop from '../../assets/images/store/drop.png';
import imgLogoWelcome from '../../assets/images/welcome/welcome-logo.png';
import imgClock from '../../assets/images/store/clock.png';
import imgHeart from '../../assets/images/store/heart.png';
import imgCard0 from '../../assets/images/store/card-0.jpg';
import imgCard1 from '../../assets/images/store/card-1.jpg';
import imgCard2 from '../../assets/images/store/card-2.jpg';
import imgCard3 from '../../assets/images/store/card-3.jpg';
import imgCard4 from '../../assets/images/store/card-4.jpg';
import imgCard5 from '../../assets/images/store/card-5.jpg';
import imgCard6 from '../../assets/images/store/card-6.jpg';
import imgCard7 from '../../assets/images/store/card-7.jpg';
import imgCard8 from '../../assets/images/store/card-8.jpg';
import imgCard9 from '../../assets/images/store/card-9.jpg';
import imgCard10 from '../../assets/images/store/card-10.jpg';
import imgCard11 from '../../assets/images/store/card-11.jpg';
import imgSocialFacebook from '../../assets/images/store/social-facebook.png';
import imgSocialTwitter from '../../assets/images/store/social-twitter.png';
import imgSocialInstagram from '../../assets/images/store/social-instagram.png';
import imgSocialYoutube from '../../assets/images/store/social-youtube.png';

const virNameSource = [ 'Russell', 'Adil', 'Seth', 'James', 'Douglas', 'Jasper', 'Caleb', 'Herbert', 'Dale', 'Jerry'],
	hexStrArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
	departArr = ['All', 'Art', 'Photos', 'Games', 'Music', 'Domains', 'Memes', 'Sports', 'Trading cards'];
const imgSocialArr = [imgSocialFacebook, imgSocialTwitter, imgSocialInstagram, imgSocialYoutube];
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
		{key:'card0', title:'Virtual Card 0', des:'description 0', img:imgCard0},
		{key:'card1', title:'Virtual Card 1', des:'description 1', img:imgCard1},
		{key:'card2', title:'Virtual Card 2', des:'description 2', img:imgCard2},
		{key:'card3', title:'Virtual Card 3', des:'description 3', img:imgCard3},
	], [
		{key:'card4', title:'Virtual Card 4', des:'description 4', img:imgCard4},
		{key:'card5', title:'Virtual Card 5', des:'description 5', img:imgCard5},
		{key:'card6', title:'Virtual Card 6', des:'description 6', img:imgCard6},
		{key:'card7', title:'Virtual Card 7', des:'description 7', img:imgCard7},
	], [
		{key:'card8', title:'Virtual Card 8', des:'description 8', img:imgCard8},
		{key:'card9', title:'Virtual Card 9', des:'description 9', img:imgCard9},
		{key:'card10', title:'Virtual Card 10', des:'description 10', img:imgCard10},
		{key:'card11', title:'Virtual Card 11', des:'description 11', img:imgCard11},
	],
]

const {origin} = window.location;

function GetDir() { return Math.random()>0.5?1:-1; }

function GetDropInfo() {
	const ang = Math.random() * Math.PI / 2;
	return {xDelta : Math.sin(ang), yDelta : Math.cos(ang), xDir:GetDir(), yDir:GetDir(), sclDir:GetDir()}
}


function GetRandomPink() {
	return {left:100 + Math.random()*500, top:Math.random()*500, opa:1, scl:1+Math.random()} // Math.random()
}
const dropInfo = [GetDropInfo(), GetDropInfo(), GetDropInfo()];
const pinkInfo = [GetRandomPink(), GetRandomPink(), GetRandomPink()];

export default class StoreComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		const marketValueArr = [];
		[0, 1, 2, 3].forEach(item => {
			marketValueArr.push(GetRandomVal(2000, 4000, 0).toFixed(0));
		});
		this.state = {pageKey, marketValueArr, marketSwitch:false, selDepart:departArr[0]}; // , pink0, pink1, pink2
	}

	componentDidMount() {
		this.animate();
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

	animate = () => {
		requestAnimationFrame(this.animate);
		if (this.state.pageKey!=='store') return;
		pinkInfo.forEach((pink, idx) => {
			const {xDelta, yDelta, xDir, yDir, sclDir} = dropInfo[idx];
			const nextX = pink.left + xDelta * xDir,
				  nextY = pink.top + yDelta * yDir,
				  nextScl = pink.scl + sclDir * 0.002;
			var edgeFlag = false, sclFlag = false;
			if 		(nextX < 100) {dropInfo[idx].xDir = 1; edgeFlag = true;}
			else if (nextX > 600) {dropInfo[idx].xDir =-1; edgeFlag = true;}
			if 		(nextY <  50) {dropInfo[idx].yDir = 1; edgeFlag = true;}
			else if (nextY > 450) {dropInfo[idx].yDir =-1; edgeFlag = true;}
			if 		(nextScl <= 1) {dropInfo[idx].sclDir = 1; sclFlag = true;}
			else if (nextScl >= 2) {dropInfo[idx].sclDir =-1; sclFlag = true;}
			if (edgeFlag) {}
			else {
				pink.left = nextX; pink.top = nextY;
			}
			if (sclFlag) {}
			else {
				pink.scl = nextScl;
			}
			jQuery("#imgPinkDrop"+idx).css({"left": pink.left+"px", "top": pink.top+"px", opacity:0.3+(pink.scl-1)*0.7, transform:'scale('+pink.scl+')'});
		});
	}
	
	render() {
		const {pageKey, marketSwitch, selDepart, opaPinkBack, marketValueArr, pink0, pink1, pink2} = this.state;
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
								<img className='pink-back' src={imgMarketBack} id='imgPinkBack' style={{opacity:opaPinkBack}}></img>

								<img className='pink-drop' src={imgPinkDrop} id='imgPinkDrop0'></img> {/* style={{left:pink0.left, top:pink0.top, opacity:pink0.opa, transform:'scale('+pink0.scl+')'}} */}
								<img className='pink-drop' src={imgPinkDrop} id='imgPinkDrop1'></img>
								<img className='pink-drop' src={imgPinkDrop} id='imgPinkDrop2'></img>
								
								<div className='pink-wrapper flex'>
									<div className='market-frame flex '>
										<div className={`switch-wrapper ${marketSwitch?'active':''}`} onClick={e=>{
											this.setState({marketSwitch:!this.state.marketSwitch})
										}}>
											<div className='switch-inner'></div>
										</div>
										<div className='market-value flex-row'>
											{marketValueArr.map((item, idx) =>
												<div className='title' key={idx}>{item}</div>
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
												<div className='card-title title'>{card.title}</div>
												<div className='card-main'>
													<div className='info-row'>
														<label className='pink'>0.040 ETH </label>
														<label className='white'> 1 of 2</label>
													</div>
													<div className='info-row'>
														<label className='white'>Hightest bid </label>
														<label className='pink'> 0.040 ETH</label>
													</div>
												</div>
												<div className='card-footer flex-row'>
													<img src={imgClock} className='img-time'></img>
													<div className='label-time'>8 hours ago</div>
													<img src={imgHeart} className='img-heart'></img>
													<div className='label-heart'>34</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
						<div className='load-more flex'>
							<div className='btn-load-more flex hover-scale'>Load More</div>
						</div>
						<div className='store-footer'>
							<div className='main-wrapper flex-row'>
								<div className='footer-column logo-column flex-row'>
									<img className='footer-logo' src={imgLogoWelcome}></img>
									<label>Iminoimi</label>
								</div>

								<div className='footer-column label-column'>
									<div className='label-row'>Explore</div>
									<div className='label-row'>Activity</div>
								</div>
								<div className='footer-column label-column'>
									<div className='label-row'>How it works</div>
									<div className='label-row'>Community</div>
								</div>
								<div className='footer-column label-column'>
									<div className='label-row'>Privacy policy</div>
									<div className='label-row'>Terms & Conditions</div>
								</div>
								<div className='footer-column label-column'>
									<div className='label-row'>Follow un in social media</div>
									<div className='label-row'>
										{imgSocialArr.map((item, idx) =>
											<img src={item} key={idx}></img>
										)}
									</div>
								</div>
							</div>
							<div className='copy-right flex'>CopyRight All Rights Reserved 2024</div>
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
