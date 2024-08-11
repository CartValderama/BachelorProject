import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import * as deckService from '../services/deckService'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiTimerSandFull, mdiRobotHappyOutline } from '@mdi/js'
import Alert from '../components/Alert'

function DeckFormNormal() {
  const navigate = useNavigate()
  const { search } = useLocation() // Using useLocation hook to access search/query parameters
  const queryParams = new URLSearchParams(search)
  const edit = queryParams.get('isEdit') === 'true' || false
  const id = queryParams.get('id')
  const [loading, setLoading] = useState(false)
  const [deck, setDeck] = useState({})

  const schema = yup.object().shape({
    name: yup.string().required('Proper deck name is required'),
    description: yup.string(),
    folder: null,
  })

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const data = await deckService.getDeckById(id)
        setDeck(data)
      } catch (error) {
        console.error(error)
      }
    }
    edit && fetchDeckById()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: edit ? deck.DeckName : '',
      description: edit ? deck.DeckDescription : '',
      folder: null,
    },
  })

  useEffect(() => {
    // Reset form default values whenever deck data changes
    reset({
      name: edit ? deck.DeckName : '',
      description: edit ? deck.DeckDescription : '',
      folder: null,
    })
  }, [deck, edit, reset])

  const handleCreate = async (data) => {
    const newDeck = {
      DeckName: data.name,
      DeckDescription: data.description,
      FolderId: null,
    }

    try {
      setLoading(true)
      const createdDeck = await deckService.createDeck(newDeck)
      console.log('New deck created successfully:', createdDeck)
      navigate(`/deck/${createdDeck}/dashboard`, {
        state: { alertStatus: true, success: true },
      })
    } catch (error) {
      navigate(`/library`, {
        state: { alertStatus: true, success: false },
      })
      console.error('Error creating new deck:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (data) => {
    const updateDeck = {
      DeckId: deck.DeckId,
      DeckName: data.name,
      DeckDescription: data.description,
      FolderId: null,
    }

    try {
      setLoading(true)
      const updatedDeck = await deckService.updateDeck(deck.DeckId, updateDeck)
      console.log('Deck updated successfully:', updatedDeck)
      navigate(`/deck/${deck.DeckId}/dashboard`, {
        state: { alertStatus: true, success: true },
      })
    } catch (error) {
      navigate(`/deck/${deck.DeckId}/dashboard`, {
        state: { alertStatus: true, success: false },
      })
      console.error('Error updating deck:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className={`m-auto flex h-screen max-w-2xl items-center px-5`}>
        <form
          className='flex w-full flex-col items-center gap-y-14 rounded bg-white p-10 px-5'
          onSubmit={handleSubmit(edit ? handleEdit : handleCreate)}
        >
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-center text-4xl font-bold'>
              {edit ? 'Edit Deck' : 'Create Deck'}
            </h1>
            <p className='text-center text-gray-600'>
              {edit
                ? 'Edit the name and optional description for your deck.'
                : 'Enter the name and optional description for your new deck.'}
            </p>
          </div>

          <div className='flex w-full flex-col gap-y-4'>
            <input
              {...register('name')}
              type='text'
              placeholder={
                errors.name ? errors.name?.message + '*' : 'Enter deck name*'
              }
              className={`${
                errors.name
                  ? 'placeholder-[#970E0E] focus-visible:ring-offset-[#530000]'
                  : 'focus-visible:ring-offset-[#0C4A6E]'
              } flex w-full rounded border px-3 py-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2`}
            />

            <textarea
              {...register('description')}
              cols='40'
              rows='3'
              placeholder={'Enter deck description'}
              className='mt-1 w-full resize-none border px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C4A6E]'
            ></textarea>
          </div>

          <div className='flex gap-x-3'>
            <button
              type='submit'
              disabled={loading ? true : false}
              className={`flex items-center rounded bg-sky-900 px-6 py-2 text-white transition duration-200 ease-in hover:bg-stone-700 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {edit ? 'Update' : 'Create'}
            </button>

            <Link
              to={edit ? `/deck/${id}/dashboard` : '/library'}
              disabled={loading}
              className={`flex items-center justify-center gap-x-1 rounded border bg-stone-200 px-6 py-2 font-medium text-stone-700 transition duration-200 ease-in hover:bg-stone-300 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <div
        className={` ${loading ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform' : 'hidden'} ${edit ? 'hidden' : 'flex'} min-h-[10em] w-[20rem] flex-col items-center justify-center gap-y-6 bg-sky-100 p-5 shadow sm:w-[32rem]`}
      >
        <Icon path={mdiRobotHappyOutline} size={2} color={'#0C4A6E'} />
        <p className='animate-pulse text-center text-sky-900'>
          Deck creation underway. Kindly wait and refrain from pressing any
          buttons. Thank you.
        </p>
        <Icon
          path={mdiTimerSandFull}
          size={1.5}
          className='animate-spin'
          color={'#0C4A6E'}
        />
      </div>
    </section>
  )
}

export default DeckFormNormal
