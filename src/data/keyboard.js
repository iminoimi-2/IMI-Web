
export function OnKeyDown(e, self) {
	const {controlKey} = self;
	switch ( e.code ) {
		case 'ArrowUp':
		case 'KeyW':
			if (controlKey==='person') {self.moveForward = true;}
			break;

		case 'ArrowLeft':
		case 'KeyA':
			if (controlKey==='person') {self.moveLeft = true;}
			break;

		case 'ArrowDown':
		case 'KeyS':
			if (controlKey==='person') {self.moveBackward = true;}
			break;

		case 'ArrowRight':
		case 'KeyD':
			if (controlKey==='person') {self.moveRight = true;}
			break;

		case 'Space':
			// if ( canJump === true ) velocity.y += 350;
			// canJump = false;
			break;

	}
}

export function OnKeyUp(e, self) {
	const {controlKey} = self;
	
	switch ( e.code ) {

		case 'ArrowUp':
		case 'KeyW':
			if (controlKey==='person') {
				self.moveForward = false;
			}
			break;

		case 'ArrowLeft':
		case 'KeyA':
			if (controlKey==='person') {self.moveLeft = false;}
			break;

		case 'ArrowDown':
		case 'KeyS':
			if (controlKey==='person') {self.moveBackward = false;}
			break;

		case 'ArrowRight':
		case 'KeyD':
			if (controlKey==='person') {self.moveRight = false;}
			break;
		
		case 'KeyO':
			self.setControls('orbit');
			break;

		case 'KeyP':
			self.setControls('person');
			break;
	}
}