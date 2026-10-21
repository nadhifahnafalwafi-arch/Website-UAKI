import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import logoSvg from '@/assets/svg/logo-uaki-3d.svg?raw'

const FLAME = ['f0ad3f', 'ffbd52', 'f0ae3f']
const AUTO = 0.0045
const clampX = (v) => Math.max(-0.9, Math.min(0.9, v))

export default function Logo3D({ label = 'Logo UAKI 3D', className = '', onReady, onError }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const onReadyRef = useRef(onReady)
  const onErrorRef = useRef(onError)
  onReadyRef.current = onReady
  onErrorRef.current = onError

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch (err) {
      onErrorRef.current?.(err)
      return undefined
    }
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(30, 0.8, 0.1, 100)
    camera.position.set(0, 0.9, 11.5)
    camera.lookAt(0, -0.35, 0)

    const PI = Math.PI
    scene.add(new THREE.HemisphereLight(0xffffff, 0x3a4030, 0.85 * PI))
    const key = new THREE.DirectionalLight(0xfff6e8, 1.15 * PI)
    key.position.set(4, 6, 6)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 0.5 * PI)
    rim.position.set(-5, 2, -5)
    scene.add(rim)

    const data = new SVGLoader().parse(logoSvg)
    const logo = new THREE.Group()
    const disposables = []

    data.paths.forEach((path, i) => {
      const hex = path.color.getHexString()
      const isFlame = FLAME.includes(hex)
      const depth = (isFlame ? 5.2 : 3.6) + i * 0.09
      const geo = new THREE.ExtrudeGeometry(SVGLoader.createShapes(path), {
        depth,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: 0.7,
        bevelSize: 0.22,
        bevelSegments: 3,
      })
      geo.translate(0, 0, -depth / 2)
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`#${hex}`),
        roughness: 0.42,
        metalness: 0.04,
        polygonOffset: true,
        polygonOffsetFactor: -i * 0.1,
        polygonOffsetUnits: -i * 2,
      })
      disposables.push(geo, mat)
      logo.add(new THREE.Mesh(geo, mat))
    })

    const box = new THREE.Box3().setFromObject(logo)
    const center = box.getCenter(new THREE.Vector3())
    logo.children.forEach((m) => m.geometry.translate(-center.x, -center.y, 0))
    const s = 3.9 / (box.max.y - box.min.y)
    logo.scale.set(s, -s, s)

    const tilt = new THREE.Group()
    const spin = new THREE.Group()
    spin.add(logo)
    tilt.add(spin)
    tilt.position.y = 0.15
    scene.add(tilt)

    const sc = document.createElement('canvas')
    sc.width = sc.height = 256
    const g2 = sc.getContext('2d')
    const grad = g2.createRadialGradient(128, 128, 0, 128, 128, 128)
    grad.addColorStop(0, 'rgba(0,0,0,0.5)')
    grad.addColorStop(0.45, 'rgba(0,0,0,0.22)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    g2.fillStyle = grad
    g2.fillRect(0, 0, 256, 256)
    const shadowTex = new THREE.CanvasTexture(sc)
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6)
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    disposables.push(shadowTex, shadowGeo, shadowMat)
    const shadow = new THREE.Mesh(shadowGeo, shadowMat)
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -2.35
    shadow.scale.set(1, 0.5, 1)
    scene.add(shadow)

    let rotX = 0.12
    let rotY = -0.5
    let velX = 0
    let velY = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let idle = 1
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      velX = velY = 0
      canvas.setPointerCapture?.(e.pointerId)
      canvas.classList.add('cursor-grabbing')
      start()
    }
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      velY = dx * 0.01
      velX = dy * 0.01
      rotY += velY
      rotX = clampX(rotX + velX)
    }
    const endDrag = () => {
      dragging = false
      idle = 0
      canvas.classList.remove('cursor-grabbing')
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', endDrag)
    canvas.addEventListener('pointercancel', endDrag)

    const onKey = (e) => {
      const step = 0.06
      if (e.key === 'ArrowLeft') velY = -step
      else if (e.key === 'ArrowRight') velY = step
      else if (e.key === 'ArrowUp') velX = -step / 2
      else if (e.key === 'ArrowDown') velX = step / 2
      else return
      e.preventDefault()
      idle = 0
      start()
    }
    canvas.addEventListener('keydown', onKey)

    const resize = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      if (!w || !h) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    resize()

    let rafId = 0
    let visible = true
    let readySent = false

    function frame() {
      if (!dragging) {
        velY *= 0.94
        velX *= 0.9
        rotY += velY
        rotX = clampX(rotX + velX)
        idle = Math.min(1, idle + 0.01)
        if (!reduceMotion) rotY += AUTO * idle
        rotX += (0.12 - rotX) * 0.01 * idle
      }
      spin.rotation.y = rotY
      tilt.rotation.x = rotX
      const side = Math.abs(Math.sin(rotY))
      shadow.scale.x = 1 - side * 0.35
      renderer.render(scene, camera)

      if (!readySent) {
        readySent = true
        onReadyRef.current?.()
      }

      const settled = reduceMotion && !dragging && Math.abs(velY) < 0.0005 && Math.abs(velX) < 0.0005
      if (visible && !settled) rafId = requestAnimationFrame(frame)
      else rafId = 0
    }

    function start() {
      if (!rafId) rafId = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(stage)
    start()

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
      canvas.removeEventListener('keydown', onKey)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={stageRef} className={`relative aspect-[4/5] w-full ${className}`}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label={label}
        className="block h-full w-full cursor-grab rounded-showcase focus-visible:outline-brand"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  )
}
