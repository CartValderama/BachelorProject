import NavBar from '../components/tailwind-components/Navbar'
import Icon from '@mdi/react'
import { mdiPlusBoxMultiple, mdiFolderPlus, mdiLibrary } from '@mdi/js'
import Modal from '../components/Modal'
import CreateDeck from '../components/form/deck/CreateDeck'
import Alert from '../components/Alert'
import { useEffect, useState } from 'react'
import DeckList from '../components/DeckList'
import { useLocation } from 'react-router-dom'
import * as deckService from '../services/deckService'

export default function Library() {
  const location = useLocation()
  const alertStatus = location.state?.alertStatus
  const success = location.state?.success
  const [decks, setDecks] = useState([])

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const data = await deckService.getDecksWithoutFolder()
        setDecks(data)
      } catch (error) {
        // Handle error
        console.error(error)
      }
    }
    fetchDecks()
  }, [])

  return (
    <>
      <Alert status={alertStatus} success={success} />
      <NavBar />
      <section className='my-14'>
        <div className='mx-auto flex max-w-5xl justify-between px-5'>
          <div className='flex gap-x-3'>
            <Icon path={mdiLibrary} size={2.5} />
            <div className='flex flex-col justify-around'>
              <h1 className='text-3xl font-semibold text-stone-700 sm:text-4xl'>
                Library
              </h1>
            </div>
          </div>

          <Modal
            buttonName='Create Deck'
            icon={mdiPlusBoxMultiple}
            primary={true}
          >
            <CreateDeck />
          </Modal>
        </div>
        <DeckList decks={decks} />
      </section>
    </>
  )
}
