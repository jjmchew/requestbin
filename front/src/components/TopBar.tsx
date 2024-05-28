import classes from './TopBar.module.css';
interface TopBarProps {
  url: string,
}

const TopBar = ({ url }: TopBarProps) => {
  return (
    <>
      <div className={classes.bar}>Your Endpoint is {url}</div>
    </>
  )
};

export default TopBar;
