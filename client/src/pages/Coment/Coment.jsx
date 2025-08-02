import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Coment.module.css";
import { FaPen, FaTrashAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Coment = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/post");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      } catch (err) {
        console.error("Ошибка при получении постов:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить комментарий?")) {
      try {
        await axios.delete(`http://localhost:3001/post/${id}`);
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } catch (err) {
        console.error("Ошибка при удалении поста:", err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    setPosts((prev) => {
      const newPosts = [...prev];
      [newPosts[index - 1], newPosts[index]] = [newPosts[index], newPosts[index - 1]];
      return newPosts;
    });
  };

  const moveDown = (index) => {
    if (index === posts.length - 1) return;
    setPosts((prev) => {
      const newPosts = [...prev];
      [newPosts[index], newPosts[index + 1]] = [newPosts[index + 1], newPosts[index]];
      return newPosts;
    });
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Комментарии</h2>
      {posts.map((post, index) => (
        <div key={post._id} className={styles.card}>
          <div className={styles.mainContent}>
            <div className={styles.topRow}>
              <img
                src={`https://api.dicebear.com/8.x/identicon/svg?seed=${post.username}`}
                alt="avatar"
                className={styles.avatar}
              />
              <div className={styles.userMeta}>
                <span className={styles.username}>{post.username}</span>
                <span className={styles.meta}>
                  {new Date(post.createdAt).toLocaleDateString()} в{" "}
                  {new Date(post.createdAt).toLocaleTimeString()}
                </span>
                {post.homepage && (
                  <span className={styles.tags}>
                    <a
                      href={post.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Сайт
                    </a>
                  </span>
                )}
              </div>
            </div>

            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: post.text }}
            />
          </div>

          <div className={styles.rightControls}>
            <div className={styles.arrowsRow}>
              <button
                className={styles.arrowButton}
                onClick={() => moveUp(index)}
                disabled={index === 0}
                title="Поднять"
              >
                <FaArrowUp />
              </button>
              <div className={styles.positionNumber}>{index + 1}</div>
              <button
                className={styles.arrowButton}
                onClick={() => moveDown(index)}
                disabled={index === posts.length - 1}
                title="Опустить"
              >
                <FaArrowDown />
              </button>
            </div>
          </div>

          <div className={styles.bottomActions}>
            <button
              className={styles.iconButton}
              onClick={() => handleDelete(post._id)}
              title="Удалить"
            >
              <FaTrashAlt />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => handleEdit(post._id)}
              title="Редактировать"
            >
              <FaPen />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coment;
