import Link from 'next/link'

type CTAButtonVariant = 'primary' | 'secondary' | 'outline'

export function CTAButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string
  children: React.ReactNode
  variant?: CTAButtonVariant
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center rounded px-4 py-2 text-xs font-[800] uppercase tracking-wide transition-colors'

  const styles: Record<CTAButtonVariant, string> = {
    primary: 'bg-brand-red text-brand-white hover:bg-brand-white hover:text-brand-black',
    secondary: 'bg-brand-black text-brand-white hover:bg-brand-gray-900',
    outline: 'border border-brand-gray-200 bg-brand-white text-brand-black hover:border-brand-red',
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`.trim()}>
      {children}
    </Link>
  )
}
