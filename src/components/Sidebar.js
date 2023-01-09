import React from 'react';
import{useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../providers/auth';
import { useContext } from 'react';
import { Container, Div} from '../assets/styles/sidebarStyle';
import { API_URL } from "../constants/urls";



export const Sidebar = ({ active }) => {

  const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

  const logOut = () => {
    
    axios.delete(
      `${API_URL}/logout`,
      {headers: { authorization: `Bearer ${token}`}}
    ).then(() => {
      setToken('');
      localStorage.clear();
      active(false);
      navigate("/");
    }).catch( () =>{
      alert("Não foi possivel fazer logout");
    })
  
  };

  const closeSidebar = () =>{
      active(false);
  };

  return (
    <>
      <Div sidebar={active} onClick={() => closeSidebar(active)}></Div>
      <Container sidebar={active}>
          <div onClick={() => logOut(active)}>
                <span>Logout</span>
          </div>
      </Container>
    </>
)
}
