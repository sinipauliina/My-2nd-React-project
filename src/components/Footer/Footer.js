import React from 'react'

import './footer.css'
import '../../main-style.css'

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="footer-container">
        <p>Sivusto &copy; Koirakerho Touhutassut 2019</p>
        <p>
          Sivuston toteutus:
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.sinipauliina.com"
          >
            Sini Pauliina Kolehmainen
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
