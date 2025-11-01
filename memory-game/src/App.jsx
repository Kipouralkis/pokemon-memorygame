import { useState , useEffect} from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {
  const [cards, setCards] = useState([]);

  function fetchPokemon(id){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => {
      const name = data.name;
      const imgURL = data.sprites.other.dream_world.front_default;
      if (name && imgURL) {
        return {name, imgURL};
      }
    }); 
  }

  // This function fetches multiple random Pokémon from the API
  // It's marked as 'async' so we can use 'await' inside it
  // 'await' lets us pause the function until all fetches are done
  async function fetchMultiplePokemon(num) {
    const promises = [];

    for (let i=0; i<num; i++) {
      const randomId = Math.floor(Math.random() * 100) + 1;
      promises.push(fetchPokemon(randomId));
    }

    // wait to all fetches to complete before continuing
    const pokemon = await Promise.all(promises);

    // Update state
    setCards(pokemon);
  }

  useEffect(()=> {
    fetchMultiplePokemon(14);
    console.log(cards);
  }, [])

  return (
     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Content cards={cards}/>
      <Footer />
    </div>
  )
}

export default App
