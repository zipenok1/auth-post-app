import { useState } from 'react';
import Modal from './Modal';
import '../styles/PostsItem.css';

function PostsItem({ posts }) {
  const [isOpen, setIsOpen] = useState({ isModal: false, isApi: true });

  const add = () => {
    setIsOpen({ isModal: true, isApi: false });
  };
  const update = () => {
    setIsOpen({ isModal: true, isApi: true });
  };
  const closeModal = () => {
    setIsOpen({ ...isOpen, isModal: false });
  };

  return (
    <div className="postsItem__content">
      <div className="post-card">
        <h3 className="post-title">{posts.title}</h3>
        <p className="post-description">{posts.description}</p>
        <div className="post-footer">
          <span className="post-id">#{posts.id_posts}</span>
        </div>
        <div className="post__box">
          <button onClick={add} className="post-butt">
            удалить
          </button>
          <button onClick={update} className="post-butt">
            обновить
          </button>
        </div>
      </div>
      <Modal id={posts.id_posts} posts={posts} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default PostsItem;
