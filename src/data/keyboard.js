
export function OnKeyDown(e, self) {
	if (self.state.soulMode) return;
	switch ( e.code ) {
		case 'ArrowUp':
		case 'KeyW':
			self.moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			self.moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			self.moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			self.moveRight = true;
			break;

		case 'Space':
			// if ( canJump === true ) velocity.y += 350;
			// canJump = false;
			break;

	}
}

export function OnKeyUp(e, self) {
	if (self.state.soulMode) return;
	switch ( e.code ) {

		case 'ArrowUp':
		case 'KeyW':
				self.moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			self.moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			self.moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			self.moveRight = false;
			break;
		
		case 'KeyO':
			self.setControls('orbit');
			break;

		case 'KeyP':
			self.setControls('person');
			break;
	}
}