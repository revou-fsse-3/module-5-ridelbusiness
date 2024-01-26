import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import Button from '.';
import React from 'react';


describe('Unit test for Button Component', () => {

    const mocking = {
        onSubmit: jest.fn()
    }

    test('component Button should render correctly', () => {
        const document = render(<Button label={'Button testing'} onClick={mocking.onSubmit}/>);
        expect(document).toMatchSnapshot();


    })

    test('component Button should be able to click ', async () => {
        render(<Button label={'Button testing'} onClick={mocking.onSubmit}/>);
        const button = screen.getByText('Button testing')
        fireEvent.click(button);

        await waitFor(() => {
            expect(mocking.onSubmit).toHaveBeenCalledTimes(1);
        })

    })


   
})