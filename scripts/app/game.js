function app_game_init(
    three
  , dom
  , shaderId
  ) {
  let cube;
  let sprite;
  let uniforms;
  let ticks = 1.0;

  const textureLoader = new three.TextureLoader();
  textureLoader.crossOrigin = '';

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
      , value : ticks
      }
      , texture : {
          type  : 't'
        , value : undefined
      }
    };

    load_texture("https://tutsplus.github.io/Beginners-Guide-to-Shaders/Part2/SIPI_Jelly_Beans.jpg");
    
    const fragShader = dom.getCodeById(shaderId);

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
    uniforms.ticks.value = ticks;
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
