import classes from './RequestList.module.css';
import { format } from '../utils.ts';

interface RequestListProps {
  data: any[],
  handleClick: any,
}


const RequestList = ({ data, handleClick }: RequestListProps) => {
  const display = data.map(obj => {
    const dateObj = new Date(obj.datetime_received);
    const timeOfDay = format.timeOfD(dateObj);
    return (
      <div key={obj.hash} className={classes.rowWrap} onClick={() => handleClick(obj.hash)}>
        <div className={classes.date}>{timeOfDay} </div>
        <div className={classes.method}>{obj.method}</div>
        <div className={classes.path}>{obj.url}</div>
      </div>
    );
  });

  return (
    <>
      <div className={classes.container}>
        <h1>Received Requests</h1>
        {display}
      </div>
    </>
  )
};

export default RequestList;

