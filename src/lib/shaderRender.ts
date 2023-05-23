import * as THREE from 'three'

export function shaderRender(container: HTMLElement, fragmentShader: string, vertexShader?: string) {
  const camera = new THREE.PerspectiveCamera();

  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  const geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  const uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  const material = new THREE.ShaderMaterial( {
      uniforms,
      fragmentShader,
      vertexShader
  } );

  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );

  container.appendChild( renderer.domElement );

  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );

  document.onmousemove = function(e){
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }

  function onWindowResize() {
    renderer.setSize( container.clientWidth, container.clientHeight );
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {
      uniforms.u_time.value += clock.getDelta();
      renderer.render( scene, camera );
  }

  animate()
  return renderer
}