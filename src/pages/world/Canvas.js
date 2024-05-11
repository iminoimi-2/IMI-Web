import React from 'react';
import * as THREE from 'three';
import axios from 'axios';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
// import fbxIsland0 from '../../assets/model/group-scene.fbx'; // test0
// import fbxMan from '../../assets/model/man/man-0.fbx';
// import glbIsland from '../../assets/model/scene-group-normal.glb'; // compress

import { GetClickObj, GetMousePos, GetNearGroundArr, SetTween, innerWidth, testMesh, transTime } from '../../data/info';
import { OnKeyDown, OnKeyUp } from '../../data/keyboard';
import { DrawSoulLines, FlyBirdWing, FlySoul, FlySoulNodes, PlayerMove, WalkNPC } from '../../data/walk';
import { LoadNPCModelArr, LoadIslandModel, LoadPlayer, AddNPCModel, GetPanoMesh, LoadSoulModel } from '../../data/load';
import { CameraZoom, SetSoulScene, sceneSkyColHex, sceneSpaceColHex } from '../../data/sceneTrans';

export const camDis = 50, localTest = false, timeTransSoul = 3000, timeUpSoul = 1000;
// const islandArr = [{x:0, z:0, fbx:fbxIsland0}], altArea = 10, altCheckTime = 1000;

let prevTime = performance.now();
var loadModelFlag = false;
export default class CanvasComponent extends React.Component {
	constructor(props) {
		super(props);
		const {gameMode, soulMode, pageKey} = props;
		this.state = {selPlace:-1, gameMode, soulMode, pageKey};
		this.groundArr = []; this.nearGroundArr = []; this.obstArr = []; this.nearObstArr = []; this.clickObjArr = []; this.nearClickObjArr = []; this.npcMeshArr = []; this.nearNpcArr = [];this.frameArr = [];

		this.playerMark = testMesh.clone();
		this.playerMark.scale.set(0.1, 0.1, 0.1);
		this.playerMark.material = new THREE.MeshStandardMaterial({color:0x0000FF, side:2, transparent:true, opacity:localTest?0.3:0});

		this.velocity = new THREE.Vector3(0, 0, 0);
		this.direction = new THREE.Vector3(0, 0, 0);
		this.moveForward = false; this.moveLeft = false;
		this.moveBackward = false; this.moveRight = false;
	}

	componentDidMount() {
		this.initScene();
		this.animate();
		// if (!this.props.testUI) this.loadModel();
		this.loadPanoBack();
		document.addEventListener( 'keydown', e=> OnKeyDown(e, this) );
		document.addEventListener( 'keyup', e=> OnKeyUp(e, this) );
		document.addEventListener( 'click', e=> this.onMouseClick(e) );
		document.addEventListener( 'mousemove', e=> this.onMouseMove(e) );
		document.addEventListener('mousewheel', e=> { CameraZoom(e, this);});
	}

	componentWillReceiveProps(nextProps) {
		['gameMode', 'soulMode', 'pageKey'].forEach(key => {
			if (this.state[key] !== nextProps[key]) {
				if (!this.state.gameMode && nextProps.gameMode) {
					this.setGameMode();
				}
				this.setState({[key]:nextProps[key]}, e=> {
					if (key==='soulMode') this.setSoulMode();
				})
				if (this.state.pageKey!=='world'&&nextProps.pageKey==='world'&&!loadModelFlag) {
					this.loadModel();
					loadModelFlag = true;
				}
			}
		});
	}

	setSoulMode = () => {
		this.props.setSceneTrans(true);
		SetSoulScene(this.state.soulMode, this);
		setTimeout(() => {
			this.props.setSceneTrans(false);
		}, timeTransSoul + timeUpSoul);
	}

	onMouseMove = (e) => {
		if (!this.state.gameMode) return;
		const {posX} = GetMousePos(e);
		this.props.showSideRight(posX > innerWidth - 120);
	}

	onMouseClick = (e) => {
		const interObj = GetClickObj(e, [...this.nearClickObjArr, ...this.nearNpcArr], this.camera);
		if (!interObj) return;
		const {clickKey, npcKey} = interObj.object;
		this.props.openModal(clickKey || npcKey);
	}

	setGameMode = () => {
		const {x, y, z} = this.playerPos;
		SetTween(this.islandGroup, "rotation", {x:0, y:0, z:0}, transTime * 2);
		SetTween(this.islandGroup, "position", {x:-x, y:-y, z:-z}, transTime * 2);
		setTimeout(() => { this.totalGroup.add(this.player, this.playerMark); }, transTime * 2 + 100);
	}

	gotoPlace = (idx) => {
		const newPos = this.placeArr[idx];
		SetTween(this.islandGroup, "position", newPos, transTime);

		const oldTargetPos = this.controlsOrbit.target,
			oldCamPos = {...this.camera.position},
			deltaCamPos = {x:oldTargetPos.x - oldCamPos.x, y: oldTargetPos.y - oldCamPos.y, z:oldTargetPos.z - oldCamPos.z},
			newCamPos = {x:newPos.x - deltaCamPos.x, y:newPos.y - deltaCamPos.y, z:newPos.z - deltaCamPos.z};
		
		SetTween(this.camera, "position", newCamPos, transTime, 'camera');
		SetTween(this.controlsOrbit, "target", newPos, transTime, 'controlsOrbit');

		setTimeout(() => { this.setState({selPlace:idx}) }, transTime);
	}

	loadPanoBack = () => {
		this.panoBack = GetPanoMesh('pano-back'); this.totalGroup.add(this.panoBack);
		// this.panoSky = GetPanoMesh('pano-sky'); this.totalGroup.add(this.panoSky);
		this.panoSpace = GetPanoMesh('pano-space'); this.totalGroup.add(this.panoSpace);
		// console.log(this.panoSky);
		// console.log(this.panoSpace);
	}

	loadModel = () => {
		LoadIslandModel(this);
		LoadPlayer(this);
		LoadNPCModelArr(this);
		LoadSoulModel(this);
	}

	initScene = () => {
		const {wSize} = this.props;
		this.renderer = new THREE.WebGLRenderer({antialias:true, alpha:true}); // , preserveDrawingBuffer: true
		this.renderer.setSize(wSize.width, wSize.height);
		if (!document.getElementById("container")) return false;
		document.getElementById("container").appendChild(this.renderer.domElement);

		this.renderer.setClearColor(sceneSpaceColHex, 1); // sceneSkyColHex
		// this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.scene = new THREE.Scene();
		// this.scene.fog = new THREE.Fog(0xFFFFFF, 14, 30);
		this.camera = new THREE.PerspectiveCamera(60, wSize.width / wSize.height, 0.1, 100000);
		this.camera.position.set(camDis, 0, 0); // camDis * 10
		
		this.totalGroup = new THREE.Group(); this.scene.add(this.totalGroup);
		this.islandGroup = new THREE.Group(); this.totalGroup.add(this.islandGroup);
		this.soulGroup = new THREE.Group(); this.totalGroup.add(this.soulGroup);
		const nodeGroup = new THREE.Group(), lineGroup = new THREE.Group(), randGroup = new THREE.Group();
		this.soulGroup.add(nodeGroup, lineGroup, randGroup); this.soulGroup.visible = false;
		this.birdGroup = new THREE.Group(); this.totalGroup.add(this.birdGroup);
		
		this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3); this.scene.add(this.ambientLight);
		this.mainLight = new THREE.PointLight(0xFFFFFF, 3.5, 10000 ); this.scene.add(this.mainLight); // DirectionalLight
		// this.scene.fog = new THREE. Fog( 0xffffff, camDis * 0.8, camDis * 5);
		this.mainLight.position.set(camDis, camDis, camDis);

		// this.mainLight.castShadow = true;
		// this.mainLight.shadow.mapSize.width = 512; // default
		// this.mainLight.shadow.mapSize.height = 512; // default
		// this.mainLight.shadow.camera.near = 0.5; // default
		// this.mainLight.shadow.camera.far = 500;
		this.topLight = new THREE.DirectionalLight(0xFFFFFF, 1.0 ); this.topLight.position.set(0, 100, 0); this.scene.add( this.topLight );

		this.controlsOrbit = new OrbitControls(this.camera, this.renderer.domElement);
		this.controlsOrbit.enableDamping = true;
		this.controlsOrbit.enableZoom = false;
		this.controlsOrbit.enablePan = false;
		this.controlsOrbit.minPolarAngle = 0.5;
		this.controlsOrbit.maxPolarAngle = Math.PI / 2 + 0.5;
	}

	addNPCModel = () => { AddNPCModel(this); }

	animate = () => {
		// if (renderMethod!=='time') return;
		// if (!this.camera || !this.scene) return;
		const time = performance.now();
		const deltaTime = ( time - prevTime ) / 1000;
		prevTime = time;
		if (this.state.pageKey === 'world') {
			this.rendering();
		}
		PlayerMove(this, deltaTime);
		WalkNPC(this);
		FlyBirdWing(this.birdGroup.children);

		requestAnimationFrame(this.animate);

		// if ( onObject === true ) {
		// 	velocity.y = Math.max( 0, velocity.y );
		// 	canJump = true;
		// }
	}

	rendering = () => {
		if (!this.camera || !this.renderer) return;
		// this.camera.lookAt( 0, 0, 0 );
		
		const camPos = this.camera.position;
		this.mainLight.position.set(camPos.x, camPos.y + camDis * 2, camPos.z);

		this.renderer.render(this.scene, this.camera);
		// this.camera.updateProjectionMatrix();
	}

	render () {
		const {} = this.state;
		return (
			<div className={`canvas active`}>
				<div id='container'></div>
			</div>
		);
	}
}
