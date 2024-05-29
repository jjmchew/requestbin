import { useState, useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar.tsx';
import DisplayRequests from './components/DisplayRequests.tsx';

function App() {
  //    const sampleData = [
  //     {
  //       id: 12,
  //       date_received: '12/02/1999',
  //       time_received: '08:24:33 UTC',
  //       method: 'GET',
  //       url: '/sample/get',
  //       path: '/request?id=3439',
  //       headers: { v1: 'sup', v2: 'k2', v3: 'k3', v4: 'k4'},
  //       body: 'asdfja;sdflkjas;lfaslm425ijh241l24;l5m l;lmn 2;lkm541l3 m;l4im;46',
  //     },
  //     {
  //       id: 13,
  //       date_received: '12/02/1999',
  //       time_received: '08:24:35 UTC',
  //       method: 'POST',
  //       url: '/sample/post',
  //       path: '/request?id=3439',
  //       headers: { v1: 'AYYYYY', oooooo: 'ahhhhh'},
  //       body: '81f6awe1r31av4we did itvvvv;lkm541l3 f',
  //     },
  //   ];

  const [appData, setAppData] = useState([]);

  const makeRequest = async () => {
    let link = 'http://localhost:3000/api/';

    try {
      const response = await fetch(link);
      // what does data look like?
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    makeRequest().then(data => {
      setAppData(data);
    });
    // why is array empty?
  }, []);

  console.log('app.tsx');
  return (
    <>
      <div>requestBin</div>
      <TopBar url="http://209.34.31.23/ka93kjdk2" />
      <DisplayRequests data={appData} />
    </>
  )
}

export default App
