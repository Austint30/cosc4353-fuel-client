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

  return (
    <>
    <PageContent title='Profile Management' />
    <PageContent title='Change Profile Info'>
      <Form
        className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submitProfile();
      }}>
        <Row>
          <Col sm={6}>
            <Form.Group className='mb-3' controlId='firstName'>
              <Form.Label>First Name:</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className='mb-3' controlId='lastName'>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Address:</Form.Label>
              <Form.Control type='address' />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='city'>
              <Form.Label>City:</Form.Label>
              <Form.Control type='city' />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='state'>
              <Form.Label>State:</Form.Label>
              <Form.Control type='state' />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='zipcode'>
              <Form.Label>Zip Code:</Form.Label>
              <Form.Control type='zip' />
            </Form.Group>
          </Col>
        </Row>
      <Button type='submit' variant='primary' disabled={loading}>
        Save Changes
      </Button>
      {called && !error && !loading ? (
        <Alert className='mt-2' variant='success'>
          Changes saved successfully! (doesn't acutally save yet...)
        </Alert>
      ) : null}
      {error ? (
        <Alert className='mt-2' variant='danger'>
          Something went wrong. We're working on it!
        </Alert>
      ) : null}
      </Form>
    </PageContent>
    </>
  );
}


export default Profile;