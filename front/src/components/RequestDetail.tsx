import classes from './RequestDetail.module.css';

interface RequestDetailProps {
  data: any[],
  selectedId: number | null,
}

const RequestDetail = ({ data, selectedId }: RequestDetailProps) => {
  if (!selectedId) {
    return (<div>Select a request</div>);
  }

  let display = data.filter(obj => obj.id == selectedId).map(obj => {
    return (
      <div key={obj.id}>
        <div>{JSON.stringify(obj.headers)}</div>
        <div>{obj.body}</div>
      </div>
    );
  });
    

  return (
    <div>
      <h1>Request Detail</h1>
      {display}
    </div>
  )
};

export default RequestDetail;
