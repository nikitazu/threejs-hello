function app_game_init(
    three
  , dom
  , shaderId
  ) {
  let cube;
  let sprite;
  let uniforms;

  const textureLoader = new three.TextureLoader();

	function start(scene) {
    
    uniforms = {
      resolution : {
        type  : 'v2'
      , value : new three.Vector2(
          dom.getWindowInnerWidth()
        , dom.getWindowInnerHeight()
        )
      }
    , ticks : {
        type  : 'f'
      , value : dom.getTicks()
      }
      , texture : {
          type  : 't'
        , value : undefined
      }
    };

    load_texture("images/morevna512.png");

    const fragShader = dom.getCodeById(shaderId);

    cube = make_cube();
    sprite = make_shaded_sprite(fragShader, uniforms);
    
    scene.add(cube);
    scene.add(sprite);
    
    cube.position.z = -3;
    sprite.position.z = -4;
	}

	function render() {
    cube.rotation.y += 0.02;
    uniforms.resolution.value.x = dom.getWindowInnerWidth();
    uniforms.resolution.value.y = dom.getWindowInnerHeight();
    uniforms.ticks.value = dom.getTicks();
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
  
  function load_texture(url) {
    const done = texture => uniforms.texture.value = texture;
    const progress = xhr => console.log("txld: " + (xhr.loaded / xhr.total * 100) + "%");
    const error = xhr => console.log("txld: error");
    textureLoader.load(url, done, progress, error);
  }
	
	return {
	  start  : start
  , render : render
	};
}
