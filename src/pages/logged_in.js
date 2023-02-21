import React from 'react';
import PageContent from '../components/page-content';
import { Link } from 'react-router-dom';

// title passed in as prop
// to change it, then you have to go to the component original

function LoggedIn() {
    return (
        <PageContent title='Log in successful!'>
            <img src='https://thumbs.dreamstime.com/b/birthday-cake-decorated-colorful-sprinkles-ten-candles-colorful-birthday-cake-sprinkles-ten-candles-blue-142412983.jpg' />
            <h2>You have successfully logged in, you may now edit your profile!</h2>
        </PageContent>
    );
}



export default LoggedIn;