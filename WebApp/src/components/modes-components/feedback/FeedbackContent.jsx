import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as openAiService from '../../../services/openAiService'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
//import { createFeedback } from "../../../services/flashcardService";
//import { getFeedbackGpt4 } from "../../../services/openAiService";

export default function FeedbackContent({
  data,
  index,
  activeCard,
  loading,
  setLoading,
  handleFlipBack,
  handleFlipFront,
  userId,
  gpt4,
}) {
  const [correct, setCorrect] = useState(false)
  const [feedback, setFeedback] = useState({})

  const feedbackScoreWords = {
    0: 'Completely off the mark',
    1: 'Inaccurate',
    2: 'Keep going!',
    3: 'Good job!, you are on the right path',
    4: 'Above and beyond',
  }

  const schema = yup.object().shape({
    input: yup.string().required('An answer is required'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleAnswer = async (answer) => {
    setLoading(!loading)
    const FlashcardWithUserInputDTO = {
      UserId: userId,
      FlashcardId: data[index].FlashcardId,
      Front: data[index].Front,
      Back: data[index].Back,
      UserAnswer: answer.input,
    }
    try {
      const serviceMethod = gpt4
        ? openAiService.generateFeedbackGpt4
        : openAiService.generateFeedback

      const feedbackResponse = await serviceMethod(FlashcardWithUserInputDTO)
      console.log(`${gpt4 ? 'gpt4' : 'gpt3.5'}`)

      console.log(feedbackResponse)
      setFeedback(feedbackResponse)
      setCorrect(feedbackResponse.Correct)
      reset()
    } catch (error) {
      reset()
      console.error(error)
    }
    handleFlipFront()
  }

  if (!activeCard) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-between bg-white p-10 '>
        <div className='flex w-full justify-between'>
          <p>Question</p>
          <p>
            {index + 1}/{data.length}
          </p>
        </div>
        <div className='mt-16 sm:mb-8'>
          <p className='text-center text-stone-700'>{data[index].Front}</p>
        </div>
        <form
          className='my-10 flex w-full flex-col items-center'
          id='answerForm'
          onSubmit={handleSubmit(handleAnswer)}
        >
          <h2 className='mb-5 font-semibold lg:px-10'>Answer Here</h2>
          <textarea
            {...register('input')}
            name='input'
            id='input'
            type='text'
            placeholder={
              errors.input
                ? errors.input?.message + '*'
                : 'Type your answer here'
            }
            className={`${
              errors.input
                ? 'placeholder-[#970E0E] focus-visible:ring-offset-[#530000]'
                : 'focus-visible:ring-offset-[#0C4A6E]'
            } flex w-full rounded border px-6 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 md:h-24`}
          ></textarea>
        </form>
        <button
          type='submit'
          form='answerForm'
          disabled={loading ? true : false}
          className={`flex w-24 items-center justify-center gap-x-1 rounded px-10 py-3 text-sm font-semibold text-white transition duration-200 ease-in md:w-36 md:text-base ${loading ? 'cursor-wait bg-gray-400' : 'bg-sky-900'}`}
        >
          {loading ? 'Loading' : 'Submit'}
        </button>
      </div>
    )
  } else if (activeCard) {
    return (
      <div
        className={`back flex h-full flex-col items-center justify-between p-10 ${correct ? 'bg-[#F0FDFA] ' : 'bg-[#FFEFEF]'} text-center`}
      >
        <h1
          className={`text-4xl font-bold ${correct ? 'text-[#134E4A]' : 'text-[#530000]'} `}
        >
          {feedbackScoreWords[feedback.Score]}
        </h1>
        <div className='mt-10'>
          <div className='my-10 flex flex-col items-center gap-y-4 '>
            <h2
              className={`text-lg font-bold ${correct ? 'text-[#134E4A]' : 'text-[#530000]'}`}
            >
              Here is the correct answer:
            </h2>
            <p className={`${correct ? 'text-[#134E4A]' : 'text-[#530000]'}`}>
              {data[index].Back}
            </p>
          </div>

          <div className='flex flex-col items-center gap-y-4'>
            <h2
              className={`text-lg font-bold ${correct ? 'text-[#134E4A]' : 'text-[#530000]'}`}
            >
              A.I. Feedback:
            </h2>
            <p className={`${correct ? 'text-[#134E4A]' : 'text-[#530000]'}`}>
              {feedback.Explanation}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            handleFlipBack()
            setLoading(!loading)
          }}
          className={`mt-8 flex w-32 items-center justify-center gap-x-1 rounded border text-xs md:w-36 md:text-base ${correct ? 'bg-[#134E4A] text-white' : 'border-[#530000] bg-[#530000] text-white '} px-8 py-3 font-semibold transition
              duration-200 ease-in hover:bg-stone-700`}
        >
          Try Again
        </button>
      </div>
    )
  }
}
