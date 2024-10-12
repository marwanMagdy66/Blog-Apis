export const UpdateLikesAndComments = async (post, like, comment) => {
  if (like) post.likes += 1;
  if (comment) post.comments += 1;
  await post.save();
};

export const DeleteLikesAndComments = async (post, React) => {
  if (React.likes) post.likes -= 1;
  if (React.comments) post.comments -= 1;

  await post.save();
};
