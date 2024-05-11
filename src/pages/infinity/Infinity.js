import React from 'react';

import '../../assets/css/infinity.css';
import imgAIAvatar from '../../assets/images/infinity/ai-0.png';
import HeaderComponent from '../../components/Header';
import icon0 from '../../assets/images/modal/icon-0.jpg';
import icon1 from '../../assets/images/modal/icon-1.jpg';
import icon2 from '../../assets/images/modal/icon-2.jpg';
import icon3 from '../../assets/images/modal/icon-3.jpg';
import icon4 from '../../assets/images/modal/icon-4.jpg';
import icon5 from '../../assets/images/modal/icon-5.jpg';
import icon6 from '../../assets/images/modal/icon-6.jpg';
import icon7 from '../../assets/images/modal/icon-7.jpg';

const aiList = [
	{key:'ai0', label:'Cancer Detection'},
	{key:'ai1', label:'Romantic Movie'},
	{key:'ai2', label:'Mangaka'},
	{key:'ai3', label:'Software Engineer'},
	{key:'ai4', label:'Cancer Detection'},
	{key:'ai5', label:'Romantic Movie'},
	{key:'ai6', label:'Mangaka'},
	{key:'ai7', label:'Software Engineer'},
]

const groupArr = [
	{key:'group0', label:'Group 1', icon:icon0},
	{key:'group1', label:'Group 2', icon:icon1},
	{key:'group2', label:'Group 3', icon:icon2},
	{key:'group3', label:'Group 4', icon:icon3},
	{key:'group4', label:'Group 5', icon:icon4},
	{key:'group5', label:'Group 6', icon:icon5},
	{key:'group6', label:'Group 7', icon:icon6},
	{key:'group7', label:'Group 8', icon:icon7},
]

const {origin} = window.location;

export default class InfinityComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		this.state = {strMsg:'', selAiKey:'', selGroup:groupArr[0].key, pageKey};
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

	onChangeStrMsg = (e) => {
		const str = e.target.value;
		this.setState({strMsg:str});
	}

	onClickAIItem = (aiKey) => {
		this.setState({selAiKey:aiKey});
	}

	onClickMainLogo = () => {
		window.location.href = origin
	}

	setSelGroup = (groupKey) => {
		this.setState({selGroup:groupKey});
	}

	getGroupName = () => {
		const selGroupItem = groupArr.find(group=>group.key===this.state.selGroup) || {}
		return selGroupItem.label;
	}

	render() {
		const {strMsg, selAiKey, selGroup, pageKey} = this.state;
		return (
			<div className={`page-wrapper infinity-wrapper flex ${pageKey==='infinity'?'active':''}`}>
				<HeaderComponent
					pageName={'infinity'}
					setPageKey={this.props.setPageKey}
				></HeaderComponent>
				<div className='page-content infinity'>
					<div className='group-bar'>
						<div className='title'>Group</div>
						{groupArr.map((group, idx) =>
							<div className={`group-item hover-scale flex ${group.key===selGroup?'active':''}`} onClick={e=>this.setSelGroup(group.key)} key={idx}>
								<img src={group.icon}></img>
							</div>
						)}
					</div>
					<div className='side-left'>
						<div className='side-header flex-row'>
							<div className='title'>AI list of {this.getGroupName()}</div>
						</div>
						<div className='side-list'>
							{aiList.map((item, idx)=>
								<div className={`ai-item flex-row hover-scale ${selAiKey===item.key?'active':''}`} onClick={e=>this.onClickAIItem(item.key)} key={idx}>
									<img src={imgAIAvatar}></img>
									<div className='ai-name'>{item.label}</div>
								</div>
							)}
						</div>
					</div>
					<div className='content'>
						<div className='title'>Conversation with AI</div>
						<div className='chat-content'></div>
						<input value={strMsg} onChange={e=>this.onChangeStrMsg(e)}></input>
					</div>
					<div className='side-right'>
						<div className='side-header flex'>
							<div className='sub-title'>All AI List</div>
						</div>
						<div className='list-wrapper scroll scroll-y'>
							{groupArr.map((group, gIdx) =>
								<div key={gIdx}>
									{aiList.map((item, idx) => 
										<div className='ai-item' key={gIdx + idx}>
											{item.label} of {group.label}
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
