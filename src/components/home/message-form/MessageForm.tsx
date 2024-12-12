import React, { useState } from 'react';
import postMessage from '../../../services/postMessage';
import { FormDataProps } from '../../../types/formData';

import styles from './MessageForm.module.css';

export default function MessageForm() {
  const [formData, setFormData] = useState<FormDataProps>({
    name: '',
    message: '',
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
        alert('Your message was sent successfully!');
      } else {
        console.error('Failed to send the message.');
        alert('Failed to send the message. Please try again later.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again later.');
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
          />
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Message: </p>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
