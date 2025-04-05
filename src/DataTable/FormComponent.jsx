import React, { useState } from "react";
import './DataTable.css';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    customer_id: "",
    merchant_id: "",
    transaction_amount: "",
    transaction_type: "Credit",
    mcc: "",
    currency: "INR",
    transaction_mode: "Credit",
    ip_address: "",
    location_id: "",
    terminal_id: "",
    transaction_flag: false
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      transaction_flag: !prevData.transaction_flag,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data JSON:", JSON.stringify(formData, null, 2));
    setShowPopup(true);
    //axios.post(',https://cors-anywhere.herokuapp.com/5000/post-transaction', 
      //axios.POST("https://cors-anywhere.herokuapp.com/http://localhost:5000/InvestigationCenter/controller/widgetcontainer/welcome")
      axios.post("http://localhost:5000/post-transaction",
      {
        "id" : 3,
        "amount" : 45000.75,
        "user" : "priyanka",
        "transactionType" : "paymentTransaction"
    }) 
      .then(response => { console.log('API RESPONSE',response.data); }) 
      .catch(error => { console.error('Error:', error); });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="containerForm">
        {/* Left Panel */}
        <div className="left-panel-form">
          <label>Customer ID:</label>
          <input
            type="text"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
          />

          <label>Merchant ID:</label>
          <input
            type="text"
            name="merchant_id"
            value={formData.merchant_id}
            onChange={handleChange}
          />

          <label>Transaction Amount:</label>
          <input
            type="text"
            name="transaction_amount"
            value={formData.transaction_amount}
            onChange={handleChange}
          />

          <label>Transaction Type:</label>
          <select
            name="transaction_type"
            value={formData.transaction_type}
            onChange={handleDropdownChange}
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>

          <label>MCC:</label>
          <input
            type="text"
            name="mcc"
            value={formData.mcc}
            onChange={handleChange}
          />

          <label>Transaction Flag:</label>
          <div className="toggle-wrapper">
            <div
              className={`toggle-container ${
                formData.transaction_flag ? "active" : ""
              }`}
              onClick={handleToggle}
            >
              <div className="toggle-slider" />
            </div>
            {/* <span className="toggle-label">
              {formData.transaction_flag ? "Enabled" : "Disabled"}
            </span> */}
          </div>
        </div>

        {/* Right Panel */}
        <div className="left-panel-form">
          <label>Currency:</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleDropdownChange}
          >
            <option value="AUD">AUD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>

          <label>Transaction Mode:</label>
          <select
            name="transaction_mode"
            value={formData.transaction_mode}
            onChange={handleDropdownChange}
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>

          <label>IP Address:</label>
          <input
            type="text"
            name="ip_address"
            value={formData.ip_address}
            onChange={handleChange}
          />

          <label>Location ID:</label>
          <input
            type="text"
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
          />

          <label>Terminal ID:</label>
          <input
            type="text"
            name="terminal_id"
            value={formData.terminal_id}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1%",
          marginRight: "5%",
        }}
      >
        <button
          type="submit"
          className="submitButtonStyle"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>✅ Form Submitted Successfully!</p>
            <button
              className="popupCloseButton"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
