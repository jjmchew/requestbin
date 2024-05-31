// import classes from './RequestDetail.module.css';
import { useEffect, useState } from 'react'
import { baseURL } from '../utils.ts'

interface RequestDetailProps {
  binName: string,
  selectedId: number | null,
}

const RequestDetail = ({ binName, selectedId }: RequestDetailProps) => {
  const [selected, setSelected] = useState<any>({});

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests/${selectedId}`;

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
    if (selectedId) {
      makeRequest().then(data => {
        // console.log('RequestDetail data: ', data);
        setSelected(data)
        
      });
    }
  }, [selectedId]);

  return (
    <div>
      <h1>Request Detail</h1>
      {JSON.stringify(selected.headers)}
      {JSON.stringify(selected.body)}
    </div>
  )
};

export default RequestDetail;
