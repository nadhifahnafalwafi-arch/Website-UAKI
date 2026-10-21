import Loop from './Loop'
import { floating } from '@/lib/animations'

export default function Floating({ as = 'div', className = '', children, ...rest }) {
  return (
    <Loop as={as} className={className} animation={floating.animate} {...rest}>
      {children}
    </Loop>
  )
}
