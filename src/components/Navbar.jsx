import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from '@/components/Logo'
import { useEntrance } from '@/lib/LoaderContext' 
import MenuToggle from '@/components/MenuToggle'
import { navLinks } from '@/lib/siteData'
import { navbarVariants, navItemsStagger, navItem, mobileMenu, mobileMenuItem, transitions } from '@/lib/animations'

const MOBILE_MENU_ID = 'menu-mobile'

function DesktopLink({ label, to }) {
  return (
    <NavLink to={to} end={to === '/'} className="relative flex min-h-11 items-center px-1">
      {({ isActive }) => (
        <>
          <motion.span
            className={`text-nav font-semibold transition-colors duration-200 ${
              isActive ? 'text-cream' : 'text-white hover:text-cream'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={transitions.spring}
            tabIndex={-1} 
          >
            {label}
          </motion.span>
          {isActive && (
            <motion.span
              layoutId="navbar-active"
              className="absolute inset-x-1 bottom-1.5 h-0.5 rounded-full bg-cream"
              transition={transitions.spring}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [tucked, setTucked] = useState(false)
  const headerRef = useRef(null)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const entrance = useEntrance() 

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 12)
    if (open) return
    setTucked(latest > previous && latest > 160)
  })

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return undefined

    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false)
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (e) => e.matches && setOpen(false)

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    mq.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      mq.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <motion.header
      ref={headerRef}
      className="sticky top-0 z-nav"
      variants={navbarVariants}
      initial="hidden"
      animate={entrance === 'hidden' ? 'hidden' : tucked ? 'tucked' : 'visible'} 
    >
      <div className="relative bg-brand">
        {}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shadow-nav"
          initial={false}
          animate={{ opacity: scrolled || open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <nav
          aria-label="Navigasi utama"
          className="relative flex items-center justify-between px-6 py-3 md:py-4 lg:px-12"
        >
          <Logo size="sm" />

          {}
          <motion.ul
            className="hidden items-center gap-6 md:flex lg:gap-8"
            variants={navItemsStagger}
            initial="hidden"
            animate={entrance} 
          >
            {navLinks.map((link) => (
              <motion.li key={link.to} variants={navItem}>
                <DesktopLink {...link} />
              </motion.li>
            ))}
          </motion.ul>

          {}
          <MenuToggle
            open={open}
            onToggle={() => setOpen((v) => !v)}
            controls={MOBILE_MENU_ID}
            className="-mr-2 md:hidden"
          />
        </nav>

        {}
        <AnimatePresence>
          {open && (
            <motion.div
              id={MOBILE_MENU_ID}
              className="absolute inset-x-0 top-full border-t border-white/10 bg-brand shadow-nav md:hidden"
              variants={mobileMenu}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map(({ label, to }) => (
                  <motion.li key={to} variants={mobileMenuItem}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `flex min-h-11 items-center rounded-lg px-3 text-nav font-semibold transition-colors ${
                          isActive ? 'bg-white/10 text-cream' : 'text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
