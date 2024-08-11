import axios from "axios";

const baseURL = import.meta.env.VITE_WEB_API_URL || "https://localhost:7223/";

export const generateFeedback = async (flashcardWithUserInputDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateFeedbackGpt35`,
      flashcardWithUserInputDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateFeedbackGpt4 = async (flashcardWithUserInputDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateFeedbackGpt4`,
      flashcardWithUserInputDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateAiDeck = async (aiDeckFormDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateAiDeckGpt35`,
      aiDeckFormDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateAiDeckGpt4 = async (aiDeckFormDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateAiDeckGpt4`,
      aiDeckFormDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateDistractors = async (dataForAiDistractorsDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateDistractorsGpt35`,
      dataForAiDistractorsDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateDistractorsGpt4 = async (dataForAiDistractorsDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/generateDistractorsGpt4`,
      dataForAiDistractorsDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFeedbackObj = async (flashcardWithUserInputDTO) => {
  try {
    const response = await axios.post(
      `${baseURL}api/AzureOpenai/getFeedbackObj`,
      flashcardWithUserInputDTO,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
