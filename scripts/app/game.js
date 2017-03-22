function app_game_init(
    three
  , dom
  ) {
  let cube;
  let sprite;
  let uniforms;
  let ticks = 1.0;

	function start(scene) {
    
    uniforms = {
      resolution : {
        type  : 'v2'
      , value : new three.Vector2(
          dom.getWindowInnerWidth()
        , dom.getWindowInnerHeight()
        )
      }
    , sine : {
        type  : 'f'
      , value : 1.0
      }
    };
    
    const fragShader = dom.getCodeById("shader_03_time_change_color");

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);
    
    scene.add(cube);
    scene.add(sprite);
    
    cube.position.z = -3;
    sprite.position.z = -4;
	}

	function render() {
    ticks += 1;
    
    cube.rotation.y += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
    uniforms.sine.value = Math.abs(Math.sin(ticks * 0.01));
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
