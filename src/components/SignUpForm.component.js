import SignUpForm from "../assets/styles/SignUpForm.style";


export default function SignUpFormComponent(params) {
    return(
        <SignUpForm>
                <div>
                    <input placeholder="e-mail"/>
                    <input placeholder="password" type={"password"}/>
                    <input placeholder="name"/>
                    <input placeholder="picture url" type={"url"}/>
                    <input className="submitButton" type={"submit"} value="Sign Up"/>
                </div>

                <span>Switch back to log in</span>

        </SignUpForm>
    );
};
