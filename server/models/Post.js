import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Имя обязательно"],
      match: [/^[a-zA-Z0-9]+$/, "Допустимы только латинские буквы и цифры"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-mail обязателен"],
      match: [/\S+@\S+\.\S+/, "Некорректный e-mail"],
      lowercase: true,
      trim: true,
    },
    homepage: {
      type: String,
      required: false,
      match: [
        /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/,
        "Некорректный URL",
      ],
      trim: true,
    },
    captcha: {
      type: String,
      required: true,
      validate: {
        validator: v => /^[a-zA-Z0-9]+$/.test(v),
        message: props => `${props.value} содержит недопустимые символы`,
      },
      trim: true,
    },
    text: {
      type: String,
      required: [true, "Текст обязателен"],
      validate: {
        validator: function (value) {
          const allowedTagsPattern = /<\/?(a(\s+href="[^"]*")?(\s+title="[^"]*")?|code|i|strong)>/gi;
          // Удаляем разрешённые теги
          const cleaned = value.replace(allowedTagsPattern, "");
          // Проверяем остались ли запрещённые теги
          return !/<.*?>/.test(cleaned);
        },
        message:
          "Текст содержит недопустимые HTML теги. Разрешены только: <a href='' title=''>, <code>, <i>, <strong>",
      },
      trim: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
