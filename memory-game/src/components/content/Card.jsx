import '../../styles/card.css';

function Card(props) {
  return (
    <>
    <div className={`card-body ${props.layoutClass}`} onClick={props.onClick} >
      <div className="pokeimg">
         <img src={props.imgURL} alt={props.name}></img>
      </div>
      <p>{props.name}</p>
    </div>
    {console.log(props.currentTheme)}
    </>
  );
}

export default Card;
