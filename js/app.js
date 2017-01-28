var scene;
var camera;
var renderer;
var cameraControls;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1, 1000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 23;
	camera.lookAt(scene.position);

	cameraControls = new THREE.OrbitControls(camera);
}

function createLight() {
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(10, 40, 20);
	spotLight.shadowCameraNear = 20;
	spotLight.shadowCameraFar = 50;
	spotLight.castShadow = true;
	scene.add(spotLight);
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();
	createLight();
	
	document.body.appendChild(renderer.domElement);

	render();
}

function render() {

	cameraControls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

init();




