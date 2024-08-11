import Icon from '@mdi/react'
import { mdiCardMultipleOutline, mdiPencil, mdiPlay, mdiMagnify } from '@mdi/js'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import SearchFilter from './SearchFilter'

export default function DeckList(props) {
  const { decks } = props
  const [inputSearch, setInputSearch] = useState('')
  const [currentDecks, setCurrentDecks] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [deckOffset, setDeckOffset] = useState(0)
  const [filteredDecks, setFilteredDecks] = useState([])
  const decksPerPage = 6

  useEffect(() => {
    const filtered = decks.filter((data) =>
      data.deckName.toLowerCase().includes(inputSearch.toLowerCase())
    )
    setFilteredDecks(filtered)
    setPageCount(Math.ceil(filtered.length / decksPerPage))
    setDeckOffset(0)
  }, [decks, inputSearch, decksPerPage]) // Make sure to include all dependencies

  useEffect(() => {
    const endOffset = deckOffset + decksPerPage
    setCurrentDecks(filteredDecks.slice(deckOffset, endOffset))
  }, [deckOffset, filteredDecks, decksPerPage])

  const handlePageClick = (selected) => {
    const newOffset = selected * decksPerPage
    setDeckOffset(newOffset)
  }

  return (
    <div className='mx-auto mt-5 flex w-full max-w-5xl flex-col justify-center rounded-lg bg-white p-5'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-x-3 border-b-4 border-sky-900 px-3 py-2'>
          <Icon path={mdiCardMultipleOutline} size={1} color={'#44403C'} />
          <p className='text-stone-700'>Decks</p>
          <span className='rounded-sm bg-[#F5F5F4] px-2 py-1 text-xs text-stone-700'>
            {decks.length}
          </span>
        </div>
        <SearchFilter setInputSearch={setInputSearch} />
      </div>
      <div className='my-7 grid w-full grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3'>
        {currentDecks.map((deck) => (
          <div
            key={deck.deckId}
            className='flex h-64 w-full flex-col items-center justify-center gap-y-10 border px-9 py-7 text-center'
          >
            <div className='flex h-28 w-full flex-col justify-start gap-y-10'>
              <h1 className='text line-clamp-2 break-all font-bold capitalize'>
                {deck.deckName}
              </h1>
              {!deck.deckDescription || deck.deckDescription.trim() === '' ? (
                <p className='text-xs text-stone-500'>No description ... </p>
              ) : (
                <p className='text-xs text-stone-500'>{deck.deckDescription}</p>
              )}
            </div>
            <div className='flex gap-x-2'>
              <Link
                to={`/deck/${deck.deckId}/quiz_menu`}
                state={{
                  name: deck.deckName,
                  description: deck.deckDescription,
                }}
                className='flex items-center justify-center rounded bg-sky-900 px-4 py-2 text-sm font-semibold transition duration-300 ease-in hover:bg-stone-700 '
              >
                <span>
                  <Icon
                    path={mdiPlay}
                    size={0.8}
                    color={'white'}
                    className='mx-1'
                  />
                </span>

                <span className='hidden text-white sm:inline '>Play</span>
              </Link>
              <Link
                to={`/deck/${deck.deckId}/dashboard`}
                className='flex items-center justify-center gap-x-1 rounded border px-4 py-2 text-sm font-semibold capitalize transition duration-200 ease-in hover:bg-stone-100'
              >
                <span>
                  <Icon path={mdiMagnify} size={0.7} />
                </span>
                <span className='hidden text-stone-700 sm:inline '>View</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='Next'
        onPageChange={(selected) => handlePageClick(selected.selected)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel='Prev'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num '
        previousLinkClassName={`${deckOffset === 0 ? 'disable-prev' : 'page-prev'} `}
        nextLinkClassName={`${deckOffset + decksPerPage >= decks.length ? 'disable-next' : 'page-next'} `}
        activeLinkClassName='active-page'
      />
    </div>
  )
}
