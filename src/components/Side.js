import React from 'react';
import { serverUrl, GetLangLabel } from '../data/info';
import imgChevron from '../assets/images/chevron.jpg';
import { transTime } from '../data/info';

export default class SideComponent extends React.Component {
	constructor(props) {
		super(props);
		const {device, pageKey, lan, frontArr, selType, logoCustom, powerArr, logoInfo, catArr, colArr, selCol, selectArr, customArr, labelOther} = props;
		const tab = !device || device === 'iPad', openTab = {color:true, front:tab, option:tab, rear:tab, brake:tab, strap:tab, logo:tab, power:tab, battery:tab, simRear:tab, headlight:tab};
		const selColInfo = colArr.find(item=>item.hex===selCol);
		this.state = {pageKey, lan, selFront:{}, selCol:selColInfo, selOption:{}, frontArr, selType, selSubPart:{}, sizeArr:[], colArr, contArr:[], optionArr:[], customArr, selectArr, catArr, protoArr:[], powerArr, labelOther, logoInfo, openTab, priceTotal:0, logoCustom};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		['lan', 'pageKey', 'selPower', 'selCol', 'logoImg', 'logoCustom', 'logoControl', 'selType', 'labelOther'].forEach(key => { 
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
					this.setTotalPrice();
				});
			}
		});
		const {colArr, selCol, contArr, selSubPart, selectArr, sizeArr, selFront, optionArr, selOption} = this.state;
		if (colArr.length && selCol && selCol.hex !== nextProps.selCol) {
			this.setState({selCol:colArr.find(item=>item.hex===nextProps.selCol)}, () => this.setTotalPrice());
		}
		if (contArr.length && selSubPart.key !== nextProps.selSubPart) {
			const selSubPart = nextProps.selSubPart?selectArr.find(item=>item.key===nextProps.selSubPart):{};
			this.setOptionArr(nextProps.selSubPart, selFront.key);
			this.setState({selSubPart}, () => this.setTotalPrice()); // optionArr, 
		}
		if (sizeArr.length && nextProps.selFront && selFront.key !== nextProps.selFront) {
			const newFront = nextProps.selFront;
			const brakeHide = newFront && newFront.includes('xl');
			const rearHideF = newFront === 'mini' || newFront === 'small' ;
			this.setOptionArr(selSubPart.key, nextProps.selFront);
			this.setState({selFront:sizeArr.find(item=>item.key===nextProps.selFront), brakeHide, rearHideF}, () => this.setTotalPrice());
		}
		if (nextProps.selOption && selOption.key !== nextProps.selOption) { // optionArr.length && 
			const rearHideO = (nextProps.selOption !== 'passenger' && nextProps.selOption !== 'basic');
			const inputLogo = document.getElementById('logoFile'); inputLogo.value = null;
			const newOption = optionArr.length?optionArr.find(item=>item.key===nextProps.selOption):{};
			this.setState({selOption:newOption, rearHideO, logoFile:null}, () => this.setTotalPrice());
		}
	}

	setOptionArr = (selSubPartKey, selFrontKey) => {
		const {contArr} = this.state;
		var optionArr = contArr.filter(item=>{return item.inArr.includes(selFrontKey)});
		if (selSubPartKey==='easyOne') optionArr = [];
		else if (selSubPartKey==='spaceXl') optionArr = contArr.filter(item=>{return ['basic', 'pickUp', 'cargo'].includes(item.key)});
		this.setState({optionArr}, () => {this.setTotalPrice();})
	}

	setOpenTab = (key) => {
		var {openTab} = this.state;
		openTab[key] = !openTab[key];
		this.setState(openTab);
	}

	setTotalPrice = () => {
		const {selSubPart, selCol, selFront, selOption, rearInfo, brakeInfo, logoInfo, rear, brake, rearHideO, rearHideF, brakeHide, logoImg, proto, protoArr, selHeadlight, headlightArr, simRearArr, selSimRear, strapInfo, strap} = this.state;
		var priceTotal = 0;
		if (proto) {
			const selProto = protoArr.find(item=>item.key===proto); priceTotal += parseFloat(selProto.price);
			if (proto==='simplex') {
				if (selHeadlight) {
					const headlightItem = headlightArr.find(item=>item.key===selHeadlight);
					priceTotal += parseFloat(headlightItem.price);
				}
				if (selSimRear) {
					const simRearItem = simRearArr.find(item=>item.key===selSimRear);
					priceTotal += parseFloat(simRearItem.price);
				}
				if (strap) {
					priceTotal += parseFloat(strapInfo.price);
				}
			}
		} else if (selSubPart) priceTotal += parseFloat(selSubPart.price);
		if (selCol)		priceTotal += parseFloat(selCol.price, 10);
		if (selFront)	priceTotal += parseFloat(selFront.price, 10);
		if (selOption && selOption.price) priceTotal += parseFloat(selOption.price, 10);
		if (rearInfo && rear && !rearHideO && !rearHideF) priceTotal += parseFloat(rearInfo.price, 10);
		if (brakeInfo && brake && !brakeHide) priceTotal += parseFloat(brakeInfo.price, 10);
		if (logoInfo && logoImg) priceTotal += parseFloat(logoInfo.price, 10);
		priceTotal = Math.round(priceTotal);
		var rePrice = priceTotal.toString().split("").reverse().join(""), reNormalStr = '';
		for (let i = 0; i < rePrice.length; i++) {
			if (i%3===0 && i!==0) reNormalStr += ','; reNormalStr += rePrice[i];
		}
		this.setState({priceTotal:reNormalStr.split("").reverse().join("")});
	}

	uploadLogoFile = () => {
		const {logoFile} = this.state;
		if (!logoFile) return;
		this.props.setLoading(true);
		const formData = new FormData();
		formData.append("file", logoFile);
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", serverUrl+'./uploadLogoImg.php', true);
		xhttp.onreadystatechange = () => {
			if (this.readyState === 4 && this.status === 200) {
				const res = this.responseText;
				if(res){
					this.props.setLogoImg(res);
				}
				this.props.setLoading(false);
			}
		};
		xhttp.send(formData);
	}

	scrollSideBottom = () => {
		if (!this.state.tooltipInner) return;
		const sideScroll = document.getElementById('sideScroll');
		sideScroll.scroll({ top: sideScroll.scrollHeight, behavior: "smooth"});
	}

	showTooltip = (e, key) => {
		if (!e || !key) {
			this.setState({tooltipInner:false});
			setTimeout(() => { this.setState({tooltip:null}) }, 500);
		} else {
			this.setState({tooltip:{top:e.pageY-30, key}});
			setTimeout(() => { this.setState({tooltipInner:true}) }, 10);
			setTimeout(() => { this.setState({tooltipInner:null}) }, 8000);
			setTimeout(() => { this.setState({tooltip:null}) }, 8500);
		}
	}

	getPrice = (selKey, arrKey) => {
		const selItem = this.state[arrKey].find(item=>item.key===this.state[selKey]);
		return selItem?selItem.price:0;
	}

	getModelLabel = () => {
		const {selSubPart, lan, selType, customArr, selectArr, proto, protoArr} = this.state;
		if (!selSubPart) return '';
		if (proto) {
			const selItem = protoArr.find(item=>item.key===proto);
			return selItem?selItem.label:'';
		} else if (selType==='custom') {
			if 		(selSubPart.key==='easyOne') return 'SWB';
			else if	(selSubPart.key==='easyTwo') return 'MWB';
			else if	(selSubPart.key==='spaceXl') return 'LWB';
		} else {
			return GetLangLabel(selSubPart, lan)
		}
	}

	render() {
		const { lan, colArr, selCol, openTab, catArr, proto, labelOther} = this.state;
		return (
			<div className={`side`}>

				<div className='side-wrapper scroll scroll-y' id='sideScroll'>
					<div className={`part color-part ${openTab.color?'open':''} ${proto==='preme_space'?'hide':''}`}>
						<div className='part-content'>
							<div className='color-wrapper flex'>
								{colArr.map((item, idx) =>
									<div className={`color-item ${selCol&&item.hex===selCol.hex?'active':''}`} style={{backgroundImage:'linear-gradient('+item.description+')'}}
										onClick={()=>{
											if (this.timeTrans || selCol===item.hex) return;
											this.timeTrans = true;
											this.props.setSelCol(item.hex);
											setTimeout(() => { this.timeTrans = false; }, transTime);
										}}
										key={idx}>
									</div>
								) }
							</div>
							<div className='price-line'><label className='left'>{GetLangLabel(selCol, lan) }</label> <label className='right'>{selCol?selCol.price:0} EUR</label></div>
						</div>
					</div>
				</div>
				{/* <div className='side-gap'></div> */}

			</div>
		);
	}
}
