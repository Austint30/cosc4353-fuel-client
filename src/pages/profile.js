import React from 'react';
import PageContent from 'components/page-content';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <PageContent title='Profile Management'>
            Change Profile<br/>
    <form>
        <div>
        <label>First Name  
        <input type="text" />
      </label>
        </div> 
      <div>
      <label>Last Name  
        <input type="text" />
      </label>
      </div>
      <div>
      <label>Address  
        <input type="text" />
      </label>
      </div>
      <div>
      <label>City  
        <input type="text" />
      </label>
      </div>
      <div>
      <label>State  
        <input type="text" />
      </label>
      </div>
      <div>
      <label>Zip Code  
        <input type="text" />
      </label>
      </div>
      
    </form>
    <Link className='btn btn-primary' to="/home">Save Changes (To Home )</Link>

        </PageContent>
    );
}


export default Profile;