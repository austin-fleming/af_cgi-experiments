import * as THREE from './../node_modules/three/build/three.module.js'
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
//const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -1000,
    1000
)
camera.position.set(100, 100, 100)
camera.lookAt(scene.position)

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#bbbbbb')
document.body.appendChild(renderer.domElement)

camera.position.z = 20

window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

//=====================================

const geometry = new THREE.BoxGeometry(200, 200, 200)
const material = new THREE.MeshStandardMaterial({
    color: 0xff0051,
    flatShading: true,
    metalness: 0,
    roughness: 1,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const wireGeo = new THREE.BoxGeometry(400, 400, 400)
const wireMat = new THREE.MeshBasicMaterial({
    color: '#dadada',
    wireframe: true,
    transparent: true,
})
const wireCube = new THREE.Mesh(wireGeo, wireMat)
scene.add(wireCube)

//===
//===

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(300, 300, 0)
pointLight.lookAt(scene.position)
scene.add(pointLight)
//=====================================

const animate = () => {
    requestAnimationFrame(animate)
    //cube.rotation.x += 0.04
    cube.rotation.y += 0.04
    //wireCube.rotation.x -= 0.01
    wireCube.rotation.y -= 0.07
    renderer.render(scene, camera)
}

animate()
