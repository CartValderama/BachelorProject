import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDeckById } from '../services/deckService'
import Carousel from '../components/modes-components/Carousel'
import NavMode from '../components/modes-components/NavMode'

function FeedbackMode() {
  const mode = 'feedback'
  const { id } = useParams()
  const { search } = useLocation() // Using useLocation hook to access search/query parameters
  const queryParams = new URLSearchParams(search)
  const enabled = queryParams.get('enabled') === 'true' || false
  const userId = queryParams.get('userId')

  const [flashcards, setFlashcards] = useState([])
  const [deck, setDeck] = useState({})

  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const data = await getDeckById(id)
        setDeck(data)
        setFlashcards(data.flashcards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDeckById()
  }, [id])

  if (!flashcards || flashcards.length === 0) {
    return null
  }

  return (
    <section>
      <NavMode modeName={mode} deck={deck} />
      <Carousel data={flashcards} mode={mode} userId={userId} gpt4={enabled} />
    </section>
  )
}

export default FeedbackMode
