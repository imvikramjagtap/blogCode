import React from 'react'
// import Header from './Header'
import Posts from './Posts'
import Sidebar from './Sidebar'

export default function Home() {
  return (
    <div>
        <div className='flex'>
            <Posts />
            <Sidebar/>
        </div>
    </div>
  )
}
