import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/layout';
import AuthPage from './Components/AuthPage';
import AdminDashBoard from './Components/Pages/AdminDashBoard';
import { Route, Routes, Router } from 'react-router-dom'
import CandidatePage from './Components/Pages/CandidatePage';
import ResultPage from './Components/Pages/ResultPage';
import VotersPage from './Components/Pages/VotersPage';
import PartyPage from './Components/Pages/PartyPage';
import VotePage from './Components/Pages/VotePage';
import GenResultPage from './Components/Pages/GenResultPage';
/*import CitizenAuth from './Components/CitizenAuth';
import AdminAuth from './Components/AdminAuth';
import { Route, Routes, Router } from 'react-router-dom'
//import AuthPage from './Components/AuthPage';
//import AdminDashBoard from './Components/Pages/AdminDashBoard';
import Sidee from './Components/Sidee';
//import CandidatePage from './Components/Pages/CandidatePage';
//import ResultPage from './Components/Pages/ResultPage';
//import VotersPage from './Components/Pages/VotersPage';
//import PartyPage from './Components/Pages/PartyPage'
import VotePage from './Components/Pages/VotePage';
//import Votes from './Components/Votes';*/

function App() {

  const [user, setUser] = useState(null)
  const [citizen, setCitizen] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      console.log(userData)
    }
  }, []);

  useEffect(() => {
    const citizenToken = localStorage.getItem('Tokenn')
    if (citizenToken) {
      setToken(citizenToken)
      console.log(citizenToken)
    }
    const citizenData = localStorage.getItem('Citizen');
    if (citizenData) {
      setCitizen(JSON.parse(citizenData))
      console.log(citizenData)
    }
  }, [])

  return (
    <div>
      <Box>

        <Routes>
          <Route path='/' element={<AuthPage user={user} setUser={setUser} citizen={citizen} setCitizen={setCitizen} />} exact />
          <Route path='/DashBoard' element={<AdminDashBoard user={user} setUser={setUser} />} />
          <Route path='/Candidates' element={<CandidatePage user={user} setUser={setUser} />} />
          <Route path='/Results' element={<ResultPage user={user} setUser={setUser} />} />
          <Route path='/Result' element={<GenResultPage />} />
          <Route path='/Voters' element={<VotersPage user={user} setUser={setUser} />} />
          <Route path='/Party' element={<PartyPage user={user} setUser={setUser} />} />
          <Route path='/Votes' element={<VotePage user={user} setUser={setUser} citizen={citizen} setCitizen={setCitizen} token={token} setToken={setToken} />} />
        </Routes>
      </Box>
    </div>
  );
}

export default App;
