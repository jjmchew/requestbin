// import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../constants.ts'

const LandingPage = () => {

  const navigate = useNavigate();
  const handleClick = async () => {
    const url = `${baseURL}/api`;

    try {
        // const response = await fetch(url, {method: 'post'});
        // const data = await response.json();
        const data = 'boinay'; // temporary assignment for testing
        console.log(data);
        navigate(`/view/${data}`);
    } catch (e) {
        console.log(e)
    }
  };

  return (
    <>
      <h1>Welcome to RequestBin</h1>
      <div>
        <button onClick={handleClick}>Create new bin</button>
      </div>
    </>
  );
};

export default LandingPage;