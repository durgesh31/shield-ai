// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <ul className="nav flex-column">
//         <li className="nav-item">
//           <div>Dashboard</div>
//         </li>
//         <li className="nav-item">
//           <div className="nav-link" href="#">Invoices</div>
//         </li>
       
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="nav-link active" onClick={() => onSelect("dashboard")}>
            📊 Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => onSelect("transactions")}>
            📄 Transactions
          </button>
        </li>
        {/* <li className="nav-item">
          <button className="nav-link" onClick={() => onSelect("payments")}>
            💳 Payments
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => onSelect("settings")}>
            ⚙️ Settings
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
