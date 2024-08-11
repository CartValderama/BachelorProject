import { mdiCheck } from '@mdi/js'
import React, { useState, useEffect } from 'react'
import Modal from '../../Modal'
import Confirmation from './Confirmation'
import Quiz from './Quiz'
import QuizResult from './QuizResult'

function MultipleChoiceContent({ flashcards, deck }) {
  const [results, setResults] = useState([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    console.log('quiz')
  }, [results, score])

  const handleAlternative = (alternative, id) => {
    const existingCardIndex = results.findIndex((card) => card.id === id)
    const targetFlashcard = flashcards.filter(
      (flashcard) => flashcard.FlashcardId === id
    )

    if (existingCardIndex !== -1) {
      const updatedResults = [...results]
      updatedResults[existingCardIndex].results = alternative
      setResults(updatedResults)
    } else {
      const newCard = {
        id: id,
        answer: alternative,
        question: targetFlashcard[0].Front,
        correctAnswer: targetFlashcard[0].Back,
      }
      setResults([...results, newCard])
    }
  }

  const handleSubmit = () => {
    let correctCount = 0

    flashcards.forEach((flashcard) => {
      results.forEach((result) => {
        if (String(flashcard.Back) === String(result.answer)) {
          correctCount++
        }
      })
    })

    setScore(correctCount)
    setShowResult(!showResult)
    console.log('Correct count:', correctCount)
  }

  return (
    <>
      {showResult ? (
        <QuizResult
          score={score}
          setScore={setScore}
          results={results}
          setResults={setResults}
          flashcards={flashcards}
          setShowResult={setShowResult}
          deck={deck}
        />
      ) : (
        <Quiz
          flashcards={flashcards}
          handleAlternative={handleAlternative}
          showResult={showResult}
          setShowResult={setShowResult}
        />
      )}
      <div
        className={`bottom-0 ${showResult ? 'hidden' : 'flex'} w-full flex-col items-center justify-between gap-y-8 border-t bg-gray-50 p-10 sm:flex-row sm:gap-y-0`}
      >
        <p className='w-56 text-center text-lg text-stone-700'>
          You've completed{' '}
          <span
            className={`font-bold ${results.length !== flashcards.length ? 'text-red-900' : 'text-sky-900'}`}
          >
            {results.length}
          </span>{' '}
          out of {flashcards.length} flashcards.
        </p>

        <Modal buttonName='Submit' primary={true} icon={mdiCheck}>
          <Confirmation
            flashcards={flashcards}
            results={results}
            handleSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </>
  )
}

export default MultipleChoiceContent
