import React, { useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiCheck, mdiClose } from '@mdi/js'
import { Link, useParams } from 'react-router-dom'

function QuizResult({
  results,
  score,
  flashcards,
  setShowResult,
  setResults,
  setScore,
  deck,
}) {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mx-auto my-20 max-w-3xl rounded bg-white p-10'>
      <div className='mb-10 flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-3xl font-bold'>Your score: {score}</h1>
          <p className='text-stone-500'>
            You have completely answered {results.length} out of{' '}
            {flashcards.length} questions.
          </p>
        </div>

        <div className='relative size-40'>
          <svg className='size-full' width='36' height='36' viewBox='0 0 36 36'>
            <circle
              cx='18'
              cy='18'
              r='16'
              fill='none'
              className='stroke-current text-sky-600 dark:text-sky-700'
              stroke-width='4'
            ></circle>

            <g className='origin-center -rotate-90 transform'>
              <circle
                cx='18'
                cy='18'
                r='16'
                fill='none'
                className='stroke-current  text-gray-200  dark:text-gray-800'
                stroke-width='4'
                stroke-dasharray='100'
                stroke-dashoffset={(score / flashcards.length) * 100}
              ></circle>
            </g>
          </svg>

          <div className='absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            <span className='text-center text-xl font-bold text-gray-800 dark:text-stone-700'>
              {((score / flashcards.length) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-9'>
        <h1 className='text-2xl font-semibold text-stone-700'>Summary</h1>
        {results.map((result, index) => (
          <div key={result.id} className='flex flex-col gap-y-2'>
            <div className='flex items-start gap-x-2'>
              <p className='text-stone-700'>
                {index + 1}. {result.question}{' '}
              </p>
              <Icon
                path={
                  result.answer === result.correctAnswer ? mdiCheck : mdiClose
                }
                color={
                  result.answer === result.correctAnswer ? '#0F766E' : '#970E0E'
                }
                size={1}
              />
            </div>
            <p className='text-stone-700'>
              <span
                className={`font-semibold ${result.answer === result.correctAnswer ? 'text-green-800' : 'text-red-700'} `}
              >
                Your answer:{' '}
              </span>
              {result.answer}
            </p>
            <p className='text-stone-700'>
              <span className='font-semibold text-green-800'>
                The correct answer:{' '}
              </span>
              {result.correctAnswer}
            </p>
          </div>
        ))}
      </div>
      <div className='mt-20 flex w-full flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-3 sm:gap-y-0'>
        <button
          onClick={() => {
            setShowResult(false)
            setResults([])
            setScore(0)
          }}
          className='block w-40 rounded border-b-4 bg-sky-900 px-4 py-3 text-center text-white transition duration-200 ease-in hover:bg-stone-700'
        >
          Try Again
        </button>
        <Link
          to={`/deck/${id}/quiz_menu`}
          state={{
            name: deck.DeckName,
            description: deck.DeckDescription,
          }}
          className='flex w-40 cursor-pointer items-center justify-center rounded border bg-stone-200 px-4 py-3 font-medium  text-stone-700 transition duration-200 ease-in hover:bg-stone-300'
        >
          Return to menu
        </Link>
      </div>
    </div>
  )
}

export default QuizResult
