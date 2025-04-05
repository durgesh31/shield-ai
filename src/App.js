// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import DataTable from "../src/DataTable/DataTable";
// import Header from "../src/DataTable/Header";

// function App() {
//   return (
//     <div className="p-10">
//       <Header/>
//       <DataTable />
//     </div>
//   );
// }

// export default App;




import React, { useState } from "react";
import Header from "../src/DataTable/Header";
import Sidebar from "../src/DataTable/SideBar";
import DataTable from "../src/DataTable/DataTable";
import "./App.css";


// const App = () => {
//   const [activePage, setActivePage] = useState("dashboard");

//   return (
//     <div className="app-container">
//       {/* Sidebar with onSelect handler */}
//       <Sidebar onSelect={setActivePage} />
      
//       <div className="main-content">
//         <Header />
        
//         {/* Show TableComponent when "dashboard" is selected */}
//         {activePage === "dashboard" && <DataTable />}
        
//         {/* Placeholder content for other sections */}
//         {activePage !== "dashboard" && (
//           <h2>Welcome to {activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

// const App = () => {
//   const [activePage, setActivePage] = useState("dashboard");

//   return (
//     <div className="app-container">
//       {/* Sidebar (20%) */}
//       <Sidebar onSelect={setActivePage} />
      
//       {/* Main Content (80%) */}
//       <div className="main-content">
//         <Header />
//         {activePage === "dashboard" && <DataTable />}
//         {activePage !== "dashboard" && (
//           <h2>Welcome to {activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import TableComponent from "./TableComponent";
import FormComponent from "../src/DataTable/FormComponent";
// import "./App.css";

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar onSelect={setActivePage} />

      {/* Main Content */}
      <div className="main-content">
        <Header />

        {/* Button to toggle form */}
        {activePage === "dashboard" && (
          <div style={{display: 'flex',justifyContent: 'end',marginTop: '1%'}}>
          <button onClick={() => setShowForm(!showForm)} 
          style={{borderRadius: '8px', border: '2px solid #0070B9', background: '#0070B9',color: 'white', padding: '7px',fontWeight: 'bold',margin: '2px'}}>
            {showForm ? "⬅ Back to Report" : "Create Transaction"}
          </button>
          </div>
        )}

        {/* Show Table or Form based on state */}
        {activePage === "dashboard" && !showForm && <DataTable />}
        {showForm && <FormComponent onClose={() => setShowForm(false)} />}

        {activePage !== "dashboard" && (
          <h2>Welcome to {activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
        )}
      </div>
    </div>
  );
};

export default App;

