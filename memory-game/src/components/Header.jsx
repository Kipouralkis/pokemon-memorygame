// Header.js
function Header(props) {
  return (
    <header style={{ backgroundColor: 'black', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <h1>Gotta Catch Them All!! (only once !!)</h1>
      <br />
      <p>Score: {props.score}</p>
    </header>
  );
}

export default Header;
