import SignUpForm from "../assets/styles/SignUpForm.style";


export default function SignInForm(params) {
    return(
        <SignUpForm>
                <div>
                    <input placeholder="e-mail"/>
                    <input placeholder="password" type={"password"}/>
                    <input className="submitButton" type={"submit"} value="Log In"/>
                </div>

                <span>First time? Create an account!</span>

        </SignUpForm>
    );
};
