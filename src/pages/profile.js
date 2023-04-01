import { useRef, useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import PageContent from "components/page-content";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { db, config, app } from 'config/firebase';
import {auth} from '../config/firebase.js'
import {setDoc, setDocs, getDoc, getDocs,doc, getFirestore} from "firebase/firestore";
import {collection} from 'firebase/firestore';
import usStates from "data/us-states";
import { useUpdateUserProfile, useUserProfile } from "hooks/api/user";
import { Alert, Button, Col, Container, Table, Form, Row, Spinner } from "react-bootstrap";
import styles from "./profile.module.css";
import { FormControlWrapper, FormValidatorProvider } from "context/form-validation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ProfileContext} from '../context';


function Profile() {
  const [ _formData, setFormData ] = useState(null);
  const profile = useUserProfile();
  const [forms, setForms] = useState([]);

  const [singleDoc, setSingleDoc] = useState({});

  const auth = getAuth();
  const user = auth.currentUser;
  var uid = ""
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    uid = user.uid;
  };

  const db = getFirestore();
  const docRef = doc(db, "users", uid);

  async function fetchSingle(e){
    e.preventDefault();
    // console.log(onAuthStateChanged());
    try {
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
          setSingleDoc(docSnap.data());
          console.log(docSnap.data());
      } else {
          console.log("Document does not exist")
      }
  } catch(error) {
      console.log(error)
  }
  }

  function getForms(){
    const formCollectionRef = collection(db, 'form')
    getDocs(formCollectionRef).then(response => {
      const frms = response.docs.map(doc => ({data: doc.data(), id:doc.id}))
      setForms(frms) 
    }).catch(error => console.log(error.message))
  }

  useEffect(()=> {
    getForms()
  }, [])

  useEffect(()=>{
    console.log(forms);
  }, [forms])

  let formData = (_formData || profile.data) || {};

  const [ saveProfile, saveProfileStatus ] = useUpdateUserProfile();
  console.log(saveProfileStatus);
  return (
    <>
  <div>
    <button onClick={fetchSingle}>Click here to retrieve User Information</button>
  </div>
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
        <FormValidatorProvider validationData={{ errors: saveProfileStatus.data?.errors }}>
          <Form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile(formData);

            }}
          >
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>Full Name:</Form.Label>
                  <FormControlWrapper name='fullName'>
                    <Form.Control
                      disabled={profile.loading}
                      value={singleDoc.fullName}
                      onChange = {(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </FormControlWrapper>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="address1">
                  <Form.Label>Address 1:</Form.Label>
                  <FormControlWrapper name='address1'>
                    <Form.Control
                      type="address"
                      disabled={profile.loading}
                      value={singleDoc.address}
                      onChange = {(e) => setFormData({...formData, address1: e.target.value})}
                    />
                  </FormControlWrapper>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="address1">
                  <Form.Label>Address 2:</Form.Label>
                  <FormControlWrapper name='address2'>
                    <Form.Control
                      type="address"
                      disabled={profile.loading}
                      value={formData.address2}
                      onChange = {(e) => setFormData({...formData, address2: e.target.value})}
                    />
                  </FormControlWrapper>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City:</Form.Label>
                  <FormControlWrapper name='city'>
                    <Form.Control
                      type="city"
                      disabled={profile.loading}
                      value={singleDoc.city}
                      onChange = {(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </FormControlWrapper>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State:</Form.Label>
                  <FormControlWrapper name='state'>
                    <Form.Select type="state" required disabled={profile.loading} value={singleDoc.state}
                    onChange = {(e) => setFormData({...formData, state: e.target.value})}>
                      <option value="">Choose a state</option>
                      {usStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Form.Select>
                  </FormControlWrapper>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3" controlId="zip">
                  <Form.Label>Zip Code:</Form.Label>
                  <FormControlWrapper name='zip'>
                    <Form.Control type="zip" disabled={profile.loading} value={singleDoc.zip} 
                    onChange = {(e) => setFormData({...formData, zip: e.target.value})}/>
                  </FormControlWrapper>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" disabled={!_formData}>
              Save Changes
            </Button>
            {saveProfileStatus.called && !saveProfileStatus.error && !saveProfileStatus.loading ? (
              <Alert className="mt-2" variant="success">
                Changes saved successfully!
              </Alert>
            ) : null}
            {saveProfileStatus.error && saveProfileStatus.resp.status !== 400 ? (
              <Alert className="mt-2" variant="danger">
                Something went wrong. We're working on it!
              </Alert>
            ) : null}
            {profile.loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}><Spinner animation='border' /></div> : null}
          </Form>
        </FormValidatorProvider>
      </PageContent>
    </>
  );
}

export default Profile;
