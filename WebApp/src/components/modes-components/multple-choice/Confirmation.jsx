import React from "react";
import { useModal } from "../../Modal";

function Confirmation({ flashcards, results, handleSubmit }) {
  const { closeModal } = useModal();

  return (
    <div
      className={`${flashcards.length === results.length ? "bg-[#F0FDFA]" : "bg-red-100"} flex flex-col items-center gap-y-14 p-8`}
    >
      <div className="flex flex-col items-center gap-y-5 ">
        <h1
          className={`text-center text-3xl font-semibold ${flashcards.length === results.length ? "text-[#134E4A]" : "text-red-950"}`}
        >
          {flashcards.length === results.length
            ? "Great! You've completed all the questions. Shall we submit now?"
            : "Are you sure you want to submit?"}
        </h1>

        <div className="text-center">
          <p
            className={`${flashcards.length === results.length ? "text-[#134E4A]" : "text-red-950"}`}
          >
            {flashcards.length === results.length
              ? "All questions have been successfully addressed, indicating that your quiz is now complete. You can proceed confidently to submit your responses."
              : `It seems like you missed answering ${flashcards.length - results.length} questions. Would you like to go back and complete them before submitting?`}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-x-3">
        <button
          onClick={() => {
            handleSubmit();
            closeModal();
          }}
          className={`flex w-28 items-center justify-center rounded border ${flashcards.length === results.length ? "bg-[#134E4A] text-white hover:bg-stone-700" : "border-[#530000] text-[#530000] hover:bg-[#FFEFEF]"}  px-6 py-2  transition duration-200 ease-in `}
        >
          Continue
        </button>
        <button
          onClick={() => closeModal()}
          className={`flex w-28 items-center justify-center rounded border px-6 
              py-2 transition duration-200 ease-in  ${flashcards.length === results.length ? "border-[#134E4A] text-[#134E4A] hover:bg-green-50" : "bg-[#530000] text-white hover:bg-stone-700"}`}
        >
          Return
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
