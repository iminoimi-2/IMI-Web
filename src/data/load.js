
import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import fbxMan from '../assets/model/man/player.fbx';
// import glbIsland from '../assets/model/scene-group-normal.glb'; // compress

import fbxNPC0 from '../assets/model/man/npc-0.fbx';
import fbxNPC1 from '../assets/model/man/npc-1.fbx';
import fbxNPC2 from '../assets/model/man/npc-2.fbx';
import fbxNPC3 from '../assets/model/man/npc-3.fbx';
import fbxNPC4 from '../assets/model/man/npc-4.fbx';

import fbxButterfly from '../assets/model/butterfly.fbx';
import imgSky from '../assets/images/sky-1.jpg';
import imgSpace from '../assets/images/space-1.jpg';

import { GetNearGroundArr } from '../data/info';
import { npcInfo } from './constant';
import { sceneSkyColHex } from './sceneTrans';
import imgSoul0 from '../assets/images/soul/soul-0.png';
import imgSoul1 from '../assets/images/soul/soul-1.png';
import imgSoul2 from '../assets/images/soul/soul-2.png';
import imgSoul3 from '../assets/images/soul/soul-3.png';
import imgSoul4 from '../assets/images/soul/soul-4.png';
import imgSoul5 from '../assets/images/soul/soul-5.png';
import imgSoul6 from '../assets/images/soul/soul-6.png';
import imgSoul7 from '../assets/images/soul/soul-7.png';
import imgSoul8 from '../assets/images/soul/soul-8.png';
import imgSoul9 from '../assets/images/soul/soul-9.png';
import imgNorth from '../assets/images/soul/north.png';

import fbxIsland0 from '../assets/model/group-scene.fbx';
// import fbxIsland0 from '../assets/model/test-island.fbx';
import { DrawSoulLines, FlySoulNodes } from './walk';
export const testMode = false;

const islandArr = [{x:0, z:0, fbx:fbxIsland0}], altArea = 10, altCheckTime = 1000;
const imgSoulArr = [imgSoul0, imgSoul1, imgSoul2, imgSoul3, imgSoul4, imgSoul5, imgSoul6, imgSoul7, imgSoul8, imgSoul9];

const groundNameArr = ['ground', 'hill', 'road'], obstNameArr = ['Castle', 'Env', 'MountainVillage', 'PondGarden', 'RoadVillage', 'ZenGarden'];

export const birdWingRotMax = Math.PI * 0.35, birdWingRotUnit = 0.03;

function CustomModel(object, idx) {
	const placeArr = [], groundArr = [], obstArr = [], clickObjArr = [], frameArr = [], playerPos = {x:0, y:0, z:0};
	object.children.forEach(group => {
		const {name, children} = group;
		if (name==='place') {
			children.forEach(place => {
				place.visible = false;
				const {x, y, z} = place.position;
				if (place.name==='player') {
					playerPos.x = x; playerPos.y = z+80; playerPos.z = -y;
				} else if (place.name.includes('place-')) {
					const vPos = new THREE.Box3().setFromObject(place), {min, max} = vPos; // new THREE.Vector3()
					// ground.vPos = {x:(min.x+max.x)/2, y:min.y, z:(min.z+max.z)/2};
					const placeNum = parseInt(place.name.split('-')[1]);
					placeArr.push({x:(min.x+max.x)/2, y:min.y, z:(min.z+max.z)/2, placeNum});
				}
			});
			group.material.visible = false;
			group.visible = false;
		} else if (groundNameArr.includes(name)) {
			children.forEach(ground => {
				const vPos = new THREE.Box3().setFromObject(ground), {min, max} = vPos; // new THREE.Vector3()
				ground.vPos = {x:(min.x+max.x)/2, z:(min.z+max.z)/2};
				ground.groundType = name;
				groundArr.push(ground);
			});
		} else if (obstNameArr.includes(name)) {
			group.traverse(obst => {
				if (obst instanceof THREE.Mesh) {
					const vPos = new THREE.Box3().setFromObject(obst), {min, max} = vPos; // new THREE.Vector3()
					obst.vPos = {x:(min.x+max.x)/2, z:(min.z+max.z)/2}
					if (object.name.includes('ignore')) {

					} else if (obst.name.includes('click_')) {
						const clickKey = obst.name.split('_')[1];
						obst.clickKey = clickKey;
						clickObjArr.push(obst);
					} else {
						obstArr.push(obst);
					}
					if (obst.name !== 'PondGarden') frameArr.push(obst);
				}
			})
		}
	});
	object.traverse(child=>{
		if (child instanceof THREE.Mesh) {
			if (child.material.length) {
			} else {
				const {map, color} = child.material;
				child.material = new THREE.MeshStandardMaterial({map});
			}
		}
	})
	return {islandModel:object, placeArr, groundArr, obstArr, clickObjArr, frameArr, playerPos};
}

export function LoadIslandModel(self) {
	// const gltfLoader = new GLTFLoader();
	// const dracoLoader = new DRACOLoader();
	// dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/libs/draco/');
	// gltfLoader.setDRACOLoader( dracoLoader );

	// gltfLoader.load( glbIsland, ( gltf ) => {
	// }, ( xhr ) => { }, ( error ) => { console.log(error) } );

	const loader = new FBXLoader(), posMinDis = 1000, posDelta = 2000;
	self.birdGroup.visible = false;
	loader.load(fbxButterfly, (fbx) => {
		fbx.scale.multiplyScalar(1);
		for (let i = 0; i < 15; i++) {
			const cloneBird = fbx.clone(),
				disSoul = posMinDis + Math.random() * posDelta,
				posAngle = Math.random() * Math.PI * 2,
				randPosX = Math.sin(posAngle) * disSoul,
				randPosZ = Math.cos(posAngle) * disSoul,
				randPosY = Math.random() * 300 - 150;
			cloneBird.position.set(randPosX, randPosY, randPosZ);
			cloneBird.rotation.y = Math.random() * Math.PI * 2;
			const randRot = Math.random() * birdWingRotMax;
			cloneBird.children.forEach((child, idx) => {
				child.material.side = 2;
				if 		(idx===0) child.rotation.y = randRot;
				else if (idx===1) child.rotation.y = -randRot;
			});
			cloneBird.wingDir = Math.random()<0.5?-1:1;
			self.birdGroup.add(cloneBird);
		}
	}, (xhr) => {  }, (error) => { })

	islandArr.forEach((item, idx) => {
		const loader = new FBXLoader();
		loader.load(item.fbx, (fbx) => {
			self.props.setLoading(false);
			const {islandModel, placeArr, groundArr, obstArr, clickObjArr, frameArr, playerPos} = CustomModel(fbx, idx);
			self.islandGroup.rotation.y = Math.PI;
			self.islandGroup.position.y = 1000;
			self.islandGroup.add(islandModel);
			self.placeArr = placeArr;
			self.playerPos = playerPos;
			self.groundArr = groundArr;
			self.obstArr = obstArr;
			self.clickObjArr = clickObjArr;
			self.frameArr = frameArr;
			self.addNPCModel();

			if (testMode) {
				self.islandGroup.visible = false;
				return;
			}

			setInterval(() => {
				const posIsland = self.islandGroup.position;
				self.nearGroundArr = GetNearGroundArr(self.groundArr, posIsland);
				self.nearObstArr = GetNearGroundArr(self.obstArr, posIsland);
				self.nearClickObjArr = GetNearGroundArr(self.clickObjArr, posIsland, 500);
				self.nearNpcArr = GetNearGroundArr(self.npcMeshArr, posIsland, 500);
				// const controlDir = this.controlsPerson.getDirection(new THREE.Vector3()),
				// 	norDir = new THREE.Vector3(controlDir.x, 0, controlDir.z).normalize();
			}, altCheckTime);
		}, (xhr) => { 
			const {total, loaded} = xhr;
			self.props.setLoadPro(Math.round(loaded/total*100));
		}, (error) => { })
	});
}

export function LoadPlayer(self) {
	const manLoader = new FBXLoader(), manSize = 70;
	manLoader.load(fbxMan, (fbx) => {
		self.player = new THREE.Group();
		const vPos = new THREE.Box3(new THREE.Vector3()).setFromObject(fbx);
		const vSize = vPos.getSize(new THREE.Vector3()), scl = manSize/vSize.y;
		fbx.scale.set(scl, scl, scl);
		fbx.children[0].material.forEach(mat => {
			// const colVal = mat.color.getHex();
			// mat = new THREE.MeshStandardMaterial({color:colVal, side:2});
			mat.side = 2;
			mat.shininess = 0;
		});
		fbx.position.y = -manSize;
		self.player.add(fbx);
	}, (xhr) => {  }, (error) => { })
}

const npcYSize = 80;
const fbxNpcArr = [fbxNPC0, fbxNPC1, fbxNPC2, fbxNPC3, fbxNPC4];
export function LoadNPCModelArr(self) {
	const npcModelArr = [];
	npcInfo.forEach(item => {
		const npcLoader = new FBXLoader(), {fbxNum, posNum, key, fixed} = item;
		npcLoader.load(fbxNpcArr[fbxNum], (fbx) => {
			const oldScl = fbx.scale.x;
			const vPos = new THREE.Box3(new THREE.Vector3()).setFromObject(fbx);
			const vSize = vPos.getSize(new THREE.Vector3()), scl = npcYSize/vSize.y * oldScl;
			fbx.scale.set(scl, scl, scl);
			fbx.posNum = posNum;
			fbx.npcKey = key;
			fbx.vPos = {x:0, z:0};
			fbx.fixed = fixed;
			fbx.traverse(child=>{
				if (child instanceof THREE.Mesh) {
					if (child.material.length) {
						child.material.forEach(mat => {
							mat.side = 2;
							mat.shininess = 0;
						});
					} else {
						child.material.side = 2;
						child.material.shininess = 0;
					}
					child.npcKey = key;
				}
			})
			npcModelArr.push(fbx);
			if (npcModelArr.length===npcInfo.length) self.addNPCModel();
		}, (xhr) => {  }, (error) => { })
	});
	self.npcArr = npcModelArr;
}

export const walkInt = 1, walkDuration = 150;
export function GetRandomWalkAng() {
	const randAng = Math.random() * Math.PI * 2,
		xDelta = Math.sin(randAng) * walkInt,
		zDelta = Math.cos(randAng) * walkInt;
	return {randAng, xDelta, zDelta};
}

export function AddNPCModel(self) {
	const {placeArr, npcArr, islandGroup, npcMeshArr} = self;
	if (!placeArr || !npcArr) return;

	npcArr.forEach((npcModel, idx) => {
		const {posNum} = npcModel,
			selPlace = placeArr.find(item=>item.placeNum===posNum);
		if (!selPlace) return;
		const {x, y, z, placeNum} = selPlace;
		npcModel.position.set(x, y, z);
		npcModel.vPos = {x, z};
		npcModel.walkInfo = GetRandomWalkAng();
		npcModel.walkInfo.time = Math.round((Math.random() * walkDuration));
		npcModel.walkInfo.dir = Math.random() < 0.5?-1:1;
		npcModel.rotation.y = npcModel.walkInfo.randAng * npcModel.walkInfo.dir;
		npcModel.traverse(child=>{
			if (child instanceof THREE.Mesh) {
				child.vPos = {x, z};
				npcMeshArr.push(child);
			}
		})
		islandGroup.children[0].add(npcModel);
	});
	// console.log(npcMeshArr);
}

export function GetPanoMesh (key) {
	const panoR = 25000;
	var img, rot = {x:0, y:0, z:0}, posY = 0;
	if (key==='pano-sky') img = imgSky;
	else if (key==='pano-space') img = imgSpace;
	const panoGeo = new THREE.SphereGeometry(key==='pano-space'?panoR*1.1:panoR, 128, 128);
	// img = imgPanoBack; rot = {x:0, y:3.1416, z:-0.03}; posY = 1.2;
	const panoMesh = new THREE.Mesh(panoGeo, GetMat(img));
	panoMesh.name = key;
	if (key==='pano-back') {
		panoMesh.material.transparent = true;
		panoMesh.material.color.setHex(sceneSkyColHex);
	}
	panoMesh.rotation.set(rot.x, rot.y, rot.z);
	// panoMesh.position.y = posY;
	return panoMesh;
}

function GetMat(img) {
	return new THREE.MeshBasicMaterial({map:GetMap(img), side:2}); // , transparent:true
}

function GetMap(img) {
	if (!img) return undefined;
	const texture = new THREE.TextureLoader().load(img);
	// texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	// texture.offset.set( 0, 0 );
	// texture.repeat.set( 1, 1 );
	return texture;
}

const nodeColor = 0x5A5AC2;
const partCount = 5, partAng = Math.PI * 2 / partCount, nodePlayArea = 100;

function GetNodeCol() {
	const r = Math.round((0.35 + Math.random() * 0.1 - 0.05) * 256),
		g = Math.round((0.35 + Math.random() * 0.1 - 0.05) * 256),
		b = Math.round((0.75 + Math.random() * 0.1 - 0.05) * 256);
	return new THREE.Color("rgb("+r+", "+g+", "+b+")");
}

function GetNodeMesh(nodeRoot, posParent, nodeMinDis, nodeNum, random) {
	const nodeAltArea = nodeMinDis/3,
		spaceDis = random?0:nodeMinDis,
		nodeAng = nodeRoot===0?partAng * nodeNum + Math.random() * partAng: Math.random() * Math.PI*2,
		nodeDis = spaceDis + Math.random () * nodeMinDis,
		nodePosX = posParent.x + Math.sin(nodeAng) * nodeDis,
		nodePosZ = posParent.z + Math.cos(nodeAng) * nodeDis,
		nodePosY = posParent.y + Math.random() * nodeAltArea - nodeAltArea/2,
		centerPos = {};
	[{axis:'x', value:nodePosX}, {axis:'y', value:nodePosY}, {axis:'z', value:nodePosZ}].forEach(item => {
		centerPos[item.axis] = item.value + Math.random() * nodePlayArea * 2 - nodePlayArea;
	});
	// const cloneNode = nodeMesh.clone();
	const nodeScl = random? 5 + Math.random() * 5: 10 + Math.random() * 15,
		nodeOpa = random?0.1 + Math.random() * 0.1:0.3 + Math.random() * 0.4,
		nodeGeo = new THREE.SphereGeometry(1, 16, 16),
		nodeMat = new THREE.MeshStandardMaterial({color:GetNodeCol(), transparent:true, opacity:nodeOpa}),
		cloneNode = new THREE.Mesh(nodeGeo, nodeMat);
	cloneNode.scale.multiplyScalar(nodeScl);
	cloneNode.position.set(nodePosX, nodePosY, nodePosZ);
	cloneNode.flyDir = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize().multiplyScalar(2);
	cloneNode.flyArea = {
		min:{x:centerPos.x - nodePlayArea, y:centerPos.y - nodePlayArea, z:centerPos.z - nodePlayArea},
		max:{x:centerPos.x + nodePlayArea, y:centerPos.y + nodePlayArea, z:centerPos.z + nodePlayArea},
	}
	return cloneNode;
}

function GetLineMesh(linewidth, nodeArr) {
	const points = [];
	points.push( new THREE.Vector3( 0, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 0, 0 ) );
	const lineGeo = new THREE.BufferGeometry().setFromPoints( points ),
		lineMat = new THREE.LineBasicMaterial({ color: 0x666666, linewidth, transparent:true, opacity:0.5 }),
		lineMesh = new THREE.Line(lineGeo, lineMat);
	lineMesh.nodeArr = nodeArr;
	return lineMesh;
}

export function LoadSoulModel(self) {
	const {soulGroup, state} = self, posMinDis = 2000, posDelta = 3000;
	// for (let i = 0; i < 25; i++) {
	// 	const soulGeo = new THREE.PlaneGeometry(200, 200),
	// 		soulImg = imgSoulArr[i % imgSoulArr.length],
	// 		soulMap = new THREE.TextureLoader().load(soulImg),
	// 		soulMat = new THREE.MeshStandardMaterial({map:soulMap, transparent:true, needsUpdate:true, side:2}), // 
	// 	// const soulGeo = new THREE.SphereGeometry(100, 16, 16),
	// 	// 	soulMat = new THREE.MeshStandardMaterial({transparent:true, opacity:0}),
	// 		soulMesh = new THREE.Mesh(soulGeo, soulMat),
	// 		disSoul = posMinDis + Math.random() * posDelta,
	// 		posAngle = Math.random() * Math.PI * 2,
	// 		randPosX = Math.sin(posAngle) * disSoul,
	// 		randPosZ = Math.cos(posAngle) * disSoul,
	// 		randPosY = Math.random() * 600 - 2700,
	// 		pulseTime = 100 + Math.round(Math.random() * 100),
	// 		moveUnit = 0.5 + Math.random() * 0.5,
	// 		flyDir = Math.random()<0.5?-1:1,
	// 		moveTime = Math.round(Math.random() * pulseTime);
	// 	soulMesh.position.set(randPosX, randPosY, randPosZ);

	// 	soulMesh.pulseTime = pulseTime;
	// 	soulMesh.moveUnit = moveUnit;
	// 	soulMesh.flyDir = flyDir;
	// 	soulMesh.moveTime = moveTime;

	// 	soulMesh.downY = randPosY;
	// 	soulMesh.visible = false;
	// 	soulGroup.add(soulMesh);
	// }

	const nodeGeo = new THREE.SphereGeometry(1, 16, 16),
		nodeMat = new THREE.MeshStandardMaterial({color:nodeColor, transparent:true, opacity:0.5}),
		firstNode = new THREE.Mesh(nodeGeo, nodeMat);
	firstNode.nodeNum = 0;
	firstNode.nodeRoot = 0;
	firstNode.scale.multiplyScalar(20);
	firstNode.flyDir = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize().multiplyScalar(2);
	firstNode.flyArea = {
		min:{x:-nodePlayArea, y:-nodePlayArea, z:-nodePlayArea},
		max:{x: nodePlayArea, y: nodePlayArea, z: nodePlayArea},
	}
	console.log(firstNode);
	soulGroup.children[0].add(firstNode);
	AddNodeMesh(0, 0, soulGroup, 1000);
	for (let i = 0; i < 300; i++) {
		const randNode = GetNodeMesh(-1, {x:0, y:0, z:0}, 2000, -1, true);
		soulGroup.children[2].add(randNode);
	}
	setInterval(() => {
		if (self.state.soulMode) {
			FlySoulNodes(soulGroup.children[0]);
			DrawSoulLines(soulGroup);
			FlySoulNodes(soulGroup.children[2]);
		}
	}, 50);
}

function AddNodeMesh(nodeRoot, parentNum, soulGroup, nodeMinDis) {
	if (nodeRoot>=3) return;
	const nodeCount = nodeRoot===0?partCount:3+ Math.round(Math.random() * 5);
	for (let i = 0; i < nodeCount; i++) {
		const nodeParent = soulGroup.children[0].children[parentNum],
			nodeMesh = GetNodeMesh(nodeRoot, nodeParent.position, nodeMinDis, i),
			nodeNum = soulGroup.children[0].children.length;
		soulGroup.children[0].add(nodeMesh);
		nodeMesh.nodeRoot = nodeRoot;
		nodeMesh.nodeNum = nodeNum;
		const lineMesh = GetLineMesh(3, [parentNum, nodeNum]);
		soulGroup.children[1].add(lineMesh);
		const nextMinDis = nodeRoot===0?nodeMinDis/2:nodeMinDis/2
		AddNodeMesh(nodeRoot+1, nodeNum, soulGroup, nextMinDis );
	}
}
