import React from 'react';
import * as THREE from 'three';
import axios from 'axios';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import fbxIsland0 from '../assets/model/group-scene.fbx'; // test0

// import imgFloor from '../assets/images/floor.jpg';
import { CustomModel, GetPanoMesh, SetTween, transTime } from '../data/info';
import { OnKeyDown, OnKeyUp } from '../data/keyboard';

export const camDis = 1, islandDis = camDis, islandSize = camDis * 1000;
const islandArr = [{x:0, z:0, fbx:fbxIsland0}], moveInt = 5000, velInt = 10, altArea = 10, altChckTime = 3000, altCheckDis = 1000;


let prevTime = performance.now();
export default class CanvasComponent extends React.Component {
	constructor(props) {
		super(props);
		const {pageKey} = props;
		this.state = {pageKey, selPlace:-1, lockScreen:false};
		this.placeArr = []; this.groundArr = [];
		this.controlKey = 'person';
		this.velocity = new THREE.Vector3(0, 0, 0);
		this.direction = new THREE.Vector3(0, 0, 0);
		this.vertex = new THREE.Vector3(0, 0, 0);
		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;
	}

	componentDidMount() {
		this.initScene();
		this.animate();
		if (!this.props.testUI) this.loadModel();
		this.loadPanoBack();
		document.addEventListener( 'keydown', e=> OnKeyDown(e, this) );
		document.addEventListener( 'keyup', e=> OnKeyUp(e, this) );
		setInterval(() => {
			
		}, altChckTime);
	}

	componentWillReceiveProps(nextProps) {
		['pageKey', 'colArr'].forEach(key => {
			this.setState({[key]:nextProps[key]}, e=> {
			})
		});
	}

	setControls = (newControl) => {
		if (newControl===this.controlKey) return;
		if (newControl==='orbit') {
			this.controlsOrbit.enabled = true;
			this.controlsPerson.enabled = false;
			this.controlsPerson.unlock();
		} else {
			this.controlsOrbit.enabled = false;
			this.controlsPerson.enabled = true;
			this.controlsPerson.lock();
			console.log(this.controlsPerson);
		}
		this.controlKey = newControl;
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

		setTimeout(() => {
			this.setState({selPlace:idx})
		}, transTime);
	}

	loadPanoBack = () => {
		// const planeMap = new THREE.TextureLoader().load(imgFloor);
		// planeMap.wrapS = THREE.RepeatWrapping;
		// planeMap.wrapT = THREE.RepeatWrapping;
		// planeMap.repeat.set(25, 25);

		// const planeGeo = new THREE.PlaneGeometry(100, 100);
		// const planeMat = new THREE.MeshStandardMaterial({color:0x666666, map:planeMap});
		// this.planeMesh = new THREE.Mesh(planeGeo, planeMat); this.planeMesh.receiveShadow = true;
		// this.planeMesh.rotation.x = Math.PI / -2;
		// this.totalGroup.add(this.planeMesh);

		// this.panoSun = GetPanoMesh('pano_sun'); this.totalGroup.add(this.panoSun);
	}

	loadModel = () => {
		islandArr.forEach((item, idx) => {
			const loader = new FBXLoader();
			loader.load(item.fbx, (fbx) => {
				this.props.setLoading(false);
				const {islandModel, placeArr, groundArr} = CustomModel(fbx, idx);
				this.islandGroup.add(islandModel);
				this.placeArr = [...placeArr];
				this.groundArr = [...groundArr];
				const posFirst = placeArr[0];

				this.camera.position.set(posFirst.x + camDis, 0, posFirst.z);
				this.camera.lookAt(new THREE.Vector3(posFirst.x, 0, posFirst.z));
				this.camera.updateProjectionMatrix();

				// this.controlsOrbit.target = new THREE.Vector3(posFirst.x, posFirst.y, posFirst.z);
				// this.controlsOrbit.update();

				this.controlsPerson.target = new THREE.Vector3(posFirst.x, 0, posFirst.z);
				this.islandGroup.position.y = -posFirst.y;

				this.setState({lockScreen:true, selPlace:0});
			}, (xhr) => { 
				const {total, loaded} = xhr;
				this.props.setLoadPro(Math.round(loaded/total*100));
			}, (error) => { })
		});
	}

	initScene = () => {
		const {wSize} = this.props;
		this.renderer = new THREE.WebGLRenderer({antialias:true}); // , preserveDrawingBuffer: true
		this.renderer.setSize(wSize.width, wSize.height);
		if (!document.getElementById("container")) return false;
		document.getElementById("container").appendChild(this.renderer.domElement);

		this.renderer.setClearColor(0x30ACEA, 1);
		// this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.scene = new THREE.Scene();
		// this.scene.fog = new THREE.Fog(0xFFFFFF, 14, 30);
		this.camera = new THREE.PerspectiveCamera(60, wSize.width / wSize.height, 1, 100000);
		// this.camera.position.set(camDis, 0, 0);
		
		this.totalGroup = new THREE.Group(); this.scene.add(this.totalGroup);
		this.islandGroup = new THREE.Group(); this.totalGroup.add(this.islandGroup);
		
		this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3); this.scene.add(this.ambientLight);
		this.mainLight = new THREE.PointLight(0xFFFFFF, 3.5, 10000 ); this.scene.add(this.mainLight); // DirectionalLight
		// this.scene.fog = new THREE. Fog( 0xffffff, camDis * 0.8, camDis * 5);
		this.mainLight.position.set(camDis, camDis, camDis);
		// 1, 116, 10

		// this.mainLight.castShadow = true;
		// this.mainLight.shadow.mapSize.width = 512; // default
		// this.mainLight.shadow.mapSize.height = 512; // default
		// this.mainLight.shadow.camera.near = 0.5; // default
		// this.mainLight.shadow.camera.far = 500;
		// this.backLight = new THREE.DirectionalLight(0xFFFFFF, 1.0 ); this.scene.add( this.backLight );
		// this.backLight.position.set(-camDis, camDis, -camDis);
		// this.backLight = new THREE.DirectionalLight(0xFFFFFF, 0.2 ); this.backLight.position.set(5, -5, -5); this.scene.add( this.backLight );
		// this.frontLight = new THREE.DirectionalLight(0xFFFFFF, 0.4 ); this.frontLight.position.set(-5, -1, 0); this.scene.add( this.frontLight );

		this.controlsOrbit = new OrbitControls(this.camera, this.renderer.domElement);
		// this.controlsOrbit.enableDamping = true;
		// this.controlsOrbit.enableZoom = false;
		// this.controls.enablePan = false;
		// this.controlsOrbit.minDistance = camDis * 0.5;
		// this.controlsOrbit.maxDistance = camDis * 2;
		this.controlsOrbit.minPolarAngle = 0.5;
		this.controlsOrbit.maxPolarAngle = Math.PI / 2 + 0.5; // this.controls.minPolarAngle = 0.3;
		
		// this.controls.addEventListener('change', () => {if (renderMethod !== 'time') this.rendering()})
		this.controlsOrbit.enabled = false;

		this.controlsPerson = new PointerLockControls( this.camera, this.renderer.domElement );
		this.controlsPerson.enabled = true;
		this.controlsPerson.addEventListener( 'lock', () => { this.setState({lockScreen:false}); } );
		this.controlsPerson.addEventListener( 'unlock', () => { this.setState({lockScreen:true}); } );
	}

	startControl = () => {
		this.controlsPerson.lock();
	}

	animate = () => {
		// if (renderMethod!=='time') return;
		// if (!this.camera || !this.scene) return;
		this.rendering();
		requestAnimationFrame(this.animate);


		if ( this.controlKey === 'person' ) {

			const time = performance.now();
			// raycaster.ray.origin.copy( controls.getObject().position );
			// raycaster.ray.origin.y -= 10;
			// const intersections = raycaster.intersectObjects( objects, false );
			// const onObject = intersections.length > 0;

			const delta = ( time - prevTime ) / 1000;

			this.velocity.x -= this.velocity.x * velInt * delta;
			this.velocity.z -= this.velocity.z * velInt * delta;

			// this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

			this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
			this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
			this.direction.normalize(); // this ensures consistent movements in all directions

			if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * moveInt * delta;
			if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * moveInt * delta;

			this.controlsPerson.moveRight( - this.velocity.x * delta );
			this.controlsPerson.moveForward( - this.velocity.z * delta );

			const camPos = this.camera.position;

			// if ( onObject === true ) {
			// 	velocity.y = Math.max( 0, velocity.y );
			// 	canJump = true;
			// }
			prevTime = time;
		}
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
		const {pageKey, lockScreen} = this.state;
		return (
			<div className={`back-board canvas ${pageKey==='canvas'?'active':''}`}>
				<div id='container'></div>
				<div className={`lock-screen flex ${lockScreen?'active':''}`}>
					<div className='btn-start flex' onClick={e=>this.startControl()}>Start</div>
				</div>
				{/* <div className='setting'>
					{this.placeArr.map((item, idx)=>
						<div className={`btn-island flex ${selPlace===idx?'active':''} `} onClick={e=>this.gotoPlace(idx)} key={idx}>Place {idx + 1}</div>
					)}
				</div> */}
			</div>
		);
	}
}
