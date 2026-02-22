/**
 * CTAButton
 *
 * Production-ready notes:
 * - Use <button> for actions (purchase/rent/add-to-cart).
 * - For real purchase links, you may switch to <a href> with proper rel/target.
 */

export function createCTAButton({
  label,
  variant = 'primary',
  size = 'md',
  onClick,
  ariaLabel,
  icon,
}) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = `cta cta--${variant} cta--${size}`
  button.textContent = label

  if (ariaLabel) button.setAttribute('aria-label', ariaLabel)
  if (typeof onClick === 'function') button.addEventListener('click', onClick)

  if (icon) {
    button.textContent = ''
    const iconSpan = document.createElement('span')
    iconSpan.className = 'cta__icon'
    iconSpan.setAttribute('aria-hidden', 'true')
    iconSpan.textContent = icon

    const labelSpan = document.createElement('span')
    labelSpan.className = 'cta__label'
    labelSpan.textContent = label

    button.append(iconSpan, labelSpan)
  }

  return button
}
