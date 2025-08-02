import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Coment.module.css';

const Coment = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/post');
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sorted);
      } catch (err) {
        console.error('Ошибка при получении постов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Комментарии</h2>
      {posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.header}>
            <strong>{post.username}</strong> &nbsp;
            <a href={`mailto:${post.email}`}>{post.email}</a>
            {post.homepage && (
              <>
                &nbsp;|&nbsp;
                <a href={post.homepage} target="_blank" rel="noopener noreferrer">
                  Сайт
                </a>
              </>
            )}
          </div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: post.text }}
          />
          <div className={styles.footer}>
            <span>CAPTCHA: {post.captcha}</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coment;
