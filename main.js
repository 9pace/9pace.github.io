import * as THREE from "three";

const canvas = document.getElementById("scene");
const w = canvas.clientWidth;
const h = canvas.clientHeight;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h, false);

// Perspective camera
const fov = 45;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5;

// Scene
const scene = new THREE.Scene();

// Geo
const geo = new THREE.IcosahedronGeometry(1.0, 3);
const mat = new THREE.MeshStandardMaterial({ color: 0x00ff00,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(light);

// animation 
function animate(t=0) {
    requestAnimationFrame(animate);
    
    // Sync canvas size with CSS
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    // rotation
    mesh.rotation.x = t * 0.00015;
    mesh.rotation.y = t * 0.0003;
    renderer.render(scene, camera);
}
animate();
