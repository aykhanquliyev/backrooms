// import TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/17.2.0/Tween.js'
import { OrbitControls } from './build/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'
import { FlyControls } from './build/FlyControls.js'


// CANVAS
const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75,
    innerWidth / innerHeight,
    0.1,
    10000
);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});


// Renderer
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Camera position
camera.position.x = 0
camera.position.y = 50
camera.position.z = 1250

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target = new THREE.Vector3(900, -250, 1250)

// Textures
const wall = new THREE.TextureLoader().load('./texture/wall.jpg')
const ceiling = new THREE.TextureLoader().load('./texture/wall.jpg')
const floor = new THREE.TextureLoader().load('./texture/floor.jpeg')
const abc = new THREE.TextureLoader().load('./texture/BACKROOMS.png')
const vazeh = new THREE.TextureLoader().load('./texture/vazeh.png')
wall.wrapS = THREE.RepeatWrapping;
wall.wrapT = THREE.RepeatWrapping;
wall.repeat.x = 20
wall.repeat.y = 5
floor.wrapS = THREE.RepeatWrapping;
floor.wrapT = THREE.RepeatWrapping;
floor.repeat.y = 5
floor.repeat.x = 5
ceiling.wrapS = THREE.RepeatWrapping;
ceiling.wrapT = THREE.RepeatWrapping;
ceiling.repeat.x = 100
ceiling.repeat.y = 20

// ROOMS

const geometry1 = new THREE.BoxGeometry( 50000, 2600, 70 );
const geometry2 = new THREE.BoxGeometry( 50000, 2600, 50 );
const geometry3 = new THREE.BoxGeometry( 600, 500, 120 );
const material1 = new THREE.MeshBasicMaterial( { map: wall } );
const material2 = new THREE.MeshBasicMaterial( { map: floor } );
const material3 = new THREE.MeshBasicMaterial( { map: ceiling } );
const material4 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const cube1 = new THREE.Mesh( geometry1, material1 );
cube1.position.x = 0
cube1.position.y = 0
scene.add( cube1 );

const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.z = 1250
cube2.position.y = -1250
cube2.rotation.x = Math.PI / 2;
scene.add( cube2 );

const cube3 = new THREE.Mesh( geometry1, material1 );
cube3.position.z = 2500
scene.add( cube3 );

const cube4 = new THREE.Mesh( geometry2, material3 );
cube4.position.z = 1250
cube4.position.y = 1250
cube4.rotation.x = Math.PI / 2;
scene.add( cube4 )

const cube5 = new THREE.Mesh( geometry2, material1 );
cube5.position.x = 9000
cube5.position.z = 1250
cube5.position.y = 0
cube5.rotation.y = Math.PI / 2;
scene.add( cube5 );

const cube7 = new THREE.Mesh( 
    new THREE
    .BoxGeometry( 800, 600, 120 ) ,
    new THREE.
    MeshBasicMaterial( { map: abc } ) );
cube7.position.x = 800

scene.add( cube7 );

const cube8 = new THREE.Mesh( 
    new THREE
    .BoxGeometry( 1500, 1000, 10 ) ,
    new THREE.
    MeshBasicMaterial( { map: vazeh } ) );
cube8.position.x = 30000
cube8.position.z = 1250
cube8.rotation.y = Math.PI / 2;
scene.add( cube8 );
const v1 = new THREE.Vector3(-3000, 0, 1250)
// const v2 = new THREE.Vector3(0, 0.5, 0)


// Lights
const group = new THREE.Group()
let cube6
let light = {x: 100, y: 1250, z: 1250}
for ( let i = 0; i < 10; i++) {
        cube6 = new THREE.Mesh( geometry3, material4 );
        cube6.position.set(light.x, light.y, light.z)
        cube6.rotation.x = Math.PI / 2;
        group.add(cube6); 
        light.x += 1400
}
scene.add(group)



// Animate
function animate() {
    requestAnimationFrame(animate);
    // cube8.position.lerpVectors(v1, v2, 1.0)
    controls.update();
    cube8.position.lerp(v1, 0.004);
    render();
}

function render() {
    renderer.render(scene, camera);
}
animate();