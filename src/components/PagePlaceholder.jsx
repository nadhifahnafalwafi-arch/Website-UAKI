import Container from '@/components/Container'
import { Reveal } from '@/components/animations'

export default function PagePlaceholder({ name }) {
  return (
    <section aria-label={name} className="py-24">
      <Container>
        <Reveal as="p" className="text-body-sm font-medium text-brand">
          [PLACEHOLDER] Konten halaman {name} menyusul.
        </Reveal>
      </Container>
    </section>
  )
}
