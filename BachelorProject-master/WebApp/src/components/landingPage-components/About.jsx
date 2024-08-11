import {
  CloudIcon,
  StarIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from '@heroicons/react/20/solid'

const features = [
  {
    id: 1,
    descriptionIntro: 'Hosted In Azure cloud.',
    description:
      'AI.CEE leverages the robust infrastructure of the Azure cloud to provide seamless and reliable access to its users.',
    icon: CloudIcon,
  },
  {
    id: 2,
    descriptionIntro: 'AI integrated study application.',
    description:
      'AI.CEE is an advanced study application that incorporates AI to enhance learning experiences by automating the creation of study materials and providing real-time feedback.',
    icon: StarIcon,
  },
  {
    id: 3,
    descriptionIntro: 'Bachelor Project at Oslomet.',
    description:
      'Developed as a bachelor project at Oslomet, AI.CEE represents an innovative approach to educational technology, utilizing state-of-the-art AI capabilities.',
    icon: AcademicCapIcon,
  },
  {
    id: 4,
    descriptionIntro: 'Introductory research on AI for Forte Digital.',
    description:
      'AI.CEE is also a product of introductory research on AI for Forte Digital, highlighting the practical applications of AI in creating effective and efficient study tools.',
    icon: ChartBarIcon,
  },
]

export default function About() {
  return (
    <section className='px-5' style={{ backgroundColor: '#FAFAFA' }}>
      <div
        className='mx-auto
      flex max-w-5xl flex-col items-center justify-evenly space-y-10 py-24 lg:h-screen lg:flex-row-reverse lg:justify-between lg:py-0'
      >
        <div className='grid gap-y-4 md:w-1/2'>
          <h1 className='mb-3 text-center text-4xl font-semibold text-stone-700 lg:text-center'>
            About AI.CEE
          </h1>
          <div className='max-w-xl space-y-4 text-base leading-7 text-stone-600 lg:max-w-none'>
            {features.map((feature) => (
              <div key={feature.id} className='relative pl-9'>
                <dt className='inline font-bold text-stone-700'>
                  <feature.icon
                    className='absolute left-1 top-1 h-5 w-5'
                    aria-hidden='true'
                  />
                  {feature.descriptionIntro}
                </dt>{' '}
                <dd className='inline font-medium text-stone-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </div>
        </div>
        <img
          src='https://images.rawpixel.com/image_450/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV83X3BhcmlzX3dhdGVyY29sb3JfaWxsdXN0cmF0aW9uX2lzb2xhdGVfaWxsdXN0cl84YTZjMzc2ZS1iMDAwLTQzNjMtOGZjNS0yNjE3Mzg5NGVlNjYuanBn.jpg'
          alt=''
          className='flex h-48 rounded-3xl border-0 sm:size-auto'
        />
      </div>
    </section>
  )
}
