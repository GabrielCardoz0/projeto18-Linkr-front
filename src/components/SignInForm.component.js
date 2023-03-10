import { useContext, useState } from "react";
import SignUpForm from "../assets/styles/SignUpForm.style";
import { AuthContext } from "../providers/auth";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { API_URL } from "../constants/urls";


export default function SignInForm() {

    const { setToken, setUserimage } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [disabled, setDisabled] = useState(false);

    function handleForm(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function signIn(e){

        e.preventDefault();

        const promise = axios.post(`${API_URL}/signin`, form);

        setDisabled(true);

        promise.then((res) => {
            setToken(res.data.token);
            localStorage.setItem('userId' , res.data.userId);
			localStorage.setItem('token', JSON.stringify(res.data.token));

            if(res.data.userImage){
                setUserimage(res.data.userImage);
			    localStorage.setItem('userimage', JSON.stringify(res.data.userImage));
            };
            
            setDisabled(false);
            navigate("/timeline");
			
        });

        promise.catch((err) => {
            alert(err.response?.data);
            setDisabled(false);
        })
    }

    return(
        <SignUpForm>
                <form onSubmit={signIn}>
                    <input name="email" placeholder="e-mail" type={"email"} value={form.email} onChange={handleForm}/>
                    <input name="password" placeholder="password" type={"password"} value={form.password} onChange={handleForm}/>
                    {
                        disabled? (<button className="blockedButton" disabled >Log In</button>) :
                        (<button className="submitButton" type={"submit"} disabled={disabled}>Log In</button>) 
                    }
                </form>

                <RedirectTimeline>
                    <Link to="/sign-up">
                        First time? Create an account!
                    </Link>
                </RedirectTimeline>

        </SignUpForm>
    );
};

const RedirectTimeline = styled.div`
    color: #ffff;
    font-size:20px;
    font-weight:400;
    text-decoration:underline;
    font-family:'lato', sans-serif;

    a{
        color:#ffff
    }
`; 
