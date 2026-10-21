import { Reveal } from '@/components/animations'

export default function DetailPlaceholder({ name, children }) {
  return (
    <Reveal className="rounded-2xl border-2 border-dashed border-leaf/60 bg-white/40 p-6 text-brand sm:p-8">
      <p className="text-footer font-bold uppercase tracking-wider text-brand/70">[PLACEHOLDER] {name}</p>
      {children && <div className="mt-3 text-body font-medium">{children}</div>}
    </Reveal>
  )
}
