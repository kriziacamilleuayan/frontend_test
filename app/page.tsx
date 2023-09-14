import styles from "./page.module.css";
import Gallery from "./gallery";
import { v4 as uuidv4 } from 'uuid';

async function getData(url: string) {
  const res = await fetch(url)
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

type pokemonType = {name: string, url: string};
type pokemonTypesType = {type: {name: string}};
type pokemonStatsType = {base_stat: number, stat: {name: string}};

const usersAPI = "https://jsonplaceholder.typicode.com/users";
const pokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

export default async function Home() {
  const users = await getData(usersAPI);
  const pokemons = await getData(pokemonAPI);
  const pokemonData = await Promise.all(pokemons.results.map(async(item: pokemonType) => {
    const pokemon = await getData(item.url);
    return {
      "id": uuidv4(),
      "isPokemon": true,
      "name": pokemon.name,
      "height": pokemon.height,
      "weight": pokemon.weight,
      "baseExperience": pokemon.base_experience,
      "image": pokemon.sprites.front_default,
      "stats" : pokemon.stats.map((item2: pokemonStatsType) => {
        return {name: item2.stat.name, value: item2.base_stat}
      }),
      "types": pokemon.types.map((item2: pokemonTypesType) => item2.type.name),
    };
  }));
  
  return (
    <main className={styles.main}>
      <Gallery users={[...users, ...pokemonData]}/>
    </main>
  );
}
