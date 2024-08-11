import observer from '../../script/observer'
import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <section
      className='flex h-screen flex-col items-center justify-center border-b-2 px-5'
      style={{ background: '#FAFAFA' }}
    >
      <div
        className='mx-auto my-20 flex max-w-5xl flex-col
      items-center justify-center sm:my-36 lg:flex-row lg:justify-between'
      >
        <div className='mb-20 flex flex-col justify-center lg:mb-0'>
          <img
            src='https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAyL3Bkd2F0ZXJjb2xvcjEtYmctcGRuZ2FwYWludGluZ3MwMTYwMGEtaW1hZ2UuanBn.jpg'
            alt='test'
            className='rounded-3xl border-0'
          />
        </div>
        <div className='flex flex-col justify-center space-y-10 px-2 lg:w-1/2'>
          <h1 className='text-center text-2xl font-bold text-stone-700 lg:text-4xl lg:leading-relaxed'>
            The effortless, engaging, and efficient method for mastering
            flashcards!
          </h1>
          <div className='grid place-content-center gap-y-3'>
            <Link
              to={'library'}
              className='block rounded border-b-4 border-sky-900 bg-sky-900 px-4 py-3 text-center font-extrabold text-white transition duration-200 ease-in hover:border-stone-800 hover:bg-stone-700 md:w-80'
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
