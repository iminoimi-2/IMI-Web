import React from 'react';

export default class LoadingComponent extends React.Component {
	constructor(props) {
		super(props);
		const {loading, loadPro} = props;
		this.state = {loading, loadPro};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		['loading', 'loadPro'].forEach(key => { 
			if (this.state[key] !== nextProps[key]) {
				this.setState({[key]:nextProps[key]}, () => {
				});
			}
		});
	}

	render() {
		const {loading, loadPro} = this.state;
		return (
			<div className={`back-board loading ${loading?'show':''} flex`}>
				<div className='main-title'>IMINOIMI</div>
				<div className='loading-wrapper'>
					<div className='loading-box'></div>
					<div className='loading-bar' style={{width:loadPro+'%'}}></div>
				</div>
				<div className='footer flex'>
					<div className='label'>ISLAND TRAVEL</div>
					<div className='label'>TECH DEMO</div>
				</div>
			</div>
		);
	}
}
