import { Reveal, TypewriterText } from '@/components/animations'
import { CURSOR_EFFECTS } from '@/lib/animations' 

const tones = {
  brand: 'text-brand', 
  cream: 'text-cream', 
}

export default function SectionTitle({ id, tone = 'brand', className = '', children }) {
  const classes = `text-center text-heading font-bold ${tones[tone] ?? tones.brand} ${className}`

  if (CURSOR_EFFECTS.typewriter && typeof children === 'string') {
    return <TypewriterText as="h2" id={id} text={children} className={classes} />
  }

  return (
    <Reveal as="h2" id={id} className={classes}>
      {children}
    </Reveal>
  )
}
