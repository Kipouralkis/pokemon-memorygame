import Card from './content/Card';
import '../styles/content.css';

function Content(props) {

  const layoutClass = 
    props.cards.length <=8? 'narrow' :
    props.cards.length >= 14 ? 'compact':
    'default';

  return (
    <main style={{ flex: 1, padding: '2rem' }}>
      <div className={`card-grid ${layoutClass} ${props.isShuffling ? 'fade' : ''}`}>
        {props.cards.map(card => {
          return <Card 
            key={card.id} 
            imgURL={card.imgURL} 
            name={card.name} 
            layoutClass={layoutClass} 
            onClick={() => props.handleClick(card.id)}
          />
        })}
      </div>
    </main>
  );
}

export default Content;
