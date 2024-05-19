import React from 'react'
import NotFoundGif from '../assets/bubble-gum-error-404.gif';

const Error_404 = () => {
  return (
    <main className='min-h-screen w-full flex justify-center items-center'>
      <section>
        <div className='text-center'>
          <h1 className="text-4xl font-semibold text-slate-700 poppins-regular">Page not found.</h1>
        </div>
        <div>
          <img src={NotFoundGif} alt="Gif" />
        </div>
      </section>
    </main>
  )
}

export default React.memo(Error_404);