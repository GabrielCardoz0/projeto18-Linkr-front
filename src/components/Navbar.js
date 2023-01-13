import React, {useState} from 'react';
import {Container, Div} from '../assets/styles/navbarStyle';
import {FiChevronRight, FiChevronDown} from 'react-icons/fi'
import {Sidebar} from './Sidebar';
import logo from "../assets/images/linkr.png";
import { useAuth } from '../providers/auth';
import styled from 'styled-components';
import { searchColor, usersColor } from '../constants/colors';
import { baseFont } from '../constants/fonts';
import {AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import swal from 'sweetalert';
import { DebounceInput } from 'react-debounce-input';
import UserCardSearch from './UserCardSearch';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const { userimage } = useAuth();
    const [sidebar, setSidebar] = useState(false);
    const [results, setResults] = useState(false);
    const navigate = useNavigate();

    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    const { token } = useAuth();
    
    const [form, setForm] = useState({
		username: '',
	});
    const [users, setUsers] = useState({})

    function fillForm(e) {
        const { name, value } = e.target;
        const formContent = { ...form, [name]: value };
        setForm(formContent);
        
        if (formContent.username.length >= 3){
            searchUsernames()
        } else {
            setResults(false)
        }
    }

    function searchUsernames() {
        
        const URLsearch = process.env.REACT_APP_API_BASE_URL + '/usersearch/' + form.username;
        console.log(URLsearch)
        const promise = axios.get(URLsearch, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        promise.then((res) => {
        setUsers(res.data);
        setResults(true);
        console.log(res.data)
        });

        promise.catch((err) => {
        swal({
            title: "Houve um erro ao pesquisar por usuários",
        });
            });
  }

    
    return (
        <Container>
            <img src={logo} alt="logo" onClick={()=>{navigate("/timeline")}} style={{cursor: 'pointer'}}/>
            <InputContainer>
                <DebounceInput
                debounceTimeout={300}
                placeholder={"Search for people"}
                name="username"
                value={form.username}
                onChange={fillForm}
                type="text"
                element={InputSearch}
                />
                <IconContainer>
                    <AiOutlineSearch style={{color: 'gray', height: '22px', width: '22px'}}/>
                </IconContainer>
                { results &&
            <ResultsContainer>
                {users.followedUsers.map((user) => <UserCardSearch key={user.id} user={user} following={true}></UserCardSearch>)}
                {users.OtherUsers.map((user) => <UserCardSearch key={user.id} user={user} following={false}></UserCardSearch>)}
            </ResultsContainer>
            
            }
            </InputContainer>
           
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

const InputSearch = styled.input`
    box-sizing: border-box;
    width: 563px;
    height: 45px;
    background: white;
    border-radius: 8px;
    font-family: ${baseFont};
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: ${usersColor};
    padding: 17px;
    ::placeholder{
        color: ${searchColor};
    }
    @media (max-width: 800px) {
        width: 300px;
    }
`
const InputContainer = styled.div`
    position: relative;
`
const IconContainer = styled.div`
    position: absolute;
    right: 17px;
    bottom: 8px;
`
const ResultsContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    width: 563px;
    top: 45px;
    background: #E7E7E7;
    border-radius: 8px;

    @media (max-width: 800px) {
        width: 300px;
    }
`