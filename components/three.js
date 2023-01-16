import { Thasadith } from '@next/font/google';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default class ViewGL{
    constructor(canvasRef) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });

        const controls = new OrbitControls( this.camera, this.renderer.domElement);
        controls.maxDistance = 7.0;
        controls.minDistance = 2.0
        controls.enablePan = false;
        controls.enableZoom = false;

        //loaders
          let loadedModel;
          const GLTFloader = new GLTFLoader();
          GLTFloader.load("/images/astronaut-green.gltf", (gltfScene) =>{
            loadedModel = gltfScene.scene;

            gltfScene.scene.position.y = -1;
            gltfScene.scene.rotateY = 2;
            gltfScene.scene.scale.set(1.5, 1.5, 1.5);
            this.scene.add(gltfScene.scene);
          });

        const loader = new THREE.TextureLoader();
        const sprite = loader.load('/images/disc.png');

        //materials
        const particlesMaterial = new THREE.PointsMaterial( { 
            size: 0.02, 
            sizeAttenuation: true, 
            map: sprite, 
            alphaTest: .2, 
            transparent: true, 
            fog: true, } );

        particlesMaterial.color.setHSL( 1.0, 0.3, 0.7 );
        particlesMaterial.color = new THREE.Color(0xf2ebc4);

        //geometries
        const particleGeometry = new THREE.BufferGeometry;

        const particlesCnt = 25000;

        const posArray = new Float32Array(particlesCnt * 3);

        for(let i = 0; i < particlesCnt * 3; i++){
            posArray[i] = (Math.random() - 0.5) * 15;  
    
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        //camera
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 7;
        this.scene.add(this.camera);

        // Mesh
        const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial);
        this.scene.add(particlesMesh);

        //lights

        const ambLight = new THREE.AmbientLight(0x404040, 5)

        const sun = new THREE.PointLight(0xFDB813, 3);
        sun.position.y = 5;
        sun.position.x = 5;
        sun.position.z = 5;

        const pointLight = new THREE.PointLight(0xffffff, .1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        this.scene.add(pointLight, ambLight, sun);

        const clock = new THREE.Clock();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(new THREE.Color('#000000'), 1)
        this.scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );


        const tick = () =>
{

    const elapsedTime = clock.getElapsedTime();
    const time = Date.now() * 0.00005;

    // Update objects

    if(loadedModel){
        loadedModel.rotation.y = -time * elapsedTime * 0.00000002;
        loadedModel.rotation.x = -time * elapsedTime * 0.00000000025;
        loadedModel.rotation.z = -time * elapsedTime * 0.000000002;
    }
    particlesMesh.rotation.y =  -time * elapsedTime * 0.000000001;

    // Render
    this.renderer.render(this.scene, this.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
    //listen to mouse movement
    document.addEventListener('mousemove', animateParticles);

        let mouseX = 0;
        let mouseY = 0;
        
        function animateParticles(event){
            mouseY = event.clientY;
            mouseX = event.clientX;
        }
        tick();

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