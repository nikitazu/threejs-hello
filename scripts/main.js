function main_init(exports) {
	let scene;
	let camera;
	let renderer;

	scene_setup();
	const game = exports.app_game_init(exports);
  game.start(scene);
  render();
	
	function scene_setup() {
		//This is all code needed to set up a basic ThreeJS scene
		//First we initialize the scene and our camera
		scene = new exports.three.Scene();
		camera = new exports.three.PerspectiveCamera(
			75
		, exports.window.innerWidth / exports.window.innerHeight
		, 0.1
		, 1000
		);
		//We create the WebGL renderer and add it to the document
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(exports.window.innerWidth, exports.window.innerHeight);
		exports.document.body.appendChild(renderer.domElement);
	}
	
	function render() {
    game.render();
		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
}
