export default function Container({ as: Tag = 'div', className = '', children }) {
  return <Tag className={`mx-auto w-full max-w-content px-6 ${className}`}>{children}</Tag>
}
