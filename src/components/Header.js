import React from 'react';

import '../assets/css/header.css';
import imgLogoWelcome from '../assets/images/welcome/welcome-logo.png';
import imgAvatar from '../assets/images/avatar.png';
import imgSearch from '../assets/images/search-white.png';
import imgSearch0 from '../assets/images/search-list/icon-0.png';
import imgSearch1 from '../assets/images/search-list/icon-1.png';
import imgSearch2 from '../assets/images/search-list/icon-2.png';
import { onePageMode } from '../data/constant';

const menuSource = [
	// {key:'home', img:imgLogoWelcome},
	{key:'infinity', label:'InfinityLink'},
	{key:'store', label:'IMI Store'},
	// {key:'world', label:'IMI World', contour:true},
],
sideMenuSource = [
	{key:'mission', label:'Mission'},
	{key:'community”', label:'Community”'},
	{key:'collaboration', label:'Collaboration'},
];

const searchArr = [
	{key:'search0', title:'User 1', des:'description 1', icon:imgSearch0, label:'2.43ETH'},
	{key:'search1', title:'User 2', des:'description 2', icon:imgSearch1, label:'2.36ETH'},
	{key:'search2', title:'User 3', des:'description 3', icon:imgSearch2, label:'2.67ETH'},
	{key:'search3', title:'User 4', des:'description 4', icon:imgSearch0, label:'2.25ETH'},
	{key:'search4', title:'User 5', des:'description 5', icon:imgSearch1, label:'2.88ETH'},
]

const {origin} = window.location;

export default class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {strSearch:'', searchList:false};
	}

	componentDidMount() {
	}

	onClickLogo = () => {
		const logoPageKey = this.props.pageName==='infinity'?'home':'world'
		if (onePageMode) {
			this.props.setPageKey(logoPageKey);
		} else {
			window.location.href = origin+'/world';
		}
		
	}

	onChangeSearch = (e) => {
		const str = e.target.value;
		this.setState({strSearch:str});
	}

	showSearchList = (val) => {
		this.setState({searchList:val});
	}

	onClickMenu = (menuKey) => {
		if (menuKey === 'infinity') {
			if (onePageMode) {
				this.props.setPageKey('infinity');
			} else {
				window.location.href = origin+'/' + menuKey;
			}
		}
	}

	render() {
		const {strSearch, searchList} = this.state;
		return (
			<div className='header flex-row'>
				<div className='main-logo flex' onClick={e=>this.onClickLogo()}>
					<img src={imgLogoWelcome}></img>
				</div>

				{/* <div className='menu-item'>
					<div className={`menu-item`} onClick={e=>{}}>Iminoimi</div>
				</div> */}
				<div className='menu-wrapper flex-row'>
					{menuSource.map((menu, idx)=>
						<div className={`menu-item ${menu.contour?'contour':''} ${menu.img?'menu-img':'menu-label'}`} key={idx} onClick={e=>this.onClickMenu(menu.key)}>
							{menu.img&&<img src={menu.img}></img>}
							{!menu.img && menu.label}
						</div>
					)}
				</div>
				<div className='header-search'
					onMouseOver={e=>this.showSearchList(true)}
					onMouseOut={e=>this.showSearchList(false)}
				>
					<img className='search-icon' src={imgSearch}></img>
					<input value={strSearch} onChange={e=>this.onChangeSearch(e)}
						// onFocus={e=>this.showSearchList(true)}
						// onBlur={e=>this.showSearchList(false)}
					></input>
					<div className={`search-list flex ${searchList?'active':''}`}>
						{searchArr.map((item, idx) => 
							<div className='search-item hover-scale flex-row' key={idx}>
								<div className='user-icon flex'><img src={item.icon}></img></div>
								<div className='main-info'>
									<div className='main-title'>{item.title}</div>
									<div className='description'>{item.des}</div>
								</div>
								<div className='sub-info'>{item.label}</div>
							</div>
						)}
					</div>
				</div>
				<div className='header-right flex-row'>
					<img className='profile-icon hover-scale' src={imgAvatar}></img>
					<div className='line-menu flex'>
						<div className='line-wrapper flex'>
							<div className='line'></div>
							<div className='line'></div>
							<div className='line'></div>
						</div>
						<div className='menu-content flex'>
							{sideMenuSource.map((menu, idx)=>
								<div className={`menu-item hover-scale`} key={idx} onClick={e=>this.onClickMenu(menu.key)}>
									{menu.label}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
