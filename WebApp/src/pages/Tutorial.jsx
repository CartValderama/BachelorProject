import React, { useState, useEffect } from 'react'
import NavBar from '../components/tailwind-components/Navbar'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { tutorials } from '../data/tutorial'
import Icon from '@mdi/react'
import { mdiRotate360, mdiSchool, mdiArrowLeftBold } from '@mdi/js'

function Tutorial() {
  const location = useLocation()
  const { mode } = location.state
  const [filteredTutorials, setFilteredTutorials] = useState([])

  useEffect(() => {
    const filteredTutorials = tutorials.filter(
      (tutorial) => tutorial.name === mode
    )
    setFilteredTutorials(filteredTutorials)
  }, [mode])

  return (
    <>
      <NavBar />
      <div className='mx-auto my-14 flex max-w-5xl flex-col gap-y-5 px-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center  gap-x-4'>
            <Icon path={mdiSchool} size={2.5} />
            <h1 className='text-3xl font-semibold capitalize text-stone-700 sm:text-4xl'>
              {mode} Tutorial
            </h1>
          </div>
          <Link
            to={'/library'}
            className='flex items-center gap-x-1 rounded bg-sky-900 px-3 py-2 text-white transition duration-300 ease-in hover:bg-stone-700'
          >
            <span>
              <Icon path={mdiArrowLeftBold} size={1} color={'white'} />
            </span>
            <span className='text-white'> Return</span>
          </Link>
        </div>
        <div className='grid gap-3 sm:grid-cols-3'>
          {filteredTutorials.map((mode) =>
            mode.tutorial.map((step, index) => <Card key={index} step={step} />)
          )}
        </div>
      </div>
    </>
  )
}

function Card({ step }) {
  const [flip, setFlip] = useState(false)

  const handleCardClick = () => {
    setFlip(!flip)
  }

  return (
    <div
      className={`card-tutorial h-64 w-full shadow-md ${flip ? 'flip' : ''}`}
      onClick={handleCardClick}
    >
      <div className='card-tutorial-inner'>
        <div className='card-tutorial-front flex flex-col gap-y-4 rounded  p-5 transition duration-200 ease-in hover:bg-stone-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold text-stone-700'>{`Step ${step.id}`}</h2>
            <div className='flex items-center gap-x-2'>
              <p className='text-xs text-stone-600'>Flip Card</p>
              <Icon path={mdiRotate360} size={0.7} />
            </div>
          </div>
          <p className='text-stone-600'>{step.front}</p>
        </div>
        <div className='card-tutorial-back flex flex-col gap-y-4 rounded bg-sky-900 p-5 transition duration-200 ease-in hover:bg-stone-700'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-bold text-white'>{`Step ${step.id}`}</h2>
            <div className='flex items-center gap-x-2'>
              <p className='text-xs text-sky-100'>Flip Card</p>
              <Icon path={mdiRotate360} size={0.7} color={'white'} />
            </div>
          </div>
          <p className='text-sky-100'>{step.back}</p>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
