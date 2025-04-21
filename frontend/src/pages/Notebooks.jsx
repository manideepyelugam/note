import React from 'react'
import Note from '../components/Note'
import Sidebar from '../components/Sidebar'

const Notebooks = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar/>
      <Note/>
    </div>
  )
}

export default Notebooks