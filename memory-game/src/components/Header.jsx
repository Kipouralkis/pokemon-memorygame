import '../styles/header.css'
import Instructions from './options/Instructions';

function Header(props) {
  return (
    <header>
      <div className='header-text'>
        <h1>Gotta Catch Them All!! (only once !!)</h1>
        <br />
        <p>Score: {props.score}</p>
        <p>High Score: {props.highScore}</p>
      </div>
      <div className='extras'>
        <button className='options-button' onClick={props.toggleOptions}>Options</button>
        <Instructions />
      </div>
    </header>
  );
}

export default Header;
