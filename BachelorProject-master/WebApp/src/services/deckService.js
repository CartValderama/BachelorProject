import axios from "axios";

const baseURL = import.meta.env.VITE_WEB_API_URL || "https://localhost:7223/"; // Ensure REACT_APP_API_URL is set in your .env files

export const getAllDecks = async () => {
  try {
    const response = await axios.get(`${baseURL}api/Deck`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getDecksWithoutFolder = async () => {
  try {
    const response = await axios.get(`${baseURL}api/Deck/navigation`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const getDeckById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}api/Deck/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDeck = async (id, updatedDeck) => {
  try {
    const response = await axios.put(
      `${baseURL}api/Deck/update/${id}`,
      updatedDeck,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDeck = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}api/Deck/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDeck = async (newDeck) => {
  try {
    const response = await axios.post(`${baseURL}api/Deck/create`, newDeck);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
