// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'
import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-uUdiCmVRk8bwGfq2C5LI/mode=imports,min/optimized/three.js';


//Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/static/texture/NormalMap1.png')
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const halo = new THREE.Object3D();
const geometry = new THREE.SphereBufferGeometry(0.8, 32, 32);
const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 10000;

var geom3 = new THREE.SphereGeometry(0.08, 32, 32);
var mat3 = new THREE.ShaderMaterial({
    uniforms: {},
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
});


const posArray = new Float32Array(particlesCnt * 3)

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
// Materials
const particleTexture = new THREE.TextureLoader().load("../src/images/particle.png");

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0x292929)
material.normalMap = normalTexture;

const particlesMaterial = new THREE.PointsMaterial({
    color: 'rgb(255, 255, 255)',
    size: 0.009,
    map: new THREE.TextureLoader().load('../src/images/particle.jpeg'),
    transparent: true,
    blending: THREE.AdditiveBlending,


})


// Mesh
const sphere = new THREE.Mesh(geometry, material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
particlesMesh.sortParticles = true;
scene.add(sphere, particlesMesh)
scene.add(halo);
// HALO
var ball = new THREE.Mesh(geom3, mat3);
ball.scale.x = ball.scale.y = ball.scale.z = 16;
halo.add(ball);

var ball2 = new THREE.Mesh(geom3, mat3);
ball2.scale.x = ball2.scale.y = ball2.scale.z = 12;
ball2.position.set(25, 5, 1)
halo.add(ball2);

// Luminor
const luminor = new THREE.Object3D();
scene.add(luminor);
var ambientLight = new THREE.AmbientLight(0x000000);
scene.add(ambientLight);

var hemiLight = new THREE.HemisphereLight(0x000000, 0x1111111, 20);
hemiLight.position.set(-1, -1, 2);
luminor.add(hemiLight);


//Light 1
const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 20
scene.add(pointLight2)



//Light 2
const pointLight3 = new THREE.PointLight(0x6fc3df, 2)
pointLight3.position.set(2.13, -3, -1.98)
pointLight3.intensity = 6.8
scene.add(pointLight3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // change background color
    // renderer.setClearColor(new THREE.Color(),1)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)
document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

function animateParticles(event) {
    mouseY = event.clientY
    mouseX = event.clientX
}

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.y = -.1 * elapsedTime
    halo.rotation.y = .5 * elapsedTime
    halo.rotation.z -= 0.005;
    luminor.rotation.z -= 0.005;

    if (mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00005)
        particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00005)
    }


    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    halo.rotation.y += .5 * (targetX - halo.rotation.y)
    halo.rotation.x += .05 * (targetY - halo.rotation.x)
    halo.position.z += -.05 * (targetY - halo.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()