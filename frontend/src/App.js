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
//           Learn React hi
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import './App.css';
import LoginPage from './components/login_page.js';
import { Container } from '@mui/material';

function App() {
  return (
    <Container sx={{height:'90vh', minWidth:"1200px"}}>
      <LoginPage/>
    </Container>
  );
}

export default App;
