import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Container from '@/components/Container'
import { Stagger, StaggerItem } from '@/components/animations'
import { departmentPath } from '@/data/departments'
import { departmentDetailUi } from '@/lib/content/departemen'
import { transitions } from '@/lib/animations'

function PagerLogo({ dept }) {
  const [ok, setOk] = useState(true)
  if (!ok) {
    return (
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-leaf/60 text-[11px] font-bold text-brand">
        {dept.name}
      </span>
    )
  }
  return (
    <span className="flex h-12 w-[4.5rem] shrink-0 items-center justify-center">
      <img
        src={dept.logoGreen}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
        style={dept.logoScale !== 1 ? { transform: `scale(${dept.logoScale})` } : undefined}
        onError={() => setOk(false)}
        draggable={false}
      />
    </span>
  )
}

function PagerLink({ dept, dir }) {
  const isPrev = dir === 'prev'
  const Arrow = isPrev ? ArrowLeft : ArrowRight
  const label = isPrev ? departmentDetailUi.prevLabel : departmentDetailUi.nextLabel

  return (
    <motion.div whileHover="hover" whileTap={{ scale: 0.98 }} className="h-full">
      <Link
        to={departmentPath(dept.slug)}
        aria-label={`${label}: ${dept.fullName}`}
        className={`relative flex h-full min-h-11 items-center gap-4 rounded-2xl border border-leaf/40 bg-white/60 p-4 outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-5 ${
          isPrev ? '' : 'flex-row-reverse text-right'
        }`}
      >
        <motion.span
          className="flex text-brand"
          variants={{ hover: { x: isPrev ? -4 : 4 } }}
          transition={transitions.spring}
        >
          <Arrow className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
        </motion.span>
        <PagerLogo dept={dept} />
        <span className="min-w-0">
          <span className="block text-footer font-medium text-brand/70">{label}</span>
          <span className="block text-lg font-bold text-brand">{dept.name}</span>
        </span>
      </Link>
    </motion.div>
  )
}

export default function DepartmentPager({ prev, next }) {
  if (!prev && !next) return null
  return (
    <nav aria-label={departmentDetailUi.pagerLabel} className="border-t border-leaf/30 bg-ivory py-10 lg:py-12">
      <Container>
        <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <StaggerItem>
            {prev ? <PagerLink dept={prev} dir="prev" /> : <span aria-hidden="true" className="hidden sm:block" />}
          </StaggerItem>
          <StaggerItem>
            {next ? <PagerLink dept={next} dir="next" /> : <span aria-hidden="true" className="hidden sm:block" />}
          </StaggerItem>
        </Stagger>
      </Container>
    </nav>
  )
}
