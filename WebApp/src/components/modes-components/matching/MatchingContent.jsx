import React, { useState, useEffect } from "react";

function MatchingContent({ data }) {
  const [front, setFront] = useState([]);
  const [back, setBack] = useState([]);

  const [frontId, setFrontId] = useState(0);
  const [backId, setBackId] = useState(0);

  useEffect(() => {
    setFront([...data].sort(() => Math.random() - 0.5));
    setBack([...data].sort(() => Math.random() - 0.5));
  }, [data]);

  useEffect(() => {
    if (frontId === backId && frontId !== 0 && backId !== 0) {
      setFront((front) => front.filter((card) => card.FlashcardId !== frontId));
      setBack((back) => back.filter((card) => card.FlashcardId !== backId));
    }
  }, [frontId, backId]);

  return (
    <div className="mx-auto my-24 flex max-w-7xl justify-between gap-x-14 px-5 transition duration-500 ease-in">
      <div className="grid w-1/2 grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {front.map((card) => (
          <p
            key={card.FlashcardId}
            className={`flex cursor-pointer rounded p-3 text-center text-xs transition duration-500 ease-out hover:bg-stone-700 hover:text-white md:text-base ${
              card.FlashcardId === frontId
                ? "bg-stone-700 text-white"
                : "bg-[#0E7490] text-white"
            }`}
            onClick={() => {
              setFrontId(card.FlashcardId);
            }}
          >
            {card.Front}
          </p>
        ))}
      </div>
      <div className="grid w-1/2 grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {back.map((card) => (
          <p
            key={card.FlashcardId}
            className={`flex cursor-pointer rounded p-3 text-center text-xs  transition duration-500 ease-out hover:bg-stone-700 hover:text-white md:text-base ${
              card.FlashcardId === backId
                ? "bg-stone-700 text-white"
                : "bg-[#E0F2FE] text-[#0C4A6E]"
            }`}
            onClick={() => {
              setBackId(card.FlashcardId);
            }}
          >
            {card.Back}
          </p>
        ))}
      </div>
    </div>
  );
}

export default MatchingContent;
