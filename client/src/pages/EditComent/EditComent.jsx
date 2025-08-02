import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditComent.module.css';

const EditComent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    homepage: '',
    captcha: '',
    text: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/post/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке поста:', err);
        alert('Не удалось загрузить комментарий');
        navigate('/comments');
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/post/${id}`, formData);
      alert('Комментарий обновлён!');
      navigate('/comments');
    } catch (err) {
      console.error('Ошибка при обновлении комментария:', err);
      alert('Ошибка при сохранении изменений');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Редактировать комментарий</h2>

      <input
        type="text"
        name="username"
        placeholder="User Name"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="homepage"
        placeholder="Home Page (необязательно)"
        value={formData.homepage}
        onChange={handleChange}
      />

      <input
        type="text"
        name="captcha"
        placeholder="CAPTCHA"
        value={formData.captcha}
        onChange={handleChange}
        required
      />

      <textarea
        name="text"
        placeholder="Текст сообщения"
        value={formData.text}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Сохранить изменения</button>
    </form>
  );
};

export default EditComent;
