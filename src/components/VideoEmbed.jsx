import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DotGrid from '@/components/DotGrid'
import { Loop } from '@/components/animations'
import youtubeIcon from '@/assets/svg/youtube-icon.svg'
import { ripple, transitions } from '@/lib/animations'

const RIPPLE_A = ripple(0)
const RIPPLE_B = ripple(1.1)

export default function VideoEmbed({ videoId, title, fallbackUrl, className = '' }) {
  const [playing, setPlaying] = useState(false)
  const hasVideo = Boolean(videoId)
  const thumb = hasVideo ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null

  const playButton = (
    <motion.span
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm sm:h-[76px] sm:w-[76px]"
      variants={{ hover: { scale: 1.1 } }}
      transition={transitions.spring}
    >
      <Loop as="span" aria-hidden="true" className="absolute inset-0 rounded-full bg-white" animation={RIPPLE_A} />
      <Loop as="span" aria-hidden="true" className="absolute inset-0 rounded-full bg-white" animation={RIPPLE_B} />
      <img src={youtubeIcon} alt="" width={64} height={45} className="relative w-9 sm:w-11" draggable={false} />
    </motion.span>
  )

  const poster = (
    <>
      {thumb ? (
        <motion.img
          src={thumb}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          variants={{ hover: { scale: 1.04 } }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-cream">
          <div className="absolute inset-0 bg-gradient-to-br from-leaf/45 via-leaf/20 to-brand/35" />
          <DotGrid className="absolute inset-0 text-brand/10" gap={22} size={2} />
        </div>
      )}
      {thumb && (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      )}
    </>
  )

  const shared = 'group absolute inset-0 flex items-center justify-center focus-visible:outline-offset-[-4px] focus-visible:outline-brand'

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-cream ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        {playing ? (
          <motion.iframe
            key="player"
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : hasVideo ? (
          <motion.button
            key="poster"
            type="button"
            className={shared}
            onClick={() => setPlaying(true)}
            aria-label={`Putar ${title}`}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            exit={{ opacity: 0 }}
          >
            {poster}
            {playButton}
          </motion.button>
        ) : (
          <motion.a
            key="fallback"
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={shared}
            aria-label={`Tonton ${title} di YouTube (tab baru)`}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {poster}
            {playButton}
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
