import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ShowAllSpots from "./components/ShowAllSpots/ShowAllSpots";
import Homepage from "./components/Homepage/Homepage";
import ReviewForm from "./components/Reviews/form";
import ShowOneSpot from "./components/ShowOneSpot/ShowOneSpot";
import CreateSpotModal from "./components/CreateSpot";
import UpdateSpotPage from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/spots">
            <ShowAllSpots />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotModal />
          </Route>
          <Route exact path="/spots/:spotId">
            <ShowOneSpot />
          </Route>
          <Route exact path="/spots/:id/update">
            <UpdateSpotPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/reviews">
            <ReviewForm />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
