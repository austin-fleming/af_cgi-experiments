import * as THREE from './../node_modules/three/build/three.module.js'

const makeCubeInstance = (scene, geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({ color })

    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    cube.position.x = x

    return cube
}

function main() {
    const canvas = document.querySelector('#animation')
    const renderer = new THREE.WebGLRenderer({ canvas })

    const fov = 90
    const aspect = 1
    const near = 0.1
    const far = 100
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    camera.position.z = 2

    const scene = new THREE.Scene()

    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1

    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

    const cubes = [
        makeCubeInstance(scene, geometry, 0x44aa88, 0),
        makeCubeInstance(scene, geometry, 0x8844aa, -2),
        makeCubeInstance(scene, geometry, 0xaa8844, 2),
    ]

    const lightColor = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(lightColor, intensity)
    light.position.set(0, 10, 10)

    /* const ambLight = new THREE.AmbientLight(0x00ff00, 0.2)
    scene.add(ambLight) */

    scene.add(light)

    function render(time) {
        time *= 0.001

        cubes.forEach((cube, index) => {
            const speed = 1 + index * 0.1
            const rot = time * speed
            cube.rotation.x = rot
            cube.rotation.y = rot
        })

        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }

    render()
}

main()
