import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const canvas = document.querySelector('#animation')

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setClearColor(0xfff6e6) // default is black

renderer.setSize(canvas.clientWidth, canvas.clientWidth)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// SECTION: setup camera
const fov = 60
const aspect = 1
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

camera.position.set(0, 30, 50)
camera.lookAt(new THREE.Vector3(0, 15, 0))

//----------------------------------------------------------------

//----------------------------------------------------------------

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(25, 50, 25)

pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
scene.add(pointLight)

const shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee })
shadowMaterial.opacity = 0.5
const groundMesh = new THREE.Mesh(
    new THREE.BoxGeometry(100, 0.1, 100).shadowMaterial
)
groundMesh.receiveShadow = true
scene.add(groundMesh)

const octoGeo01 = new THREE.OctahedronGeometry(10, 1)
const octoMat01 = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true, //THREE.FlatShading,
    metalness: 0,
    roughness: 0.8,
})
const octo01 = new THREE.Mesh(octoGeo01, octoMat01)
octo01.position.y += 10
octo01.rotateZ(Math.PI / 3)
octo01.castShadow = true
scene.add(octo01)
//----------------------------------------------------------------
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement)
//controls.target = new THREE.Vector3(0, 15, 0)
//controls.maxPolarAngle = Math.PI / 2
/* controls.addEventListener('change', () => {
    renderer.render(scene, camera)
}) */
controls.addEventListener('change', () => renderer.render(scene, camera))

const renderLoop = () => {
    requestAnimationFrame(renderLoop)
    renderer.render(scene, camera)
    //controls.update()
}

renderLoop()
