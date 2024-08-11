import axios from "axios";

const baseURL = import.meta.env.VITE_WEB_API_URL || "https://localhost:7223/"; // Ensure REACT_APP_API_URL is set in your .env files

export const getFlashcardsByDeckId = async (id) => {
  try {
    const response = await axios.get(`${baseURL}api/Flashcard/bydeck/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateFlashcard = async (flashcardId, updatedFlashcardData) => {
  try {
    const response = await axios.put(
      `${baseURL}api/Flashcard/update/${flashcardId}`,
      updatedFlashcardData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createFlashcard = async (deckId, newFlashcardData) => {
  try {
    const response = await axios.post(
      `${baseURL}api/Flashcard/create/${deckId}`,
      newFlashcardData,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFlashcard = async (flashcardId) => {
  try {
    const response = await axios.delete(
      `${baseURL}api/Flashcard/delete/${flashcardId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createFeedback = async (flashcardWithUserInputDTO) => {
  const response = await axios.post(
    `${baseURL}api/Flashcard/feedback`,
    flashcardWithUserInputDTO,
  );
  return response.data;
};
