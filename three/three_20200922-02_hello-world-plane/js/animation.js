import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'
// SECTION: setup renderer
const canvas = document.querySelector('#animation')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setClearColor(0xfff6e6) // default is black

renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// SECTION: setup camera
const fov = 60
const aspect = 1
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

camera.position.set(5, 5, 0)
camera.lookAt(new THREE.Vector3(0, 0, 0))

// SECTION: setup scene
const scene = new THREE.Scene()

scene.background = new THREE.Color(0xfff6e6)

const planeWidth = 5
const planeHeight = 5
const planeWidthSegments = 5
const planeHeightSegments = 5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
        planeWidth,
        planeHeight,
        planeWidthSegments,
        planeHeightSegments
    ),
    new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true })
)
plane.rotateX(Math.PI / 2)
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})

renderer.render(scene, camera)
