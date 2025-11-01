import { useState , useEffect} from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  const [cards, setCards] = useState([]);
  const [clcikedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  async function fetchPokemon(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const name = data.name;
    const imgURL = data.sprites.other.dream_world.front_default;
    if (name && imgURL) {
      return { id, name, imgURL };
    } 
  }

  function getUniqueRandomNumbers(num, max){
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0,num);
  }

  // This function fetches multiple random Pokémon from the API
  // It's marked as 'async' so we can use 'await' inside it
  // 'await' lets us pause the function until all fetches are done
  async function fetchMultiplePokemon(num) {
    const promises = [];

    const randomIds = getUniqueRandomNumbers(num, 500);

    for (let i=0; i<num; i++) {
      promises.push(fetchPokemon(randomIds[i]));
    }

    // wait to all fetches to complete before continuing
    const pokemon = await Promise.all(promises);

    // Update state
    setCards(pokemon);
  }

  useEffect(()=> {
    fetchMultiplePokemon(4);
    console.log(cards);
  }, [])

  function handleCardClicks(id){
    if(clcikedIds.includes(id)) {
      setGameOver(true);
    } else {
      const newClicked = [...clcikedIds, id];
      setClickedIds(newClicked);
      setScore(newClicked.length);

      if (newClicked.length === cards.length) {
        alert("You win!!!");
      }
    }
  }

  return (
     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
       {gameOver && (
          alert("You Lost!")
        )}
      <Content 
        cards={cards}
        handleClick={handleCardClicks}
        />
      <Footer />
    </div>
  )
}

export default App
