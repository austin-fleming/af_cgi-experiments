import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader2 } from './../node_modules/three/examples/jsm/loaders/OBJLoader2.js'
import { MTLLoader } from './../node_modules/three/examples/jsm/loaders/MTLLoader.js'
import { MtlObjBridge } from './../node_modules/three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js'
const CONFIG_PALETTE = Object.freeze({
    red: 0xf25246,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xf5986e,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
})

const CONFIG_RENDER = Object.freeze({
    alpha: true,
    antialias: true,
})

const CONFIG_CAM = Object.freeze({
    persp: {
        aspect: window.innerWidth / window.innerHeight,
        fov: 60,
        near: 1,
        far: 10000,
    },
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

/* const material = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    flatShading: false,
    metalness: 0.5,
    roughness: 0.1,
}) */

let shellObj = null
const mtlLoader = new MTLLoader()
mtlLoader.load('./js/model/shell/geode-model.mtl', (materials) => {
    const objLoader = new OBJLoader2()
    materials.preload()
    objLoader.addMaterials(
        MtlObjBridge.addMaterialsFromMtlLoader(materials),
        true
    )
    //objLoader.material.side = THREE.DoubleSide

    objLoader.load('./js/model/shell/geode-model.obj', (root) => {
        root.rotation.x = Math.PI * 0.5
        /* root.traverse((node) => {
            if (node.isMesh) {
                //node.position.x = count
                node.material = material
                node.material.side = THREE.DoubleSide
            }
            console.log(node)
        }) */
        root.scale.set(3, 3, 3)
        console.log(root)
        scene.add(root)
        shellObj = root
    })
})

// - - - +

const camera = getOrthoCamera(CONFIG_CAM.ortho)
setCameraPosition(camera, CONFIG_CAM.ortho)
camera.lookAt(scene.position)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#bbbbbb')
document.body.appendChild(renderer.domElement)

// - - - +

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(300, 300, 0)
pointLight.lookAt(scene.position)
scene.add(pointLight)

renderer.render(scene, camera)

//==========================================
// - - - - - - - - - - - - - - - - - - - - -

/* window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}) */

//=====================================

//===
//===

//=====================================
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})

let moveMax = 50
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
    scene.add(shellObj)

    //cube.rotation.x += 0.04
    /* blob.rotation.x -= 0.01
    blob.rotation.y += 0.04

    blob2.rotation.x += 0.005
    blob2.rotation.y += 0.01
    blob2.rotation.z -= 0.02

    blob3.rotation.x += 0.01
    blob3.rotation.y -= 0.04

    blob4.rotation.x += 0.03
    blob4.rotation.y += 0.07

    blob5.rotation.x += 0.01
    blob5.rotation.y += 0.01
    blob5.rotation.z -= 0.02 */
    //wireCube.rotation.x -= 0.01
    renderer.render(scene, camera)
}

animate()
