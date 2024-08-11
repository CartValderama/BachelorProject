import { mdiCards } from '@mdi/js'
import { mdiHelpBoxMultiple } from '@mdi/js'
import { mdiCommentQuote } from '@mdi/js'
import { mdiFlipHorizontal } from '@mdi/js'
import { mdiCompare } from '@mdi/js'

export const modes = [
  {
    id: 5,
    descriptionIntro: 'Let AI create a study deck for you.',
    description:
      'Let AI take the reins in crafting your personalized study deck. Sit back, relax, and let the magic of artificial intelligence curate a tailored learning experience just for you. Say goodbye to manual effort and hello to effortless studying with our AI-powered study deck creation!',
    title: 'AI Deck',
    name: 'ai-deck',
    link: 'ai-deck-menu',
    floatRight: false,
    lastChild: false,
    img: 'https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L2hpcHBvdW5pY29ybjc2X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX2hpbGxzX2lzb2xhdGVfaWxsdXN0cl85NDkwOTRlZi1iOWQ1LTRkMjEtYTcxYy1iMGJkNTFjOThiYTkuanBn.jpg',
    icon: mdiCards,
  },
  {
    id: 4,
    descriptionIntro: 'Test yourself.',
    description:
      'Challenge yourself with our AI-generated MCQ distractors decks! Experience the thrill of testing your knowledge with dynamically generated alternatives that keep you engaged and on your toes. Get ready for an exciting quiz experience like never before!',
    title: 'Quiz',
    name: 'quiz',
    link: 'quiz-menu',
    floatRight: true,
    lastChild: false,
    img: 'https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL2xhY21hMTcyMzM2LWltYWdlLmpwZw.jpg',
    icon: mdiHelpBoxMultiple,
  },
  {
    id: 3,
    descriptionIntro: 'Get feedback from Chat GPT.',
    description:
      'Study, answer, and receive feedback from ChatGPT. Improve your understanding with AI-powered insights. Elevate your learning journey today!',
    title: 'Feedback',
    name: 'feedback',
    link: 'feedback-menu',
    floatRight: false,
    lastChild: false,
    img: 'https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yNV9kaWdpdGFsX2NyYXlvbl9maWx0ZXJfaWxsdXN0cmF0aW9uX29mX3N1Z3V0YV8wZWFmMzZlNy00MjhiLTQ3OWUtODRjZC1lYjIxZjg3ODI4MDlfMS5qcGc.jpg',
    icon: mdiCommentQuote,
  },
  {
    id: 1,
    descriptionIntro: 'Default mode.',
    description:
      'Explore Flip Mode for a classic learning experience. Flip through cards, absorb information, and reinforce your knowledge effortlessly. Perfect for memorization and review, Flip Mode offers a straightforward approach to learning. Dive in and flip your way to success!',
    title: 'Flip',
    name: 'default',
    link: 'flip-menu',
    floatRight: true,
    lastChild: false,
    img: 'https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV82X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX3N0cmVldF93aXRoX2J1aWxkaV9mNjIwMzA4OC1kZWY2LTQyY2QtOWUzNC0zMDBmNWQxNjcxZWRfMS5qcGc.jpg',
    icon: mdiFlipHorizontal,
  },
  {
    id: 2,
    descriptionIntro: 'Match the front and back.',
    description:
      'Dive into Matching Mode for an interactive learning adventure. Challenge your memory and knowledge by pairing related items or concepts. With Matching Mode, you can strengthen your understanding while having fun. Get ready to match and master your subjects!',
    title: 'Match',
    name: 'matching',
    link: 'match-menu',
    floatRight: false,
    lastChild: true,
    img: 'https://images.rawpixel.com/image_400/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L2hpcHBvdW5pY29ybjc2X3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX29mX2Z1amlzYW5fd2l0aF9jaGVycnlfYl9lMTJkNmMwNS0wM2Q3LTQ5MGQtOTZhOC0yZDk3ZmQ0N2Q1MjUuanBn.jpg',
    icon: mdiCompare,
  },
]
