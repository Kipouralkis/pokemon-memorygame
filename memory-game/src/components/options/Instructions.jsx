import { useState , useEffect} from 'react'
import '../../styles/instructions-modal.css'

function Instructions(){

    const [showInstructions, setShowInstructions] = useState(false);

    return(
        <>
        <button className="instructions-btn" onClick={()=> setShowInstructions(true)}><span>!</span></button>
        {showInstructions && (
            <div className="modal-overlay">
                <div className="pokeball-open">
                {/* Top half of Pokéball */}
                <div className="pokeball-top"></div>
                <div className="pokeball-button"></div>
                {/* Middle rectangular content box */}
                <div className="pokeball-content">
                    <h2>How to Play</h2>
                    <p>
                    Your mission: <strong>catch 'em all.. but only once!</strong><br />
                    Click each Pokémon card without repeating.<br />
                    One wrong move and it’s game over.<br />
                    Catch every unique Pokémon to win!
                    </p>
                    <button onClick={() => setShowInstructions(false)}>Close</button>
                </div>

                {/* Bottom half of Pokéball */}
                <div className="pokeball-bottom"></div>
                </div>
            </div>
        )}


        </>
    )
}

export default Instructions