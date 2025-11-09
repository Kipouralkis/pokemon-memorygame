export async function fetchPokemon(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const name = data.name;
    const imgURL = data.sprites.other.dream_world.front_default;
    if (name && imgURL) {
      return { id, name, imgURL };
    } 
}

export function getUniqueRandomNumbers(num, max){
    const numbers = Array.from({ length: max }, (_, i) => i + 1);
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0,num);
}

export function shuffle(array){
    const copy = [...array];
    for (let i = copy.length - 1; i>0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy
}