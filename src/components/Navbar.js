import React, {useState} from 'react';
import {Container, Div} from '../assets/styles/navbarStyle';
import {FiChevronRight, FiChevronDown} from 'react-icons/fi'
import {Sidebar} from './Sidebar';
import logo from "../assets/images/linkr.png";
import { useAuth } from '../providers/auth';

function Navbar() {
    const { userimage } = useAuth();
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
                <img src={userimage} alt='perfil'/>
                
                {sidebar? <Sidebar active={setSidebar}/>
                :
                null}
            </Div>
        </Container>

    );
};

export default Navbar;