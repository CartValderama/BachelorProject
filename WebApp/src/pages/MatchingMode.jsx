import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDeckById } from '../services/deckService'
import MatchingContent from '../components/modes-components/matching/MatchingContent'
import NavMode from '../components/modes-components/NavMode'

function MatchingMode() {
  const mode = 'default'
  const { id } = useParams()

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

  return (
    <section>
      <NavMode modeName={mode} deck={deck} />
      <MatchingContent data={flashcards} />
    </section>
  )
}

export default MatchingMode
