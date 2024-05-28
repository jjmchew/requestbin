import classes from './RequestList.module.css';

interface RequestListProps {
  data: any[],
}

const RequestList = ({ data }: RequestListProps) => {
  let display = data.map(obj => {
    return (
      <div className={classes.rowWrap}>
        <div className={classes.date}>{obj.date} {obj.time}</div>
        <div className={classes.method}>{obj.method}</div>
        <div className={classes.path}>{obj.path}</div>
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
