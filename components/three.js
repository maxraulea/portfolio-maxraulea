import { Thasadith } from '@next/font/google';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class ViewGL{
    constructor(canvasRef) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });

        const loader = new THREE.TextureLoader();
        const leaf = loader.load('/images/tropical-leaf-icon-by-Vexels.png');



        const particlesMaterial = new THREE.PointsMaterial({
            size: .05,
            map: leaf,
            transparent: true
        });
        particlesMaterial.color = new THREE.Color(0xCBDCCB);

        const particleGeometry = new THREE.BufferGeometry;
        const  particlesCnt = 500;

        const posArray = new Float32Array(particlesCnt * 3);

        for(let i = 0; i < particlesCnt * 3; i++){
            posArray[i] = (Math.random() - 0.5) * 5;  
    
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 2;
        this.scene.add(this.camera);


        // Mesh
        const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial);
        this.scene.add(particlesMesh);

        // Create meshes, materials, etc.

        const pointLight = new THREE.PointLight(0xffffff, 0.1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        this.scene.add(pointLight);

        const clock = new THREE.Clock();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(new THREE.Color('#21282a'), 1)

        const tick = () =>
{

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    particlesMesh.up
    particlesMesh.rotation.y =  -mouseX * elapsedTime * 0.00005;
    particlesMesh.rotation.x = -mouseY * elapsedTime * 0.00005;
    

    // Update Orbital Controls
    // controls.update()

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;
function animateParticles(event){
mouseY = event.clientY;
mouseX = event.clientX;
}

tick()

    
        this.update();
    }



    // ******************* PUBLIC EVENTS ******************* //
    updateValue(value) {
      // Whatever you need to do with React props
    }

    onMouseMove() {
      
    }

    onWindowResize(vpW, vpH) {
        this.renderer.setSize(vpW, vpH);
    }

    // ******************* RENDER LOOP ******************* //
    update(t) {
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.update.bind(this));
    }
}