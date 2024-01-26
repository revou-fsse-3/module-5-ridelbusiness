import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import React from 'react';
import PokemonList from '.';


describe("Pokemon List unit testing", () => {
    

    test('Pokemon render correctly', () => {
        render(<PokemonList data={[]}/>);
        
        const name = screen.getByText('Name');
        

        expect(name).toBeDefined();
        
        
    })

    test('Pokemon should render with props data', () => {
        const pokemons = [
            {
                
                name: 'Pikachu'
                
            }
        ]

        render(<PokemonList data={pokemons}/>)

        const name = screen.getByText('Name');
        
        expect(name).toBeDefined();

        pokemons.map((category) => {
    
            expect(category.name).toBeDefined()
            

        })
        
    })

    

    
})