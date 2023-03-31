import PageContent from 'components/page-content';
import React, {useState, useEffect} from "react";
import {collection} from 'firebase/firestore'
import { db, config, app } from 'config/firebase';
import useStatefulFetch from 'hooks/stateful-fetch';
// import styles from './profile.module.css';
import { Container, Table } from 'react-bootstrap';
import {Form,Row,Col,Alert,Button} from 'react-bootstrap';
import { getAuth } from "firebase/auth";
import styles from './forms.module.css';
import {setDoc, getDocs,doc} from "firebase/firestore";


// TODO: Add client-side form validation
// Form library we could use: https://react-hook-form.com/


function Test() {
  const [ loadUserLoading, setLoadUserLoading ] = useState(null);
  const [ formData, setFormData ] = useState({price: 0}); // added, initializes total to 0 until changes are made
  const [ userData, setUserData ] = useState(null);
  const [ loadUserError, setLoadUserError ] = useState(null); // setDoc, Doc

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [forms, setForms] = useState([]);

  useEffect(()=> {
    getForms()
  }, [])

  useEffect(()=>{
    console.log(forms);
  }, [forms])


  function getForms(){
    const formCollectionRef = collection(db, 'form')
    getDocs(formCollectionRef).then(response => {
      const frms = response.docs.map(doc => ({data: doc.data(), id:doc.id}))
      setForms(frms) 
    }).catch(error => console.log(error.message))
  }


return(
  <>
  <div>
    <PageContent title='Fuel History Table' />
    <Container>
    <Table class = "center">
    <thead>
      <tr>
        <th><ul>Date</ul></th>
        <th><ul>Price per Gallon</ul></th>
        <th><ul>Gallons Requested</ul></th>
        <th><ul>Total</ul></th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td>{forms.map(form => <ul key={form.id}> {form.data.date}</ul>)}</td>
          <td>{forms.map(form => <ul key={form.id}> {form.data.price}</ul>)}</td>
          <td>{forms.map(form => <ul key={form.id}> {form.data.gallons}</ul>)}</td>
          <td>{forms.map(form => <ul key={form.id}> {form.data.total}</ul>)}</td>
        </tr>
    </tbody>
</Table>
</Container>
  </div>
  </>
);
};
export default Test;