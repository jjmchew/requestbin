// import classes from './RequestDetail.module.css';
import { useEffect } from 'react'
import { baseURL } from '../constants.ts'

interface RequestDetailProps {
  binName: string,
  selectedId: number | null,
}

const RequestDetail = ({ binName, selectedId }: RequestDetailProps) => {

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests/${selectedId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('RequestDetail: data', data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  let display = null;

  useEffect(()=> {
    if (!selectedId) {
      makeRequest().then(data => {
        console.log('RequestDetail data: ', data);
      });
    }
  }, [selectedId]);

  return (
    <div>
      <h1>Request Detail</h1>
      {display}
    </div>
  )
};

export default RequestDetail;
