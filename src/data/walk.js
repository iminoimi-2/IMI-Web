import * as THREE from 'three';
import { GetRandomWalkAng, birdWingRotMax, birdWingRotUnit, walkDuration } from './load';

const moveInt = 3000, velInt = 10;
const raycaster = new THREE.Raycaster();
const velocity = new THREE.Vector3(0, 0, 0);
const direction = new THREE.Vector3(0, 0, 0);

export function PlayerMove(self, deltaTime) {
	// raycaster.ray.origin.copy( controls.getObject().position );
	// raycaster.ray.origin.y -= 10;
	// const intersections = raycaster.intersectObjects( objects, false );
	// const onObject = intersections.length > 0;

	const {islandGroup, playerMark, nearObstArr, nearGroundArr, player, camera} = self;
	velocity.x -= velocity.x * velInt * deltaTime;
	velocity.z -= velocity.z * velInt * deltaTime;

	// this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

	direction.z = Number( self.moveForward ) - Number( self.moveBackward );
	direction.x = Number( self.moveRight ) - Number( self.moveLeft );
	direction.normalize(); // this ensures consistent movements in all directions

	if ( self.moveForward || self.moveBackward ) velocity.z -= direction.z * moveInt * deltaTime;
	if ( self.moveLeft || self.moveRight ) velocity.x -= direction.x * moveInt * deltaTime;

	if (Math.abs(velocity.x) < 0.01) velocity.x = 0;
	if (Math.abs(velocity.z) < 0.01) velocity.z = 0;

	const camDir = camera.getWorldDirection(new THREE.Vector3()),
	norDir = new THREE.Vector3(camDir.x, 0, camDir.z);
	if (velocity.x || velocity.z) {
		const moveX = velocity.x * deltaTime, moveZ = velocity.z * deltaTime;
		const islandPos = islandGroup.position;

		const transZ = (norDir.z * moveZ), //  + norDir.x * moveX
			  transX = (norDir.x * moveZ); //  + norDir.z * moveX

		playerMark.position.z = -transZ * 2;
		playerMark.position.x = -transX * 2;
		const posSObst = new THREE.Vector3(playerMark.position.x, 10000, playerMark.position.z),
			posTObst = new THREE.Vector3(playerMark.position.x, -10000, playerMark.position.z),
			obstLineVec = new THREE.Vector3();
		obstLineVec.subVectors(posTObst, posSObst);
		obstLineVec.normalize();
		raycaster.set(posSObst, obstLineVec);
		const interObst = raycaster.intersectObjects(nearObstArr, false); // realMeshArr
		if (interObst[0] && interObst[0].object) {
			self.moveForward = false; self.moveRight = false;
			self.moveBackward = false; self.moveLeft = false;
			velocity.x = 0;
			velocity.z = 0;
			return;
		}

		islandGroup.position.x = islandPos.x + transX;
		islandGroup.position.z = islandPos.z + transZ;

		// console.log(moveX);
		// console.log(Math.round(this.camera.position.z), Math.round(this.player.position.z));
		// console.log(this.camera.position.x);

		const posStart = new THREE.Vector3(0, 10000, 0),
			posTarget = new THREE.Vector3(0, -10000, 0),
			altLineVec = new THREE.Vector3();
		altLineVec.subVectors(posTarget, posStart);
		altLineVec.normalize();
		raycaster.set(posStart, altLineVec);
		const interGround = raycaster.intersectObjects(nearGroundArr, false); // realMeshArr
		if (interGround[0] && interGround[0].object) {
			const {point} = interGround[0];
			const delta = point.y + 80;
			islandGroup.position.y -= delta;
		}

	}
	if (player) {
		player.lookAt(new THREE.Vector3(-camDir.z, 0, camDir.x));
	}
}

export function WalkNPC(self) {
	const {npcArr, state} = self;
	if (!state.gameMode) return;
	npcArr.filter(item=>{return item.fixed !== true}).forEach((npc, idx) => {
		const {vPos, walkInfo} = npc;
		if (!vPos || !walkInfo) return;
		const {randAng, xDelta, zDelta, time, dir} = walkInfo;
		npc.position.x = vPos.x + xDelta * time;
		npc.position.z = vPos.z + zDelta * time;
		npc.walkInfo.time += dir;
		// npc.lookAt(new THREE.Vector3(vPos.x * -dir, 0, vPos.z * -dir));
		
		if (npc.walkInfo.time >= walkDuration) {
			npc.walkInfo.dir = -1;
			npc.rotation.y = randAng + Math.PI;
		}
		if (npc.walkInfo.time <= 0) {
			npc.walkInfo = GetRandomWalkAng();
			npc.walkInfo.dir = 1;
			npc.walkInfo.time = 0;
			npc.rotation.y = npc.walkInfo.randAng;
		}
	});
}

export function FlySoul(soulArr) {
	soulArr.forEach(soul => {
		const {pulseTime, moveUnit, flyDir} = soul;
		soul.position.y += moveUnit * flyDir;
		soul.moveTime += flyDir;
		if (soul.moveTime >= pulseTime) soul.flyDir = -1;
		else if (soul.moveTime <= 0) soul.flyDir = 1;
	});
}

export function FlyBirdWing(birdArr) {
	birdArr.forEach(bird => {
		const rotY = bird.children[0].rotation.y,
			rotNext = rotY + birdWingRotUnit * bird.wingDir;
		bird.children[0].rotation.y = rotNext;
		bird.children[1].rotation.y = -rotNext;
		if (rotNext >= birdWingRotMax) bird.wingDir = -1;
		else if (rotNext <= -birdWingRotMax) bird.wingDir = 1;
	});
}

export function FlySoulNodes(nodeGroup) {
	if (!nodeGroup || !nodeGroup.children) return;
	nodeGroup.children.forEach((node, idx) => {
		// if (idx===0) return;
		const {position, flyDir, flyArea} = node, {min, max} = flyArea, nextPos = {};
		['x', 'y', 'z'].forEach(axis => {
			var nextPosVal = position[axis] + flyDir[axis];
			if 		(nextPosVal <= min[axis] && flyDir[axis] < 0) {node.flyDir[axis] *= -1; nextPosVal = position[axis] + node.flyDir[axis];}
			else if (nextPosVal >= max[axis] && flyDir[axis] > 0) {node.flyDir[axis] *= -1; nextPosVal = position[axis] + node.flyDir[axis];}
			nextPos[axis] = nextPosVal;
		});
		node.position.set(nextPos.x, nextPos.y, nextPos.z);
	});
}

export function DrawSoulLines(soulGroup) {
	const {children} = soulGroup, nodeGroup = children[0], lineGroup = children[1];
	lineGroup.children.forEach((line, idx) => {
		const {nodeArr} = line,
			positionAttribute = line.geometry.getAttribute( 'position' );

		const vertex = new THREE.Vector3();
		for ( let i = 0; i < 2; i ++ ) {
			vertex.fromBufferAttribute( positionAttribute, i ); // read vertex
			const {position} = nodeGroup.children[nodeArr[i]];
			positionAttribute.setXYZ( i, position.x, position.y, position.z ); // write coordinates back
		}
		line.geometry.attributes.position.needsUpdate = true;
	});
}