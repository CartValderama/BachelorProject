import React from 'react'
import { useParams } from 'react-router-dom'
import Carousel from '../components/modes-components/Carousel'
import { useState, useEffect } from 'react'
import { getDeckById } from '../services/deckService'
import { getFlashcardsByDeckId } from '../services/flashcardService'
import NavMode from '../components/modes-components/NavMode'

function DefaultMode() {
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

  if (!flashcards || flashcards.length === 0) {
    return null
  }

  return (
    <section>
      <NavMode modeName={mode} deck={deck} />
      <Carousel data={flashcards} mode={mode} />
    </section>
  )
}

export default DefaultMode
