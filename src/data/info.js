
import * as THREE from 'three';
import {Tween, autoPlay, Easing} from "es6-tween";

import imgEnvPX from '../assets/images/px.png';
import imgEnvPY from '../assets/images/py.png';
import imgEnvPZ from '../assets/images/pz.png';
import imgEnvNX from '../assets/images/nx.png';
import imgEnvNY from '../assets/images/ny.png';
import imgEnvNZ from '../assets/images/nz.png';
import imgEnvPano from '../assets/images/env-pano.jpg';

import imgPanoBack from '../assets/images/pano-back.jpg';

import imgMirror from '../assets/images/back_LF.jpg';

import imgNewEnvPX from '../assets/images/new-px.jpg';
import imgNewEnvPY from '../assets/images/new-py.jpg';
import imgNewEnvPZ from '../assets/images/new-pz.jpg';
import imgNewEnvNX from '../assets/images/new-nx.jpg';
import imgNewEnvNY from '../assets/images/new-ny.jpg';
import imgNewEnvNZ from '../assets/images/new-nz.jpg';
import { localTest } from '../components/Canvas';

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

autoPlay(true);
const imgEnv0Arr = [imgEnvPX, imgEnvNX, imgEnvPY, imgEnvNY, imgEnvPZ, imgEnvNZ];
const imgEnvMirror = [imgMirror, imgMirror, imgMirror, imgMirror, imgMirror, imgMirror];
const imgNewEnvArr = [imgNewEnvPX, imgNewEnvNX, imgNewEnvPY, imgNewEnvNY, imgNewEnvPZ, imgNewEnvNZ];

export const {innerWidth, innerHeight} = window;
export const modelH = 4, transTime = 1000, serverUrl = 'https://emogon.com/configurator/', apiUrl = serverUrl + 'admin/';

const nearGroundDis = 1000;
const testGeo = new THREE.BoxGeometry(1, 1, 1), testMat = new THREE.MeshStandardMaterial({color:0xFF0000});
export const testMesh = new THREE.Mesh(testGeo, testMat);

export function GetDis(pos0, pos1, dis3D = false) {
    const disX = pos0.x - pos1.x, disY = pos0.y - pos1.y, disZ = pos0.z - pos1.z;
    if (!dis3D) return Math.sqrt(Math.pow(disX, 2) + Math.pow(disZ, 2));
    else return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2) + Math.pow(disZ, 2));
}

export function GetNearGroundArr(groundArr, posIsland, nearDis) {
	const nearGroundArr = [], posPlayer = {x:-posIsland.x, z:-posIsland.z}, disCheck = nearDis || nearGroundDis;
	groundArr.forEach(ground => {
		const groundDis = GetDis(ground.vPos, posPlayer);
		if (groundDis < disCheck) {
			nearGroundArr.push(ground);
			ground.visible = true
		}
		else if (localTest) ground.visible = false;
	});
	return nearGroundArr;
}
// disArr 1071-2684, size 1000 x 1000

export function SetTween(obj, attr, info, easeTime, key, other) {
	var tweenData = {}, tweenObj = obj;
	const easeType = Easing.Cubic.InOut;
	if 		(attr === "opacity") tweenData = {'opacity':info };
	else if (attr === "position") tweenData = {'position.x':info.x, 'position.y':info.y, 'position.z':info.z };
	// else if (attr === "rotation") tweenData = {'rotation.y':info.y };
	else if (attr === "rotation") {tweenObj=obj.rotation; tweenData = {'y':info.y };}
	else if (attr === "intensity") tweenData = {'intensity':info };
	else if (attr === "scale") tweenData = {'scale.x':info.x, 'scale.y':info.y, 'scale.z':info.z };
	else if (attr === "fov") tweenData = {'fov':info };
	const tweenFun = new Tween(tweenObj).to( tweenData , easeTime ).easing(easeType).start();

	tweenFun.update( res=> {
	})
}

export function SetColTween(mat, target, easeTime) {
	const stepCount = 20, oriCol = {...mat.color};
	var colDelta = {};
	['r', 'g', 'b'].forEach(axis => { colDelta[axis] = (target[axis] - oriCol[axis])/stepCount; });
	for (let i = 0; i < stepCount; i++) {
		setTimeout(() => {
			mat.color.setRGB( oriCol.r+colDelta.r*i,
							  oriCol.g+colDelta.g*i,
							  oriCol.b+colDelta.b*i);
		}, i * (easeTime/stepCount));
	}
	setTimeout(() => { mat.color.setRGB( target.r, target.g, target.b); }, easeTime+100);
}

function getIntCol(str, a, b) {
	return parseInt(str.substring(a, b), 16)/256;
}

export function SetColor(bodyMeshArr, selCol) {
	var strHex = selCol.toString(16);
	while (strHex.length < 6) { strHex = '0' + strHex; }
	const rInt = getIntCol(strHex, 0, 2), gInt = getIntCol(strHex, 2, 4), bInt = getIntCol(strHex, 4, 6);
	bodyMeshArr.forEach(child => {
		SetColTween(child.material, {r:rInt, g:gInt, b:bInt}, transTime);
		// child.material.color.setHex(selCol);
	});
}

export function GetMousePos(e) {
	var posX, posY;
	if (e.clientX && e.clientY) {posX = e.clientX; posY = e.clientY;}
	else if (e.touches || e.changedTouches){
		const touch = e.touches[0] || e.changedTouches[0];
		posX = touch.pageX; posY = touch.pageY;
	};
	return {posX, posY};
}

export function GetClickObj(e, arr, camera) {
	const {posX, posY} = GetMousePos(e);
	pointer.x = ( posX / innerWidth ) * 2 - 1;
	pointer.y = - ( posY / innerHeight ) * 2 + 1;
	raycaster.setFromCamera( pointer, camera );
	const interObj = raycaster.intersectObjects( arr )[0];
	if (interObj) interObj.pos2D = {x:posX, y:posY};
	return interObj;
}

export function HEXStrToHexInt(rrggbb) {
	var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
	return parseInt(bbggrr, 16);
}

export function getTouchPos(e) {
	var pos = {x:0, y:0};
	if (e.touches || e.changedTouches){
		const touch = e.touches[0] || e.changedTouches[0];
		pos = {x:touch.pageX, y:touch.pageY};
	}
	return pos;
}

export function GetLangLabel(item, lan, type) {
	if (!item) return '';
	else if (lan==='en') {
		if (type==='small') return item.description;
		else return item.label;
	} else if (lan==='de') {
		if (type==='small') return item.description_de;
		else return item.label_de;
	} else return '';
}

// const envMap = new THREE.CubeTextureLoader().load(imgEnv0Arr)
// const envMap = new THREE.TextureLoader().load(imgEnvPano);


