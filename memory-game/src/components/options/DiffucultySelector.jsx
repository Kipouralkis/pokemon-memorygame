// function DifficultySelector(props){
//     return(
//         <div className="difficulty-selector">
//             <label>Difficulty: </label>
//             <select value={props.difficulty} onChange = {(e) => setDifficulty(e.target.value)}>
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//                 <option value="custom">Custom</option> 
//             </select>

//             {/* Custom Difficulty Input */}
//             {difficulty === 'custom' && (
//                 <div className="option-group">
//                     <label>Custom card count:</label>
//                     <input 
//                         type="number"
//                         min="4"
//                         max="100"
//                         value={customDifficulty}
//                         onChange={(e) => setCustomDifficulty}
//                     />
//                 </div>
//             )}
//         </div>
//     )
// }

function DifficultySelector(props){
    return(
        <div>
            <h3>Difficulty Selector</h3>
        </div>
    )
}

export default DifficultySelector;