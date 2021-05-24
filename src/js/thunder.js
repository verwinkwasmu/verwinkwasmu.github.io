import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.128.0-uUdiCmVRk8bwGfq2C5LI/mode=imports,min/optimized/three.js';

let scene, camera, renderer, cloudParticles = [], flash;

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

    let directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    });
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let loader = new THREE.TextureLoader();
    loader.load("/static/texture/smoke.png", function (texture) {

        let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for (let p = 0; p < 25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.6;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
        animate();
    });
    function animate() {
        cloudParticles.forEach(p => {
            p.rotation.z -= 0.002;
        });

        if (Math.random() > 0.93 || flash.power > 100) {
            if (flash.power < 100)
                flash.position.set(
                    Math.random() * 400,
                    300 + Math.random() * 200,
                    100
                );
            flash.power = 50 + Math.random() * 500;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
}
init()
