import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Api from '../api';
import '../styles/Modal.css';

function Modal({ id, posts, isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen.isApi && posts) {
      setTitle(posts.title);
      setDescription(posts.description);
    }
  }, [isOpen.isApi, posts]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isOpen.isApi) {
        await Api.posts.updatePosts(id, { title, description });
      } else {
        await Api.posts.deletePosts(id);
      }
      window.location.reload();
    } catch (error) {
      console.error('ошибка при обновлении:', error);
    }
  };

  if (!isOpen.isModal) return null;

  return createPortal(
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <h2>{isOpen.isApi ? 'редактирование' : 'удаление'}</h2>
        {isOpen.isApi ? (
          <form className="modal__form" onSubmit={submit}>
            <input
              type="text"
              placeholder="заголовок"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit">обновить</button>
          </form>
        ) : (
          <div className="modal__delete">
            <p>вы действительно хотите удалить пост?</p>
            <div className="modal__delete-btm">
              <button onClick={onClose}>Отмена</button>
              <button onClick={submit}>Удалить</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
