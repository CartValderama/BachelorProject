import React, { useState } from "react";
import { deleteFlashcard } from "../../../services/flashcardService";
import { useModal } from "../../Modal";
import Icon from "@mdi/react";
import { mdiAlert, mdiCardText, mdiCardTextOutline } from "@mdi/js";

export default function DeleteFlashcard({ flashcard, setUpdate, length }) {
  const { closeModal } = useModal();

  const handleDelete = async (flashcardId) => {
    if (length > 1) {
      try {
        const deletedFlashcard = await deleteFlashcard(flashcardId);
        console.log("Flashcard deleted successfully:", deletedFlashcard);
        setUpdate((prev) => !prev);
      } catch (error) {
        console.error("Error deleting flashcard:", error);
      }
    } else {
      closeModal();
      console.log("Not allowed to delete the last card");
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-14 rounded bg-[#FFEFEF] p-10">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Icon
          path={mdiAlert}
          size={4}
          color={"#530000"}
          className="hidden sm:inline"
        />
        <h1 className="text-center text-3xl font-bold text-[#530000]">
          {length > 1
            ? "Are you sure that you want to delete this card?"
            : "You cannot delete this flashcard"}
        </h1>
        <p
          className={`${length > 1 ? "hidden" : "inline"} text-center text-[#530000]`}
        >
          Every deck must contain at least one flashcard. An empty deck is not
          permitted.
        </p>
      </div>
      <div className={`${length > 1 ? "flex" : "hidden"} flex-col gap-y-10`}>
        <div className="flex flex-col items-center justify-center">
          <p className="break-all text-center text-[#530000]">
            {flashcard.Front}
          </p>
          <div className="flex items-center gap-x-2">
            <Icon path={mdiCardText} size={1} color={"#530000"} />
            <h2 className="text-xl font-semibold text-[#530000]">Front:</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="break-all text-center text-[#530000]">
            {flashcard.Back}
          </p>
          <div className="flex items-center gap-x-2">
            <Icon path={mdiCardTextOutline} size={1} color={"#530000"} />
            <h2 className="text-xl font-semibold text-[#530000]">Back:</h2>
          </div>
        </div>
      </div>

      <div className="flex gap-x-2">
        <button
          className={`${length > 1 ? "flex" : "hidden"} items-center rounded bg-[#530000] px-6 py-2  text-white
              transition duration-200 ease-in hover:bg-stone-700`}
          onClick={() => handleDelete(flashcard.FlashcardId)}
        >
          Delete
        </button>
        <button
          onClick={() => closeModal()}
          className={`flex items-center rounded border  px-6 py-2 
              transition duration-200 ease-in  ${length > 1 ? "border-[#530000] bg-[#FFEFEF] text-[#530000] hover:bg-white" : "bg-[#530000] text-white hover:bg-stone-700"}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
