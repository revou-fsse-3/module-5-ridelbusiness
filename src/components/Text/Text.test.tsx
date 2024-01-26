import { render, screen} from '@testing-library/react';
import Text from '.';
import React from 'react';


describe('Unit test for Text Component', () => {

    test('component should return text', () => {
        render(<Text>{'testing text'}</Text>);
        const element = screen.getByText('testing text');
        expect(element).toMatchSnapshot();


    })

    test('component should have a class', () => {
        const document = render(<Text className='testing-class'>{'testing text'}</Text>);
        expect(document).toMatchSnapshot();

    })
})