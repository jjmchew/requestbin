import classes from './TopBar.module.css';
interface TopBarProps {
  url: string,
}

const TopBar = ({ url }: TopBarProps) => {
  return (
    <>
      <div className={classes.bar}>Send webhooks to <span className={classes.url}>{url}</span></div>
    </>
  )
};

export default TopBar;
