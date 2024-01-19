import { Card, PokemonList } from "@/components"
import Layout from "@/layouts"
import { useState } from 'react';
import axios from 'axios';

import { GetServerSideProps } from 'next';

interface Pokemon {
    name: string;
}

interface Props {
    pokemons: Pokemon[];
}


interface Pokemons{
  id: number;
  pokemonName: string;
  

}

interface Props{
  posts: Pokemons[];
}


const Home: React.FC<Props> = ({ pokemons })  => {

  const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemonData, setPokemonData] = useState("");
    const [pokemonLocal, setPokemonLocal] = useState({
        name: "",
        species: "",
        img: "",
        hp: "",
        attack: "",
        defense: "",
        type: "",
    });

    const searchPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonData}`).then(
            (response)=>{
                console.log(response);
                setPokemonLocal({
                    name: pokemonData,
                    species: response.data.species.name,
                    img: response.data.sprites.front_default,
                    hp: response.data.stats[0].base_stat,
                    attack: response.data.stats[1].base_stat,
                    defense: response.data.stats[2].base_stat,
                    type: response.data.types[0].type.name,

                });
                setPokemonChosen(true);
        })

    }

    
  return (
    <Layout>
      
      <div className='w-full'>
            <div className='TitleSection'>
                <h1>Pokemon Stats</h1>
                <input type="text" 
                onChange={(event) => {
                    setPokemonData(event.target.value);
                }}/>
                <button onClick={searchPokemon}>Search Pokemon</button>
            </div>
            

            <Card>
                <div className='DisplaySection block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>{!pokemonChosen ? 
                    ( 
                      <>
                        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Please choose pokemon name</h1>
                        <Card>
                            <table>
                                <thead>
                                    <tr>
                                        <th><h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pokémon List</h1></th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                            
                                  <ul>
                                      {pokemons.map(pokemon => (
                                          <li className="text-gray-900 dark:text-white" key={pokemon.name}>{pokemon.name}</li>
                                      ))}
                                  </ul>
                              

                                    
                                </tbody>
                            </table>
                        </Card>
                      </>


                    ) : (
                        <>
                            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pokemonLocal.name}</h1>
                            <img src={pokemonLocal.img} />
                            <h3 className='font-normal text-gray-700 dark:text-gray-400'>Species: {pokemonLocal.species}</h3>
                            <h3 className='font-normal text-gray-700 dark:text-gray-400'>Type: {pokemonLocal.type}</h3>
                            <h4 className='font-normal text-gray-700 dark:text-gray-400'>Hp: {pokemonLocal.hp}</h4>
                            <h4 className='font-normal text-gray-700 dark:text-gray-400'>Attack: {pokemonLocal.attack}</h4>
                            <h4 className='font-normal text-gray-700 dark:text-gray-400'>Defense: {pokemonLocal.defense}</h4>
                        </>
                        
                    )}

                </div>
            </Card>
        </div>
        

    </Layout>

    
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=12');
  const data = await res.json();

  // Map through the results to get the Pokémon names
  const pokemons = data.results.map((pokemon: { name: string }) => ({
      name: pokemon.name
  }));

  return {
      props: { pokemons }, // will be passed to the page component as props
  };
};


export default Home



