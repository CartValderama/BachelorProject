import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'
import checkMode from '../../script/checkMode'

function NavMode({ modeName, deck }) {
  const { id } = useParams()
  let typeMode = checkMode(modeName + '_menu')

  return (
    <div className='top-0 z-10 w-full border-b bg-gray-50 p-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-1'>
          <Icon path={typeMode.icon} size={1.2} />
          <h1 className='text-2xl font-bold capitalize'>{modeName} mode</h1>
        </div>

        <Link
          to={`/deck/${id}/${modeName}_menu`}
          state={{
            name: deck.DeckName,
            description: deck.DeckDescription,
          }}
        >
          <Icon path={mdiClose} size={1} />
        </Link>
      </div>
    </div>
  )
}

export default NavMode
