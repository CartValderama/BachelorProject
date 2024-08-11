import React, { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

function Alert({ status, success }) {
  const [visible, setVisible] = useState(status)

  // Function to handle closing the alert
  const handleClose = () => {
    setVisible(false)
    console.log('close')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`${visible ? 'animate-fade fixed bottom-0 left-0 mx-5 my-10' : 'hidden '} ${success ? ` border-teal-600 bg-[#F0FDFA]` : `border-red-600 text-[#530000] bg-[#FFEFEF]`} w-[28rem] gap-x-6 overflow-hidden rounded-b border-t-4 px-4 py-3 shadow-md`}
    >
      <div className='flex items-start gap-x-5'>
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
          <p
            className={`text-sm leading-6 ${success ? ` text-teal-900` : `text-[#530000]`}`}
          >
            {success
              ? 'Congratulations on completing your deck creation—now, let your creativity shine as you navigate the path to victory!'
              : "Unfortunately, your deck creation fell short. It seems creativity alone won't lead you to victory; perhaps it's time to focus solely on proven strategies."}
          </p>
        </div>
        <div className='flex  justify-end '>
          <button
            type='button'
            onClick={() => handleClose()}
            className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
          >
            <span className='sr-only'>Dismiss</span>
            <XMarkIcon className='h-5 w-5 text-teal-900' aria-hidden='true' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Alert
