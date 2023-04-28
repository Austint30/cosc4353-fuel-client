import PageContent from 'components/page-content';
import { useFuelQuoteHistory } from 'hooks/api/fuel';
import { Container, Spinner, Table } from 'react-bootstrap';


function Test() {

  const result = useFuelQuoteHistory();

  let forms = result.data || [];  

return(
  <>
  <div>
    <PageContent title='Fuel History Table' />
    <Container>
    <Table className = "center">
    <thead>
      <tr>
        <th><ul>Delivery Date</ul></th>
        <th><ul>Price per Gallon</ul></th>
        <th><ul>Gallons Requested</ul></th>
        <th><ul>Total Amount Due</ul></th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td>{forms.map(data => <ul key={data.id}> {data.deliveryDate}</ul>)}</td>
          <td>{forms.map(data => <ul key={data.id}> {data.suggestedPrice}</ul>)}</td>
          <td>{forms.map(data => <ul key={data.id}> {data.gallonsRequested}</ul>)}</td>
          <td>{forms.map(data => <ul key={data.id}> {data.totalAmountDue}</ul>)}</td>
        </tr>
    </tbody>
</Table>
{result.loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}><Spinner animation='border' /></div> : null}
</Container>
  </div>
  </>
);
};
export default Test;