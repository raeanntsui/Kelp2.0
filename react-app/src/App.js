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
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);

  const imageList = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgV4opNgXkJW3vJ1no6nvp8SCwtJuisrOjeU27QfOlESq9x-VwalxQZ1Is9wmfPClELNca7B5javckAuZodxRq4lzPW65SzPq7Kh_QVPWadFpTHSoYlgL9Z2DG8pcDYBFko1NrpcbdvC1_qTeMQABDEmPZdPL0gE8O-qsM_Ob93tZtSc0Fqyw/s1420/No_Weenies_Allowed_043.webp",
    "https://i.imgur.com/gvMDuOh.png",
    "https://i.imgur.com/uz1vEb5.png",
    "https://i.imgur.com/S0NCG15.png"
  ];

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));

    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage % imageList.length) + 1);
    }, 3000);

    return () => clearInterval(interval);

  }, [dispatch]);

  return (
    <>
      {location.pathname === "/" && (
        <div className="overlay"></div>
      )}
      <Navigation isLoaded={isLoaded} />

      {location.pathname === "/" && (
        <div className="frontpage-image">
          <img
            src={imageList[currentImage - 1]}
            alt={`Frontpage Image ${currentImage}`}
          />
        </div>
      )}
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
        </Switch>
      )}
    </>
  );
}

export default App;
