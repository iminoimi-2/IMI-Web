import React from 'react';
import imgClose from '../assets/images/close.png';
import imgModalIcon0 from '../assets/images/modal/icon-0.jpg';
import imgModalIcon1 from '../assets/images/modal/icon-1.jpg';
import imgModalIcon2 from '../assets/images/modal/icon-2.jpg';
import imgModalIcon3 from '../assets/images/modal/icon-3.jpg';
import imgModalIcon4 from '../assets/images/modal/icon-4.jpg';
import imgModalIcon5 from '../assets/images/modal/icon-5.jpg';
import imgModalIcon6 from '../assets/images/modal/icon-6.jpg';
import imgModalIcon7 from '../assets/images/modal/icon-7.jpg';

const modalInfo = [
	[
		{key:'icon0', icon:imgModalIcon0},
		{key:'icon1', icon:imgModalIcon1},
		{key:'icon2', icon:imgModalIcon2},
		{key:'icon3', icon:imgModalIcon3},
	],
	[
		{key:'icon4', icon:imgModalIcon4},
		{key:'icon5', icon:imgModalIcon5},
		{key:'icon6', icon:imgModalIcon6},
		{key:'icon7', icon:imgModalIcon7},
	],
]

export default class ModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const {modalKey, modalInner} = props;
		this.state = {modalKey, modalInner, selObj:false };
	}

	componendividMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		['modalKey', 'modalInner'].forEach(stateKey => {
			if (this.state[stateKey] !== nextProps[stateKey]) {
				this.setState({[stateKey]:nextProps[stateKey]});
				this.setState({selObj:false});
			}
		});
	}

	render() {
		const {modalKey, modalInner, selObj} = this.state;
		return (
			<div className={`modal-back ${modalKey?'active':''}`}>
				<div className='modal-outer'>
					<div className={`modal-wrapper ${modalInner?'active':''}`}>
						<div className='modal-title'>Select Object</div>
						<div className='modal-content flex'>
							{modalInfo.map((row, rIdx)=>
								<div className='modal-row flex-row' key={rIdx}>
									{row.map((item, idx)=>
										<div className={`modal-item flex ${selObj===item.key?'active':''}`} key={idx} onClick={e=>{this.setState({selObj:item.key}) }}>
											<div className='img-wrapper flex'>
												<img className='modal-icon' src={item.icon}></img>
											</div>
										</div>
									)}
								</div>
							)}
							<div className='btn-submit flex' onClick={e=>this.props.closeModal()}>Select</div>
						</div>
						<div className='close-icon flex' onClick={()=>this.props.closeModal()}>
							<img src={imgClose}></img>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
