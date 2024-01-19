import { GetServerSideProps } from 'next';

interface Pokemon {
    name: string;
}

interface Props {
    pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
    return (
        <div>
            <h1>Pokémon List</h1>
            <ul>
                {pokemons.map(pokemon => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await res.json();

    // Map through the results to get the Pokémon names
    const pokemons = data.results.map((pokemon: { name: string }) => ({
        name: pokemon.name
    }));

    return {
        props: { pokemons }, // will be passed to the page component as props
    };
};

export default PokemonList;
