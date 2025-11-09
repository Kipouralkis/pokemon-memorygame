import '../../styles/resultScreen.css'

function LossScreen(props){
    return(
        <div className="result-screen loss">
            <h2>You lost!</h2>
            <p>Better luck next time. 💀</p>
            <p>Current score: {props.score}/{props.difficulty}</p>
            <p>Best Score: {props.highScore}</p>
            <button onClick={props.onClick}>Try Again</button>
        </div>
    )
}

export default LossScreen;