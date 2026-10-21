import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '@/components/Container'
import Logo from '@/components/Logo'
import { Stagger, StaggerItem, Floating, Reveal } from '@/components/animations'
import { siteInfo, footerHeadings, footerLinks, socialLinks } from '@/lib/siteData'
import { hoverLift, transitions, VIEWPORT_AMOUNT } from '@/lib/animations' 

function FooterHeading({ children }) {
  return <h2 className="mb-4 text-lg font-semibold text-ivory">{children}</h2>
}

function FooterLink({ label, to, icon: Icon }) {
  const isInternal = to.startsWith('/')
  const content = (
    <motion.span className="flex items-center gap-2" variants={{ hover: { x: 4 } }} transition={transitions.spring}>
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
      {label}
    </motion.span>
  )
  const linkClass =
    'flex min-h-11 items-center text-footer font-medium text-ivory transition-colors hover:text-white lg:min-h-0'

  return (
    <motion.li whileHover="hover">
      {isInternal ? (
        <Link to={to} className={linkClass}>
          {content}
        </Link>
      ) : (
        <a href={to} className={linkClass}>
          {content}
        </a>
      )}
    </motion.li>
  )
}

export default function Footer() {
  return (
    <footer className="bg-brand text-white">
      <Container>
        <Stagger
          className="grid grid-cols-1 gap-10 pb-10 pt-14 sm:grid-cols-2 lg:grid-cols-footer"
          stagger={0.12}
          amount={VIEWPORT_AMOUNT.tall} 
        >
          {}
          <StaggerItem>
            <Floating className="mb-4 inline-block">
              <Logo size="lg" />
            </Floating>
            <p className="max-w-[400px] text-body-sm font-medium text-ivory">
              {siteInfo.taglineLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </StaggerItem>

          {}
          <StaggerItem as="nav" aria-label="Tautan footer">
            <FooterHeading>{footerHeadings.links}</FooterHeading>
            <ul className="flex flex-col lg:gap-2.5">
              {footerLinks.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </ul>
          </StaggerItem>

          {}
          <StaggerItem>
            <FooterHeading>{footerHeadings.social}</FooterHeading>
            <ul className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => {
                const external = href.startsWith('http')
                return (
                  <li key={label}>
                    <motion.a
                      href={href}
                      aria-label={label}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-soft text-white"
                      {...hoverLift}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                    </motion.a>
                  </li>
                )
              })}
            </ul>
          </StaggerItem>

          {}
          <StaggerItem>
            <FooterHeading>{footerHeadings.address}</FooterHeading>
            <address className="max-w-[260px] text-footer font-medium not-italic text-ivory">
              {siteInfo.address}
            </address>
          </StaggerItem>
        </Stagger>
      </Container>

      {}
      <Container>
        <div aria-hidden="true" className="h-px w-full bg-cream/60" />
        {}
        <Reveal
          as="p"
          variant="fadeUp"
          margin="0px"
          amount={0.5}
          className="px-2 py-6 text-center text-footer font-semibold text-cream sm:py-7"
        >
          {siteInfo.credit}
        </Reveal>
      </Container>
    </footer>
  )
}
