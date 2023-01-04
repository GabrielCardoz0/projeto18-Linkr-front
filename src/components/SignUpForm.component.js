import axios from "axios";
import React from "react";
import styled from "styled-components";
import SignUpForm from "../assets/styles/SignUpForm.style";

export default function SignUpFormComponent(params) {
  const [userEmail, setUserEmail] = React.useState();
  const [userPassword, setUserPassword] = React.useState();
  const [username, setUsername] = React.useState();
  const [userPictureUrl, setUserPictureUrl] = React.useState();

  function handleSubmit(e) {
    e.preventDefault();

    if (!userEmail || !userPassword || !username || !userPictureUrl) {
      alert("Campos incompletos, ou preenchidos incorretamente!");
    } else {
      alert("tudo certo!");
      const promise = axios.post("https://projeto18-linkr-back.onrender.com/signup");
      console.log(promise);
    }
  }

  return (
    <SignUpForm>
      <div>
        <input
          placeholder="e-mail"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type={"password"}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <input
          placeholder="name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="picture url"
          type={"url"}
          onChange={(e) => setUserPictureUrl(e.target.value)}
        />

        <input
          className="submitButton"
          type={"submit"}
          value="Sign Up"
          onClick={e => handleSubmit(e)}
        />

      </div>

      <span>Switch back to log in</span>
    </SignUpForm>
  );
}

// const SubmitButton = styled.button`
//   width: 430px;
//   height: 65px;
//   max-width: 100%;
//   border-radius: 6px;
//   margin-bottom: 13px;
//   font-size: 27px;
//   font-family: "Oswald", sans-serif;
//   font-weight: 700;
//   border: none;
//   background-color: #1877f2;
//   color: #fff;

//   @media (max-width: 800px) {
//     width: 330px;
//     height: 55px;
//     font-size: 22px;
//   }
// `;
