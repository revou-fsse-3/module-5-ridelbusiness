import { GetServerSideProps } from 'next';
import Text from "../Text";
import Card from "../Card";
import { SubmitHandler, useForm } from "react-hook-form";


interface Pokemon {
    name: string;
}

interface Props {
    data: Pokemon[];
    
}

const PokemonList= ({ data }: Props) => {

    const {
        register, 
        handleSubmit,
    } = useForm<Pokemon>();

    return (
        <Card>
            <Text>Pokémon List</Text>
            <h1>Name</h1>
            <ul>
                {data.map(pokemon => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </Card>
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
