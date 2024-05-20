import React from 'react';
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';

import '../../assets/css/welcome.css';
import imgBackWelcome from '../../assets/images/welcome/welcome-back.jpg';
import fbxButterfly from '../../assets/model/butterfly-0.fbx';
import imgLogoWelcome from '../../assets/images/welcome/welcome-logo.png';
import imgAvatar from '../../assets/images/avatar.png';
import imgSearch from '../../assets/images/search-white.png';
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
import HeaderComponent from '../../components/Header';

const sectionSource = [
	[
		{key:'card0', title:'Card 0', des:'description 0', img:imgCard0},
		{key:'card1', title:'Card 1', des:'description 1', img:imgCard1},
		{key:'card2', title:'Card 2', des:'description 2', img:imgCard2},
		{key:'card3', title:'Card 3', des:'description 3', img:imgCard3},
	],
	[
		{key:'card4', title:'Card 4', des:'description 4', img:imgCard4},
		{key:'card5', title:'Card 5', des:'description 5', img:imgCard5},
		{key:'card6', title:'Card 6', des:'description 6', img:imgCard6},
		{key:'card7', title:'Card 7', des:'description 7', img:imgCard7},
	],
	[
		{key:'card8', title:'Card 8', des:'description 8', img:imgCard8},
		{key:'card9', title:'Card 9', des:'description 9', img:imgCard9},
		{key:'card10', title:'Card 10', des:'description 10', img:imgCard10},
		{key:'card11', title:'Card 11', des:'description 11', img:imgCard0},
	],
]


const introProblems = [
	[
		{title:'Fundamental Intelligence Paradox', des:['General AI: Know everything, but expert at nothing', 'Narrow AI:expert at one task, weak for the rest']},
		{title:'Too Expensive', des:['ChatGPT-3: $5M', 'ChatGPT-4: $100M+', 'Gemini Ultra: $191M']},
	], [
		{title:'Underutilization of Narrow AI models', des:['Overhype on General AI', 'Narrow AI: Cheap, Fast, Master of its Trade. Do things that general AI cannot imagine']},
		{}
	]
]

const whatDoList = [
	[
		{title:'A Place for all the AI', des:['Having a wide variety of General & Narrow AIs is the first step to breaking the fundamental paradox of Generalization and specialization.']},
		{title:'AI Linking', des:['Linking various General and Narrow AIs together to make them work as entities.', 'Infinity Link is 1000+ times less costly than Large Language Models’ Training and exponentially outperforms any AI.']}
	], [
		{title:'World of AI', des:['Iminoimi’s UI is a 3D game world where the user can control his character to interact and live with the AIs.', 'They are your friends, helping you to live a passionate life.']},
		{}
	]
]

const footerArr = [
	[
		{key:'api', label:'API'},
		{key:'reserach', label: 'Research'},
		{key:'company', label: 'Company'},
		{key:'customer', label: 'Customers'},
		{key:'news', label:'News'},
		{key:'careers', label: 'Careers'}
	], [
		{key:'inquiry', label: 'Press Inquiries'},
		{key:'support', label: 'Support'},
		{key:'status', label: 'Status'},
		{key:'twitter', label: 'Twitter'},
		{key:'linkedin', label: 'LinkedIn'},
		{key:'availablity', label:'Availability'}
	], [
		{key:'termsCustomer', label: 'Terms of Service - Customer'},
		{key:'termsCommercial', label: 'Terms of Service - Commercial'},
		{key:'privacy', label: 'Privacy Policy'},
		{key:'usage', label: 'Usage Policy'},
		{key:'disclosure', label: 'Responsible Disclosure Policy'},
		{key:'compliance', label:'Compliance'},
		{key:'choice', label: 'Privacy Choices'}
	]
]

const {origin} = window.location;
const camDis = 10;
const birdWingRotMax = Math.PI * 5/12, birdWingRotMin = Math.PI/-12, birdWingRotUnit = 0.03, disBird = 20, birdFlyAlt = 2;

export default class WelcomeComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		this.state = {pageKey};
	}

	componentDidMount() {
		// this.initScene();
		// this.animate();
		// this.loadModel();
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

	
	initScene = () => {
		const {innerWidth, innerHeight} = window;
		this.renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); // , preserveDrawingBuffer: true
		this.renderer.setSize(innerWidth, innerHeight);
		if (!document.getElementById("welcomeContainer")) return false;
		document.getElementById("welcomeContainer").appendChild(this.renderer.domElement);
		this.renderer.setClearColor(0xFFFFFF, 0);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
		this.camera.position.set(0, 0, camDis);
		
		this.totalGroup = new THREE.Group(); this.scene.add(this.totalGroup);
		
		const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7); this.scene.add(ambientLight);
		const mainLight = new THREE.DirectionalLight(0xFFFFFF, 2.0 ); this.scene.add(mainLight);
		// this.scene.fog = new THREE. Fog( 0xffffff, camDis * 0.8, camDis * 5);
		mainLight.position.set(1, 1, 1);

		const controlsOrbit = new OrbitControls(this.camera, this.renderer.domElement);
		// const testGeo = new THREE.BoxGeometry(),
		// 	testMat = new THREE.MeshStandardMaterial({color:0xFF0000}),
		// 	testMesh = new THREE.Mesh(testGeo, testMat);
		// this.totalGroup.add(testMesh);
	}

	loadModel = () => {
		const modelLoader = new FBXLoader();
		modelLoader.load(fbxButterfly, (fbx) => {
			const vPos = new THREE.Box3(new THREE.Vector3()).setFromObject(fbx),
				vSize = vPos.getSize(new THREE.Vector3()),
				scl = 2/vSize.x;
			fbx.scale.set(scl, scl, scl);
			for (let i = 0; i < 15; i++) {
				const cloneBird = fbx.clone(),
					randPosX = Math.random() * disBird - disBird/2,
					randPosZ = Math.random() * -disBird,
					randPosY = Math.random() * 12 - 6,
					randAltDir = Math.random()<0.5?-1:1,
					randAltDelta = Math.random();
				const randRot = Math.random() * birdWingRotMax;
				cloneBird.children.forEach((child, idx) => {
					child.material.side = 2;
					if 		(child.name==='wing-0') child.rotation.y =-randRot;
					else if (child.name==='wing-1') child.rotation.y = randRot;
				});
				cloneBird.position.set(randPosX, randPosY + randAltDir * randAltDelta, randPosZ);
				cloneBird.rotation.y = Math.random() * Math.PI * 2;
				cloneBird.defaultY = randPosY;
				cloneBird.altDir = Math.random()<0.5?-1:1;
				cloneBird.wingDir = Math.random()<0.5?-1:1;
				this.totalGroup.add(cloneBird);
			}
		}, (xhr) => {  }, (error) => { })
	}

	animate = () => {
		this.totalGroup.children.forEach(bird => {
			const rotY = bird.children[0].rotation.y,
				rotNext = rotY + birdWingRotUnit * bird.wingDir,
				altNext = bird.position.y + bird.altDir * 0.003;
			bird.children.forEach(child => {
				if 		(child.name==='wing-0') child.rotation.y =-rotNext;
				else if (child.name==='wing-1') child.rotation.y = rotNext;
			});
			bird.position.y = altNext;
			if 		(rotNext >= birdWingRotMax) bird.wingDir =-1;
			else if (rotNext <= birdWingRotMin) bird.wingDir = 1;
			if 		(altNext >= bird.defaultY + birdFlyAlt) bird.altDir =-1;
			else if (altNext <= bird.defaultY - birdFlyAlt) bird.altDir = 1;
		});
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);
	}

	render() {
		const {pageKey} = this.state;
		return (
			<div className={`page-wrapper welcome-wrapper flex ${pageKey==='home'?'active':''}`}>
				{/* <div onClick={e=>this.testRouter()}>World</div> */}
				{/* <Link to="/world">World</Link> */}
				<div className='canvas welcome-canvas'>
					<div id='welcomeContainer'></div>
				</div>
				<HeaderComponent
					setPageKey={this.props.setPageKey}
				></HeaderComponent>
				
				<div className='page-content welcome flex'>
					<div className='main-content scroll-hide'>
						<div className='intro-part'>
							<div className='part-title'>MAJOR PROBLEMS IN AI FIELD</div>
							<div className='part-content'>
								{/* <div className='big-title'>We believe AI will have a vast impact on the world. Anthropic is dedicated to building systems that people can rely on and generating research about the opportunities and risks of AI.</div> */}
								<div className='intro-problems'>
									{introProblems.map((row, rIdx) =>
										<div className='intro-row' key={rIdx}>
											{row.map((item, idx) =>
												<div className='intro-item' key={idx}>
													<div className='intro-title'>{item.title}</div>
													<div className='intro-description'>
														{item.des && item.des.map((desItem, dIdx)=>
															<div className='des-item' key={dIdx}>
																<div className='des-mark'></div>
																<div className='des-content'>{desItem}</div>
															</div>
														)}
													</div>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='intro-part what-wedo'>
							<div className='part-title'>What we do</div>
							<div className='part-content'>
								<div className='intro-problems'>
									{whatDoList.map((row, rIdx) =>
										<div className='intro-row' key={rIdx}>
											{row.map((item, idx) =>
												<div className='intro-item' key={idx}>
													<div className='intro-title'>{item.title}</div>
													<div className='intro-description'>
														{item.des && item.des.map((desItem, dIdx)=>
															<div className='des-item' key={dIdx}>
																<div className='des-mark'></div>
																<div className='des-content'>{desItem}</div>
															</div>
														)}
													</div>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className='intro-part flex'>
							<div className='join-button hover-scale'>Welcome joining us</div>
						</div>

						
						

						<div className='welcome-footer'>
							{footerArr.map((column, cIdx) =>
								<div className='footer-column' key={cIdx}>
									{column.map((item, idx) =>
										<div className='footer-item' key={idx}>
											<div className='footer-label hover-scale'>{item.label}</div>
											<div className='space'></div>
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
