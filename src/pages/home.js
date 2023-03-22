import React from 'react';
import PageContent from 'components/page-content';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <PageContent title='Homepage'>
            Hello, world!<br/>
            <Link to="/login">Example link to login page</Link><br/>
            <Link className='btn btn-primary' to="/login">To login page (Button)</Link>
        </PageContent>
    );
}

export default Home;