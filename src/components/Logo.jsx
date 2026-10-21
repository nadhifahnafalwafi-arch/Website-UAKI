import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logoUAKI from '@/assets/svg/logoUAKI.svg'
import { siteInfo } from '@/lib/siteData'
import { transitions } from '@/lib/animations'

const sizes = {
  sm: { img: 'h-9 w-9', px: 36, text: 'text-xl' },
  lg: { img: 'h-[50px] w-[50px]', px: 50, text: 'text-lg' },
}

export default function Logo({ size = 'sm', className = '' }) {
  const s = sizes[size] ?? sizes.sm

  return (
    <Link to="/" className={`inline-flex min-h-11 items-center gap-2.5 ${className}`}>
      <motion.img
        src={logoUAKI}
        alt=""
        width={s.px}
        height={s.px}
        className={`${s.img} object-contain`}
        whileHover={{ rotate: -8, scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={transitions.spring}
        tabIndex={-1} 
      />
      <span className={`${s.text} font-bold text-white`}>{siteInfo.name}</span>
    </Link>
  )
}
