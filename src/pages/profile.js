import React, { useEffect, useState } from "react";
// import {useDispatch} from "react-redux"; 
import PageContent from "components/page-content";
import { Form, Row, Col, Alert, Button, Container } from "react-bootstrap";
import useStatefulFetch from "hooks/stateful-fetch";
import { db, config, app } from 'config/firebase';
import styles from "./profile.module.css";
import usStates from "data/us-states";
import { useReducer } from "react";

import { getAuth } from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";

// TODO: Add client-side form validation
// Form library we could use: https://react-hook-form.com/

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.value }
    default:
      break;
  }
}

function Profile() {
  // const dispatch = useDispatch();
  // const [ formData, dispatch ] = useReducer(reducer, {});
  const [ formData, setFormData ] = useState({});
  const profile = useStatefulFetch(
    config.functionsUrl + "/user/profile",
    {
      executeOnMount: true,
      method: "get",
      headers: {
        Authorization: localStorage.getItem("idToken"),
      },
    }
  );

  useEffect(() => {
    if (profile.data && profile.loading === false){
      // dispatch({ type: 'UPDATE', value: profile.data });
    }
  }, [ profile.loading ])

  const saveProfile = useStatefulFetch(
    config.functionsUrl + "/user/profile",
    {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("idToken"),
      },
    }
  );

  async function submitProfile(name,address,city,state,zip) {
    const auth = getAuth(app)
    const user = auth.currentUser;
    
    const uid = user.uid;
    alert(uid);

    await setDoc(doc(db, "users", uid + "-" + new Date().toISOString()), { // "form" to "users" CHANGE
      fullName: name,
      address: address, // same as "address"
      city: city,
      state: state,
      zip: zip
    }).then(() => {
      alert("Document successfully written!");
    })
    .catch(error => {
        alert("Error writing document: ", error);
    });
    
    //executeRequest();
  }

  console.log('status', profile.resp)
  console.log("form data: ", formData)

  return (
    <>
      <PageContent title="Profile Management" />
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
      <PageContent title="Change Profile Info">
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            if(formData.fullName == null){
              submitProfile("Empty","Empty","Empty","Empty","Empty");
              alert("form data is not linked to values");
            }else{
              submitProfile(formData.fullName,formData.address1,formData.city,formData.state,formData.zipcode);
            }
          }}
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  disabled={profile.loading}
                  value={formData.fullName}
                  onChange = {(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="address"
                  disabled={profile.loading}
                  value={formData.address1}
                  onChange = {(e) => setFormData({...formData, address1: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="city"
                  disabled={profile.loading}
                  value={formData.city}
                  onChange = {(e) => setFormData({...formData, city: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="state">
                <Form.Label>State:</Form.Label>
                <Form.Select type="state" required disabled={profile.loading} value={formData.state}
                onChange = {(e) => setFormData({...formData, state: e.target.value})}>
                  <option value="">Choose a state</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group className="mb-3" controlId="zipcode">
                <Form.Label>Zip Code:</Form.Label>
                <Form.Control type="zip" disabled={profile.loading} value={formData.zipcode} 
                 onChange = {(e) => setFormData({...formData, zipcode: e.target.value})}/>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={!formData.fullName}>
            Save Changes
          </Button>
          {saveProfile.called && !saveProfile.error && !saveProfile.loading ? (
            <Alert className="mt-2" variant="success">
              Changes saved successfully! (doesn't acutally save yet...)
            </Alert>
          ) : null}
          {saveProfile.error ? (
            <Alert className="mt-2" variant="danger">
              Something went wrong. We're working on it!
            </Alert>
          ) : null}
        </Form>
      </PageContent>
    </>
  );
}

export default Profile;
