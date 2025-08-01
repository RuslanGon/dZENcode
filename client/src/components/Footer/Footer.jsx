import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>dZONcode</div>
      <p className={styles.text}>© 2025 dZONcode. Все права защищены.</p>
    </footer>
  )
}

export default Footer
