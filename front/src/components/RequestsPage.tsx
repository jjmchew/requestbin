import { useState, useEffect } from 'react'
import TopBar from './TopBar.tsx'
import DisplayRequests from './DisplayRequests'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../utils.ts';


const RequestsPage = () => {
  const [appData, setAppData] = useState([]);
  const location = useLocation();
  const binName = location.pathname.replace('/view/','');

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log('RequestsPage: data', data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    makeRequest().then(data => {
      setAppData(data);
    });
  }, []);

  return (
    <>
      <TopBar url={`${baseURL}/${binName}`} />
      <DisplayRequests data={appData} binName={binName}/>
    </>
  );
};

export default RequestsPage;