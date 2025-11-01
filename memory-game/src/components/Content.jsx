import Card from './content/Card';

function Content(props) {
  return (
    <main style={{ flex: 1, padding: '2rem' }}>
      {props.cards.map((card, index) => {
        return <Card key={index} imgURL={card.imgURL} name={card.name}/>
      })}
      {/* {props.cards.map((card, index) => {
        return <p key={index}>{card.name}</p>;
      })} */}
    </main>
  );
}

export default Content;
