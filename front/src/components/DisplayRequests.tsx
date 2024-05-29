import { useState } from 'react';
import classes from './DisplayRequests.module.css';
import RequestList from './RequestList.tsx';
import RequestDetail from './RequestDetail.tsx';

interface DisplayRequestsProps {
  data: any[];
}

const DisplayRequests = ({ data }: DisplayRequestsProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (id: number) => {
    console.log('handleClick', id);
    setSelected(id);
  };

  return (
    <>
      <div className={classes.container}>
        <RequestList data={data} handleClick={handleClick} />
        <RequestDetail selectedId={selected} data={data} />
      </div>
    </>
  )
};

export default DisplayRequests;
