import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { transitions } from '@/lib/animations'

const MotionLink = typeof motion.create === 'function' ? motion.create(Link) : motion(Link)

const variants = {
  primary: 'bg-brand text-white shadow-button',
  solid: 'bg-brand text-ivory shadow-button', 
  outline: 'border border-leaf/60 bg-white/70 text-brand',
  dark: 'border border-leaf/60 bg-moss text-cream shadow-button', 
}

const iconHover = {
  right: { x: 4 },
  down: { y: 3 },
}

export default function Button({
  to,
  href,
  icon: Icon,
  iconDirection = 'right', 
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg px-6 py-3 text-nav font-semibold ${
    variants[variant] ?? variants.primary
  } ${className}`

  const motionProps = {
    whileHover: 'hover',
    whileTap: { scale: 0.96 },
    variants: { hover: { y: -2 } },
    transition: transitions.spring,
  }

  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <motion.span
          className="flex"
          variants={{ hover: iconHover[iconDirection] ?? iconHover.right }}
          transition={transitions.spring}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden="true" />
        </motion.span>
      )}
    </>
  )

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...rest}>
        {content}
      </MotionLink>
    )
  }

  return (
    <motion.a href={href} className={classes} {...motionProps} {...rest}>
      {content}
    </motion.a>
  )
}
