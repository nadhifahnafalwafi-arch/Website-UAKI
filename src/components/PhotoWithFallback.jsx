import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function PhotoWithFallback({
  src,
  alt,
  placeholder = null,
  className = '',
  imgClassName = 'object-cover',
  imgStyle, 
  eager = false,
  width,
  height,
}) {
  const reduce = useReducedMotion()
  const imgRef = useRef(null)
  const [status, setStatus] = useState('loading') 

  useEffect(() => {
    setStatus('loading')
  }, [src])

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        {...(status === 'error' ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': true })}
      >
        {placeholder}
      </div>

      {status !== 'error' && src && (
        <motion.img
          ref={imgRef}
          key={src}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${imgClassName}`}
          style={imgStyle} 
          initial={false}
          animate={{ opacity: status === 'loaded' ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          draggable={false}
        />
      )}
    </div>
  )
}
