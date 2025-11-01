import '../../styles/card.css';

function Card(props) {
  return (
    <div className="card-body">
      <img src={props.imgURL} alt={props.name}></img>
      <p>{props.name}</p>
    </div>
  );
}

export default Card;
