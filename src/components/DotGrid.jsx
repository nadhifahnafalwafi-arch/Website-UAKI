export default function DotGrid({ className = '', gap = 14, size = 2.5 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(currentColor ${size}px, transparent ${size + 0.5}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  )
}
