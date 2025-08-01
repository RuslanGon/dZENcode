import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>dZENcode</Link>
      <nav className={styles.nav}>
        <Link to="/comments" className={styles.link}>Комментарии</Link>
        <Link to="/add-comment" className={styles.link}>Добавить комментарий</Link>
      </nav>
    </header>
  )
}

export default Header
