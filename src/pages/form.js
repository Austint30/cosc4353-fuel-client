import React from "react";
import PageContent from 'components/page-content';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import useStatefulFetch from 'hooks/stateful-fetch';
import config from 'config';
import styles from './forms.module.css';

// Form library we could use: https://react-hook-form.com/

function FuelQuoteForm(){

  const { executeRequest, loading, error, called } = useStatefulFetch(
    config.serverUrl + '/test', {
    method: 'get'
  });

  function submitFuelQuoteForm(){
    // TODO implement upl   oad Form
    executeRequest();
  }

  return (
    <>
    <PageContent title='Fuel Quote Form' />
    <PageContent>
    <Form className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submitFuelQuoteForm();
      }}>
      <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='reqGallon'>
              <Form.Label>Gallons Request:</Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='userAddress'>
              <Form.Label>Delivery Address:</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='delivDate'>
              <Form.Label>Delivery Date:</Form.Label>
              <Form.Control type="date"/>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='suggPrice'>
              <Form.Label>Suggested Price/gallon:</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='total'>
              <Form.Label>Total:</Form.Label>
              <Form.Control type="text"/>
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

export default FuelQuoteForm;