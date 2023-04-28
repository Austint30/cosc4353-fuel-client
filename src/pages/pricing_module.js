import React, { useState } from "react";
import PageContent from 'components/page-content';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import useStatefulFetch from 'hooks/stateful-fetch';
import { db, config, app } from 'config/firebase';
import styles from './forms.module.css';
import { getFirestore, collection, setDoc, doc, getDoc} from "firebase/firestore";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

function PricingModule(){

  const [ userLocationFactor, setUserLocationFactor ] = useState(null);
  const [ historyFactor, setHistoryFactor ] = useState(null);
  const [ gallonsRequestedFactor, setGallonsRequestedFactor ] = useState(null);
  const [ companyProfitFactor, setCompanyProfitFactor ] = useState(null);

  const [ userData, setUserData ] = useState(null);
  const [ loadUserError, setLoadUserError ] = useState(null);
  const [ loadUserLoading, setLoadUserLoading ] = useState(null);

  const auth = getAuth(app)
  const user = auth.currentUser;
  const email = user.email;
  const emailVerified = user.emailVerified;
  const uid = user.uid;

  async function loadUser(){
    setLoadUserError(null);
    setLoadUserLoading(true);
    if (user != null) {
      //Getting users address
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      setLoadUserLoading(false);
    }
  }
    // useEffect calls loadUser only when the component first appears on the screen.
    useEffect(() => {
      loadUser();
    }, [  ])

    const { executeRequest, loading, error, called } = useStatefulFetch(
      config.functionsUrl, {
      method: 'get'
    });

    async function submitPricingForm(){
      alert(uid);

      await setDoc(doc(db, "form", uid), {
        address: "TX",
        date: "03/20/2023",
        gallons: "1000",
        price: "2.99",
        total: "3.50"
      }).then(() => {
        alert("Document successfully written!");
      })
      .catch(error => {
          alert("Error writing document: ", error);
      });

      //executeRequest();
    }

  return (
    <>
    <PageContent title='Pricing Form' />
    {loadUserLoading ? <p>Loading</p> : null}
    <PageContent>
    <Form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        submitPricingForm();
        }}
        >
      <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='locationFactor'>
              <Form.Label>Location Factor: </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='historyFactor'>
              <Form.Label>History Factor:</Form.Label>
              <Form.Control type="number" readOnly />
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='gallonsRequested'>
              <Form.Label>Gallons Requested:</Form.Label>
              <Form.Control type="number" min={0}/>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={5}>
            <Form.Group className='mb-3' controlId='companyProfit'>
              <Form.Label>Company Profit Factor:</Form.Label>
              <Form.Control type="number" readOnly/>
            </Form.Group>
          </Col>
          <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='margin'>
              <Form.Label>Margin</Form.Label>
              <Form.Control type="number" readOnly/>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='currentPrice'>
              <Form.Label>Current Price</Form.Label>
              <Form.Control type="number" readOnly/>
            </Form.Group>
          </Col>
          </Row>
          <Row>
          <Col sm={3}>
            <Form.Group className='mb-3' controlId='suggestedPrice'>
              <Form.Label>Suggested Price</Form.Label>
              <Form.Control type="number" readOnly/>
            </Form.Group>
          </Col>
          </Row>
        </Row>
      
    </Form>
    </PageContent>
    </>
  );
}

export default PricingModule;