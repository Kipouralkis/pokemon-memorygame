import '../styles/header.css'

function Header(props) {
  return (
    <header>
      <h1>Gotta Catch Them All!! (only once !!)</h1>
      <br />
      <p>Score: {props.score}</p>
      <p>High Score: {props.highScore}</p>
    </header>
  );
}

export default Header;
