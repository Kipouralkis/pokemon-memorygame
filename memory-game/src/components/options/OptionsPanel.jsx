import '../../styles/options.css'
import DifficultySelector from './DiffucultySelector';
import ThemeSelector from './ThemeSelector';

function OptionsPanel(props){
    return(
        <div className='options-panel'>
            <h1>Options Menu</h1>
            <DifficultySelector />
            <ThemeSelector themeVars={props.themeVars}/>
        </div>
    )
}

export default OptionsPanel;