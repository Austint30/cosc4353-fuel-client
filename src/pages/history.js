import PageContent from 'components/page-content';
import { config } from 'config/firebase';
import useStatefulFetch from 'hooks/stateful-fetch';
// import styles from './profile.module.css';
import { Container, Table } from 'react-bootstrap';

// TODO: Add client-side form validation
// Form library we could use: https://react-hook-form.com/

function Test() {

  const { executeRequest, loading, error, called } = useStatefulFetch(
    config.functionsUrl, {
    method: 'get'
  });


  
  return (
    <>
    <PageContent title='Fuel History Table' />
    <Container>
    <Table class = "center">
    <thead>
      <tr>
        <th>Date</th>
        <th>Price per Gallon</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>January 1, 2023</td>
            <td>4.49</td>
        </tr>
        <tr>
            <td>January 2, 2023</td>
            <td>4.54</td>
        </tr>
        <tr>
            <td>January 3, 2023</td>
            <td>4.59</td>
        </tr>
    </tbody>
</Table>
</Container>
    </>
  );
}


export default Test;