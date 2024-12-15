import React, { useState } from 'react';
import postMessage from '../../../services/postMessage';
import { FormDataProps } from '../../../types/formData';

import styles from './MessageForm.module.css';

export default function MessageForm() {
  const [formData, setFormData] = useState<FormDataProps>({
    name: '',
    message: '',
  });
  const [status, setStatus] = useState({
    message: '',
    styles: 'basic',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postMessage(formData);

      if (response) {
        setFormData({ name: '', message: '' });
        setStatus({ message: 'Message sent.', styles: 'basic' });
      } else {
        console.error('Failed to send the message.');
        setStatus({
          message: 'Failed to send message, please try again later.',
          styles: 'error',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setStatus({
        message: 'An unexpected error occured, please try again later.',
        styles: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Send me a message</p>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Name: </p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.nameInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Message: </p>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.messageInput}
          />
        </div>
        {status && (
          <p
            className={status.styles === 'basic' ? styles.basic : styles.error}>
            {status.message}
          </p>
        )}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
