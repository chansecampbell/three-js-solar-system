var scene;
var camera;
var renderer;
var cameraControls;
var sun;

function createRenderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
}

function createCamera() {
	camera = new THREE.PerspectiveCamera(
		125,
		window.innerWidth / window.innerHeight,
		0.1, 1000);
	camera.position.x = 15;
	camera.position.y = 16;
	camera.position.z = 23;
	camera.lookAt(scene.position);

	cameraControls = new THREE.OrbitControls(camera);
}

function createSunMaterial() {
	
	var texture = new THREE.Texture();
	var loader = new THREE.ImageLoader();
	loader.load('assets/2k_sun.jpg', function(image) {
		texture.image = image;
		texture.needsUpdate = true;
	});

	var material = new THREE.MeshBasicMaterial();
	material.map = texture;

	return material;
}

function createSun() {
	var geometry = new THREE.SphereGeometry(15, 30, 30);
	var material = createSunMaterial();

	sun = new THREE.Mesh(geometry, material);
	sun.name = 'sun';
	scene.add(sun);
}

function createGlow() {
	var glow = new THREE.PointLight( 0xffffff, 0.5, 200 );
	glow.position.set(0, 0 ,0);
	scene.add(glow);
}


function createLight() {
	// var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight.position.set(100, 10, -50);
	// directionalLight.name = "directional";
	// scene.add(directionalLight);

	var ambientLight = new THREE.AmbientLight(0x111111);
	// scene.add(ambientLight);
}

function init() {
	scene = new THREE.Scene();

	createRenderer();
	createCamera();
	// createLight();
	createGlow();
	createSun();
	
	document.body.appendChild(renderer.domElement);

	render();
}

function render() {

	cameraControls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

init();




