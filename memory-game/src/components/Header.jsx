import '../styles/header.css'
import OptionsButton from './options/OptionsButton';

function Header(props) {
  return (
    <header>
      <div className='header-text'>
        <h1>Gotta Catch Them All!! (only once !!)</h1>
        <br />
        <p>Score: {props.score}</p>
        <p>High Score: {props.highScore}</p>
      </div>
      <OptionsButton />
    </header>
  );
}

export default Header;
