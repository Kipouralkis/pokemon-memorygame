import '../../styles/options.css'
import DifficultySelector from './DiffucultySelector';
import ThemeSelector from './ThemeSelector';

function OptionsPanel(props){
    console.log(props.difficultyVars);
    return(
        <div className='options-panel'>
            <h1>Options Menu</h1>
            <hr style={{margin:"1rem"}}/>
             <DifficultySelector difficultyVars={props.difficultyVars} />
             <br></br>
            <ThemeSelector themeVars={props.themeVars}/>
        </div>
    )
}

export default OptionsPanel;