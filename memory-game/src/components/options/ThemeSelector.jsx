// import  '../../themes/typeThemes'
import typeThemes from '../../themes/typeThemes';
import '../../styles/options.css'

function ThemeSelector(props) {

    const themes = Object.keys(typeThemes);
    const themeType = props.themeVars[0]
    const setTheme = props.themeVars[1]

    console.log('typeThemes:', themeType);

    function handleThemeClick(theme){
        setTheme(theme);
        localStorage.setItem('storedTheme', theme);
    }

    return(
        <div>
            <h3>Select Theme</h3>
            <div className="option-group">
                <div className='theme-options'>
                    {themes.map((theme) => (
                        <button 
                            className={`theme-button ${theme === themeType ? 'active' : ''}`}
                            key={theme}
                            onClick={()=>handleThemeClick(theme)}>{theme}
                        </button>
                    ))}
                </div>
                {/* <label>Theme:</label>
                <select
                    value = {themeType} onChange={(e) => setTheme(e.target.value)}>
                        {themes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </option>
                        ))}
                </select> */}
            </div>
        </div>
    )
}

export default ThemeSelector;