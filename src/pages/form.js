import React, { useState } from "react";
import styles from './forms.module.css';

const Form = () =>  {
  const [val, setVal] = useState("");

  return (
    <div className="fqf">
    <h1>Fuel Quote Form</h1>
    <form className="Fuel_Quote_Form">
      <div>
        <label id="request">
          Gallons Requested: 
          <input
            type="number"
            pattern="[0-9]*"
            value={val}
            onChange={(e) =>
              setVal((v) => (e.target.validity.valid ? e.target.value : v))
            }
            placeholder="0"
            />
        </label>
      </div>
      <div>
        <label>Delivery Address: </label>
      </div>
      <div>
        <label id="Deliv_Date">
          Delivery Date: 
        </label>
        <input type="date"/>
      </div>
      <div>
        <label id="sug_pric">
          Suggested Price (per gallon): 
        </label>
      </div>
      <div>
        <label>
          Total Amount Due: 
        </label>
      </div>
      <button>Submit</button>
    </form>
    </div>
  );
}

export default Form;