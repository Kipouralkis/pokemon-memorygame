import '../../styles/resultScreen.css'

function WinScreen(props) {
    return (
        <div className="result-screen win">
            <h2>You won!</h2>
            <p>You caught them all!!</p>
            <p>Difficulty: {props.score}</p>
            <button onClick={props.onClick}>Play Again</button>
        </div>
    )
}

export default WinScreen;