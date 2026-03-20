import * as THREE from 'three';

const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.background = null; // transparent

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 3, 10);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(1, 2, 1);
scene.add(dirLight);
const pointLight = new THREE.PointLight(0x1e6df2, 1, 20);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Floating particles
const particleCount = 800;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i+1] = (Math.random() - 0.5) * 20;
    positions[i+2] = (Math.random() - 0.5) * 30;
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({ color: 0x1e6df2, size: 0.05, transparent: true, opacity: 0.4 });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.0002;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
