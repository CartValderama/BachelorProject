import React from 'react'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import { mdiHead, mdiRobot, mdiOpenInNew } from '@mdi/js'

export default function CreateDeck() {
  return (
    <div className='flex min-h-[34rem] flex-col justify-center text-center shadow lg:flex-row-reverse'>
      <div className='flex flex-col items-center justify-between gap-y-24 bg-white p-10 pb-20 sm:rounded-r lg:w-1/2'>
        <div className='flex flex-col items-center'>
          <Icon path={mdiHead} size={5} color={'#44403C'} />
          <h1 className='text-3xl font-bold text-stone-700'>Normal</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <p className='text-stone-700'>
            Normal process of creating a deck of flashcards
          </p>
          <Link
            to={`/create_deck/normal`}
            className='flex items-center justify-center gap-x-1 rounded bg-sky-900 p-3 font-medium text-white
              transition duration-200 ease-in hover:bg-stone-700 '
          >
            Start Creating
          </Link>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between gap-y-24 bg-sky-900 p-10 pb-20 sm:rounded-l lg:w-1/2'>
        <div className='flex w-full flex-col items-center justify-between gap-y-5'>
          <div className='flex flex-col items-center gap-x-4'>
            <Icon path={mdiRobot} size={4.5} color={'white'} />
            <h1 className='mb-2 text-3xl font-bold text-white'>With AI </h1>
            <Link
              to={'/tutorial'}
              state={{ mode: 'ai-deck', prevPage: window.location.pathname }}
              className='flex w-full items-center justify-center gap-x-1 text-sm'
            >
              <span className='text-xs text-sky-100 hover:text-slate-200 '>
                Read more
              </span>
              <Icon path={mdiOpenInNew} size={0.5} color={'#E0F2FE'} />
            </Link>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-y-5'>
          <p className='text-white'>
            Create a deck of flashcards using ChatGPT 3.5 turbo
          </p>
          <Link
            to={`/create_deck/with_ai`}
            className='flex items-center justify-center gap-x-1 rounded bg-white p-3 font-medium text-sky-900
              transition duration-200 ease-in hover:bg-stone-700 hover:text-white'
          >
            Start Creating
          </Link>
        </div>
      </div>
    </div>
  )
}
