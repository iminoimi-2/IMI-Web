
import * as THREE from 'three';
import { GetDis, SetColTween, SetTween, innerHeight, innerWidth } from "./info";
import { camDis, timeTransSoul, timeUpSoul } from '../pages/world/Canvas';


export const sceneSkyColHex = 0x30ACEA, skyRGB = new THREE.Color(sceneSkyColHex),
			sceneSpaceColHex = 0x000022, spaceRGB = new THREE.Color(sceneSpaceColHex);
const hideSoulKeyArr = ['ground', 'hill', 'road', 'bamboo', 'cloud', 'plant', 'other', 'other1', 'place', 'stone', 'other-mountain'];

export function SetSoulScene(soul, self) {
	const {panoBack, islandGroup, birdGroup, totalGroup, frameArr, npcArr, player, soulGroup, controlsOrbit, camera} = self;
	const targetCol = soul?spaceRGB:skyRGB, backColJson = {r:targetCol.r, g:targetCol.g, b:targetCol.b};
	const targetIslandPos = soul?{x:0, y:-1000, z:0}:{...self.oldIslandPos};
	const targetCameraPos = soul?{x:0, y:3000, z:2000}:{...self.oldCameraPos};
	const backOpaVal = soul?0:1;
	// soulGroup.position.y = -3000;
	// self.controlsOrbit.maxPolarAngle = soul?Math.PI:Math.PI / 2 + 0.5;

	if (soul) {
		self.oldIslandPos = {...self.islandGroup.position};
		self.oldCameraPos = {...camera.position};
	} else {
	}
	
	setTimeout(() => {
		// SetColTween(panoBack.material, backColJson, timeTransSoul);
		SetTween(panoBack.material, 'opacity', backOpaVal, timeTransSoul);
		SetTween(islandGroup, 'position', targetIslandPos, timeTransSoul);
		SetTween(self.camera, 'position', targetCameraPos, timeTransSoul);
		for (let i = 0; i <= timeTransSoul/10; i++) {
			setTimeout(() => {
				camera.lookAt(new THREE.Vector3(0, 0, 0));
			}, i * 10);
		}
	}, soul?0:timeUpSoul);
	setTimeout(() => {
		islandGroup.children[0].children.forEach(group => {
			if (hideSoulKeyArr.includes(group.name)) {
				group.visible = !soul;
			}
		});
	}, soul?0:timeTransSoul);
	setTimeout(() => {
		SetFrameArrMat(frameArr, soul);
		soulGroup.visible = soul;
	}, soul?timeTransSoul:timeUpSoul);
	setTimeout(() => {
		player.visible = !soul;
		npcArr.forEach(npc => { npc.visible = !soul; });
	}, soul?0: timeTransSoul + timeUpSoul);
	setTimeout(() => {
		birdGroup.visible = soul;
		controlsOrbit.minDistance = soul?300:camDis * 0.5;
		if (!soul) SetTween(totalGroup, 'position', {x:0, y:0, z:0}, timeUpSoul);
	}, soul?timeTransSoul+timeUpSoul * 3:0);

	controlsOrbit.minPolarAngle = 0;
	controlsOrbit.enableZoom = soul;
	controlsOrbit.enableRotate = !soul;

	controlsOrbit.maxDistance = 5500;
	setTimeout(() => {
		controlsOrbit.minPolarAngle = soul?0:0.5;
		controlsOrbit.maxPolarAngle = soul?0.8:Math.PI / 2 + 0.5;
	}, timeTransSoul+timeUpSoul);
}

const minFrameOpa = 0.2, opaInt = 0.05;

function SetFrameArrMat(frameArr, value) {
	frameArr.forEach(frame => {
		if (frame.material.length) {
			frame.material.forEach(mat => {
				mat.transparent = true;
				mat.needsUpdate = true;
			});
		} else {
			frame.material.transparent = true;
			frame.material.needsUpdate = true;
		}
	});
	for (let i = minFrameOpa; i <= 1; i += opaInt) {
		setTimeout(() => {
			const opa = value?1-i + minFrameOpa:i;
			frameArr.forEach(frame => {
				if (frame.material.length) {
					frame.material.forEach(mat => {
						mat.opacity = opa;
					});
				} else {
					frame.material.opacity = opa;
				}
			});
		}, (i-minFrameOpa) * 1000);
	}
	if  (!value) {
		setTimeout(() => {
			frameArr.forEach(frame => {
				if (frame.material.length) {
					frame.material.forEach(mat => {
						mat.transparent = false;
						mat.opacity = 1;
					});
				} else {
					frame.material.opacity = 1;
					frame.material.transparent = false;
				}
			});
		}, (1-minFrameOpa) * 1000);
	}
}

export function CameraZoom(e, self) {
	const {camera, totalGroup} = self, {clientX, clientY, deltaY} = e;
	const camDis = GetDis({x:0, y:0, z:0}, camera.position, true);
	const xR = (innerWidth/2 - clientX) / innerWidth, yR = (innerHeight/2- clientY) / innerHeight;
	const moveRate = 300;
	if (deltaY < 0) {
		totalGroup.position.x += xR * moveRate;
		totalGroup.position.z += yR * moveRate;
	} else {
		const posIsland = totalGroup.position;
		const moveX = posIsland.x>0?-20:20;
		const moveZ = posIsland.z>0?-20:20;
		totalGroup.position.x += moveX;
		totalGroup.position.z += moveZ;
	}
}