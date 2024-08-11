import { modes } from '../../data/modeData'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'

export default function AboutModes() {
  return (
    <section className='px-5' style={{ backgroundColor: '#FAFAFA' }}>
      {modes.map((mode) => (
        <div
          id={mode.id}
          key={mode.id}
          className={`mx-auto flex max-w-5xl flex-col items-center justify-center py-24 lg:justify-between ${!mode.floatRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${!mode.lastChild ? 'border-b' : 'border-b-0'}`}
        >
          <div className='grid gap-y-4 text-center md:w-1/2  lg:text-left '>
            <div className='flex items-center justify-center lg:justify-start  '>
              <Icon path={mode.icon} size={2} />
              <h1 className='ms-4 text-3xl font-semibold text-stone-700 md:text-4xl '>
                {mode.title}
              </h1>
            </div>

            <div className='flex max-w-xl flex-col items-center space-y-8 text-base leading-7 lg:items-start lg:max-w-none'>
              <div key={mode.descriptionIntro}>
                <dt className='inline font-bold text-stone-700'>
                  {mode.descriptionIntro}
                </dt>
                <dd className='inline font-medium text-stone-500'>
                  {' '}
                  {mode.description}
                </dd>
              </div>
              <Link
                to='/tutorial'
                state={{ mode: mode.name, prevPage: window.location.pathname }}
                className='block w-44 rounded bg-sky-900 px-4 py-3 text-center
                font-extrabold text-white transition duration-200 ease-in
                hover:bg-stone-700'
              >
                {' '}
                Tutorial
              </Link>
            </div>
          </div>
          <img
            src={mode.img}
            alt={mode.name}
            className='mt-14 flex h-48 rounded-3xl border-0 sm:size-auto lg:mt-0'
          />
        </div>
      ))}
    </section>
  )
}
