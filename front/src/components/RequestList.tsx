import classes from './RequestList.module.css';

interface RequestListProps {
  data: any[],
  handleClick: any,
}

const RequestList = ({ data, handleClick }: RequestListProps) => {
  const display = data.map(obj => {
    return (
      <div key={obj.id} className={classes.rowWrap} onClick={() => handleClick(obj.id)}>
        <div className={classes.date}>{obj.date_received} {obj.time_received}</div>
        <div className={classes.method}>{obj.method}</div>
        <div className={classes.path}>{obj.url}</div>
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


// <div className={classes.headers}>{JSON.stringify(obj.headers)}</div>
// <div className={classes.body}>{JSON.stringify(obj.body)}</div>
