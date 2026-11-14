'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from 'lucide-react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Environment, Lightformer, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import type { RapierRigidBody, RigidBodyProps } from '@react-three/rapier'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const focusRing =
  'focus-visible:ring-ring/60 focus-visible:border-ring outline-none focus-visible:ring-[3px]'

/* -------------------------------------------------------------------------- */
/*                                  ID card                                   */
/* -------------------------------------------------------------------------- */

const PIN_IMAGE_URL = 'https://cdn.21st.dev/assets/mirror/ad/ad5d58b0ab86bd893f0ab4792d68136796a8a319061f9a834bbee109941617c0.png'

const ROPE_RADIUS = 0.1
const ROPE_RADIAL_SEGMENTS = 24
const ROPE_TAPER_FRACTION = 0.06
const CARD_ROPE_ANCHOR_Y = 1.1
const ROPE_TOP_EXTENSION = -0.5

const PIN_IMAGE_ASPECT = 1024 / 1536
const PIN_IMAGE_BOTTOM_PAD_FRACTION = (1536 - 1432) / 1536
const CARD_TOP_EDGE_Y = 0.93
const PIN_PLANE_HEIGHT = 1.4
const PIN_PLANE_WIDTH = PIN_PLANE_HEIGHT * PIN_IMAGE_ASPECT
const PIN_PLANE_Y = CARD_TOP_EDGE_Y + PIN_PLANE_HEIGHT * -PIN_IMAGE_BOTTOM_PAD_FRACTION
const PIN_PLANE_X = 0
const PIN_PLANE_Z = ROPE_RADIUS + 0.06

const CARD_WIDTH = 0.716
const CARD_HEIGHT = 1
const CARD_BOTTOM_Y = 0.023
const CARD_CORNER_RADIUS = 0.05
const CARD_CANVAS_SCALE = 1000
const ACCENT_STRIPE_HEIGHT_RATIO = 0.03

const buildCardFaceGeometry = () => {
  const x0 = -CARD_WIDTH / 2
  const x1 = CARD_WIDTH / 2
  const y0 = CARD_BOTTOM_Y
  const y1 = CARD_BOTTOM_Y + CARD_HEIGHT
  const r = CARD_CORNER_RADIUS
  const shape = new THREE.Shape()

  shape.moveTo(x0 + r, y0)
  shape.lineTo(x1 - r, y0)
  shape.quadraticCurveTo(x1, y0, x1, y0 + r)
  shape.lineTo(x1, y1 - r)
  shape.quadraticCurveTo(x1, y1, x1 - r, y1)
  shape.lineTo(x0 + r, y1)
  shape.quadraticCurveTo(x0, y1, x0, y1 - r)
  shape.lineTo(x0, y0 + r)
  shape.quadraticCurveTo(x0, y0, x0 + r, y0)

  const geometry = new THREE.ShapeGeometry(shape, 12)
  const position = geometry.getAttribute('position')
  const uv = geometry.getAttribute('uv')

  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, (position.getX(i) - x0) / CARD_WIDTH, (position.getY(i) - y0) / CARD_HEIGHT)
  }

  return geometry
}

type LanyardRigidBody = RapierRigidBody & { lerped?: THREE.Vector3 }

const getLerped = (body: LanyardRigidBody) => {
  if (!body.lerped) {
    body.lerped = new THREE.Vector3().copy(body.translation())
  }

  return body.lerped
}

const buildTaperedTubeGeometry = (
  curve: THREE.CatmullRomCurve3,
  tubularSegments: number,
  radius: number,
  radialSegments: number,
  taperFraction: number
) => {
  const frames = curve.computeFrenetFrames(tubularSegments, false)
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const vertex = new THREE.Vector3()
  const normal = new THREE.Vector3()

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments
    const point = curve.getPointAt(t)
    const N = frames.normals[i]
    const B = frames.binormals[i]
    const ringRadius = t < taperFraction ? radius * (t / taperFraction) : radius

    for (let j = 0; j <= radialSegments; j++) {
      const angle = (j / radialSegments) * Math.PI * 2
      const sin = Math.sin(angle)
      const cos = -Math.cos(angle)

      normal.x = cos * N.x + sin * B.x
      normal.y = cos * N.y + sin * B.y
      normal.z = cos * N.z + sin * B.z
      normal.normalize()
      normals.push(normal.x, normal.y, normal.z)

      vertex.x = point.x + ringRadius * normal.x
      vertex.y = point.y + ringRadius * normal.y
      vertex.z = point.z + ringRadius * normal.z
      positions.push(vertex.x, vertex.y, vertex.z)

      uvs.push(t, j / radialSegments)
    }
  }

  for (let j = 1; j <= tubularSegments; j++) {
    for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1)
      const b = (radialSegments + 1) * j + (i - 1)
      const c = (radialSegments + 1) * j + i
      const d = (radialSegments + 1) * (j - 1) + i

      indices.push(a, b, d)
      indices.push(b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()

  geometry.setIndex(indices)
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))

  return geometry
}

const resolveRgb = (cssColor: string) => {
  const canvas = document.createElement('canvas')

  canvas.width = 1
  canvas.height = 1

  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  if (!ctx) return 'rgb(16, 185, 129)'

  ctx.clearRect(0, 0, 1, 1)
  ctx.fillStyle = cssColor
  ctx.fillRect(0, 0, 1, 1)

  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data

  return `rgb(${r}, ${g}, ${b})`
}

type CardColors = { accent: string; rope: string }

type BandProps = {
  frontImage: string
  isMobile: boolean
  colors: CardColors
}

const Band = ({ frontImage, isMobile, colors }: BandProps) => {
  const rope = useRef<THREE.Mesh>(null!)
  const fixed = useRef<RapierRigidBody>(null!)
  const j1 = useRef<LanyardRigidBody>(null!)
  const j2 = useRef<LanyardRigidBody>(null!)
  const j3 = useRef<RapierRigidBody>(null!)
  const card = useRef<RapierRigidBody>(null!)

  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const cardQuat = new THREE.Quaternion()

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 1.5,
    linearDamping: 1.5
  }

  const frontTexture = useTexture(frontImage)
  const pinTexture = useTexture(PIN_IMAGE_URL)
  const cardGeometry = useMemo(() => buildCardFaceGeometry(), [])

  const cardMap = useMemo(() => {
    const width = Math.round(CARD_WIDTH * CARD_CANVAS_SCALE)
    const height = Math.round(CARD_HEIGHT * CARD_CANVAS_SCALE)
    const canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    const image = frontTexture?.image as HTMLImageElement | undefined

    if (ctx) {
      // 1. Dark obsidian hardware card background
      ctx.fillStyle = '#111115'
      ctx.fillRect(0, 0, width, height)

      // 2. Subtle outer border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)'
      ctx.lineWidth = 12
      ctx.strokeRect(6, 6, width - 12, height - 12)

      // 3. Avatar frame background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 4
      const frameX = width * 0.12
      const frameY = height * 0.11
      const frameW = width * 0.76
      const frameH = height * 0.62
      ctx.fillRect(frameX, frameY, frameW, frameH)
      ctx.strokeRect(frameX, frameY, frameW, frameH)

      // 4. Draw the bitmoji photo cleanly scaled inside the frame
      if (image && image.width > 0) {
        const maxImgW = frameW * 0.92
        const maxImgH = frameH * 0.92
        const scale = Math.min(maxImgW / image.width, maxImgH / image.height)
        const dw = image.width * scale
        const dh = image.height * scale
        const dx = frameX + (frameW - dw) / 2
        const dy = frameY + (frameH - dh) / 2

        ctx.drawImage(image, dx, dy, dw, dh)
      }

      // 5. Emerald accent stripe along the top edge
      ctx.fillStyle = colors.accent || '#10b981'
      ctx.fillRect(0, 0, width, height * ACCENT_STRIPE_HEIGHT_RATIO)

      // 6. Clean badge typography
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 44px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('RISHI MISTRY', width / 2, height * 0.82)

      ctx.fillStyle = '#10b981'
      ctx.font = '600 26px monospace'
      ctx.fillText('WEB DEVELOPER', width / 2, height * 0.88)

      ctx.fillStyle = '#71717a'
      ctx.font = '500 20px monospace'
      ctx.fillText('ID: RM-2026-IT', width / 2, height * 0.93)
    }

    const texture = new THREE.CanvasTexture(canvas)

    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.needsUpdate = true

    return texture
  }, [frontTexture, colors.accent])

  const [curve] = useState(() => {
    const ropeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ])

    ropeCurve.curveType = 'chordal'

    return ropeCurve
  })

  const [dragged, drag] = useState<THREE.Vector3 | false>(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.85])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.85])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, CARD_ROPE_ANCHOR_Y, 0]
  ])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    if (fixed.current) {
      ;[j1, j2].forEach(ref => {
        const lerped = getLerped(ref.current)
        const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation())))

        lerped.lerp(ref.current.translation(), delta * 50 * clampedDistance)
      })

      const cardPos = card.current.translation()
      const cardRot = card.current.rotation()

      cardQuat.set(cardRot.x, cardRot.y, cardRot.z, cardRot.w)
      curve.points[0]
        .set(0, CARD_ROPE_ANCHOR_Y + ROPE_TOP_EXTENSION, 0)
        .applyQuaternion(cardQuat)
        .add(vec.set(cardPos.x, cardPos.y, cardPos.z))
      curve.points[1].copy(getLerped(j2.current))
      curve.points[2].copy(getLerped(j1.current))
      curve.points[3].copy(fixed.current.translation())

      const oldRopeGeometry = rope.current.geometry

      rope.current.geometry = buildTaperedTubeGeometry(
        curve,
        isMobile ? 16 : 32,
        ROPE_RADIUS,
        ROPE_RADIAL_SEGMENTS,
        ROPE_TAPER_FRACTION
      )
      oldRopeGeometry.dispose()

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation() as unknown as THREE.Vector3)
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type='fixed' />
        <RigidBody position={[0.425, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.85, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.275, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.7, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[1.42, 2.0, 0.018]} />
          <group
            scale={4}
            position={[0, -3.16, -0.09]}
            onPointerOver={() => {
              document.body.style.cursor = 'grab'
            }}
            onPointerOut={() => {
              if (!dragged) document.body.style.cursor = 'auto'
            }}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              try {
                ;(e.target as Element).releasePointerCapture(e.pointerId)
              } catch (_) {}
              drag(false)
              document.body.style.cursor = 'grab'
              document.body.style.userSelect = ''
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              try {
                ;(e.target as Element).setPointerCapture(e.pointerId)
              } catch (_) {}
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current!.translation())))
              document.body.style.cursor = 'grabbing'
              document.body.style.userSelect = 'none'
            }}
          >
            <mesh geometry={cardGeometry} position={[0, 0, 0.004]}>
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>
            <mesh geometry={cardGeometry} position={[0, 0, 0.001]} rotation={[0, Math.PI, 0]}>
              <meshBasicMaterial map={cardMap} toneMapped={false} />
            </mesh>
          </group>

          <mesh position={[PIN_PLANE_X, PIN_PLANE_Y, PIN_PLANE_Z]}>
            <planeGeometry args={[PIN_PLANE_WIDTH, PIN_PLANE_HEIGHT]} />
            <meshBasicMaterial map={pinTexture} transparent alphaTest={0.1} toneMapped={false} />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={rope} frustumCulled={false}>
        <meshStandardMaterial color={colors.rope} roughness={0.55} metalness={0.15} />
      </mesh>
    </>
  )
}

const LIGHT = new THREE.Color().setRGB(1, 1, 1)

const StudioLighting = () => (
  <Environment blur={0.75}>
    <Lightformer intensity={2} color={LIGHT} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer intensity={3} color={LIGHT} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer intensity={3} color={LIGHT} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
    <Lightformer
      intensity={10}
      color={LIGHT}
      position={[-10, 0, 14]}
      rotation={[0, Math.PI / 2, Math.PI / 3]}
      scale={[100, 10, 1]}
    />
  </Environment>
)

const REFERENCE_HEIGHT_PX = 520
const CAMERA_Z = 20
const CAMERA_FOV_DEG = 20
const WORLD_UNITS_PER_PX = (2 * CAMERA_Z * Math.tan((CAMERA_FOV_DEG / 2) * (Math.PI / 180))) ** -1
const PX_PER_WORLD_UNIT = REFERENCE_HEIGHT_PX * WORLD_UNITS_PER_PX
const TARGET_FROM_RIGHT_FRACTION = 0.3
const TARGET_FROM_RIGHT_FRACTION_AT_LG = 0.18
const LG_BREAKPOINT_PX = 1024
const XL_BREAKPOINT_PX = 1280

const CameraAlign = () => {
  useFrame(state => {
    if (state.size.width < LG_BREAKPOINT_PX) {
      state.camera.position.x = 0
      state.camera.position.z = CAMERA_Z * Math.max(1, state.size.height / REFERENCE_HEIGHT_PX)
      return
    }

    const widthT = THREE.MathUtils.clamp(
      (state.size.width - LG_BREAKPOINT_PX) / (XL_BREAKPOINT_PX - LG_BREAKPOINT_PX),
      0,
      1
    )

    const targetFromRightFraction = THREE.MathUtils.lerp(
      TARGET_FROM_RIGHT_FRACTION_AT_LG,
      TARGET_FROM_RIGHT_FRACTION,
      widthT
    )

    const targetFromRightPx = targetFromRightFraction * state.size.width

    state.camera.position.x = (targetFromRightPx - state.size.width / 2) / PX_PER_WORLD_UNIT
    state.camera.position.z = CAMERA_Z * (state.size.height / REFERENCE_HEIGHT_PX)
  })

  return null
}

const IdCard = ({ frontImage, className }: { frontImage: string; className?: string }) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const [contextLossKey, setContextLossKey] = useState(0)
  const eventSourceRef = useRef<HTMLElement | null>(typeof document !== 'undefined' ? document.body : null)

  const colors = useMemo<CardColors>(() => ({
    accent: '#10b981',
    rope: '#27272a'
  }), [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (typeof document !== 'undefined') {
        document.body.style.cursor = 'auto'
        document.body.style.userSelect = ''
      }
    }
  }, [])

  return (
    <div aria-hidden='true' className={cn('pointer-events-none drop-shadow-2xl', className)}>
      <Canvas
        key={contextLossKey}
        eventSource={eventSourceRef as RefObject<HTMLElement>}
        camera={{ position: [0, 0, 20], fov: 20 }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
        onCreated={state => {
          state.gl.setClearAlpha(0)

          state.gl.domElement.addEventListener('webglcontextlost', event => {
            event.preventDefault()
            setContextLossKey(key => key + 1)
          })

          state.setEvents({
            compute: (event, s) => {
              const rect = s.gl.domElement.getBoundingClientRect()
              const x = event.clientX - rect.left
              const y = event.clientY - rect.top

              s.pointer.set((x / s.size.width) * 2 - 1, -(y / s.size.height) * 2 + 1)
              s.raycaster.setFromCamera(s.pointer, s.camera)
            }
          })
        }}
      >
        <CameraAlign />
        <ambientLight intensity={Math.PI} />
        <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band frontImage={frontImage} isMobile={isMobile} colors={colors} />
        </Physics>
        <StudioLighting />
      </Canvas>
    </div>
  )
}

const GreetingWord = ({ greetings, intervalMs = 2200 }: { greetings: string[]; intervalMs?: number }) => {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || greetings.length < 2) return

    const timer = setInterval(() => setIndex(prev => (prev + 1) % greetings.length), intervalMs)

    return () => clearInterval(timer)
  }, [greetings.length, intervalMs, reduceMotion])

  return (
    <>
      <span className='sr-only'>{greetings[0]}</span>
      <span aria-hidden='true' className='mr-2 inline-grid overflow-hidden align-bottom'>
        {greetings.map(word => (
          <span key={word} className='invisible col-start-1 row-start-1 whitespace-nowrap'>
            {word}
          </span>
        ))}

        <AnimatePresence mode='popLayout' initial={false}>
          <motion.span
            key={greetings[index]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='col-start-1 row-start-1 inline-block whitespace-nowrap text-emerald-400'
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
}

const MARQUEE_REPEAT = 4
const MARQUEE_GAP_REM = 2

const LogoMarquee = ({ logos, durationSeconds = 25 }: { logos: BrandLogo[]; durationSeconds?: number }) => (
  <div
    className='group flex overflow-hidden p-3'
    style={{ gap: `${MARQUEE_GAP_REM}rem` }}
    role='group'
    aria-label='Technology stack'
  >
    <style>{`@keyframes hero-section-44-marquee{from{transform:translateX(0)}to{transform:translateX(calc(-100% - ${MARQUEE_GAP_REM}rem))}}@media (prefers-reduced-motion:reduce){.hero-section-44-marquee{animation:none!important}}`}</style>
    {Array.from({ length: MARQUEE_REPEAT }, (_, copy) => (
      <div
        key={copy}
        aria-hidden={copy > 0 || undefined}
        className='hero-section-44-marquee flex shrink-0 justify-around group-hover:[animation-play-state:paused]'
        style={{
          gap: `${MARQUEE_GAP_REM}rem`,
          animation: `hero-section-44-marquee ${durationSeconds}s linear infinite`
        }}
      >
        {logos.map((logo, index) => (
          <div key={`${logo.image}-${index}`} className='bg-white/[0.03] border border-white/[0.08] flex w-16 h-16 shrink-0 items-center justify-center rounded-xl'>
            <img
              src={logo.image}
              alt={copy === 0 ? logo.name : ''}
              loading='lazy'
              className='w-9 h-9 object-contain opacity-75 hover:opacity-100 transition-opacity'
            />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export type BrandLogo = {
  image: string
  name: string
}

export type ActionLink = {
  label: string
  href: string
}

export type HeroSection44Props = {
  greetings?: string[]
  name?: string
  role?: string
  description?: ReactNode
  availabilityLabel?: string
  profileImage?: string
  downloadAction?: ActionLink
  connectAction?: ActionLink
  brandLogos?: BrandLogo[]
  className?: string
}

const CDN_BASE = 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/zolt'

const DEFAULT_BRAND_LOGOS: BrandLogo[] = Array.from({ length: 20 }, (_, index) => {
  const position = String(index + 1).padStart(2, '0')

  return { image: `${CDN_BASE}/logo-${position}.png`, name: `Tech stack logo ${position}` }
})

export const HeroSection44 = ({
  greetings = ['Hello', 'नमस्ते', 'Hey', 'Kem Cho'],
  name = 'Rishi Mistry',
  role = 'IT Student & Web Developer',
  description = "Pursuing Diploma in Information Technology at N.G. Patel Polytechnic. I craft fast, responsive, and aesthetically refined digital web applications from the ground up.",
  availabilityLabel = 'Available for Work',
  profileImage = 'https://i.ibb.co/8DNpG4Dy/snapedit-1741190364532.png',
  downloadAction = { label: 'Explore Projects', href: '#projects' },
  connectAction = { label: "Let's connect", href: '#contact' },
  brandLogos = DEFAULT_BRAND_LOGOS,
  className
}: HeroSection44Props) => {
  return (
    <div className={cn('bg-transparent text-foreground relative overflow-visible', className)}>
      <div className='pt-12 pb-10 sm:py-16 lg:pt-16 lg:pb-14'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-20'>
          <div className='space-y-6 lg:max-w-xl'>
            <span className='bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider'>
              <span className='relative flex h-2 w-2' aria-hidden='true'>
                <span className='bg-emerald-400 absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping' />
                <span className='bg-emerald-500 relative inline-flex h-2 w-2 rounded-full' />
              </span>
              {availabilityLabel}
            </span>

            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.1]'>
              <GreetingWord greetings={greetings} />I am {name}
            </h1>

            <p className='text-emerald-400 text-xl font-semibold sm:text-2xl'>{role}</p>

            <p className='text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl'>{description}</p>

            <div className='flex items-center gap-3 pt-2'>
              <a
                href={downloadAction.href}
                className={cn(
                  'border border-white/[0.1] bg-white/[0.04] text-zinc-100 hover:bg-white/[0.08] inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold whitespace-nowrap transition-all duration-300 active:scale-[0.98]',
                  focusRing
                )}
              >
                {downloadAction.label}
              </a>

              <a
                href={connectAction.href}
                className={cn(
                  'bg-zinc-100 text-zinc-950 hover:bg-white group inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-transparent px-6 text-sm font-semibold whitespace-nowrap shadow-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] active:scale-[0.98]',
                  focusRing
                )}
              >
                <span>{connectAction.label}</span>
                <span className='bg-zinc-950 text-white relative flex w-6 h-6 items-center justify-center overflow-hidden rounded-full transition-all duration-300 group-hover:scale-105'>
                  <ArrowRightIcon
                    aria-hidden='true'
                    className='text-white w-3.5 h-3.5'
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Physics-driven Hanging ID Card with precise top and height */}
      <IdCard
        frontImage={profileImage}
        className='max-lg:hidden lg:absolute lg:top-[-3.5rem] lg:right-0 lg:left-0 lg:z-10 lg:h-[640px] lg:w-full'
      />

      {/* Tech Stack Marquee Footer */}
      <div className='relative z-20 mx-auto mt-8 mb-8 w-full max-w-6xl'>
        <div className='from-[#09090b] pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-36' />
        <div className='from-[#09090b] pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-36' />
        <div className='mx-auto w-full max-w-6xl overflow-hidden'>
          <LogoMarquee logos={brandLogos} />
        </div>
      </div>
    </div>
  )
}

const HeroSection44Demo = () => (
  <HeroSection44
    greetings={['Hello', 'नमस्ते', 'Hey', 'Kem Cho']}
    name='Rishi Mistry'
    role='IT Student & Web Developer'
    availabilityLabel='Available for Work'
    description="Pursuing Diploma in Information Technology at N.G. Patel Polytechnic. I craft fast, responsive, and aesthetically refined digital web applications from the ground up."
    profileImage='https://i.ibb.co/8DNpG4Dy/snapedit-1741190364532.png'
    downloadAction={{ label: 'Explore Projects', href: '#projects' }}
    connectAction={{ label: "Let's connect", href: '#contact' }}
    brandLogos={DEFAULT_BRAND_LOGOS}
  />
)

export { HeroSection44Demo }
export default HeroSection44
