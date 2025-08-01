import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    res.status(500).json({ message: "Не удалось получить посты" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { username, email, homepage, captcha, text } = req.body;

    const newPost = new PostModel({
      username,
      email,
      homepage,
      captcha,
      text,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Не удалось создать пост" });
  }
};

export const getByOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.json(post);
  } catch (error) {
    console.error("Ошибка при получении поста:", error);
    res.status(500).json({ message: "Не удалось получить пост" });
  }
};

export const uploadPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    delete updates._id;

    const updatedPost = await PostModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Ошибка при обновлении поста:", error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Не удалось обновить пост" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    res.json({ message: "Пост успешно удалён" });
  } catch (error) {
    console.error("Ошибка при удалении поста:", error);
    res.status(500).json({ message: "Не удалось удалить пост" });
  }
};
