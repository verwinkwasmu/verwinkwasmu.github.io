import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-uUdiCmVRk8bwGfq2C5LI/mode=imports,min/optimized/three.js';

let scene, camera, renderer, cloudParticles = [], composer;

function init() {
    const canvas = document.querySelector('canvas.webgl')

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff7474);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let orangeLight = new THREE.PointLight(0xff7474, 50, 450, 1.7);
    orangeLight.position.set(200, 300, 100);
    scene.add(orangeLight);

    let redLight = new THREE.PointLight(0xff7474, 50, 450, 1.7);
    redLight.position.set(100, 300, 100);
    scene.add(redLight);

    let blueLight = new THREE.PointLight(0xff7474, 50, 450, 1.7);
    blueLight.position.set(300, 300, 200);
    scene.add(blueLight);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
        
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.fog = new THREE.FogExp2(0x0c141f, 0.001);
    renderer.setClearColor(scene.fog.color);

    let loader = new THREE.TextureLoader();

    loader.load("/static/texture/smoke.png", function (texture) {
        //texture is loaded
        let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 50; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 2 * Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });
    
    render()
}

function render() {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.001;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
init();