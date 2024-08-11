import { mdiHelpBoxMultiple } from "@mdi/js";
import { mdiCommentQuote } from "@mdi/js";
import { mdiFlipHorizontal } from "@mdi/js";
import { mdiCompare } from "@mdi/js";

export const modes = [
  {
    id: 1,
    name: "default",
    title: "Default",
    link: "default_menu",
    icon: mdiFlipHorizontal,
  },
  {
    id: 2,
    name: "matching",
    title: "Matching",
    link: "match_menu",
    icon: mdiCompare,
  },
  {
    id: 3,
    name: "feedback",
    title: "Feedback",
    link: "feedback_menu",
    icon: mdiCommentQuote,
  },
  {
    id: 4,
    name: "quiz",
    title: "Quiz",
    link: "quiz_menu",
    icon: mdiHelpBoxMultiple,
  },
];
