import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import * as deckService from '../services/deckService'
import * as flashcardService from '../services/flashcardService'
import NavBar from '../components/tailwind-components/Navbar'
import {
  mdiCardMultiple,
  mdiTrashCan,
  mdiPlay,
  mdiPlus,
  mdiPencil,
  mdiChevronDoubleUp,
} from '@mdi/js'
import Icon from '@mdi/react'
import Modal from '../components/Modal'
import CreateFlashcard from '../components/form/flashcard/CreateFlashcard'
import DeleteFlashcard from '../components/form/flashcard/DeleteFlashcard'
import DeleteDeck from '../components/form/deck/DeleteDeck'
import Alert from '../components/Alert'

function DeckDashboard() {
  const { id } = useParams()
  const [flashcards, setFlashcards] = useState([])
  const [tempFlashcards, setTempFlashcards] = useState([])
  const [activeFlashcard, setActiveFlashcard] = useState({})
  const [changed, setChanged] = useState(false)
  const [update, setUpdate] = useState(false)
  const [edit, setEdit] = useState(true)
  const [deck, setDeck] = useState({}) // State to store the fetched deck
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const alertStatus = location.state?.alertStatus
  const success = location.state?.success

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const data = await deckService.getDeckById(id)
        setDeck(data)
        setFlashcards(data.flashcards)
        setTempFlashcards(data.flashcards)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDeckById()
  }, [id, update])

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (300 / 15)
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep)
      } else {
        clearInterval(scrollInterval)
      }
    }, 15)
  }

  const handleUpdate = async (flashcardIdToUpdate, updatedFlashcardData) => {
    try {
      const updatedFlashcard = await flashcardService.updateFlashcard(
        flashcardIdToUpdate,
        updatedFlashcardData
      )
      console.log('Flashcard updated successfully:', updatedFlashcard)
    } catch (error) {
      console.error('Error updating flashcard:', error)
    }
    setChanged(false)
    setUpdate(!update)
  }

  return (
    <>
      <Alert status={alertStatus} success={success} />
      <Icon
        path={mdiChevronDoubleUp}
        className={` ${isVisible ? 'inline' : 'hidden'} fixed bottom-0 right-0 m-10 cursor-pointer`}
        onClick={() => scrollToTop()}
        size={1.5}
      />
      <NavBar />
      <section className='my-20'>
        <div className='mx-auto flex max-w-5xl flex-col gap-y-5 px-5'>
          <div className='flex w-full items-center justify-between gap-x-10'>
            <div className='flex w-1/2 items-center gap-x-3'>
              <Icon
                path={mdiCardMultiple}
                size={2}
                className='hidden sm:block'
              />
              <h1 className='flex items-start break-all text-3xl font-semibold capitalize text-stone-700 sm:text-4xl'>
                {deck.DeckName}
              </h1>
            </div>

            <p>{deck.DeckDescription}</p>
          </div>
          <div className='flex justify-between rounded-md bg-white p-5'>
            <div className='flex gap-x-2'>
              <Link
                to={`/deck/${id}/default_menu`}
                state={{
                  name: deck.DeckName,
                  description: deck.DeckDescription,
                }}
                className='flex items-center justify-center rounded bg-sky-900 px-3 py-2 transition duration-300 ease-in hover:bg-stone-700 sm:w-32 '
              >
                <Icon
                  path={mdiPlay}
                  size={1}
                  color={'white'}
                  className='mx-1'
                />
                <span className='hidden text-white sm:inline '>Play</span>
              </Link>
              <Modal buttonName='Create Card' icon={mdiPlus}>
                <CreateFlashcard id={id} setUpdate={setUpdate} />
              </Modal>
            </div>
            <div className='flex gap-x-2'>
              <Link
                to={`/create_deck/normal?isEdit=${edit}&id=${id}`}
                className='flex items-center justify-center rounded bg-sky-900 px-3 py-2 transition duration-300 ease-in hover:bg-stone-700'
              >
                <Icon
                  path={mdiPencil}
                  size={1}
                  color={'white'}
                  className='mx-1'
                />
                <span className='hidden text-white sm:inline '>Edit Deck</span>
              </Link>
              <Modal buttonName='Delete Deck' icon={mdiTrashCan}>
                <DeleteDeck deck={deck} />
              </Modal>
            </div>
          </div>
          <div></div>
          <div className='flex flex-col gap-y-5'>
            {/* flashcards here */}

            {tempFlashcards.map((flashcard) => (
              <div
                key={flashcard.FlashcardId}
                className='flex w-full flex-col justify-between gap-y-10 rounded-md bg-white px-5 pb-10 pt-5 sm:px-10'
              >
                <div className='flex w-full items-center justify-between border-b pb-3'>
                  <p className='font-bold'>{flashcard.FlashcardId}</p>

                  <Modal buttonName='Delete Card' icon={mdiTrashCan}>
                    <DeleteFlashcard
                      flashcard={flashcard}
                      setUpdate={setUpdate}
                      length={deck.flashcards.length}
                    />
                  </Modal>
                </div>
                <div className='flex flex-col justify-center gap-x-14 gap-y-5 sm:flex-row sm:gap-y-0'>
                  <div className='flex flex-col gap-y-2 sm:w-1/2'>
                    <input
                      id={`${flashcard.FlashcardId}.front`}
                      type='text'
                      name={`${flashcard.FlashcardId}.front`}
                      placeholder='Enter Description here ...'
                      value={flashcard.Front}
                      disabled={
                        changed &&
                        flashcard.FlashcardId !== activeFlashcard.FlashcardId
                      }
                      onChange={(e) => {
                        const updatedFlashcards = tempFlashcards.map((card) =>
                          card.FlashcardId === flashcard.FlashcardId
                            ? { ...card, Front: e.target.value }
                            : card
                        )
                        setTempFlashcards(updatedFlashcards)
                        setActiveFlashcard({
                          ...flashcard,
                        })
                        setChanged(true)
                      }}
                      className='flex-grow resize-none truncate border-b py-2 leading-loose focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2'
                    />
                    <label
                      htmlFor={`${flashcard.FlashcardId}.front`}
                      className='font-semibold'
                    >
                      Front
                    </label>
                  </div>

                  <div className='flex flex-col gap-y-2 sm:w-1/2'>
                    <input
                      rows={1}
                      type='text'
                      name={`${flashcard.FlashcardId}.back`}
                      id={`${flashcard.FlashcardId}.back`}
                      placeholder='Enter Answer here ...'
                      value={flashcard.Back}
                      disabled={
                        changed &&
                        flashcard.FlashcardId !== activeFlashcard.FlashcardId
                      }
                      onChange={(e) => {
                        const updatedFlashcards = tempFlashcards.map((card) =>
                          card.FlashcardId === flashcard.FlashcardId
                            ? { ...card, Back: e.target.value }
                            : card
                        )
                        setTempFlashcards(updatedFlashcards)
                        setActiveFlashcard({
                          ...flashcard,
                        })
                        setChanged(true)
                      }}
                      className='flex-grow resize-none truncate border-b py-2 leading-loose focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2'
                    />
                    <label
                      htmlFor={`${flashcard.FlashcardId}.back`}
                      className='font-semibold'
                    >
                      Back
                    </label>
                  </div>
                </div>

                {changed &&
                flashcard.FlashcardId === activeFlashcard.FlashcardId ? (
                  <div className='flex w-full gap-x-2'>
                    <button
                      className='w-24 rounded bg-[#0F766E] px-3 py-2 text-white transition duration-300 ease-in hover:bg-stone-700'
                      onClick={() => {
                        handleUpdate(flashcard.FlashcardId, flashcard)
                      }}
                    >
                      Save
                    </button>
                    <button
                      className='w-24 rounded bg-stone-200 px-3 py-2 text-stone-700 transition duration-300 ease-in hover:bg-stone-300'
                      onClick={(e) => {
                        setChanged(false)
                        const updatedFlashcards = flashcards.map((card) =>
                          card.FlashcardId === flashcard.FlashcardId
                            ? { ...card }
                            : { ...card }
                        )
                        setTempFlashcards(updatedFlashcards)
                        setUpdate(!update)
                      }}
                    >
                      cancel
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ))}

            <Modal buttonName='Create Card' icon={mdiPlus} big={true}>
              <CreateFlashcard id={id} setUpdate={setUpdate} />
            </Modal>
          </div>
        </div>
      </section>
    </>
  )
}

export default DeckDashboard
