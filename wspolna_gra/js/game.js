"use strict";

// TODO:
// - obiektowa struktura
// - mapa z kafelków
//
// NOWY SYSTEM ANIMACJI (od 2015)
// - animowane obiekty z Blendera w formacie glTF, ładowane przez GLTFLoader
// https://threejs.org/docs/?q=anima#manual/en/introduction/Animation-system

class GameScene extends THREE.Scene {
    constructor() {
        super();
        // It is nontrivial to check the real type of an object (the class)
        // in JS, but THREE.Scene altready has `this.type === "Scene"`
        // this.type = "GameScene";
    }
}

class OrthoView3D {
    constructor(container_id, scene) {
        this.container = document.getElementById(container_id);
        if (this.container === null) {
            window.alert("ERROR: game container element of id \"" +
                         container_id + "\" NOT FOUND");
        }
        this.updateSize() // sets this.width and this.height
        // https://threejs.org/docs/?q=cam#api/en/cameras/OrthographicCamera
        this.camera = new THREE.OrthographicCamera(
            // Camera view volume (cuboid for orthographic, frustrum for
            // perspective; (0,0,0) is in the center
            this.width / - 2,  // left plane 
            this.width / 2,    // right plane
            this.height / 2,   // top plane
            this.height / - 2, // bottom plane
            1, 1000 );          // near and far clipping planes distances
        // Every three.js object is created at (0,0,0), including
        // cameras, so it must be shifted up in Z to avoid clipping the view
        this.camera.position.z = 900;

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio( window.devicePixelRatio );

        // Empty the container, then insert the three.js rendered view
        this.container.innerHTML = "";
        this.container.appendChild(this.renderer.domElement);
        
        // The game scene
        if (scene.type !== "Scene") {
            this.error('You must pass a THREE.Scene instance to the ' +
                       'OrthoView3D constructor');
        }
        this.scene = scene;

        // Setup event listener(s)
        // Nontrivial with a class method as "this" within a function,
        // even anonymous, is different than here, and also different
        // within event handler.
        let instance = this;
        let resizer = function() {
            instance.onWindowResize(instance);
        };
        window.addEventListener('resize',  resizer);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    updateSize() {
        let width = this.container.clientWidth;
        let height = this.container.clientHeight;
        if ((width === undefined) || (height === undefined)) {
            this.error('The size of the 3D view container with id "' + 
                       container_id + '" is undefined.');
            };
        this.width = width;
        this.height = height;
        // console.log('Size updated: ' + width + 'x' + height)
    }
    // Function to replace the 3D view container with an error message
    // and throw
    error(msg) {
        let height = (this.height === undefined) ? 100 : this.height;
        // Wyśrodkowanie w pionie w CSS jest zdefiniowane tylko dla
        // komórek tabel oraz dla elementów blokowych z display:flex,
        this.container.innerHTML = 
            '<div style="display:flex; margin:auto; width:100%; height:' +
            height + 'px; align-items: center; justify-content: center;' +
            'background-color: white; color: red; font-weight: bold;">' +
            '<div style="display:block; text-align: center;">' + 
            '<H1>ERROR</H1><H1>' + msg + '</H1></div></div>';
        throw msg;
    }

    // Function to update the camera and the renderer after a resize of
    // the window
    onWindowResize(theView) {
        // I the event handler, "this" does not refer to the parent
        // object of a method, so we need to pass "this" of the object
        // instance as the parameter.
        // The technique used in JS is to bind to the even an anonymous
        // function calling the method with necessary parameter(s)
        // which must have different name than "this".
        theView.updateSize() // sets theView.width and theView.height
        theView.camera.left = theView.width / - 2;
        theView.camera.right = theView.width / 2;
        theView.camera.top = theView.height / 2;
        theView.camera.bottom = theView.height / - 2;
        theView.camera.updateProjectionMatrix();

        theView.renderer.setSize(theView.width, theView.height);
        theView.render();
        // console.log('onWindowResize: renderer size set to: ' + 
        //             theView.width + 'x' + theView.height);
    }
}

function test_scene() {
    let scene = new GameScene();
    let geometry = new THREE.BoxGeometry(100,100,100);
    let material = new THREE.MeshBasicMaterial(
        {color: 0x880000, wireframe: false, wireframeLinewidth: 1,
        side: THREE.DoubleSide}
        );
    let cube = new THREE.Mesh(geometry,material);
    cube.position.z = 0;
    cube.position.y = 100;
    cube.rotation.x = 10;
    cube.rotation.y = 5;
    scene.add(cube);
    return scene;
}

/*
vim: ai:spelllang=en:tw=80:ts=4:et:ic
*/
