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

  // difficulty managment
  const difficultySettings = {
    easy: 8,
    normal: 12,
    hard: 16,
    custom: null // will use customValue
  };
  const [difficulty, setDifficulty] = useState('normal');
  const [customValue, setCustomValue] = useState(10);
  const [cardCount, setCardCount] = useState(difficultySettings[difficulty]);
  useEffect(()=> {
    if (difficulty !== 'custom') {
      setCardCount(difficultySettings[difficulty]);
    }
  }, [difficulty])

  // fetch pokemon according to difficulty
  useEffect(()=> {
    fetchMultiplePokemon(cardCount);
    setShowOptions(false);
  }, [cardCount])

  function applyDifficultySettings() {
    if (difficulty === 'custom') {
      setCardCount(customValue);
    } else {
      setCardCount(difficultySettings[difficulty]);
    }
    setShowOptions(false);
  }

  // card shuffling
  const [isShuffling, setIsShuffling] = useState(false);

  // store high score
  useEffect(() => {
    const storedScore = localStorage.getItem('highScore');
    if (storedScore) {
      setHighScore(parseInt(storedScore));
    }
  }, []);

  // options button
  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  }

  // theme management
  const [themeType, setTheme] = useState('water');
  const currentTheme = typeThemes[themeType];

  // used to synch button animations
  useEffect(() => {
    // remove the class first
    document.body.classList.remove("sync");
    // force a reflow so the browser notices the removal
    void document.body.offsetWidth;
    // add it back — this restarts the animation
    document.body.classList.add("sync");
  }, [themeType]);

  // read stored theme
  useEffect(() => {
    const storedTheme = localStorage.getItem('storedTheme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

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
      fetchMultiplePokemon(cardCount);
  }

  return (
     <div className='layout'>
      <Header 
        score={score} 
        highScore={highScore}
        toggleOptions={toggleOptions}
      />
      {gameResult === 'win' && (<WinScreen score={cardCount} onClick={resetGame}/>)}
      {gameResult === 'loss' && (<LossScreen score={score} highScore={highScore} difficulty={cardCount} onClick={resetGame}/>)}
      <Content 
        cards={cards}
        handleClick={handleCardClicks}
        isShuffling={isShuffling}
        showOptions={showOptions}
        themeVars ={[themeType, setTheme]}
        difficultyVars = {{difficulty, setDifficulty, customValue, setCustomValue, applyDifficultySettings}}
        />
      <Footer/>
    </div>
  )
}

export default App
