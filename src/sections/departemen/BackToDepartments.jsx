import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { departmentDetailUi } from '@/lib/content/departemen'
import { transitions } from '@/lib/animations'

const BACK_TO = { pathname: '/tentang-kami', hash: '#departemen' }

export default function BackToDepartments() {
  return (
    <motion.span className="inline-flex" whileHover="hover" whileTap={{ scale: 0.96 }}>
      <Link
        to={BACK_TO}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-leaf/60 bg-white/70 px-5 py-2.5 text-nav font-semibold text-brand outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <motion.span className="flex" variants={{ hover: { x: -3 } }} transition={transitions.spring}>
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden="true" />
        </motion.span>
        {departmentDetailUi.back}
      </Link>
    </motion.span>
  )
}
