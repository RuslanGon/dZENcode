import React from 'react'
import photo from '../../assets/blog.jpg'
import styles from './Main.module.css'

const Main = () => {
  return (
    <section className={styles.main}>
      <div className={styles.content}>
        <h1>Добро пожаловать в раздел комментариев</h1>
        <p>
          Здесь вы можете оставить свои мысли, предложения или просто поделиться мнением.
          Все сообщения проходят быструю проверку. HTML-теги, кроме разрешённых, недопустимы.
        </p>
      </div>
      <img src={photo} alt="Blog Illustration" className={styles.image} />
    </section>
  )
}

export default Main
