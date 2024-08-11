import React, { useEffect, useState } from "react";

function Quiz({ flashcards, handleAlternative, showResult }) {
  const [quizFlashcards, setQuizFlashcards] = useState(
    flashcards.map((flashcard) => {
      const alternatives = [
        { id: flashcard.FlashcardId, text: flashcard.Back },
        {
          id: flashcard.FlashcardId,
          text: flashcard.Distractor1,
        },
        {
          id: flashcard.FlashcardId,
          text: flashcard.Distractor2,
        },
      ];
      shuffleArray(alternatives); // Shuffle the alternatives array
      return { ...flashcard, alternatives };
    }),
  );

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="mx-auto my-20 flex  max-w-4xl flex-col gap-y-28 px-5">
      {quizFlashcards.map((flashcard, index) => {
        const [activeAlternative, setActiveAlternative] = useState(null);

        useEffect(() => {
          setActiveAlternative(null);
        }, [showResult]);

        const alternatives = flashcard.alternatives;

        return (
          <div
            key={flashcard.FlashcardId}
            className="flex flex-col justify-between gap-y-20 bg-white p-10"
          >
            <div className="flex justify-between">
              <p className="text-stone-700">Question</p>
              <p className="text-stone-700">
                {index + 1}/{flashcards.length}
              </p>
            </div>
            <h1 className="text-center text-stone-700">{flashcard.Front}</h1>
            <div className="flex flex-col items-center gap-y-10">
              <h2 className="font-semibold text-stone-700">
                Select the correct answer
              </h2>
              <div className="flex w-full flex-col gap-y-5">
                {alternatives.map((alternative, alternativeIndex) => (
                  <button
                    key={alternativeIndex}
                    onClick={() => {
                      handleAlternative(
                        alternative.text,
                        alternative.id,
                        alternativeIndex,
                      );
                      setActiveAlternative(alternativeIndex);
                    }}
                    className={`rounded border border-stone-700 p-5
                       text-stone-700 transition duration-200 ease-in hover:border-stone-300 hover:bg-[#E7E5E4] hover:text-stone-500 ${
                         activeAlternative === alternativeIndex &&
                         flashcard.FlashcardId === alternative.id
                           ? "border-stone-100 bg-stone-300"
                           : "bg-white"
                       }
                    `}
                  >
                    {alternative.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Quiz;
