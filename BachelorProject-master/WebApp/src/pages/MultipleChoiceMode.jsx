import React, { useEffect, useState } from 'react'
import MultipleChoiceContent from '../components/modes-components/multple-choice/MultipleChoiceContent'
import { useParams, useLocation } from 'react-router-dom'
import * as deckService from '../services/deckService'
import * as openAiService from '../services/openAiService'
import NavMode from '../components/modes-components/NavMode'
import Icon from '@mdi/react'
import { mdiRobotHappyOutline, mdiTimerSandFull } from '@mdi/js'

function MultipleChoiceMode() {
  const mode = 'quiz'
  const { id } = useParams()
  const { search } = useLocation() // Using useLocation hook to access search/query parameters
  const queryParams = new URLSearchParams(search)
  const enabled = queryParams.get('enabled') === 'true' || false
  const userId = queryParams.get('userId')
  const [deck, setDeck] = useState({})
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false)

  const dataForAiDistractorsDTO = {
    DeckId: id,
    UserId: userId,
  }

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        if (enabled) {
          const data = await openAiService.generateDistractorsGpt4(
            dataForAiDistractorsDTO
          )
          setDeck(data)
          setFlashcards(data.flashcards)
          console.log('creating distractors using 4')
        } else {
          const data = await openAiService.generateDistractors(
            dataForAiDistractorsDTO
          )
          setDeck(data)
          setFlashcards(data.flashcards)
          console.log('creating distractors using 3.5')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section>
      <NavMode modeName={mode} deck={deck} />
      {(loading && !flashcards) || flashcards.length === 0 ? (
        <div
          className={` ${loading ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform' : 'hidden'} flex min-h-[15em] w-[22rem] flex-col items-center justify-center gap-y-10 bg-sky-100 p-5 shadow sm:w-[32rem]`}
        >
          <Icon path={mdiRobotHappyOutline} size={2} color={'#0C4A6E'} />
          <p className='animate-pulse text-center text-sky-900'>
            Please wait while we prepare your quiz.
          </p>

          <Icon
            path={mdiTimerSandFull}
            size={1.5}
            className='animate-spin'
            color={'#0C4A6E'}
          />
        </div>
      ) : (
        <MultipleChoiceContent flashcards={flashcards} deck={deck} />
      )}
    </section>
  )
}

export default MultipleChoiceMode
