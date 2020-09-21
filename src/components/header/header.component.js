import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

// 'mapstatetoprops' is to get your STATE from the redux store || 'mapdispatchtoprops' is to get the ACTIONS.
// "state" === the same value returned by a call to store.getState() due to connect(mapStateToProps)
// ref: https://react-redux.js.org/using-react-redux/connect-mapstate

// the first "currentUser" is the variable we define here and pass it to redux
// it then becomes the prop of <Header> component and get destructured at the top
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// 1) state.user => is calling the userReducer from root_reducer
// 2) userReducer is a function that returns a new object based on the action.type
// 3) Since here we called the userReducer without any action.type, it runs the default case
// 4) The default case returns the current state inside the userReducer ( either the initial state or the latest state after the last action was fired )

export default connect(mapStateToProps)(Header);
