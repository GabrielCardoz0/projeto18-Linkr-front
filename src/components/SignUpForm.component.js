import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../assets/styles/SignUpForm.style";

export default function SignUpFormComponent() {

  const [userEmail, setUserEmail] = React.useState();
  const [userPassword, setUserPassword] = React.useState();
  const [username, setUsername] = React.useState();
  const [userPictureUrl, setUserPictureUrl] = React.useState();
  const [buttonOnOff, setButtonOnOff] = React.useState(true);
  const navigate = useNavigate();

  function submitFunction() {
    
    setButtonOnOff(false);

    const user = {
      username: username,
      email: userEmail,
      password: userPassword,
      pictureUrl: userPictureUrl,
    };

    axios.post(
      "https://projeto18-linkr-back.onrender.com/signup",
      user
    )
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      setButtonOnOff(true);

      if (err.response.status === 409) alert(err.response.data);

      if(err.response.status === 400) alert("dados preenchidos incorretamente");
    });
  };

  return (
    <SignUpForm>

      <div>

        <input
          placeholder="e-mail"
          type={"email"}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type={"password"}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <input
          placeholder="name"
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="picture url"
          type={"url"}
          onChange={(e) => setUserPictureUrl(e.target.value)}
        />

        {buttonOnOff ? (
          <input
            className="submitButton" type={"submit"} value="Sign Up" onClick={submitFunction} />
        ) : (
          <input className="blockedButton" type={"submit"} value="Sign Up" />
        )}

      </div>

      <span onClick={() => navigate("/sign-in")}>Switch back to log in</span>

    </SignUpForm>
  );
}
