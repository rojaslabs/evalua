import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './views/Home';
import Main from './views/Main';
import SchoolDetails from './views/SchoolDetails';
import RegisterLogin from './views/RegisterLogin';
import ReviewForm from './components/ReviewForm';
import { UserProvider } from './contexts/userContext';
import Header from './components/Header';
import EvaluacionesPersonales from './views/EvaluacionesPersonales';
import ViewEditReview from './views/ViewEditReview';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <div className="header-container">
                <Header/>
          </div>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/search" element={<Main></Main>} />
            <Route path="/reviews/:id" element={<SchoolDetails/>} />
            <Route path="/create-review/:id" element={<ReviewForm/>} />
            <Route path="/registerLogin" element={<RegisterLogin></RegisterLogin>} />
            <Route path="/misevaluaciones" element={<EvaluacionesPersonales/>}/>
            <Route path="/editarevaluaciones/:id" element={<ViewEditReview/>}/>

          </Routes>
        </Router>
        <footer>
          Todos los derechos reservados © 2022
        </footer>
      </UserProvider>
    </div>
  );
}

export default App;
