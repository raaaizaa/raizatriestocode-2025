import { FormDataProps } from '../types/formData';

const SHEETS_ID = process.env.REACT_APP_SHEETS_ID;

export default async function postMessage(formData: FormDataProps) {
  try {
    const response = await fetch(
      `https://script.google.com/macros/s/${SHEETS_ID}/exec`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();

    if (!response) {
      return false;
    }

    return result;
  } catch (error) {
    console.error('Error in postMessage:', error);
    return false;
  }
}
