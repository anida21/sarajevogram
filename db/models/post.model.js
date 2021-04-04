const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  username: {
    type : String,
    required : true
  },
  likesCount: Number,
  liked: [String],
  comments: [
    {
      username: String,
      text: String,
    },
  ],
  imagePath: { type: String, required: true },
  _userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

/* STATIC METHODS */
postSchema.statics.findByUserId = function (_userId) {
  const Post = this;

  return Post.find({
    _userId,
  });
};

module.exports = mongoose.model("Post", postSchema);
