import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
    try {
      const posts = await PostModel.find();
      res.json(posts);
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
      res.status(500).json({ message: 'Не удалось получить посты' });
    }
  };