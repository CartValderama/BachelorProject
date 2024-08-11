import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import FeedbackContent from "./feedback/FeedbackContent";
import DefaultContent from "./default/DefaultContent";
import Icon from "@mdi/react";
import {
  mdiChevronRight,
  mdiChevronDoubleRight,
  mdiChevronDoubleLeft,
  mdiChevronLeft,
} from "@mdi/js";

function Carousel({ data, mode, userId, gpt4 }) {
  const [direction, setDirection] = useState(null);
  const [index, setIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  let hasPrev = index > 0;
  let hasNext = index < data.length - 1;

  useEffect(() => {
    if (direction) {
      const timeout = setTimeout(() => {
        setDirection(null);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [direction]);

  const handlePrevClick = () => {
    if (hasPrev) {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
      setIndex(index - 1);
      setDirection("right"); // Set the direction of animation
      setLoading(false);
      if (activeCard) {
        setActiveCard(!activeCard);
      }
    }
  };

  const handleFirstClick = () => {
    if (hasPrev) {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
      setIndex(0);
      setDirection("right"); // Set the direction of animation
      setLoading(false);
      if (activeCard) {
        setActiveCard(!activeCard);
      }
    }
  };

  const handleNextClick = () => {
    if (hasNext) {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
      setIndex(index + 1);
      setDirection("left"); // Set the direction of animation
      setLoading(false);
      if (activeCard) {
        setActiveCard(!activeCard);
      }
    }
  };

  const handleLastClick = () => {
    if (hasNext) {
      if (isButtonDisabled) return;
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 500);
      setIndex(data.length - 1);
      setDirection("left"); // Set the direction of animation
      setLoading(false);
      if (activeCard) {
        setActiveCard(!activeCard);
      }
    }
  };

  const handleFlipFront = () => {
    setActiveCard(!activeCard);
  };

  const handleFlipBack = () => {
    setActiveCard(!activeCard);
  };

  return (
    <div className="carousel-height mx-auto my-10 flex max-w-5xl flex-col overflow-hidden px-5">
      <div
        className={`card flex h-full flex-col ${activeCard ? "cardFlip" : ""} ${direction === "left" ? "slide-in-from-right" : ""} ${direction === "right" ? "slide-in-from-left" : ""}`}
      >
        {/* insert content here */}
        {mode === "feedback" ? (
          <FeedbackContent
            data={data}
            index={index}
            activeCard={activeCard}
            loading={loading}
            setLoading={setLoading}
            handleFlipBack={handleFlipBack}
            handleFlipFront={handleFlipFront}
            userId={userId}
            gpt4={gpt4}
          />
        ) : (
          <DefaultContent
            data={data}
            index={index}
            activeCard={activeCard}
            handleFlipBack={handleFlipBack}
            handleFlipFront={handleFlipFront}
          />
        )}
      </div>
      <div className={`mt-5 flex items-center justify-center gap-x-20`}>
        <div className="flex gap-x-9">
          <button
            className={`text-stone-700  ${!hasPrev ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handleFirstClick}
            disabled={!hasPrev || isButtonDisabled}
          >
            <Icon path={mdiChevronDoubleLeft} size={1} />
          </button>
          <button
            className={`text-stone-700  ${!hasPrev ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handlePrevClick}
            disabled={!hasPrev || isButtonDisabled}
          >
            <Icon path={mdiChevronLeft} size={1} />
          </button>
        </div>

        <div className="flex gap-x-9">
          <button
            className={`text-stone-700  ${!hasNext ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handleNextClick}
            disabled={!hasNext || isButtonDisabled}
          >
            <Icon path={mdiChevronRight} size={1} />
          </button>
          <button
            className={`text-stone-700  ${!hasNext ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handleLastClick}
            disabled={!hasNext || isButtonDisabled}
          >
            <Icon path={mdiChevronDoubleRight} size={1} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
