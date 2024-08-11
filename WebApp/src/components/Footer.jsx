import Icon from '@mdi/react'
import { mdiFacebook, mdiGithub, mdiGoogle, mdiLinkedin } from '@mdi/js'
import { mdiInstagram } from '@mdi/js'
import { mdiYoutube } from '@mdi/js'

export default function Footer() {
  return (
    <div className='flex  w-full items-center justify-center bg-sky-900 px-5'>
      <div className='text-whitegap-y-20 flex w-full max-w-5xl flex-col pt-20'>
        <div className='w-full text-5xl font-bold sm:text-7xl'>
          <h1 className='w-full text-white md:w-2/3'>
            Keen to learn more. let's explore
          </h1>
        </div>
        <div className='mt-8 flex flex-col md:flex-row md:justify-between'>
          <p className='w-full text-sky-100 md:w-2/3'>
            Transforming study habits through cutting-edge technology, AI.CEE
            leverages AI-enhanced features to revolutionize learning. This
            advanced application streamlines the creation of study materials and
            provides real-time feedback, maximizing knowledge retention and
            efficiency for students.
          </p>
          <div className='w-44 pt-6 md:pt-0'></div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-12 mt-24 flex flex-row items-center justify-between'>
            <h2 className='text-3xl font-extrabold uppercase italic text-white'>
              ai.cee
            </h2>

            <div className='flex flex-row items-center justify-between space-x-14 '>
              <a
                href='https://www.linkedin.com/in/cart-valderama/'
                target='_blank'
                className='flex items-center space-x-2'
              >
                <Icon path={mdiLinkedin} size={0.8} color='white' />
                <span className='text-white'>Cart Valderama</span>
              </a>
              <a
                href='https://www.linkedin.com/in/cart-valderama/'
                target='_blank'
                className='flex items-center space-x-2'
              >
                <Icon path={mdiLinkedin} size={0.8} color='white' />
                <span className='text-white'>Elijah Cuady</span>
              </a>
              <a
                href='https://www.linkedin.com/in/cart-valderama/'
                target='_blank'
                className='flex items-center space-x-2'
              >
                <Icon path={mdiLinkedin} size={0.8} color='white' />
                <span className='text-white'>Emil Magnussen</span>
              </a>
            </div>
          </div>
          <hr className='border-white' />
          <p className='my-12 w-full text-center text-sky-100'>
            Copyright © 2024 Oslomet Bachelor Project Group 8
          </p>
        </div>
      </div>
    </div>
  )
}
