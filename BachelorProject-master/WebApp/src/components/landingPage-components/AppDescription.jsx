import {
  ForwardIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  BookOpenIcon,
} from '@heroicons/react/20/solid'

const features = [
  {
    id: 1,
    descriptionIntro: 'Generate study materials for you.',
    description:
      ' Automize study material creation, making it quick and hassle-free. With a few clicks, generate customized flashcards and quizzes, saving time and effort.',
    icon: ForwardIcon,
    title: 'Quick and effortless.',
    floatRight: true,
    img: 'https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3BkbWlzY3Byb2plY3QyMC1sYWNtYTIyODQ1Mi1pbWFnZS5qcGc.jpg',
    lastChild: false,
  },
  {
    id: 2,
    descriptionIntro: 'Provides set of tools for learning.',
    description:
      ' Offers tools for generating study materials, engaging with quizzes, and receiving instant feedback. This helps users assess progress and improve effectively.',
    icon: WrenchScrewdriverIcon,
    title: 'Generate. Study. Evaluate.',
    floatRight: false,
    img: 'https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL2xyL3VtZXN2a3NuZ28xNTU0LWltYWdlLmpwZw.jpg',
    lastChild: false,
  },
  {
    id: 3,
    descriptionIntro: 'Effortless navigation through minimalist design.',
    description:
      ' Features a minimalist design for effortless navigation, ensuring users can easily access and use all features without distractions.',
    icon: LightBulbIcon,
    title: 'Keep it simple.',
    floatRight: true,
    img: 'https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA1L3BkbWlzYzE1LXljYmF0bXM1ODYwLWltYWdlXzMuanBn.jpg',
    lastChild: true,
  },
]

export default function AppDescription() {
  return (
    <section className='px-5' style={{ backgroundColor: '#FAFAFA' }}>
      {features.map((feature) => (
        <div
          key={feature.id}
          className={`mx-auto flex max-w-5xl flex-col items-center justify-center py-24  lg:justify-between ${!feature.floatRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} ${!feature.lastChild ? 'border-b' : 'border-b-0'}`}
        >
          <div className='grid gap-y-4 md:w-1/2'>
            <h1 className='mb-3 text-center text-3xl font-semibold text-stone-700 md:text-4xl lg:text-left'>
              {feature.title}
            </h1>
            <div className='max-w-xl space-y-4 text-center text-base leading-7 sm:text-left lg:max-w-none'>
              <div key={feature.descriptionIntro} className='relative sm:pl-9'>
                <dt className='inline font-bold text-stone-700'>
                  <feature.icon
                    className='absolute left-1 top-1 hidden h-5 w-5 sm:flex'
                    aria-hidden='true'
                    style={{ color: 'blue' }}
                  />
                  {feature.descriptionIntro}
                </dt>{' '}
                <dd className='inline font-medium text-stone-500'>
                  {feature.description}
                </dd>
              </div>
            </div>
          </div>
          <img
            src={feature.img}
            className='mt-14 flex h-48 rounded-3xl border-0 sm:size-auto lg:mt-0'
            alt={`image-mode-${feature.id}`}
          />
        </div>
      ))}
    </section>
  )
}
