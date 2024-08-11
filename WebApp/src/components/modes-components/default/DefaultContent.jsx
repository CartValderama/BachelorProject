import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiChatQuestion, mdiCheckBold } from "@mdi/js";

export default function DefaultContent({
  data,
  index,
  activeCard,
  handleFlipBack,
  handleFlipFront,
}) {
  if (!activeCard) {
    return (
      <div
        className="front mx-auto flex h-full w-full max-w-5xl cursor-pointer flex-col items-center justify-between rounded-lg bg-white p-10 shadow-lg transition duration-100 ease-in hover:bg-stone-100"
        onClick={handleFlipFront}
      >
        <div className="flex w-full justify-between">
          <p>Flip me</p>
          <p>
            {index + 1}/{data.length}
          </p>
        </div>
        <div className="my-10 flex h-full flex-col items-center justify-center gap-y-4 text-stone-700">
          <div className="flex gap-x-2">
            <h2 className={`text-xl font-bold `}>Question</h2>
            <Icon path={mdiChatQuestion} size={1} />
          </div>

          <p className="text-center ">{data[index].Front}</p>
        </div>
      </div>
    );
  } else if (activeCard) {
    return (
      <div
        className="back flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-lg bg-white p-10 shadow-md transition duration-100 ease-in hover:bg-stone-100"
        onClick={handleFlipBack}
      >
        <div className="flex w-full justify-between">
          <p>Flip me</p>
          <p>
            {index + 1}/{data.length}
          </p>
        </div>
        <div className="my-10 flex h-full flex-col items-center justify-center gap-y-4 text-stone-700">
          <div className="flex gap-x-2">
            <h2 className={`text-xl font-bold `}>Answer</h2>
            <Icon path={mdiCheckBold} size={1} />
          </div>
          <p className="text-center ">{data[index].Back}</p>
        </div>
      </div>
    );
  }
}
