import { useState , useEffect} from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import typeThemes from './themes/typeThemes'
import WinScreen from './components/content/WinScreen'
import LossScreen from './components/content/LossScreen'
import {fetchPokemon, getUniqueRandomNumbers, shuffle} from './utils/utils'

function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameResult, setGameResult] = useState(null);
  const [difficulty, setDifficulty] = useState(8);

  // card shuffling
  const [isShuffling, setIsShuffling] = useState(false);

  // theme management
  const [themeType, setTheme] = useState('water');
  const currentTheme = typeThemes[themeType];

  // store high score
  useEffect(() => {
    const storedScore = localStorage.getItem('highScore');
    if (storedScore) {
      setHighScore(parseInt(storedScore));
    }
  }, []);

  // fetch pokemon according to difficulty
  useEffect(()=> {
    fetchMultiplePokemon(difficulty);
  }, [])

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

  // FUNCTIONS
  
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

  function handleCardClicks(id){
      if(clickedIds.includes(id)) {
        setGameResult('loss')
      } else {
        const newClicked = [...clickedIds, id];
        setClickedIds(newClicked);
        setScore(newClicked.length);

        if (newClicked.length === cards.length) {
          setGameResult('win');
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

  function resetGame() {
      setClickedIds([]);
      setScore(0);
      setGameResult(null);
      fetchMultiplePokemon(difficulty);
  }

  return (
     <div className='layout'>
      <Header score={score} highScore={highScore}/>
        {gameResult === 'win' && (<WinScreen score={score} onClick={resetGame}/>)}
        {gameResult === 'loss' && (<LossScreen score={score} highScore={highScore} difficulty={difficulty} onClick={resetGame}/>)}
      <Content 
        cards={cards}
        handleClick={handleCardClicks}
        isShuffling={isShuffling}
        />
      <Footer/>
    </div>
  )
}

export default App
