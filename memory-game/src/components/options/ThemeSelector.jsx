// import  '../../themes/typeThemes'
import typeThemes from '../../themes/typeThemes';
import '../../styles/options.css'

function ThemeSelector(props) {

    const themes = Object.keys(typeThemes);
    const themeType = props.themeVars[0]
    const setTheme = props.themeVars[1]

    console.log('typeThemes:', themeType);

    return(
        <div>
            <h3>Theme Selector</h3>
            <div className="option-group">
                <div className='theme-options'>
                    {themes.map((theme) => (
                        <button 
                            className='theme-button'
                            key={theme}
                            onClick={()=>setTheme(theme)}>{theme}
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