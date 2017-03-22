function app_game_init(three) {
  let cube;

	function start(scene) {
    const geometry = new three.BoxGeometry( 1, 1, 1 );
    const material = new three.MeshBasicMaterial( { color: 0x00ff00} );//We make it green
    cube = new three.Mesh( geometry, material );
    //Add it to the screen
    scene.add( cube );
    cube.position.z = -3;//Shift the cube back so we can see it
	}

	function render(){
		cube.rotation.y += 0.02;
	};
	
	return {
	  start  : start
  , render : render
	};
}