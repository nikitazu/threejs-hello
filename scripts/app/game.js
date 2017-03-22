function app_game_init(
    three
  , dom
  ) {
  let cube;

	function start(scene) {
    
    const greenMaterial = new three.MeshBasicMaterial({
      color: 0x00ff00
    });
    
    const fragShader = dom.getCodeById("fragShader");
    const shaderMaterial = new three.ShaderMaterial({
      fragmentShader: fragShader
    });

    const box = new three.BoxGeometry( 1, 1, 1 );
    cube = new three.Mesh( box, greenMaterial );
    
    const plane = new three.PlaneGeometry(10, 10);
    const sprite = new three.Mesh(plane, shaderMaterial);
    
    scene.add(cube);
    scene.add(sprite);
    
    cube.position.z = -3;
    sprite.position.z = -4;
	}

	function render(){
		cube.rotation.y += 0.02;
	};
	
	return {
	  start  : start
  , render : render
	};
}
