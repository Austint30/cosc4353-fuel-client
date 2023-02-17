import React from 'react';
import PageContent from '../components/page-content';
import { Link } from 'react-router-dom';

function EditProfile() {
    return (
        <PageContent title='Edit Profile'>
            <div><Link to="/login">Example link to login page</Link></div>
            <div><Link className='btn btn-primary' to="/login">To login page (Button)</Link></div>
        </PageContent>
    );
}

export default EditProfile;