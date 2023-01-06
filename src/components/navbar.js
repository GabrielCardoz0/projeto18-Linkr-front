import React, {useState} from 'react';
import {Container, Div} from '../assets/styles/navbarStyle';
import {FiChevronRight, FiChevronDown} from 'react-icons/fi'
import {Sidebar} from './sidebar';


import logo from "../assets/images/linkr.png";

function Navbar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <Container>
            <img src={logo} alt="logo"/>
            <Div onClick={showSidebar}>
                {sidebar? <FiChevronDown></FiChevronDown>:<FiChevronRight ></FiChevronRight>
                }
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cosplay_of_Pikachu%2C_Fanime_2015_%2818125488996%29.jpg/260px-Cosplay_of_Pikachu%2C_Fanime_2015_%2818125488996%29.jpg' alt='perfil'/>
                
                {sidebar? <Sidebar active={setSidebar}/>
                :
                null}
            </Div>
        </Container>

    );
};

export default Navbar;