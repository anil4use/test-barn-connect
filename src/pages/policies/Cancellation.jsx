import React from "react";
import "./css/cc.css";

const Cancellation = () => {
  return (
    <div className="terms--container">
      <h2>Cancellation Policy</h2>
      <div className="if-a-customer-container">
        <ul className="if-a-customer-changes-their-mi">
          <li className="if-a-customer">
          If a customer changes their mind and wants to cancel the order, then they have to contact our Customer Care executive. The cancellation will not be valid until it is confirmed by our respective department.
          </li>
        </ul>
        <p className="blank-line">&nbsp;</p>
        <ul className="if-a-customer-changes-their-mi">
          <li className="if-a-customer">
          Cancellation requests will be considered only if the product is not dispatched. Once the order is shipped, Customer cannot cancel the order.
          </li>
        </ul>
        <p className="blank-line">&nbsp;</p>
        <ul className="if-a-customer-changes-their-mi">
          <li>
          If the customer has placed an order through Online Payment and cancels the order, then we will process for a refund within 7 working days.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cancellation;
