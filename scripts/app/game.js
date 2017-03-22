function app_game_init(
    three
  , dom
  ) {
  let cube;
  let sprite;
  let uniforms;

	function start(scene) {
    
    uniforms = {
      resolution: {
        type  : 'v2'
      , value : new three.Vector2(
          dom.getWindowInnerWidth()
        , dom.getWindowInnerHeight()
        )
      }
    };
    
    const fragShader = dom.getCodeById("shader_02_four_squares");

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);
    
    scene.add(cube);
    scene.add(sprite);
    
    cube.position.z = -3;
    sprite.position.z = -4;
	}

	function render(){
    cube.rotation.y += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
	};
  
  function make_cube() {
    return new three.Mesh(
      new three.BoxGeometry(1, 1, 1),
      new three.MeshBasicMaterial({ color: 0x00ff00 })
    );
  }
  
  function make_shaded_sprite(shader, uniforms) {
    return new three.Mesh(
      new three.PlaneGeometry(10, 10),
      new three.ShaderMaterial({
        fragmentShader: shader
      , uniforms: uniforms
      })
    );
  }
	
	return {
	  start  : start
  , render : render
	};
}
