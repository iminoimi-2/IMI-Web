import React from 'react';
import imgBackWelcome from '../assets/images/welcome/welcome-back.jpg';
import WelcomeComponent from '../pages/welcome/Welcome';
import WorldComponent from '../pages/world/World';
import InfinityComponent from '../pages/infinity/Infinity';
import StoreComponent from '../pages/store/Store';


export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:'home'};
	}

	componentDidMount() {
	}

	setPageKey = (pageKey) => {
		this.setState({pageKey});
	}

	render() {
		const {pageKey} = this.state;
		return (
			<div>
				<WelcomeComponent
					pageKey={pageKey}
					setPageKey={this.setPageKey}
				></WelcomeComponent>
				<WorldComponent
					pageKey={pageKey}
					setPageKey={this.setPageKey}
				></WorldComponent>
				<InfinityComponent
					pageKey={pageKey}
					setPageKey={this.setPageKey}
				></InfinityComponent>
				<StoreComponent
					pageKey={pageKey}
					setPageKey={this.setPageKey}
				></StoreComponent>
			</div>
		);
	}
}
