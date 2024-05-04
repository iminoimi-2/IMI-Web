
import * as THREE from 'three';
import { SetColTween, SetTween } from "./info";
import { camDis, timeTransSoul, timeUpSoul } from '../components/Canvas';


export const sceneSkyColHex = 0x30ACEA, skyRGB = new THREE.Color(sceneSkyColHex),
			sceneSpaceColHex = 0x000022, spaceRGB = new THREE.Color(sceneSpaceColHex);
const hideSoulKeyArr = ['ground', 'hill', 'road', 'bamboo', 'cloud', 'plant', 'other', 'other1', 'place', 'stone', 'other-mountain'];

export function SetSoulScene(soul, self) {
	const {panoBack, islandGroup, birdGroup, frameArr, npcArr, player, soulGroup} = self;
	const targetCol = soul?spaceRGB:skyRGB, targetJson = {r:targetCol.r, g:targetCol.g, b:targetCol.b};
	const targetIslandPos = soul?{x:0, y:-1000, z:0}:{...self.oldIslandPos};
	const targetCameraPos = soul?{x:0, y:camDis, z:1}:{...self.oldCameraPos};
	soulGroup.position.y = -3000;
	// self.controlsOrbit.maxPolarAngle = soul?Math.PI:Math.PI / 2 + 0.5;

	if (soul) {
		self.oldIslandPos = {...self.islandGroup.position};
		self.oldCameraPos = {...self.camera.position};
	} else {
	}
	const playerPos = self.islandGroup.position;
	setTimeout(() => {
		SetColTween(panoBack.material, targetJson, timeTransSoul);
		SetTween(islandGroup, 'position', targetIslandPos, timeTransSoul);
		SetTween(self.camera, 'position', targetCameraPos, timeTransSoul);
		for (let i = 0; i <= timeTransSoul/10; i++) {
			setTimeout(() => {
				self.camera.lookAt(new THREE.Vector3(0, 0, 0));
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
	}, soul?timeTransSoul+timeUpSoul * 3:0);

	self.controlsOrbit.minPolarAngle = 0;
	setTimeout(() => {
		self.controlsOrbit.minPolarAngle = soul?0:0.5;
		self.controlsOrbit.maxPolarAngle = soul?0.2:Math.PI / 2 + 0.5;
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
