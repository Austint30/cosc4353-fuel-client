import React, {useState, useEffect} from "react";
import PageContent from 'components/page-content';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import useStatefulFetch from 'hooks/stateful-fetch';
import { db, config, app } from 'config/firebase';
import styles from './forms.module.css';

import { getAuth } from "firebase/auth";
import {setDoc, getDoc,doc} from "firebase/firestore";
import { useCalcFuelQuote, useSubmitFuelQuote } from "hooks/api/fuel";
import { FormControlWrapper, FormValidatorProvider } from "context/form-validation";
import { useUserProfile } from "hooks/api/user";


/*
Work-On:
1. async function submitFuelQuoteForm()
  - connect values with variables in the form, maybe with onChange
  - although there are tempvalues they are just there when I was testing it
  - meaning you change change anything
2. getDoc has been connected access the collection: user document: current user uid (aka. users.uid) and get the address field
  - place the address from the doc into the address variabel in the from
3. In the profile it says "You must log in before you can access this page!'"

      {profile.error ? (
        <Container>
          <Alert className="mt-3" variant="danger">
            {profile.resp.status === 403 ? (
              'You must log in before you can access this page!'
            ) : (
              'Something went wrong. We\'re working on it!'
            )}
          </Alert>
        </Container>
      ) : null}

      I think austin wants the user to login before having access to this page, and he used this. not really sure how it works. this isn't as important as the first too.
*/

function FuelQuoteForm(){
  
  // Gives access to Firebase Storage: setDoc, getDoc, doc
  const [ loadUserLoading, setLoadUserLoading ] = useState(null);
  const [ formData, setFormData ] = useState({}); // added, initializes total to 0 until changes are made
  const [ displayQuote, setDisplayQuote ] = useState(false);

  // accessing users information, aka. uid, the uid will be the documents name within the firebase storage
  // the uid document name, will allow us to know which user sumbitted which document formated within the firebase cloud: uid-date_of_form_submited
  const auth = getAuth(app)

  // if user == null
  // return error page or something

   // useEffect calls loadUser only when the component first appears on the screen.
   useEffect(() => {
    loadUser();
  }, []) // this and the useStatefulFetch needed to be above the error return, else it is hoisting

  const userProfileResult = useUserProfile();
  const [ submitFuelQuote, submitResult ] = useSubmitFuelQuote();
  const [ calcFuelQuote, calcResult ] = useCalcFuelQuote();

  let formValid = formData.gallonsRequested && formData.deliveryDate

  function handleGetQuoteClicked(){
    if (formValid){
      calcFuelQuote(formData.gallonsRequested);
      setDisplayQuote(true);
    }
  }

  function handleFormChange(fieldName, value){
    setDisplayQuote(false);
    setFormData({ ...formData, [fieldName]: value})
  }

  const user = auth.currentUser || JSON.parse(localStorage.getItem("user")); // conditional if, 
  if (!user) return <div>Error! Must log in</div>
  console.log("auth: ", auth)
  // currently email is not being used for anything within this js file, only uid is being used
  const email = user.email;
  const emailVerified = user?.emailVerified;
  const uid = user?.uid;
  
  // this function allows us to get the users collection
  // this is important for accessing the address, the address should be connected to the variable down at the bottom of the form
  // currently only the collection, document has been access, we have not been able to access the field
  // the field is important for obtianing the address
  async function loadUser(){

    setLoadUserLoading(true);

    // the only thing that needs to be changes in order to access the address
    // currently not really sure how to do it, website sources would be useful here
    if (user != null) { //if user exists

      //Getting users document
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      setLoadUserLoading(false);
    }

  }


  // The total var should be set to: (gallons * price)
  // variables here are commented out but can be changes, it is only a temp variable
  // they are used in conjuction with submitFuelQuoteForm() in order to set data to the firebase cloud
  return (
    <>
    <PageContent title='Fuel Quote Form' />
    {loadUserLoading ? <p>Loading</p> : null}
    <PageContent>
    <FormValidatorProvider validationData={{ errors: submitResult?.data?.errors }}>
      <Form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitFuelQuote(formData);
          }}
          >
        <Row>
            <Col sm={3}>
              <Form.Group className='mb-3' controlId='reqGallon'>
                <Form.Label>Gallons Requested:</Form.Label>
                <FormControlWrapper name='gallonsRequested'>
                  <Form.Control
                    type="number"
                    //disabled={form.loading}
                    value={formData.gallonsRequested}
                    onChange={(e) => handleFormChange('gallonsRequested', e.target.value)}
                  />
                </FormControlWrapper>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className='mb-3' controlId='delivDate'>
                <Form.Label>Delivery Date:</Form.Label>
                <FormControlWrapper name='deliveryDate'>
                  <Form.Control
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleFormChange('deliveryDate', e.target.value)}   
                  />
                </FormControlWrapper>
              </Form.Group>
            </Col>
            <Col sm={5}>
              <Form.Group className='mb-3' controlId='userAddress'>
                <Form.Label>Delivery Address:</Form.Label>
                <Form.Control
                  type="text"
                  disabled={true}
                  value={userProfileResult?.data?.address1} 
                //readOnly/>
                />
              </Form.Group>
            </Col>
            </Row>
            <Row>
              <Col>
                <Button variant='primary' disabled={submitResult.loading || !formValid} onClick={handleGetQuoteClicked}>
                  Get Quote
                </Button>
              </Col>
            </Row>
            {displayQuote ? (
              <>
              <Row>
                <Col sm={4}>
                  <Form.Group className='mb-3' controlId='suggPrice'>
                    <Form.Label>Suggested Price/gallon:</Form.Label>
                    <Form.Control
                      type="text"
                      value={calcResult?.data?.suggestedPrice}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col sm={3}>
                  <Form.Group className='mb-3' controlId='total'>
                    <Form.Label>Total:</Form.Label>
                    <Form.Control
                    type="text"
                    value={calcResult?.data?.totalAmountDue}
                    //onChange={(value) => setFormData({ ...formData, total: value})}             
                    readOnly/>
                  </Form.Group>
                </Col>
              </Row>
              <Button type='submit' variant='primary' disabled={submitResult.loading}>
                Submit
              </Button>
              </>
            ) : null}
        
        {submitResult.called && !submitResult.error && !submitResult.loading ? (
          <Alert className='mt-2' variant='success'>
            Changes saved successfully!
          </Alert>
        ) : null}
        {submitResult.error && submitResult.resp.status !== 400 ? (
          <Alert className='mt-2' variant='danger'>
            Something went wrong. We're working on it!
          </Alert>
        ) : null}
      </Form>
    </FormValidatorProvider>
    </PageContent>
    </>
  );
}

export default FuelQuoteForm;