import React, { useState } from "react";
import styles from './forms.moduke.css';
import { form, Link } from 'react-router-dom';

function form() {
  const [val, setVal] = useState("");

  return (
    <form>
      <div>
        <label form="gallon_req">
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
        <label form="Deliv_Add">Delivery Address:</label>
      </div>
      <div>
        <label form="Deliv_Date" id="Deliv_Date">
          Delivery Date:
        </label>
        <input type="date" />
      </div>
      <div>
        <label form="sug_price" id="sug_pric">
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