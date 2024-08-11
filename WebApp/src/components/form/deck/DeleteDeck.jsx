import React from "react";
import { useModal } from "../../Modal";
import Icon from "@mdi/react";
import { mdiAlertBox } from "@mdi/js";
import * as deckService from "../../../services/deckService";
import { useNavigate } from "react-router-dom";

function DeleteDeck({ deck }) {
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleDelete = async (deckId) => {
    try {
      const deletedDeck = await deckService.deleteDeck(deckId);
      console.log("Flashcard deleted successfully:", deletedDeck);
      navigate("/library");
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-14 rounded bg-[#FFEFEF] p-10">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Icon
          path={mdiAlertBox}
          size={4}
          color={"#530000"}
          className="hidden sm:inline"
        />
        <h1 className="text-center text-3xl font-bold text-[#530000]">
          Are you sure that you want to delete this deck?
        </h1>
      </div>
      <div className={`flex flex-col gap-y-7`}>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h2 className="break-all text-center font-bold text-[#530000]">
            {deck.DeckName}
          </h2>
          <p className="break-all text-center text-[#530000]">
            {deck.DeckDescription}
          </p>
        </div>
      </div>

      <div className="flex gap-x-2">
        <button
          onClick={() => handleDelete(deck.DeckId)}
          className={`flex items-center rounded bg-[#530000] px-6 py-2  text-white
              transition duration-200 ease-in hover:bg-stone-700`}
        >
          Delete
        </button>
        <button
          onClick={() => closeModal()}
          className={`flex items-center rounded border  border-[#530000] bg-[#FFEFEF] 
              px-6 py-2 text-[#530000] transition duration-200 ease-in hover:bg-white`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteDeck;
