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
			<div className={`page-wrapper welcome-wrapper flex ${pageKey==='home'?'active':''}`} style={{backgroundImage:`url(${imgBackWelcome})`}}>
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
						<div className='intro-wrapper'>
							<div className='intro-left'>
								<div className='sub-title'>IMI Store</div>
								<div className='big-title'>Discover all the AI over the World</div>
								<div className='label'>This is description</div>
								<div className='button trans'>Button</div>
							</div>
							<div className='intro-right'>
								<div className='card-wrapper big-card'>
									<div className='card-image' style={{backgroundImage:`url(${imgCard0})`}}></div>
									<div className='card-info'>
										<div className='card-main-info flex-row'>
											<div className='user-logo'></div>
											<div className='user-name'>User Name</div>
											<div className='card-time'>2024-03-28</div>
										</div>
										<div className='card-title sub-title'>Main Card</div>
										<div className='card-sub-info flex-row'>
											<div className='card-des'>description</div>
											<div className='card-button flex'>Detail View</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='sections'>
							{sectionSource.map((row, rIdx)=>
								<div className='card-row flex-row' key={rIdx}>
									{row.map((card, cIdx)=>
										<div className='card-wrapper' key={cIdx}>
											<div className='card-image' style={{backgroundImage:`url(${card.img})`}}></div>
											<div className='card-info'>
												<div className='card-main-info flex-row'>
													<div className='user-logo'></div>
													<div className='user-name'>User Name</div>
													<div className='card-time'>2024-03-28</div>
												</div>
												<div className='card-title sub-title'>{card.title}</div>
												<div className='card-sub-info flex-row'>
													<div className='card-des'>{card.des}</div>
													<div className='card-button flex'>Detail View</div>
												</div>
											</div>
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
