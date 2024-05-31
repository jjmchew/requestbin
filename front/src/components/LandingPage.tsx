// import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../utils.ts'

const LandingPage = () => {

  const navigate = useNavigate();
  const handleClick = async () => {
    const url = `${baseURL}/api`;

    try {
        const response = await fetch(url, {method: 'post'});
        const data = await response.json();
        navigate(`/view/${data.name}`);
    } catch (e) {
        console.log(e)
    }
  };

  return (
    <>
      <h1>Welcome to DumpsterFire</h1>
      <div>
        <button onClick={handleClick}>Light a new fire</button>
      </div>
    </>
  );
};

export default LandingPage;