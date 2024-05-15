import React from 'react';

import HeaderComponent from '../../components/Header';
import '../../assets/css/infinity.css';
import imgSideDashboard from '../../assets/images/infinity/side-dashboard.png';
import imgSideAnalytics from '../../assets/images/infinity/side-analytics.png';
import imgSideMetaLabs from '../../assets/images/infinity/side-metalabs.png';
import imgSideSetting from '../../assets/images/infinity/side-setting.png';
import imgCompass from '../../assets/images/infinity/compass.png';
import imgCopy from '../../assets/images/infinity/copy.png';
import imgVote from '../../assets/images/infinity/vote.png';
import imgVoteUn from '../../assets/images/infinity/vote-un.png';

import imgAttach from '../../assets/images/infinity/attach.png';
import imgVoice from '../../assets/images/infinity/voice.png';
import imgSend from '../../assets/images/infinity/send.png';

import imgChannel0 from '../../assets/images/infinity/channel-0.png';
import imgChannel1 from '../../assets/images/infinity/channel-1.png';
import imgChannel2 from '../../assets/images/infinity/channel-2.png';
import imgChannel3 from '../../assets/images/infinity/channel-3.png';
import imgChannel4 from '../../assets/images/infinity/channel-4.png';
import imgChannel5 from '../../assets/images/infinity/channel-5.png';
import imgChannel6 from '../../assets/images/infinity/channel-6.png';
import imgChannel7 from '../../assets/images/infinity/channel-7.png';
import imgChannel8 from '../../assets/images/infinity/channel-8.png';
import imgChannel9 from '../../assets/images/infinity/channel-9.png';
import imgChannel10 from '../../assets/images/infinity/channel-10.png';
import imgChannel11 from '../../assets/images/infinity/channel-11.png';
import imgChannel12 from '../../assets/images/infinity/channel-12.png';
import imgChannel13 from '../../assets/images/infinity/channel-13.png';
import imgChannel14 from '../../assets/images/infinity/channel-14.png';
import imgChannel15 from '../../assets/images/infinity/channel-15.png';
import imgChannel16 from '../../assets/images/infinity/channel-16.png';
import imgChannel17 from '../../assets/images/infinity/channel-17.png';
import imgChannel18 from '../../assets/images/infinity/channel-18.png';
import imgChannel19 from '../../assets/images/infinity/channel-19.png';

import imgGroup0 from '../../assets/images/infinity/group-0.png';
import imgGroup1 from '../../assets/images/infinity/group-1.png';
import imgGroup2 from '../../assets/images/infinity/group-2.png';
import imgGroup3 from '../../assets/images/infinity/group-3.png';
import imgGroup4 from '../../assets/images/infinity/group-4.png';
import imgGroup5 from '../../assets/images/infinity/group-5.png';
import imgGroup6 from '../../assets/images/infinity/group-6.png';
import imgGroup7 from '../../assets/images/infinity/group-7.png';
import imgGroup8 from '../../assets/images/infinity/group-8.png';

import imgAiChatgpt from '../../assets/images/infinity/ai-chatgpt.png';
import imgAiWonder from '../../assets/images/infinity/ai-wonder.png';
import imgAiPhotoleap from '../../assets/images/infinity/ai-photoleap.png';
import imgAiPainting from '../../assets/images/infinity/ai-painting.png';
import imgAiLensa from '../../assets/images/infinity/ai-lensa.png';
import imgAiMeta from '../../assets/images/infinity/ai-meta.png';
import imgAiGeneral from '../../assets/images/infinity/ai-general.png';

const aiSource = [
	{key:'chatgpt', label:'ChatGPT', icon:imgAiChatgpt},
	{key:'wonder', label:'Wonder', icon:imgAiWonder},
	{key:'photoleap', label:'Photoleap', icon:imgAiPhotoleap},
	{key:'painting', label:'AI Painting', icon:imgAiPainting},
	{key:'lensa', label:'Lensa AI', icon:imgAiLensa},
	{key:'meta', label:'Meta', icon:imgAiMeta},
	{key:'general', label:'General AI', icon:imgAiGeneral},
]

const channelSource = [
	{key:'channel0', icon:imgChannel0, aiArr:GetRandomAIArr(), label:'Crypto and Currency'},
	{key:'channel1', icon:imgChannel1, aiArr:GetRandomAIArr(), label:'CryptoCurrency'},
	{key:'channel2', icon:imgChannel2, aiArr:GetRandomAIArr(), label:'Meetings'},
	{key:'channel3', icon:imgChannel3, aiArr:GetRandomAIArr(), label:'Meetings Discussion'},
	{key:'channel4', icon:imgChannel4, aiArr:GetRandomAIArr(), label:'Webinar Session'},
	{key:'channel5', icon:imgChannel5, aiArr:GetRandomAIArr(), label:'Hakunama tata'},
	{key:'channel6', icon:imgChannel6, aiArr:GetRandomAIArr(), label:'Currency and Cryto'},
	{key:'channel7', icon:imgChannel7, aiArr:GetRandomAIArr(), label:'CurrencyCrypto'},
	{key:'channel8', icon:imgChannel8, aiArr:GetRandomAIArr(), label:'Disucssion Meeting'},
	{key:'channel9', icon:imgChannel9, aiArr:GetRandomAIArr(), label:'Session Webinar'},
	{key:'channel10', icon:imgChannel10, aiArr:GetRandomAIArr(), label:'Crypto and Currency'},
	{key:'channel11', icon:imgChannel11, aiArr:GetRandomAIArr(), label:'CryptoCurrency'},
	{key:'channel12', icon:imgChannel12, aiArr:GetRandomAIArr(), label:'Meetings'},
	{key:'channel13', icon:imgChannel13, aiArr:GetRandomAIArr(), label:'Meetings Discussion'},
	{key:'channel14', icon:imgChannel14, aiArr:GetRandomAIArr(), label:'Webinar Session'},
	{key:'channel15', icon:imgChannel15, aiArr:GetRandomAIArr(), label:'Hakunama tata'},
	{key:'channel16', icon:imgChannel16, aiArr:GetRandomAIArr(), label:'Currency and Cryto'},
	{key:'channel17', icon:imgChannel17, aiArr:GetRandomAIArr(), label:'CurrencyCrypto'},
	{key:'channel18', icon:imgChannel18, aiArr:GetRandomAIArr(), label:'Disucssion Meeting'},
	{key:'channel19', icon:imgChannel19, aiArr:GetRandomAIArr(), label:'Session Webinar'},
]

const groupArr = [
	{key:'group0', icon:imgGroup0, channelArr:GetRandomChannelArr(), label:'Agriculture'},
	{key:'group1', icon:imgGroup1, channelArr:GetRandomChannelArr(), label:'Social Sciences'},
	{key:'group2', icon:imgGroup2, channelArr:GetRandomChannelArr(), label:'Construction'},
	{key:'group3', icon:imgGroup3, channelArr:GetRandomChannelArr(), label:'Corporate'},
	{key:'group4', icon:imgGroup4, channelArr:GetRandomChannelArr(), label:'Education'},
	{key:'group5', icon:imgGroup5, channelArr:GetRandomChannelArr(), label:'Banking & Finance'},
	{key:'group6', icon:imgGroup6, channelArr:GetRandomChannelArr(), label:'Health & Medical'},
	{key:'group7', icon:imgGroup7, channelArr:GetRandomChannelArr(), label:'Manufacturing'},
	{key:'group8', icon:imgGroup8, channelArr:GetRandomChannelArr(), label:'Entertainment'},
]

const sideFunctionArr = [
	{key:'dashboard', label:'Dashboard', icon:imgSideDashboard},
	{key:'analytics', label:'Analytics', icon:imgSideAnalytics},
	{key:'metalabs', label:'Meta Labs', icon:imgSideMetaLabs},
	{key:'setting', label:'Setting', icon:imgSideSetting},
]

function GetRandomAIArr() {
	const aiArr = [];
	aiSource.forEach(item => {
		if (Math.random() > 0.3) aiArr.push({...item});
	});
	return aiArr;
}

function GetRandomChannelArr() {
	const channelArr = [];
	channelSource.forEach(channel => {
		if (Math.random() < 0.5) channelArr.push({...channel});
	});
	return channelArr;
}

const {origin} = window.location;

const contentStr = [
	'onClickChannelItem = (channelKey) => {',
		'const {selGroup} = this.state,',
			'{channelArr} = groupArr.find(group=>group.key===selGroup),',
			'{aiArr} = channelArr.find(channel=>channel.key===channelKey);',
		'this.setState({selChannel:channelKey, aiArr});',
	'}',

	'onClickMainLogo = () => {',
		'window.location.href = origin',
	'}',

	'setSelGroup = (groupKey) => {',
		'const {channelArr} = groupArr.find(group=>group.key===groupKey), channelItem = channelArr[0];',
		'this.setState({selGroup:groupKey, channelArr, selChannel:channelItem.key, aiArr:channelItem.aiArr});',
	'}',

	'getGroupName = () => {',
		'const selGroupItem = groupArr.find(group=>group.key===this.state.selGroup);',
		'return selGroupItem.label;',
	'}'
]

const contentHeadArr = [
	{key:'html', label:'HTML'},
	{key:'css', label:'CSS'},
	{key:'js', label:'JS'},
]

const voteBtnArr = [
	{key:'vote', icon:imgVote},
	{key:'unVote', icon:imgVoteUn},
	{key:'copy', icon:imgCopy},
]
export default class InfinityComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		const channelArr = [...groupArr[0].channelArr];
		this.state = {strMsg:'', selAiKey:'', channelArr, selGroup:groupArr[0].key, selChannel:channelArr[0].key, aiArr:channelArr[0].aiArr, selHeader:contentHeadArr[2].key, pageKey};
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

	onClickChannelItem = (channelKey) => {
		const {selGroup} = this.state,
			{channelArr} = groupArr.find(group=>group.key===selGroup),
			{aiArr} = channelArr.find(channel=>channel.key===channelKey);
		this.setState({selChannel:channelKey, aiArr});
	}

	onClickMainLogo = () => {
		window.location.href = origin
	}

	setSelGroup = (groupKey) => {
		const {channelArr} = groupArr.find(group=>group.key===groupKey), channelItem = channelArr[0];
		this.setState({selGroup:groupKey, channelArr, selChannel:channelItem.key, aiArr:channelItem.aiArr});
	}

	getGroupName = () => {
		const selGroupItem = groupArr.find(group=>group.key===this.state.selGroup);
		return selGroupItem.label;
	}

	getChannelName = () => {
		const {selGroup, selChannel} = this.state,
			{channelArr} = groupArr.find(group=>group.key===selGroup),
			channelItem = channelArr.find(channel=>channel.key===selChannel);
		return channelItem.label;
	}

	onClickHeaderItem = (headerKey) => {
		this.setState({selHeader:headerKey});
	}

	render() {
		const {strMsg, selGroup, selChannel, channelArr, aiArr, selHeader, pageKey} = this.state;
		
		return (
			<div className={`page-wrapper infinity-wrapper flex ${pageKey==='infinity'?'active':''}`}>
				<HeaderComponent
					pageName={'infinity'}
					setPageKey={this.props.setPageKey}
				></HeaderComponent>
				<div className='page-content infinity'>
					<div className='group-bar scroll scroll-y'>
						{groupArr.map((group, idx) =>
							<div className={`group-item hover-scale flex ${group.key===selGroup?'active':''}`} onClick={e=>this.setSelGroup(group.key)} key={idx}>
								<img src={group.icon}></img>
							</div>
						)}
						<div className={`group-item hover-scale add-group flex`}>
							{/* onClick={e=>this.setSelGroup(group.key)} key={idx} */}
							<label>+</label>
						</div>
						<div className={`group-item hover-scale add-group flex`}>
							{/* onClick={e=>this.setSelGroup(group.key)} key={idx} */}
							<img src={imgCompass}></img>
						</div>


					</div>
					<div className='side-left'>
						<div className='side-header flex-row'>
							<div className='title'>{this.getGroupName()}</div>
						</div>
						<div className='side-function'>
							{sideFunctionArr.map((item, idx)=>
								<div className='function-item hover-scale' key={idx}>
									<div className='function-icon'><img src={item.icon}></img></div>
									<div className='function-label'>{item.label}</div>
								</div>
							)}
						</div>
						<div className='side-list scroll scroll-y'>
							{channelArr.map((item, idx)=>
								<div className={`channel-item flex-row hover-scale ${selChannel===item.key?'active':''}`} onClick={e=>this.onClickChannelItem(item.key)} key={idx}>
									<img src={item.icon}></img>
									<div className='channel-name'>{item.label}</div>
								</div>
							)}
						</div>
					</div>
					<div className='content'>
						<div className='content-wrapper'>
							<div className='content-inner'>
								<div className='content-header'>
									<div className='header-left flex-row'>
										{contentHeadArr.map((item, idx) =>
											<div className={`header-label ${selHeader===item.key?'active':''}`} onClick={e=>this.onClickHeaderItem(item.key)} key={idx}>{item.label}</div>
										)}
									</div>
									<div className='header-middle'></div>
									<div className='header-right flex-row'>
										<div className='icon-wrapper'>
											<img src={imgCopy}></img>
										</div>
										<div className='label '>Copy code</div>
									</div>
								</div>
								<div className='main-content'>
									{contentStr.map((str, idx) =>
										<div className='content-str' key={idx}>{str}</div>
									)}
								</div>
							</div>
							<div className='comment'>
								<div className='comment-line'>Note: This is just an example of a simple HTML form.</div>
								<div className='comment-line'>Ina real-world scenario, you would also want to include proper validation</div>
								<div className='comment-line'>and handling of the form data on the server side</div>
							</div>
						</div>
						<div className='button-row'>
							{voteBtnArr.map((item, idx) => 
								<div className='icon-wrapper hover-scale' key={idx}>
									<img src={item.icon}></img>
								</div>
							)}
							
						</div>
						<div className='chat-footer flex-row'>
							<div className='icon-wrapper'><img src={imgAttach}></img></div>
							<div className='icon-wrapper'><img src={imgVoice}></img></div>
							<input value={strMsg} onChange={e=>this.onChangeStrMsg(e)}></input>
							<div className='icon-wrapper'><img src={imgSend}></img></div>
						</div>
						
					</div>
					<div className='side-right'>
						<div className='side-header flex'>
							<div className='sub-title'>AI list of {this.getChannelName()}</div>
						</div>
						<div className='list-wrapper scroll scroll-y'>
							{aiArr.map((ai, idx) =>
								<div className='ai-item hover-scale' key={idx}>
									<img className='ai-icon' src={ai.icon}></img>
									<label>{ai.label}</label>
								</div>
							)}
						</div>

					</div>
				</div>
			</div>
		);
	}
}
