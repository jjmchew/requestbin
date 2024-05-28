// import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar.tsx';
import RequestList from './components/RequestList.tsx';

function App() {

  const sampleData = [
    {
      id: 12,
      dateTime: new Date().toUTCString(),
      method: 'GET',
      path: '/sample/get/request?id=3439',
    },
    {
      id: 13,
      dateTime: new Date().toUTCString(),
      method: 'POST',
      path: '/sample/post/request/',
    },
  ];

  return (
    <>
      <div>requestBin</div>
      <TopBar url="http://209.34.31.23/ka93kjdk2" />
      <RequestList data={sampleData} />
    </>
  )
}

export default App
