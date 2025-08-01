import React, { useState } from 'react';
import styles from './AddComent.module.css';
import axios from 'axios';

const AddComent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    homepage: '',
    captcha: '',
    text: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/post', formData);
      alert('Комментарий успешно добавлен!');
      setFormData({
        username: '',
        email: '',
        homepage: '',
        captcha: '',
        text: '',
      });
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error);
      alert('Произошла ошибка при добавлении комментария.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Добавить комментарий</h2>

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

      <button type="submit">Отправить</button>
    </form>
  );
};

export default AddComent;
