import { useEffect } from "react";
import observer from "../../script/observer";
import { modes } from "../../data/modeData";
import Icon from "@mdi/react";
import { mdiAirballoon } from "@mdi/js";
import { Link } from "react-router-dom";

export default function IntroModes() {
  useEffect(() => {
    observer("introModes", "#0C4A6E", "#FAFAFA", false);
  }, []);
  return (
    <section className="px-5" id="introModes">
      <div className="mx-auto flex max-w-5xl flex-col justify-center py-24 text-center lg:h-screen lg:py-0">
        <div className="flex flex-col items-center lg:mb-28">
          <Icon
            path={mdiAirballoon}
            size={4.5}
            color="white"
            className="flex"
          />
          <h1 className="my-10 text-4xl font-bold text-white md:text-5xl ">
            Explore the cool learning tools we've got!
          </h1>
          <p className="hidden text-lg text-sky-100 md:block ">
            Explore our variety of learning tools, including flip decks,
            quizzes, AI decks, feedback, and matching modes. Try them out today
            and discover the cool ways to learn!
          </p>
        </div>
        <div className="flex w-full justify-between px-9">
          {modes.map((mode) => (
            <a
              href={`#${mode.id}`}
              key={mode.id}
              className="font-base hidden w-32 justify-center rounded bg-white px-3 py-2 text-lg font-bold text-sky-900 transition duration-300 ease-in hover:bg-stone-700 hover:text-white lg:flex"
            >
              {mode.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
