import React, {useState, useEffect} from "react";
import PageContent from 'components/page-content';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import useStatefulFetch from 'hooks/stateful-fetch';
import { db, config, app } from 'config/firebase';
import styles from './forms.module.css';

import { getAuth } from "firebase/auth";
import {setDoc, getDoc,doc} from "firebase/firestore";


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
  const [ formData, setFormData ] = useState({price: 0}); // added, initializes total to 0 until changes are made
  const [ userData, setUserData ] = useState(null);
  const [ loadUserError, setLoadUserError ] = useState(null); // setDoc, Doc

  // accessing users information, aka. uid, the uid will be the documents name within the firebase storage
  // the uid document name, will allow us to know which user sumbitted which document formated within the firebase cloud: uid-date_of_form_submited
  const auth = getAuth(app)

  // if user == null
  // return error page or something

   // useEffect calls loadUser only when the component first appears on the screen.
   useEffect(() => {
    loadUser();
  }, []) // this and the useStatefulFetch needed to be above the error return, else it is hoisting

  // this creates the state that "Changes saved successfully!" or "Something went wrong. We're working on it!"
  // when user clicks the submit button
  const { executeRequest, loading, error, called } = useStatefulFetch(
    config.functionsUrl, {
    method: 'get'
  });

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

    setLoadUserError(null);
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

 



  // Syncs up the submit button with the firebase
  // Req: needs to link the values from form to variables within form
  async function submitFuelQuoteForm(){
    // this alert button is just in case the Document successfully written! and Document was not save, we are working on it! doesn't pop up
    // but we know the user clicked the sumbit button
    // can be removed once everything works
    console.log(formData)
    alert(uid);

    // address,date,gallons,price,total = sync it up with values, strings from form
    // doc(db aka. access to the database, collection, set_document_name)
    // alerts are set in order to notify you that it has been set, if it doesn't pop up it means something is wrong, aka. variables are not being but in
    await setDoc(doc(db, "form", uid + "-" + new Date().toISOString()),{
      address: formData.address,
      date: formData.date,
      gallons: formData.gallons,
      price: formData.price,
      total: formData.gallons * formData.price
    }).then(() => {
      alert("Document successfully written!");
    })
    .catch(error => {
        alert("Document was not save, we are working on it!", error);
    });

    executeRequest();
  }


  // The total var should be set to: (gallons * price)
  // variables here are commented out but can be changes, it is only a temp variable
  // they are used in conjuction with submitFuelQuoteForm() in order to set data to the firebase cloud
  return (
    <>
    <PageContent title='Fuel Quote Form' />
    {loadUserLoading ? <p>Loading</p> : null}
    <PageContent>
    <Form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submitFuelQuoteForm();
        }}
        >
      <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='reqGallon'>
              <Form.Label>Gallons Request:</Form.Label>
              <Form.Control
                type="number"
                //disabled={form.loading}
                value={formData.gallons}
                onChange={(value) => setFormData({ ...formData, gallons: value.target.value})}
              />
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='userAddress'>
              <Form.Label>Delivery Address:</Form.Label>
              <Form.Control
                type="text"
                // disabled={form.loading}
                value={formData.address} 
                onChange={(value) => { setFormData({ ...formData, address: value.target.value})}}
              //readOnly/>
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='delivDate'>
              <Form.Label>Delivery Date:</Form.Label>
              <Form.Control
                type="date"
                //disabled={form.loading}
                value={formData.date}
                onChange={(value) => setFormData({ ...formData, date: value.target.value})}       
              />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='suggPrice'>
              <Form.Label>Suggested Price/gallon:</Form.Label>
              <Form.Control
                type="text"
                //disabled={form.loading}
                value={formData.price}
                onChange={(value) => setFormData({ ...formData, price: value.target.value})}
              // readOnly/>
              />
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='total'>
              <Form.Label>Total:</Form.Label>
              <Form.Control
              type="text"
              //disabled={form.loading}
              value={formData.price * (formData.gallons || 0)}
              //onChange={(value) => setFormData({ ...formData, total: value})}             
              readOnly/>
            </Form.Group>
          </Col>
        </Row>
      <Button type='submit' variant='primary' disabled={loading}>
        Save Changes
      </Button>
      {called && !error && !loading ? (
        <Alert className='mt-2' variant='success'>
          Changes saved successfully!
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