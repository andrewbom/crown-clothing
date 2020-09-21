import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // "setCurrentUser" is the prop that we created during mapDispatchToProps() at the bottom of the code
    // Since this is class base component, we cannot destructure it like the functional component e.g. const Header = ({ currentUser }) => (... some codes)
    // to define its own variable, we need to use this.props
    const { setCurrentUser } = this.props;
    // console.log(this);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

// 'mapdispatchtoprops' is to get the ACTIONS || 'mapstatetoprops' is to get your STATE from the redux store.
// the first "setCurrentUser" is the function we define here and pass it to redux
// it then becomes the prop of <App> component and get called in componentDidMount()
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change.
// With React Redux, your components never access the store directly - connect does it for you.
// ref: https://react-redux.js.org/using-react-redux/connect-mapdispatch

export default connect(null, mapDispatchToProps)(App);
