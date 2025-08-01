import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>dZENcode</div>
      <p className={styles.text}>© 2025 dZONcode. Все права защищены.</p>
      <p className={styles.text1}>© Goncharenko Ruslan</p>
    </footer>
  )
}

export default Footer
