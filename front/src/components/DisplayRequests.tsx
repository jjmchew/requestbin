import classes from './DisplayRequests.module.css';
import RequestList from './RequestList.tsx';
import RequestDetail from './RequestDetail.tsx';

interface DisplayRequestsProps {
  data: any[];
}

const DisplayRequests = ({ data }: DisplayRequestsProps) => {
  return (
    <>
      <div className={classes.container}>
        <RequestList data={data} />
        <RequestDetail />
      </div>
    </>
  )
};

export default DisplayRequests;
