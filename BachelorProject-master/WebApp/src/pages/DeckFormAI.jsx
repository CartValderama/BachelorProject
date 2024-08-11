import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiOpenInNew, mdiTimerSandFull, mdiRobotHappyOutline } from '@mdi/js'
import * as openAiService from '../services/openAiService'

function DeckFormAI() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    name: yup.string().required('Proper deck name is required'),
    description: yup.string(),
    link: yup.string().test({
      name: 'link-or-context-required',
      test: function (value) {
        const context = this.parent.context
        return (
          (context && context.length > 0) ||
          (value && value.length > 0) ||
          this.createError({ message: 'Link is required', path: 'link' })
        )
      },
    }),
    context: yup.string().test({
      name: 'link-or-context-required',
      test: function (value) {
        const link = this.parent.link
        return (
          (link && link.length > 0) ||
          (value && value.length > 0) ||
          this.createError({
            message: 'Context is required',
            path: 'context',
          })
        )
      },
    }),
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleCreate = async (data) => {
    const aiDeckFormDTO = {
      UserId: 1,
      DeckName: data.name,
      DeckDescription: data.description,
      Url: data.link,
      TextContext: data.context,
    }

    try {
      setLoading(true)
      const createdAiDeck = await openAiService.generateAiDeck(aiDeckFormDTO)
      console.log('New deck created successfully:', createdAiDeck)
      navigate(`/deck/${createdAiDeck}/dashboard`, {
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

  return (
    <section>
      <div className='mx-auto my-20 max-w-2xl rounded bg-white px-5 shadow-sm'>
        <form
          className='flex flex-col items-center gap-y-8 p-10'
          onSubmit={handleSubmit(handleCreate)}
        >
          <div className='flex flex-col gap-y-1 text-center'>
            <h1 className='text-4xl font-bold text-stone-700'>
              Create Deck with AI
            </h1>
            <Link
              to={'/tutorial'}
              state={{ mode: 'ai-deck', prevPage: window.location.pathname }}
              className='flex w-full items-center justify-center gap-x-1 '
            >
              <span className='hidden text-sm text-stone-500 md:block'>
                Read more
              </span>
              <Icon path={mdiOpenInNew} size={0.5} color={'#44403C'} />
            </Link>
          </div>

          <div className='flex w-full flex-col gap-y-4'>
            <input
              {...register('name')}
              type='text'
              disabled={loading}
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
              disabled={loading}
              className='mt-1 w-full resize-none border px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C4A6E]'
            ></textarea>
          </div>

          <div className='flex w-full flex-col border-t'>
            <div className='my-10 text-center'>
              <h2 className='text-center text-2xl font-semibold'>
                Requirements for AI
              </h2>
              <p className='text-stone-600'>
                Choose between giving a link or pasting a content
              </p>
            </div>
            <input
              {...register('link')}
              type='text'
              disabled={watch('context') || loading}
              placeholder={
                errors.link
                  ? !watch('context')
                    ? errors.link?.message
                    : 'Not required now'
                  : 'Enter link'
              }
              className={`${
                errors.link
                  ? 'placeholder-[#970E0E] focus-visible:ring-offset-[#530000]'
                  : 'focus-visible:ring-offset-[#0C4A6E]'
              } ${watch('context') ? 'placeholder-stone-500' : ''} flex w-full rounded border px-3 py-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2`}
            />
            <p className='my-3 text-center'>Or</p>
            <textarea
              {...register('context')}
              cols='40'
              rows='5'
              disabled={watch('link') || loading}
              placeholder={
                errors.context
                  ? !watch('link')
                    ? errors.context?.message
                    : 'Not required now'
                  : 'Enter context'
              }
              className={`${
                errors.context
                  ? 'placeholder-[#970E0E] focus-visible:ring-offset-[#530000]'
                  : 'focus-visible:ring-offset-[#0C4A6E]'
              } ${watch('link') ? 'placeholder-stone-500' : ''} flex w-full rounded border px-3 py-2  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2`}
            ></textarea>
          </div>

          <div className='flex gap-x-3'>
            <button
              type='submit'
              disabled={loading ? true : false}
              className={`flex items-center rounded bg-sky-900 px-6 py-2 text-white transition duration-200 ease-in hover:bg-stone-700 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Create
            </button>

            <Link
              to={`/library`}
              disabled={loading ? true : false}
              className={`flex items-center justify-center gap-x-1 rounded border bg-stone-200 px-6 py-2  font-medium text-stone-700
              transition duration-200 ease-in hover:bg-stone-300 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <div
        className={` ${loading ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform' : 'hidden'} flex min-h-[15em] w-[22rem] flex-col items-center justify-center gap-y-10 bg-sky-100 p-5 shadow sm:w-[32rem]`}
      >
        <Icon path={mdiRobotHappyOutline} size={2} color={'#0C4A6E'} />
        <p className='animate-pulse text-center text-sky-900'>
          Please wait while we prepare your deck. This process may take at least
          5 minutes, so please be patient.
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

export default DeckFormAI
