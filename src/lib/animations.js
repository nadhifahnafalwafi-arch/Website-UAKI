export const easeOut = [0.22, 1, 0.36, 1]

export const transitions = {
  base: { duration: 0.6, ease: easeOut },
  fast: { duration: 0.3, ease: easeOut },
  spring: { type: 'spring', stiffness: 400, damping: 28 },
}

export const SCROLL_ANIMATION = {
  repeat: true, 
  directional: true, 
  distance: 40, 
  distanceMobile: 24, 
  mobileBreakpoint: 768,
  duration: 0.7, 
  exitDuration: 0.4, 
  amount: 0.3, 
  margin: '0px 0px -80px 0px', 
}

export const VIEWPORT_AMOUNT = {
  large: 0.2, 
  default: 0.3,
  small: 0.5, 
  tall: 0.1, 
}

export const defaultViewport = {
  once: !SCROLL_ANIMATION.repeat,
  amount: SCROLL_ANIMATION.amount,
  margin: SCROLL_ANIMATION.margin,
}

export const easeIn = [0.4, 0, 1, 1] 

const getDistance = () =>
  typeof window !== 'undefined' && window.innerWidth < SCROLL_ANIMATION.mobileBreakpoint
    ? SCROLL_ANIMATION.distanceMobile
    : SCROLL_ANIMATION.distance


const exitSign = (custom) => {
  if (!SCROLL_ANIMATION.directional) return 0
  return custom?.direction === 'up' ? 1 : -1
}

function createReveal({ x = 0, y = 0, exitY = 0, scale = 1 } = {}) {
  const pose = (dirY) => {
    const d = getDistance()
    const target = { opacity: 0 }
    if (x) target.x = x * d
    if (dirY) target.y = dirY * d
    if (scale !== 1) target.scale = scale
    return target
  }
  const movesY = Boolean(y || exitY)

  return {
    initial: () => pose(y),
    visible: (custom = {}) => ({
      opacity: 1,
      ...(x ? { x: 0 } : {}),
      ...(movesY ? { y: 0 } : {}),
      ...(scale !== 1 ? { scale: 1 } : {}),
      transition: {
        duration: SCROLL_ANIMATION.duration,
        ease: easeOut,
        delay: custom.first === false ? 0 : (custom.delay ?? 0),
      },
    }),
    hidden: (custom = {}) => ({
      ...pose(exitY * exitSign(custom)),
      transition: { duration: SCROLL_ANIMATION.exitDuration, ease: easeIn },
    }),
  }
}

export const fadeUp = createReveal({ y: 1, exitY: 1 }) 
export const fadeDown = createReveal({ y: -1, exitY: 1 })
export const fadeIn = createReveal() 
export const slideLeft = createReveal({ x: -1.2, exitY: 0.5 })
export const slideRight = createReveal({ x: 1.2, exitY: 0.5 })
export const scaleIn = createReveal({ y: 0.5, exitY: 0.5, scale: 0.94 })

export const revealVariants = { fadeUp, fadeDown, fadeIn, slideLeft, slideRight, scaleIn }

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  initial: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: custom.first === false ? Math.min(delayChildren, 0.1) : delayChildren,
    },
  }),
  hidden: { transition: { staggerChildren: Math.min(stagger, 0.05), staggerDirection: -1 } },
})

export const hoverLift = {
  whileHover: { y: -3, scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: transitions.spring,
}

export const tapScale = {
  whileTap: { scale: 0.95 },
  transition: transitions.spring,
}

export const floating = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
}

export const navbarVariants = {
  hidden: { y: '-100%', opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
  tucked: { y: '-100%', opacity: 1, transition: { duration: 0.35, ease: easeOut } }, // sembunyi saat scroll turun
}

export const navItemsStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

export const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: transitions.fast },
}

export const mobileMenu = {
  closed: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, when: 'afterChildren', staggerChildren: 0.03, staggerDirection: -1 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOut, when: 'beforeChildren', staggerChildren: 0.06 },
  },
}

export const mobileMenuItem = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0, transition: transitions.fast },
}

export const iconSwap = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, rotate: 90, scale: 0.6, transition: { duration: 0.15 } },
}

export const heroText = staggerContainer(0.12, 0.35)

export const heroPhoto = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay: 0.45, when: 'beforeChildren', staggerChildren: 0.12 },
  },
}

export const frameBack = {
  initial: { opacity: 0, x: -24, y: 24 },
  hidden: { opacity: 0, x: -24, y: 24, transition: transitions.fast },
  visible: { opacity: 1, x: 0, y: 0, transition: transitions.base },
}

export const frameFront = {
  initial: { opacity: 0, x: 24, y: -24 },
  hidden: { opacity: 0, x: 24, y: -24, transition: transitions.fast },
  visible: { opacity: 1, x: 0, y: 0, transition: transitions.base },
}

export const decorReveal = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easeOut, delay },
  }),
}

export const leafSway = {
  animate: {
    rotate: [0, 2.5, -1.5, 0],
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const blobBreath = {
  animate: {
    scale: [1, 1.04, 1],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const glowPulse = {
  animate: {
    opacity: [0.55, 1, 0.55],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const crossFade = { duration: 0.6, ease: easeOut }

export const photoRise = {
  initial: { opacity: 0, y: 40 },
  hidden: { opacity: 0, y: 40, transition: transitions.fast },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.35 } },
}

export const popIn = {
  initial: { opacity: 0, scale: 0.4, rotate: -20 },
  hidden: { opacity: 0, scale: 0.4, rotate: -20, transition: transitions.fast },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 14, delay: 0.6 },
  },
}

export const twinkle = (delay = 0) => ({
  opacity: [0.25, 0.9, 0.25],
  scale: [0.85, 1.1, 0.85],
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay },
})

export const ripple = (delay = 0) => ({
  scale: [1, 1.7],
  opacity: [0.45, 0],
  transition: { duration: 2.2, repeat: Infinity, ease: 'easeOut', delay },
})

export const CURSOR_EFFECTS = {
  glow: true, 
  parallax: true, 
  trail: false, 
  typewriter: true, 
}

export const TYPEWRITER = {
  speed: 0.05, 
  cursorLinger: 1.6, 
  amount: 0.5, 
}

export const GLOW = {
  size: 360, 
  colorOnLight: 'rgba(166, 180, 101, 0.22)', 
  colorOnDark: 'rgba(255, 250, 226, 0.16)', 
  follow: { stiffness: 120, damping: 22, mass: 0.6 }, 
  fade: { stiffness: 90, damping: 20 }, 
}

export const PARALLAX = {

  maxShift: 16,
  spring: { stiffness: 80, damping: 18, mass: 0.6 },
}

export const TRAIL = {
  count: 14, 
  interval: 28,
  minDistance: 14, 
  life: 0.7, 
  shape: 'dot', 
}

export const PHILOSOPHY = {
  colorDuration: 0.5, 
  activeScale: 1.04, 
  grayLift: 0, 
  lift: { y: -4, scale: 1.025 }, 
  dimOpacity: 0.55, 
  numberScale: 1.15, 
  hitStroke: 1.6,
  demo: true, 
  demoStep: 0.8, 
}

export const DEPARTMENT_CAROUSEL = {
  columns: [
    { minWidth: 1280, cols: 5 },
    { minWidth: 1024, cols: 4 },
    { minWidth: 768, cols: 3 },
    { minWidth: 480, cols: 2 },
    { minWidth: 0, cols: 1, peek: 0.12 },
  ],
  slideDuration: 0.55, 
  logoFade: 0.35,
  photoZoom: 1.05, 
  panelRatio: 0.52, 
  panelMin: 160, 
  panelMax: 320, 
  photoMaxVh: 80, 
}

export const DEPARTMENT_LINES = {
  divider: {
    width: 3,
    widthMobile: 2, 
    mobileBelow: 640,
    color: 'rgba(255, 250, 226, 0.42)', 
    fadeEnd: '14%', 
    shadow: 'drop-shadow(0 0 3px rgba(20, 24, 12, 0.55))', 
    hoverColor: 'rgba(166, 180, 101, 0.95)', 
    hoverFade: 0.35, 
  },
  seam: {
    height: 4,
    color: 'rgba(166, 180, 101, 1)',
    fadeSide: '18%', 
    glow: 'drop-shadow(0 2px 6px rgba(166, 180, 101, 0.6))',
  },
  frame: {
    height: 3,
    color: 'rgba(166, 180, 101, 0.9)',
    fadeSide: '12%', 
  },
}

export const fadedLine = (dir, color, fade) =>
  `linear-gradient(${dir}, transparent 0%, ${color} ${fade}, ${color} calc(100% - ${fade}), transparent 100%)`


export const SECTION_SCROLL = {
  pxPerSecond: 2600, 
  minDuration: 0.45, 
  maxDuration: 1.1, 
}

export const DEPT_HERO = {
  minHeight: 440, 
  heightVh: 68, 
  maxHeight: 780, 
  waveHeight: 'clamp(44px, 6vw, 104px)', 
  waveMinWidth: 768, 
  waveFrontDuration: 20, 
  waveBackDuration: 30, 
  photoZoom: { scale: [1, 1.07, 1], transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' } },
}

export const ABOUT_OVERLAY_OPACITY = 0.7
export const ABOUT_CENTER_SHADE = 0.72
export const ABOUT_EDGE_SHADE = 0.35

export const DEPT_ABOUT = {
  logoHeight: 'clamp(140px, 16vw, 200px)', 
  overlayOpacity: ABOUT_OVERLAY_OPACITY, 
  photoParallax: 40, 
  topFade: 110, 
}


export const PROKER_MARQUEE = {
  speed: 50, 
  cardWidth: 'clamp(250px, 20vw + 40px, 330px)', 
  gap: 'clamp(80px, 8vw, 140px)', 
  iconSize: 'clamp(22px, 2vw, 30px)', 
  tapHoldMs: 4000, 
  fadeEdge: '8%', 
}
