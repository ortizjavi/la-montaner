import React from 'react';
import './Authentication.css'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'

export default function ExternAuthentication() {

    const responseGoogle = (response) => {
        console.log(response)
    }

    const responseFacebook = (response) => {
        console.log(response);
    }
    return (
        <div>
            <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
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

