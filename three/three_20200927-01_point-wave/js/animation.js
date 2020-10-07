import * as THREE from './../node_modules/three/build/three.module.js'
import { vertexShader, shardShader } from './shaders.js'

// ================================
// ==== CONFIG ====================
// ================================

const CONFIG = Object.freeze({
    fieldConfig: {
        columns: 2,
        rows: 2,
        seperation: 10,
    },
    particleConfig: {
        color: 0xffffff,
        size: 1,
    },
    scene: {
        background: '#000000',
    },
    camera: {},
})

// ================================
// ==== INIT ======================
// ================================

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setClearColor(CONFIG.scene.background)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const aspectRatio = window.innerWidth / window.innerHeight
const cameraScale = 100
const camera = new THREE.OrthographicCamera(
    -aspectRatio * cameraScale,
    aspectRatio * cameraScale,
    cameraScale,
    -cameraScale,
    0.1,
    2000
)

camera.position.set(100, 100, 100)
camera.lookAt(scene.position)
scene.add(camera)

const ambLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambLight)

const ptLight = new THREE.PointLight(0xffffff, 1, 50, 50)
ptLight.position.set(100, 80, 50)
scene.add(ptLight)

// ================================
// ================================
// ================================

const degToRad = (degrees) => (Math.PI / 180) * degrees

const createField = ({ particleConfig, fieldConfig }) => {
    const columns = fieldConfig.columns
    const rows = fieldConfig.rows
    const scale = particleConfig.size || 10
    const seperation = fieldConfig.seperation
    const numParticles = columns * rows

    const positions = new Float32Array(numParticles * 3)
    const scaleList = new Float32Array(numParticles)

    let field = []
    let scales = []

    let distX = 0
    let distY = 0
    const startZ = 0
    for (let x = 0; x < rows; x++) {
        distY = 0
        for (let y = 0; y < columns; y++) {
            field.push(distX, distY, startZ)
            scales.push(scale)
            distY += seperation
        }
        distX += seperation
    }

    return Object.freeze({
        positions: Float32Array.from(field),
        scales: Float32Array.from(scales),
    })
}

console.log(createField(CONFIG))

// ================================

// ================================

renderer.render(scene, camera)
