import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as flashcardService from "../../../services/flashcardService";
import { useParams } from "react-router-dom";
import { useModal } from "../../Modal";
import Icon from "@mdi/react";
import { mdiAlert, mdiCardText, mdiCardTextOutline, mdiCard } from "@mdi/js";

function CreateFlashcard({ setUpdate }) {
  const { id } = useParams();
  const { closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = yup.object().shape({
    front: yup.string().required("This field (front) cannot be left empty."),
    back: yup.string().required("This field (back) cannot be left empty."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const createNewFlashcard = await flashcardService.createFlashcard(
        id,
        data,
      );
      console.log("Flashcard updated successfully:", createNewFlashcard);
      closeModal();
      setUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form
      className="flex flex-col items-center gap-y-14 px-14 py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-x-2">
        <Icon path={mdiCard} size={2} className="hidden sm:inline" />
        <h1 className="text-center text-4xl font-bold">Create Flashcard</h1>
      </div>

      <div className="flex w-full flex-col gap-y-14">
        <div className="flex flex-col items-center gap-y-2">
          <input
            {...register("front")}
            type="text"
            placeholder={
              errors.front
                ? errors.front?.message
                : "Please provide the description for the front side here"
            }
            className={`${
              errors.front
                ? "placeholder-[#970E0E] focus-visible:border-b-[#530000]"
                : "focus-visible:border-b-[#0C4A6E]"
            } flex w-full border-b py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2`}
          />
          <div className="flex gap-x-1">
            <Icon path={mdiCardText} size={1} />
            <p className="font-bold">Front</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <input
            {...register("back")}
            type="text"
            placeholder={
              errors.back
                ? errors.back?.message
                : "Please provide the answer for the back side here."
            }
            className={`${
              errors.back
                ? "placeholder-[#970E0E] focus-visible:border-b-[#530000]"
                : "focus-visible:border-b-[#0C4A6E]"
            } flex w-full border-b py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2`}
          />
          <div className="flex gap-x-1">
            <Icon path={mdiCardTextOutline} size={1} />
            <p className="font-bold">Back</p>
          </div>
        </div>
      </div>

      <div className="flex gap-x-3">
        <button
          type="submit"
          disabled={isSubmitting} // Disable button if form is submitting
          className="flex items-center rounded bg-sky-900 px-6 py-2  text-white
              transition duration-200 ease-in hover:bg-stone-700"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
        <a
          onClick={() => closeModal()}
          className="flex items-center rounded bg-stone-200 px-6 py-2  text-stone-700
              transition duration-200 ease-in hover:bg-stone-300"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

export default CreateFlashcard;
