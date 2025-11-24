import '../../styles/card.css';

function Card(props) {
  return (
    <>
    <div className={`card-body ${props.layoutClass}`} onClick={props.onClick} >
      <div className="pokeimg">
         <img src={props.imgURL} alt={props.name}></img>
      </div>
      <p style={{textTransform:'capitalize'}}>{props.name}</p>
    </div>
    </>
  );
}

export default Card;
