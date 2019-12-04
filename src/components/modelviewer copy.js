import React, { Component } from 'react';
import ThreeRenderObjects from 'three-render-objects';
import { WebGLRenderer } from 'three/examples/jsm/WebGL'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { render } from 'react-three-fiber';
//import { Raycaster } from 'three/examples/jsm/'
//import * as THREE from 'three';
//import MTLLoader from 'three-mtl-loader';
//import OBJLoader from 'three-obj-loader';
var THREE = require('three');
//var ReactTHREE = require('react-three');
var OBJLoader = require('three-obj-loader');
//var TrackballControls = require('three-trackballcontrols');
OBJLoader(THREE);
//TrackballControls(THREE);
//OrbitControls(THREE);
//var ThreeRenderObjects = require('three-render-objects');
function ModelViewer() {

        let scene = new THREE.Scene();
        //let camera = new THREE.PerspectiveCamera( 15, window.innerWidth/window.innerHeight, 0.1, 10000 );
        var camera = new THREE.OrthographicCamera(window.innerWidth / - 64, window.innerWidth / 64, window.innerHeight / 64, window.innerHeight / - 64, -10, 1000);
        let renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xFFFFFF);
        //renderer.clearColor = 0xffffff;
        document.body.appendChild(renderer.domElement);
        console.log(renderer.getClearColor);
        camera.position.z = 20;
        //camera.position.y

        const light = new THREE.DirectionalLight(0xfff7e8, 1);
        scene.add(light);

        const amColor = "#faffe3";
        const amLight = new THREE.AmbientLight(amColor);
        scene.add(amLight);



        const manager = new THREE.LoadingManager();
        const loader = new THREE.ImageLoader(manager);
        let textureHead = new THREE.Texture();
        loader.load('model/model.jpg', function (image) {
            textureHead.image = image;
            textureHead.needsUpdate = true;
        });

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

            head.position.x = 0;
            head.position.y = 20;
            head.position.z = -15;
            head.rotation.x = -1.588;
            head.rotation.y = 0;
            head.rotation.z = 0;
            //head.position.x = -45;
            scene.add(head);
            //meshes.updateMatrixWorld();
            //meshes[0] = head;
            head.updateMatrixWorld();
            //scene.children.updateMatrixWorld();



            var bumpMapHead = new THREE.TextureLoader().load('model/model.jpg');
            head.material = new THREE.MeshPhongMaterial({
                map: textureHead
            });
        });

        //let controls = new THREE.TrackballControls( camera );
        var controls = new OrbitControls( camera, renderer.domElement )
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;
        //var controls = new THREE.OrbitControls( camera, renderer.domElement )
        
        let raycaster = new THREE.Raycaster();
        let mouse = new THREE.Vector2(), INTERSECTED;
        let popupp = "Select man"
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        function onDocumentMouseDown( event ) {
            event.preventDefault();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            // find intersections
            raycaster.setFromCamera( mouse, camera );
            let intersects = raycaster.intersectObjects( scene.children );
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects [0].object ) {
                    if ( INTERSECTED ) popupp = "Select man";
                    console.log(popupp);
                    INTERSECTED = intersects[0].object;
                    popupp = "Model";
                    console.log(popupp)
                    
                }
            } else {
                if ( INTERSECTED ) popupp = "Select man";
                console.log(popupp);
                INTERSECTED = null;
            }
        }
        //document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        /*function onDocumentTouchStart( event ) {

            event.preventDefault();
    
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
            onDocumentMouseDown( event );
    
        }*/
        /*function popupInfo() {
            if (head) {
                const manSelect = raycaster.intersectObjects(head.child);

            }
        }
        let clickInfo = {
            x: 0,
            y: 0,
            userHasClicked: false
          };
        container.addEventListener('click', function (evt) {
            // The user has clicked; let's note this event
            // and the click's coordinates so that we can
            // react to it in the render loop
            clickInfo.userHasClicked = true;
            clickInfo.x = evt.clientX;
            clickInfo.y = evt.clientY;
        }, false);*/
        // Add popup informatin block
        // CSS трансформации для общей сцены
        function initCSSRenderer() {
            cssrenderer = new THREE.CSS3DRenderer();
            cssrenderer.setSize(window.innerWidth, window.innerHeight);
            cssrenderer.domElement.style.position = 'absolute';
            cssrenderer.domElement.style.top = 0;
        }
        <div className="popup">Выберите человека</div>
        //  Popup information
        function initPopups() {
            const popupSource = document.querySelector('.popup-3d');
            const popup = new THREE.CSS3DObject(popupSource);
        
            popup.position.x = 0;
            popup.position.y = -10;
            popup.position.z = 30;
            popup.scale.x = 0.05;
            popup.scale.y = 0.05;
            popup.scale.z = 0.05;
        
            console.log(popup);
        
            scene.add(popup);
        }
        
        const _IS_VISIBLE = Symbol('is visible');
        
        function updatePopups() {
            const popupSource = document.querySelector('.popup-3d');
            const angle = CONTROLS.getAzimuthalAngle();
        
            if (Math.abs(angle) > .9 && popupSource[_IS_VISIBLE]) {
                anime({
                    targets: popupSource,
                    opacity: 0,
                    easing: 'easeInOutQuad'
                });
                popupSource[_IS_VISIBLE] = false;
            } else if (Math.abs(angle) < .9 && !popupSource[_IS_VISIBLE]) {
                anime({
                    targets: popupSource,
                    opacity: 1,
                    easing: 'easeInOutQuad'
                });
                popupSource[_IS_VISIBLE] = true;
            }
        }


        // Render block
        let render2 = function () {
            requestAnimationFrame(render2);
            controls.update();
            renderer.render(scene, camera);
            raycaster.setFromCamera(mouse, camera);
            popupInfo();
            cssrenderer.render(scene, camera);
        };

        const viewer = render2();
        return viewer
        //return <div>Vot tak uot</div>
        

        
    

};


export default ModelViewer;