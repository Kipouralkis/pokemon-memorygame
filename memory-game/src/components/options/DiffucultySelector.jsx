import { useState , useEffect} from 'react'
import '../../styles/options.css'

function DifficultySelector(props){
    const difficulties = ['easy', 'normal', 'hard', 'custom'];
    const difficulty = props.difficultyVars.difficulty;
    const setDifficulty = props.difficultyVars.setDifficulty;
    const customValue = props.difficultyVars.customValue;
    const setCustomValue = props.difficultyVars.setCustomValue;
    const applyDifficultySettings = props.difficultyVars.applyDifficultySettings;

    const [showCustom, setShowCustom] = useState(false);

    function handleDifficultyClick(level){
        if(level === 'custom'){
            setShowCustom((prev) => !prev);
        }
    }

    return(
        <div className="difficulty-selector">
            <h3>Select Difficulty</h3>
            <div className="difficulty-options">
                {difficulties.map((level) => (
                    <button
                        key={level}
                        className={`difficulty-button ${difficulty === level ? 'active' : ''}`}
                        onClick={() => {setDifficulty(level);
                            handleDifficultyClick(level);
                        }}>
                        {level}
                    </button>
                )) }
                {showCustom && (
                <div className="custom-input">
                    <label htmlFor="cardRange">Custom Card Count: {customValue}</label>
                    <input 
                        id='cardRange'
                        type="range"
                        min="4"
                        max="100"
                        value={customValue}
                        onChange={(e) => setCustomValue(Number(e.target.value))}
                    />
                    <button
                        className='apply-button'
                        onClick={applyDifficultySettings}>Apply</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default DifficultySelector;