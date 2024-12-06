import React, { useState } from 'react';
import postMessage from '../../../services/postMessage';
import { formDataProps } from '../../../types/formData';

export default function MessageForm() {
  const [formData, setFormData] = useState<formDataProps>({
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
    <div>
      <p>Send me a message</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
