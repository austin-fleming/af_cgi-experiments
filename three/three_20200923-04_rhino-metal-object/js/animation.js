import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader2 } from './../node_modules/three/examples/jsm/loaders/OBJLoader2.js'
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

const getRandHex = () => {
    const charPool = '0123456789ABCDEF'
    const index = Math.floor(Math.random() * charPool.length)
    return charPool[index]
}

const getRandomColor = () => {
    const threshold = Math.random() > 0.5 ? true : false

    return threshold
        ? `#00${getRandHex()}${getRandHex()}AA`
        : `#00AA${getRandHex()}${getRandHex()}`
}
// +

const createCube = (size, distance) => {
    const randColor = getRandomColor()
    const geometry = new THREE.BoxGeometry(size, size, size)
    const material = new THREE.MeshStandardMaterial({
        color: randColor,
        flatShading: true,
        metalness: 0,
        roughness: 2 * Math.random(),
    })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = Math.random() * distance * 8 - distance * 4
    cube.position.y = Math.random() * distance * 8 - distance * 4
    cube.position.z = Math.random() * distance * 8 - distance * 4
    cube.rotation.z = Math.random() * Math.PI * 2
    cube.rotation.y = Math.random() * Math.PI * 2

    const scalar = Math.random() + 1
    cube.scale.set(scalar, scalar, scalar)

    return cube
}

const createCubes = (number, size, distance) =>
    [...Array(number)].map((cube) => createCube(size, distance))

const createRandCubeMesh = (number, size, distance) => {
    const newMesh = new THREE.Object3D()
    const cubes = createCubes(number, size, distance)

    cubes.forEach((cube) => {
        newMesh.add(cube)
    })

    return newMesh
}

// - - - +

const objLoader = new OBJLoader2()
const material = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    flatShading: false,
    metalness: 0.5,
    roughness: 0.1,
})

/* objLoader.material = material
objLoader.material.side = THREE.DoubleSide */

objLoader.load('./js/testObject.obj', (root) => {
    root.rotation.x = Math.PI * 0.5
    root.traverse((node) => {
        if (node.isMesh) {
            node.material = material
            node.material.side = THREE.DoubleSide
        }
    })
    root.scale.set(3, 3, 3)
    scene.add(root)
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

// - - - +
/* const blob = createRandCubeMesh(100, 3, 10)
scene.add(blob)

const blob2 = createRandCubeMesh(20, 7, 20)
scene.add(blob2)

const blob3 = createRandCubeMesh(30, 10, 30)
scene.add(blob3)

const blob4 = createRandCubeMesh(60, 13, 50)
scene.add(blob4)

const blob5 = createRandCubeMesh(2000, 3, 150)
scene.add(blob5) */
// - - - +

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

const animate = () => {
    requestAnimationFrame(animate)
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
