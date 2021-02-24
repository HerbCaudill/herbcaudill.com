import { IndexLayout } from 'components/IndexLayout'

const NotFoundPage: React.FC = () => {
  return (
    <IndexLayout label="Oops">
      <article>
        <div className="border border-black pt-G lg:p-G text-center">
          <h1 className="text-yuge font-sans font-bold text-black tracking-tighter mt-0 ">
            404
          </h1>
          <h3 className="text-3xl md:text-4xl lg:text-6xl font-serif font-light mt-2 tracking-tighter mb-10">
            Page not found.
          </h3>
          <div
            className="relative overflow-hidden"
            style={{ paddingBottom: '90%' }}
          >
            <iframe
              className="absolute "
              style={{
                height: '200%',
                width: '250%',
                left: '-75%',
                top: '-40%',
              }}
              src="https://www.youtube-nocookie.com/embed/WpTjFhA09kQ?modestbranding=1&autohide=1&showinfo=0&controls=0"
            ></iframe>
          </div>
        </div>
      </article>
    </IndexLayout>
  )
}

export default NotFoundPage
