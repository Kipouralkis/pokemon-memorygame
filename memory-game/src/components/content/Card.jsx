import '../../styles/card.css';

function Card(props) {
  return (
    <>
    <div className={`card-body ${props.layoutClass}`}>
      <div className='pokeimg'>
         <img src={props.imgURL} alt={props.name}></img>
      </div>
      <p>{props.name}</p>
    </div>
    </>
  );
}

export default Card;
