import React from 'react';
import './Login.css'
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    let navigate = useNavigate();

    const SIGN_UP = gql`
      mutation signup($name: String!, $password: String!, $email: String!) {
        signup(name: $name, password: $password, email: $email) {
          token
          user {
            id
          }
        }
      }
    `;

    const LOGIN = gql`
      mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
                user {
                    id
                    name
                }
        }
    }`;

    const [login] = useMutation(LOGIN,{
        // handle errors
        onError(err) {
            const error = `${err}`.split(':').reverse()[0];
            return toast.error(error, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        },
    });
    const [signUp] = useMutation(SIGN_UP);

    const signUpButtonClick = () => {
        const container = document.querySelector(".container-login");
        container.classList.add("sign-up-mode");
    }
    const signInButtonClick = () => {
        const container = document.querySelector(".container-login");
        container.classList.remove("sign-up-mode");
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const resetInputAndState = () => {
        setUsername('');
        setPassword('');
        setEmail('');
    }
    const notify = (text) => {
        toast.success(text, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // work
    const handleSignInSubmit = (e) => {
        e.preventDefault();
        login({ variables: { email: email, password: password } })
            .then(res => {
                if (res.data.login.token) {
                    localStorage.setItem("token", res.data.login.token)
                    localStorage.setItem("userName", res.data.login.user.name)
                    localStorage.setItem("userId", res.data.login.user.id)
                    resetInputAndState()
                    const push = () => {
                        return navigate("/risks");
                    }
                    notify(`Welcome ${res.data.login.user.name}`)
                    setTimeout(function () { push() }, 1500);
                }
            })
    }
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        signUp({ variables: { name: username, email: email, password: password } })
            .then(res => {
                if (res.data.signup.token) {
                    localStorage.setItem("token", res.data.access)
                    alert(res.data.signup.token)
                    resetInputAndState()
                    const push = () => {
                        return navigate("/risks");
                    }
                    notify("User created with success !");
                    setTimeout(function () { push() }, 1500);
                }
            });
    }

    return (
        <div className="container-login">
            <div className="forms-container">
                <div className="signin-signup">
                    {/* Sign IN */}
                    <form action="#" className="sign-in-form" onSubmit={handleSignInSubmit}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} required />
                        </div>
                        <input type="submit" value="Login" className="btn solid" />
                    </form>
                    {/* Sign UP */}
                    <form action="#" className="sign-up-form" onSubmit={handleSignUpSubmit}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Username" value={username} onChange={handleUsername} required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" placeholder="Password" value={password} onChange={handlePassword} required />
                        </div>
                        <input type="submit" className="btn" value="Sign up" />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Please create an account to have acces to the application
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={signUpButtonClick}>
                            Sign up
                        </button>
                    </div>
                    <img src="" className="image imagesign-up" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            You already have register an account please login
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={signInButtonClick}>
                            Sign in
                        </button>
                    </div>
                    <img src="" className="image imagesign-in" alt="" />
                </div>
            </div>
        </div>

    );

}

export default Login;