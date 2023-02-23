import React, { useState } from "react";
import styles from './forms.moduke.css';
import { Form, Link } from 'react-router-dom';

function form() {
  const [val, setVal] = useState("");

  return (
    <form>
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
          />
        </label>
      </div>
      <div>
        <label>Delivery Address:</label>
      </div>
      <div>
        <label id="Deliv_Date">
          Delivery Date:
        </label>
        <input type="date" />
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
  );
}
export default form;