import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./Homepage.css";

function Homepage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);
  const allSpots = Object.values(spots);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  if (!allSpots || !allSpots.length) {
    return null;
  }
  //poo

  // const [currentImage, setCurrentImage] = useState[0];
  // const spotImages = [
  //   "https://static.wikia.nocookie.net/nickelodeon/images/7/77/KrustyKrabStock.png/revision/latest?cb=20230420021225",
  //   "https://static.wikia.nocookie.net/cartoons/images/0/09/The_Chum_Bucket.png/revision/latest?cb=20230225012708",
  //   "https://static.wikia.nocookie.net/spongebob/images/1/11/DinerStockArt.jpg/revision/latest?cb=20220925000341",
  //   "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftelegra.ph%2FName-of-the-restaurant-in-bikini-bottom-03-17&psig=AOvVaw38Rqwok5I7f79Bq4-NrDxa&ust=1701043131226000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjm686t4IIDFQAAAAAdAAAAABAn",
  //   "https://1.bp.blogspot.com/-fkkdBXrn7F8/YEVAvTldjWI/AAAAAAABdc0/ywT5hm_ZeBAY2HaGqQGC-beS3ARKl0ohgCNcBGAsYHQ/s1600/SpongeBob_SquarePants_Nickelodeon_Nick_Press_SBSP.jpg",
  //   "https://static.wikia.nocookie.net/spongebob/images/a/ac/SpongeBob%27sPlace.png/revision/latest?cb=20170328190546",
  // ];

  // const nextImage = () => {
  //   setCurrentImage((prev) => (prev + 1) % spotImages.length);
  // };

  // const prevImage = () => {
  //   setCurrentImage((prev) => prev - 1 + spotImages.length);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(nextImage, 3000);
  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <>
      <h1>HOMEPAGE</h1>
      {/* <div className="rotating-images">
        <img src={spotImages[currentImage]} />
      </div> */}
      <div className="spots-grid">
        {allSpots.map((spot) => (
          <div key={spot.id}>
            <h2>{spot.business_name}</h2>
            <p>user name here</p>
            <p>user review here</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
