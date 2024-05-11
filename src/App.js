import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/css/index.css';
import WorldComponent from './pages/world/World';
import WelcomeComponent from './pages/welcome/Welcome';
import InfinityComponent from './pages/infinity/Infinity';
import MainComponent from './components/Main';
import { onePageMode } from './data/constant';

// import Scene from './Scene';

class App extends Component {
	// constructor(props) {
	// 	this.state = {pageKey:'home'};
	// }

	// setPageKey = (pageKey) => {
	// 	this.setState({pageKey});
	// }

	render() {
		return (
			<BrowserRouter>
				<Routes>
					{onePageMode &&
						<Route path="/" element={<MainComponent></MainComponent>}></Route>
					}
					{!onePageMode &&
						<>
							<Route index element={<WelcomeComponent></WelcomeComponent>} />
							<Route path="world" element={<WorldComponent></WorldComponent>} />
							<Route path="infinity" element={<InfinityComponent></InfinityComponent>} />
						</>
					}
					

					{/* <Route index element={<WelcomeComponent></WelcomeComponent>} />
					<Route path="world" element={<WorldComponent></WorldComponent>} />
					<Route path="infinity" element={<InfinityComponent></InfinityComponent>} /> */}
				</Routes>
			</BrowserRouter>
		);
	}
}

export default App;
