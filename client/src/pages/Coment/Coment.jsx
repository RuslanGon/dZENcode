import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Coment.module.css';
import { FaTrashAlt, FaPen } from 'react-icons/fa';

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

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить комментарий?')) {
      try {
        await axios.delete(`http://localhost:3001/post/${id}`);
        setPosts(prev => prev.filter(post => post._id !== id));
      } catch (err) {
        console.error('Ошибка при удалении поста:', err);
      }
    }
  };

  const handleEdit = (id) => {
    alert(`Редактирование поста с ID: ${id} (функция пока не реализована)`);
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Комментарии</h2>
      {posts.map((post) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.topRow}>
            <img
              src={`https://api.dicebear.com/8.x/identicon/svg?seed=${post.username}`}
              alt="avatar"
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <div className={styles.username}>{post.username}</div>
              <div className={styles.meta}>
                {new Date(post.createdAt).toLocaleString()}
              </div>
              {post.homepage && (
                <div className={styles.tags}>
                  <a href={post.homepage} target="_blank" rel="noopener noreferrer">Сайт</a>
                </div>
              )}
            </div>
          </div>

          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: post.text }}
          />

          <div className={styles.actions}>
            <button className={styles.iconButton} onClick={() => handleEdit(post._id)}>
              <FaPen />
            </button>
            <button className={styles.iconButton} onClick={() => handleDelete(post._id)}>
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coment;
