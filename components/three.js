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

        window.addEventListener("wheel", function(e) {
            if(controls.getDistance() > 6.9 ){
                controls.enableZoom = false;
            }

          }, true);


          let loadedModel;
          const GLTFloader = new GLTFLoader();
          GLTFloader.load("/images/astronaut.gltf", (gltfScene) =>{
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

       function getArtThing({verticies, colours}){

        const artMaterial = new THREE.MeshBasicMaterial({
            vertexColors: true,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3,
            shininess: 250,
            specular: 0xffffff
        });

        const art = new THREE.BufferGeometry;
        art.setAttribute("position", new THREE.Float32BufferAttribute(verticies, 4));
        art.setAttribute("color", new THREE.Float32BufferAttribute(colours, 3));
        art.computeBoundingSphere();

        const mesh = new THREE.Mesh(art, artMaterial);

        function update(){
            
            
        }
        return { mesh, update };
       }

       function getPoints(){
            const verticies = [];
            const colours = [];
            const numPoints = 100;
            const size = 2;
            let w, x, y, z, r, g, b;
            for(let i = 0; i < numPoints; i++){
                
                x =Math.random() * size - size * 0.5;
                y = Math.random() * size - size * 0.5;
                z = Math.random() * size - size * 0.5;
                w = Math.random() * size - size * 0.5; 
                verticies.push(w, x, y, z)
                r = Math.random() * 1.2;
                g = Math.random() * 1.2;
                b = Math.random() * 1.2;
                colours.push(r, g, b)
            }
            return {verticies, colours };
       }

        const points = getPoints();
        const artThing = getArtThing(points);


        const posArray = new Float32Array(particlesCnt * 3);

        for(let i = 0; i < particlesCnt * 3; i++){
            posArray[i] = (Math.random() - 0.5) * 15;  
    
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 3;
        this.scene.add(this.camera);

        // Mesh
        const particlesMesh = new THREE.Points(particleGeometry, particlesMaterial);
        artThing.mesh.position.x = 0;
        artThing.mesh.position.y = 0;
        artThing.mesh.position.z = 0;
        artThing.mesh.rotateY(4);
        this.scene.add(particlesMesh);

        // Create meshes, materials, etc.

        const ambLight = new THREE.AmbientLight(0x404040, 5)

        const pointLight = new THREE.PointLight(0xffffff, .1);
        pointLight.position.x = 2;
        pointLight.position.y = 3;
        pointLight.position.z = 4;
        this.scene.add(pointLight, ambLight);

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
    artThing.update();

    if(loadedModel){
        loadedModel.rotation.y = -time * elapsedTime * 0.00000003;
    }
    particlesMesh.rotation.y =  -time * elapsedTime * 0.000000001;
    /*particlesMesh.rotation.z =  -mouseX  * 0.0005;
    particlesMesh.rotation.x = -mouseY  * 0.0005;
    artThing.mesh.rotation.y = -mouseX  * 0.0005;
    artThing.mesh.rotation.x = -mouseY  * 0.0005;*/

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