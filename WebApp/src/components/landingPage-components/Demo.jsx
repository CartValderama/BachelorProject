import observer from "../../script/observer";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiCardsVariant, mdiPlay } from "@mdi/js";
import { Link } from "react-router-dom";
import * as deckService from "../../services/deckService";

export default function Demo() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const data = await deckService.getDecksWithoutFolder();
        setDecks(data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchDecks();
  }, []);
  useEffect(() => {
    observer("demo", "#0C4A6E", "#FAFAFA", false);
  }, []);

  return (
    <section className="px-5" id="demo">
      <div className="mx-auto flex max-w-5xl justify-evenly py-14 md:items-center lg:h-screen lg:py-0 ">
        <div className="flex-col items-center justify-center lg:flex lg:gap-x-20 lg:pt-0">
          <div className="lg:mx-0 lg:mb-10">
            <div className="flex justify-center">
              <Icon
                path={mdiCardsVariant}
                color="white"
                size={3}
                className="hidden lg:flex"
              />
              <h1 className="ms-4 text-center text-3xl font-bold tracking-tight text-white sm:text-6xl lg:leading-normal">
                Try our demo decks.
              </h1>
            </div>
            <p className="mt-5 text-center text-lg text-sky-100 sm:mb-0">
              Dive into interactive learning with our engaging demo decks.
              Explore captivating content and expand your knowledge with ease.
              Try our demos today for an enriching educational experience.
            </p>
          </div>
          <div className="my-10 grid w-full grid-cols-1 justify-items-center gap-7 sm:grid-cols-2">
            {decks.slice(0, 2).map((deck) => (
              <div
                key={deck.deckId}
                className="flex h-64 w-full flex-col items-center justify-center gap-y-10 rounded-md border bg-white px-9 py-7 text-center"
              >
                <div className="flex h-32 w-full flex-col justify-start gap-y-5">
                  <h1 className="line-clamp-2 break-all text-3xl font-bold capitalize">
                    {deck.deckName}
                  </h1>
                  <p className="text-sm text-stone-500">
                    {deck.deckDescription}
                  </p>
                </div>
                <Link
                  to={`/deck/${deck.deckId}/dashboard`}
                  key={deck.deckId}
                  className="group relative flex items-center gap-x-1 rounded bg-sky-900 px-5 py-3 text-center font-bold text-white transition duration-200 ease-in hover:bg-stone-700"
                >
                  <span>
                    <Icon path={mdiPlay} size={0.8} color={"white"} />
                  </span>

                  <span className="hidden text-white sm:inline ">Play</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
