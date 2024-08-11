import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChatQuestion } from "@mdi/js";
import { modes } from "../data/modes";

export default function checkMode(params) {
  const [modeType, setModeType] = useState({
    title: "",
    name: "Deck Name",
    icon: mdiChatQuestion,
  });

  useEffect(() => {
    modes.forEach((mode) => {
      if (mode.link === params) {
        setModeType({
          title: mode.title,
          name: mode.name,
          icon: mode.icon,
        });
      }
    });
  }, [params]); // Run effect when params changes

  return modeType;
}
