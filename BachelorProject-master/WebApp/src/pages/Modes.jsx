import { Link, NavLink, useParams } from 'react-router-dom'
import { getDeckById } from './../services/deckService'
import { useState, useEffect } from 'react'
import checkMode from '../script/checkMode'
import NavBar from '../components/tailwind-components/Navbar'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { modes } from '../data/modes'
import { Switch } from '@headlessui/react'
import {
  mdiArrowLeftBold,
  mdiText,
  mdiDotsHorizontal,
  mdiPencil,
  mdiPlus,
  mdiPlay,
} from '@mdi/js'
import Icon from '@mdi/react'
import Modal from '../components/Modal'
import { useLocation } from 'react-router-dom'
import CreateFlashcard from '../components/form/flashcard/CreateFlashcard'

export default function Modes() {
  const { menu, id } = useParams()
  const [deck, setDeck] = useState({})
  const [enabled, setEnabled] = useState(false)
  const [userId, setUserId] = useState(1001)
  const location = useLocation()
  const { name, description } = location.state
  let typeMode = checkMode(menu)

  const handleInputChange = (event) => {
    let value = parseInt(event.target.value)
    if (value > 1200) {
      value = 1200
    }
    setUserId(value)
  }

  /*
  useEffect(() => {
    const fetchDeckById = async () => {
      try {
        const data = await getDeckById(id);
        setDeck(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeckById();
  }, []);
  */

  return (
    <>
      <NavBar />
      <section className='my-20'>
        <div className='mx-auto flex max-w-5xl flex-col px-5'>
          <div className='flex items-baseline justify-between'>
            <div className='flex items-center gap-x-2 font-semibold sm:gap-x-5 '>
              <Icon path={typeMode.icon} size={2} />
              <h1 className='text-2xl sm:text-4xl'>{typeMode.title} Menu</h1>
            </div>
            <Link
              to={`/deck/${id}/dashboard`}
              className='flex items-center justify-center gap-x-1 rounded border bg-sky-900 px-3 py-2 font-medium text-white
              transition duration-200 ease-in hover:bg-stone-700'
            >
              <Icon
                path={mdiArrowLeftBold}
                size={1}
                className='text-stone-70'
                color={'white'}
              />
              <p className='hidden text-white sm:inline'>Dashboard</p>
            </Link>
          </div>

          <div className='my-5 rounded-lg border bg-white px-5 py-7 md:px-14'>
            <div className='relative hidden md:block'>
              <div className='absolute right-0'>
                <Link
                  to={`/tutorial`}
                  state={{
                    mode: typeMode.name,
                  }}
                  className='mt-2 flex items-start gap-x-1 text-stone-700'
                >
                  Tutorial
                  <ArrowTopRightOnSquareIcon className='block h-5 w-6' />
                </Link>
              </div>
            </div>

            <div className='flex w-full justify-center gap-x-1'>
              {modes.map((mode) => (
                <NavLink
                  key={mode.link}
                  to={`/deck/${id}/${mode.link}`}
                  state={{
                    name: name,
                    description: description,
                  }}
                  className={({ isActive }) => {
                    return `${isActive ? 'bg-sky-900 text-white' : ''} hover:text-whit w-28 border p-2 text-center text-xs text-stone-700 transition duration-200 ease-in hover:bg-stone-700 hover:text-white sm:text-base ${mode.id === 1 ? 'rounded-l' : mode.id === 4 ? 'rounded-r' : ''}`
                  }}
                >
                  {mode.title}
                </NavLink>
              ))}
            </div>
            <div className='mt-24 flex flex-col justify-between sm:mt-10 lg:p-20'>
              <div className='flex flex-col items-center'>
                <Icon path={typeMode.icon} size={3.5} />
                <h1 className='my-2 break-all text-center text-3xl font-bold capitalize sm:text-5xl lg:text-6xl'>
                  {name}
                </h1>
                <h2>{typeMode.title} Mode</h2>
              </div>

              <div className='mt-20 flex items-end justify-center'>
                <Link
                  to={
                    typeMode.name === 'quiz' || typeMode.name === 'feedback'
                      ? `/deck/${id}/${typeMode.name}?enabled=${enabled}&userId=${userId}`
                      : `/deck/${id}/${typeMode.name}`
                  }
                  className='flex items-center gap-x-1 rounded bg-sky-900 px-10 py-3 font-semibold text-white
  transition duration-200 ease-in hover:bg-stone-700'
                >
                  <Icon path={mdiPlay} size={1} color='white' />
                  Start
                </Link>
              </div>

              <div className='mt-4 flex items-end justify-center gap-x-9'>
                {typeMode.name === 'quiz' || typeMode.name === 'feedback' ? (
                  <div className='flex flex-col items-center gap-y-1'>
                    <input
                      type='number'
                      className='w-[45px] rounded-lg border border-stone-300 text-center text-sm text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C4A6E]'
                      value={userId}
                      onChange={handleInputChange}
                      min={0}
                      max={1200}
                    />
                    <p className='text-xs text-stone-500'>USER ID</p>
                  </div>
                ) : (
                  ''
                )}

                {typeMode.name === 'quiz' || typeMode.name === 'feedback' ? (
                  <div className='flex flex-col items-center gap-y-1'>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={`${
                        enabled ? 'bg-sky-900' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                      <span className='sr-only'>Choose model</span>
                      <span
                        className={`${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                      />
                    </Switch>
                    <p className='text-xs text-stone-500'>GPT 4</p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col justify-between gap-x-24 sm:flex-row'>
            <div className='hidden flex-col items-center gap-y-2 border-b text-center sm:flex sm:items-start sm:border-0 sm:py-0 sm:text-left'>
              <div className='flex items-center gap-x-3'>
                <Icon path={mdiText} size={1.5} />
                <h3 className='text-2xl font-semibold text-stone-700 '>
                  Deck Description
                </h3>
              </div>
              <p className='text-stone-500'>{description}</p>
            </div>

            <div className='flex items-start justify-end gap-x-1'>
              <Modal buttonName='Add Card' icon={mdiPlus} primary={true}>
                <CreateFlashcard id={id} />
              </Modal>

              <Link
                to={`/create_deck/normal?isEdit=${true}&id=${id}`}
                className='flex h-10 items-center space-x-2 rounded border-2 px-3 font-semibold text-stone-700
              transition duration-200 ease-in hover:bg-stone-200'
              >
                <Icon path={mdiPencil} size={1} />
                <span className='hidden md:block'>Edit</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
