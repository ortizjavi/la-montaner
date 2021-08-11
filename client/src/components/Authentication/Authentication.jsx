import React from 'react';
import { useDispatch } from 'react-redux';
import './Authentication.css'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'
import { loginWithGoogle,loginWithFacebook } from "../../actions/types/authActions";

export default function ExternAuthentication() {
    const dispatch = useDispatch();

    const responseGoogle = (response) => {
        console.log(response)
        dispatch(loginWithGoogle(response.tokenId))
    }

    const responseFacebook = (response) => {
        console.log(response);
        console.log(response.accessToken);
        if (response.accessToken)
            dispatch(loginWithFacebook(response.accessToken))
    }

  
    return (
        <div>
            <br></br>
            <FacebookLogin
                appId="594981481671722"
                autoLoad={false}
                fields="name,email,picture"
                onClick={responseFacebook}
                callback={responseFacebook} />, 
            <GoogleLogin
                clientId="185256781467-8t9jr2l450gsbuev5d12bs463280d0c4.apps.googleusercontent.com"
                buttonText="Google Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
