import { useState } from 'react';
import classes from './DisplayRequests.module.css';
import RequestList from './RequestList.tsx';
import RequestDetail from './RequestDetail.tsx';

interface DisplayRequestsProps {
  data: any[],
  binName: string,
}

const DisplayRequests = ({ data, binName }: DisplayRequestsProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (hash: string) => {
    setSelected(hash);
  };

  console.log('DisplayRequests, selected:',selected);
  return (
    <>
      <div className={classes.container}>
        <RequestList data={data} handleClick={handleClick} />
        <RequestDetail selectedHash={selected} binName={binName} />
      </div>
    </>
  )
};

export default DisplayRequests;
