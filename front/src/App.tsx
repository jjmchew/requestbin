// import { useState } from 'react'
import './App.css'
import TopBar from './components/TopBar.tsx';
import RequestList from './components/RequestList.tsx';

function App() {

  const sampleData = [
    {
      id: 12,
      date_received: '12/02/1999',
      time_received: '08:24:33 UTC',
      method: 'GET',
      url: '/sample/get',
      path: '/request?id=3439',
      headers: { v1: 'k1', v2: 'k2', v3: 'k3', v4: 'k4'},
      body: 'asdfja;sdflkjas;lfaslm425ijh241l24;l5m l;lmn 2;lkm541l3 m;l4im;46',
    },
    {
      id: 13,
      date_received: '12/02/1999',
      time_received: '08:24:35 UTC',
      method: 'POST',
      url: '/sample/post',
      path: '/request?id=3439',
      headers: { v1: 'k1', v2: 'k2'},
      body: '81f6awe1r31av4vvvv;lkm541l3 f',
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
