import React from 'react'
import { Link } from 'react-router-dom'

export const courseCard = ({
    id,
    courseName,
    instructorName,
    description,
    duration,
    img
}) => {
  return (
    <article className="flex bg-white transition hover:shadow-xl">
    <div className="hidden sm:block sm:basis-56">
      <img
        alt=""
        src={img}
        className="aspect-square h-full w-full object-contain"
      />
    </div>
  
    <div className="flex flex-1 flex-col justify-between">
      <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <h3 className="font-bold uppercase text-gray-900">
            {courseName}
            <br />
            <p className='mt-2 line-clamp-3 text-sm/relaxed text-gray-700'>By: {instructorName}</p>
          </h3>
  
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
         {description}
        </p>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">Duration: {duration}</p>
      </div>
  
      <div className="sm:flex sm:items-end sm:justify-end">
        <Link
          to={`/courses/${id}`}
          className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
        >
          Learn more
        </Link>
      </div>
    </div>
  </article>
  )
}
