import { useState , useEffect} from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import typeThemes from './themes/typeThemes'

function App() {
  const [cards, setCards] = useState([]);
  const [clcikedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // theme management
  const [themeType, setTheme] = useState('electric');
  const currentTheme = typeThemes[themeType];

  // runs every time themeType changes
  useEffect(() => {
    // looks up the current theme from the file
    const theme = typeThemes[themeType];
    // targets the root element
    const root = document.documentElement;

    // turn object into an array of key-value pairs and assign to root properties
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    })
  }, [themeType]);

  // card shuffling
  const [isShuffling, setIsShuffling] = useState(false);

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

  function shuffle(array){
    const copy = [...array];
    for (let i = copy.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy
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


  useEffect(() => {
    const storedScore = localStorage.getItem('highScore');
    if (storedScore) {
      setHighScore(parseInt(storedScore));
    }
  }, []);


  useEffect(()=> {
    fetchMultiplePokemon(8);
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
      } else {
        setIsShuffling(true);
        setTimeout(()=> {
          setCards(shuffle(cards));
          setIsShuffling(false);
        }, 200)
      }

      if (newClicked.length>highScore){
        setHighScore(newClicked.length);
        localStorage.setItem('highScore', newClicked.length);
      }

    }
  }


  return (
     <div className='layout'>
      <Header score={score} highScore={highScore}/>
       {gameOver && (
          alert("You Lost!")
        )}
      <Content 
        cards={cards}
        handleClick={handleCardClicks}
        isShuffling={isShuffling}
        />
      <Footer/>
      {console.log(currentTheme)}
    </div>
  )
}

export default App
