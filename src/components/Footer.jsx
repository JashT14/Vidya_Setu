export default function Footer() {
  const year = 2025
  const siteName = 'UX4G'
  const poweredBy = 'Powered by NeGD | MeitY, Government of India'
  const legalText = 'Terms & Conditions • Privacy Policy'

  const footerContent = `© ${year} - ${siteName}. ${poweredBy} • ${legalText}`

  return (
    <footer>
      <div className="container">
        {footerContent}
      </div>
    </footer>
  )
}
