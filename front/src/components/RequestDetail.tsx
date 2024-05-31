// import classes from './RequestDetail.module.css';
import { useEffect, useState } from 'react';
import { baseURL } from '../utils.ts';

interface RequestDetailProps {
  binName: string,
  selectedHash: string | null,
}

const RequestDetail = ({ binName, selectedHash }: RequestDetailProps) => {
  const [selected, setSelected] = useState<any>({});

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests/${selectedHash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log('RequestDetail: data', data)
      
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    if (selectedHash) {
      makeRequest().then(data => {
        // console.log('RequestDetail data: ', data);
        
        setSelected(data)
        
      });
    }
  }, [selectedHash]);

  return (
    <div>
      <h1>Request Detail</h1>
      {/* <Headers data={selected.headers}/> */}
      {JSON.stringify(selected.headers)}
      {JSON.stringify(selected.body)}
    </div>
  )
};

export default RequestDetail;
