import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader2 } from './../node_modules/three/examples/jsm/loaders/OBJLoader2.js'
/* import { MTLLoader } from './../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { MtlObjBridge } from './../node_modules/three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js' */

const CONFIG_RENDER = Object.freeze({
    alpha: true,
    antialias: true,
})

const CONFIG_CAM = Object.freeze({
    ortho: {
        left: window.innerWidth / -2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: window.innerHeight / -2,
        near: -1000,
        far: 10000,
        x: 20,
        y: 20,
        z: 20,
    },
})

//==========================================

const renderer = new THREE.WebGLRenderer(CONFIG_RENDER)
const scene = new THREE.Scene()

//==========================================
const getOrthoCamera = ({ left, right, top, bottom, near, far }) => {
    return new THREE.OrthographicCamera(left, right, top, bottom, near, far)
}

const setCameraPosition = (camera, { x, y, z }) => {
    camera.position.set(x, y, z)
}

// - - - +

const loader = new THREE.TextureLoader()

const materialShell = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    bumpMap: loader.load('./js/model/Gravel_bump.png'),
    bumpScale: 5,
    roughness: 2,
    metalness: 0.2,
})

const materialGasket = new THREE.MeshStandardMaterial({
    color: 0xf7ef84,
})

const materialRing01 = new THREE.MeshStandardMaterial({
    map: loader.load('./js/model/Marble.png'),
    bumpMap: loader.load('./js/model/Marble.png'),
    bumpScale: 5,
    roughness: 0.1,
    metalness: 0.1,
})

const materialRing02 = new THREE.MeshStandardMaterial({
    color: 0x2200ff,
    map: loader.load('./js/model/Water_bump.png'),
    bumpMap: loader.load('./js/model/Water_bump.png'),
    bumpScale: 8,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0xff5522,
    emissiveIntensity: 0.8,
    /* transparent: true,
    alphaMap: loader.load('./js/model/Water_bump.png'),
    opacity: 0.8,
    refractionRatio: 0.5, */
})
// - - - +

let shellObj = null

const objLoader = new OBJLoader2()

objLoader.load('./js/model/geode-model.obj', (root) => {
    root.traverse(function (child) {
        if (
            child.name &&
            (child.name.includes('shell_left') ||
                child.name.includes('shell_right'))
        ) {
            child.material[0] = materialGasket
            child.material[1] = materialShell
            child.castShadow = true
            child.receiveShadow = true
        }
        if (child.name && child.name.includes('rings')) {
            child.material[0] = materialRing01
            child.material[1] = materialRing02
            child.castShadow = true
            child.receiveShadow = true
        }
    })
    root.rotation.x = Math.PI * 0.5
    root.scale.set(3, 3, 3)
    console.log(root)
    scene.add(root)
    shellObj = root
})

const ringLight01 = new THREE.PointLight(0xff0000, 1, -5)
ringLight01.position.set(-3, 0, 0)
scene.add(ringLight01)

const ringLight02 = new THREE.PointLight(0xff0000, 1, 5)
ringLight02.position.set(-3, 0, 0)
scene.add(ringLight02)

// - - - +

const camera = getOrthoCamera(CONFIG_CAM.ortho)
setCameraPosition(camera, CONFIG_CAM.ortho)
camera.lookAt(scene.position)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#020202')
document.body.appendChild(renderer.domElement)

// - - - +

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(300, 300, 0)
pointLight.lookAt(scene.position)
scene.add(pointLight)

renderer.render(scene, camera)

//==========================================
// - - - - - - - - - - - - - - - - - - - - -

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})

let moveMax = 30
let moveSpeedLeft = -0.2
let moveSpeedRight = 0.2
const animate = () => {
    requestAnimationFrame(animate)

    if (
        shellObj.children[2].position.x > moveMax ||
        shellObj.children[2].position.x <= -0.001
    ) {
        moveSpeedLeft *= -1
        moveSpeedRight *= -1
    }

    shellObj.children[2].position.x += moveSpeedRight
    shellObj.children[0].position.x += moveSpeedLeft
    ringLight01.position.x += moveSpeedRight
    ringLight02.position.x += moveSpeedLeft
    scene.add(shellObj)

    renderer.render(scene, camera)
}

animate()
