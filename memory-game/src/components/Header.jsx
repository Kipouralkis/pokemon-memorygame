import '../styles/header.css'

function Header(props) {
  return (
    <header>
      <div className='header-text'>
        <h1>Gotta Catch Them All!! (only once !!)</h1>
        <br />
        <p>Score: {props.score}</p>
        <p>High Score: {props.highScore}</p>
      </div>
      <button className='options-button' onClick={props.toggleOptions}>Options</button>
    </header>
  );
}

export default Header;
