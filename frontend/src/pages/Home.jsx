import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import Excalidraw from '../components/Excalidraw'
import DesmosGraph from '../components/DesmosGraph'


const Home = () => {
  return ( 
    <div className='flex h-screen bg-[#212121]'>
      <Sidebar/>
      <Main/>
      <Excalidraw/>
      <DesmosGraph  />


    </div>
  )
}

export default Home