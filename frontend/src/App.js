import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";

// import LoginFormContainer from './components/LoginForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <h1>hi</h1>
    // <Switch>
    //   <Route path="/login">
    //     <LoginFormPage />
    //   </Route>
    // </Switch>
  );
}

export default App;
