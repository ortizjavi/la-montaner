import React from "react";
import { useDispatch } from "react-redux";
import "./Authentication.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import { login } from "../../redux/actions/types/authActions";


export default function ExternAuthentication(props) {

  const googleBtnTitle = props.register ? 'Continuar con Google' 
                                        : 'Acceder con Google';
  const facebookBtnTitle = props.register ? 'Continuar con Facebook' 
                                        : 'Acceder con Facebook';
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    if (response.tokenId){
      dispatch(login({ google: response.tokenId }));
    }
  };

  const responseFacebook = (response) => {
    if (response.accessToken)
      dispatch(login({ facebook: response.accessToken }));
  };

  return (
    <div className="external-login-container">
      <br></br>
      <div className="external-login-button g-btn">
        <GoogleLogin
          clientId="185256781467-8t9jr2l450gsbuev5d12bs463280d0c4.apps.googleusercontent.com"
          buttonText={googleBtnTitle}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="external-login-button fb-btn">
        <FacebookIcon className="login-fb-icon" />
        <FacebookLogin
          textButton={facebookBtnTitle}
          appId="594981481671722"
          autoLoad={false}
          fields="name,email,picture"
          onClick={responseFacebook}
          callback={responseFacebook}
        />
      </div>
    </div>
  );
}
