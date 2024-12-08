import { FormDataProps } from '../types/formData';

const SHEETS_ID = process.env.REACT_APP_SHEETS_ID;

export default async function postMessage(
  formData: FormDataProps
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://script.google.com/macros/s/${SHEETS_ID}/exec`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      return false;
    }

    const result = await response.json();

    return result.success === true;
  } catch (error) {
    console.error('Error in postMessage:', error);
    return false;
  }
}
