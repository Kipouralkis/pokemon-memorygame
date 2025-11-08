import '../styles/footer.css'

function Footer() {
  return (
    <footer>
      <p>©{new Date().getFullYear()} <a href="https://github.com/kipouralkis" target="_blank" rel="noopener noreferrer">Kipouralkis</a></p>
      <p>Pokémon data provided by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
    </footer>
  );
}

export default Footer;
