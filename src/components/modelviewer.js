import React, { Component } from 'react';
import ThreeRenderObjects from 'three-render-objects';
import { WebGLRenderer } from 'three/examples/jsm/WebGL'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { render } from 'react-three-fiber';
var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

function ModelViewer() {

        let scene = new THREE.Scene();
        let camera = new THREE.OrthographicCamera(window.innerWidth / - 64, window.innerWidth / 64, window.innerHeight / 64, window.innerHeight / - 64, -10, 1000);
        let renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xFFFFFF);
        document.body.appendChild(renderer.domElement);
        console.log(renderer.getClearColor);
        camera.position.z = 20;

        // Light add block
        const light = new THREE.DirectionalLight(0xfff7e8, 1);
        scene.add(light);
        const amColor = "#faffe3";
        const amLight = new THREE.AmbientLight(amColor);
        scene.add(amLight);

        // Loader block
        const manager = new THREE.LoadingManager();
        const loader = new THREE.ImageLoader(manager);
        let textureHead = new THREE.Texture();
        loader.load('model/model.jpg', function (image) {
            textureHead.image = image;
            textureHead.needsUpdate = true;
        });

        // Load 3d model (obj) block
        let meshes = [];
        let objLoader = new THREE.OBJLoader();
        objLoader.load('model/model.obj', function (object) {
            console.log(object);
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    meshes.push(child);
                }
            });

            let head = meshes[0];
            // Placing model
            head.position.x = 0;
            head.position.y = 20;
            head.position.z = -15;
            head.rotation.x = -1.588;
            head.rotation.y = 0;
            head.rotation.z = 0;

            scene.add(head);
            head.updateMatrixWorld();

            // Load texture
            var bumpMapHead = new THREE.TextureLoader().load('model/model.jpg');
            head.material = new THREE.MeshPhongMaterial({
                map: textureHead
            });
        });

        // Camera controls block
        var controls = new OrbitControls( camera, renderer.domElement )
        controls.minPolarAngle = Math.PI / 2;  
        controls.maxPolarAngle = Math.PI / 2;  // Only gorizontal
        
        // Vectors of mouse block
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2(), INTERSECTED;
        let popupp = "Select man"
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        
        // Event mouse click
        function onDocumentMouseDown( event ) {
            event.preventDefault();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            
            // Find intersections
            raycaster.setFromCamera( mouse, camera );
            let intersects = raycaster.intersectObjects( scene.children );
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects [0].object ) {
                    if ( INTERSECTED ) popupp = "Select man"; // Only if prev click out model
                    console.log(popupp);
                    INTERSECTED = intersects[0].object;
                    popupp = "Model";
                    alert(popupp)  // !Change on popup message rendered on scene!
                    
                }
            } else {
                if ( INTERSECTED ) popupp = "Select man";
                alert(popupp);
                INTERSECTED = null;
            }
        }
        
        // Add popup informatin block
        /* Here need code */
        // CSS трансформации для общей сцены
        /* Here need code */
        //  Popup information
        /* Here need code */

        // Render block
        let renderModel = function () {
            requestAnimationFrame(renderModel);
            controls.update();
            renderer.render(scene, camera);
            raycaster.setFromCamera(mouse, camera);
        };

        const viewer = renderModel();
        return viewer

};

export default ModelViewer;