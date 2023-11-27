import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./Homepage.css";

function Homepage() {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    history.push(`/spots?search=${encodeURIComponent(searchInput)}`);
  };


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
      {/* <h1>HOMEPAGE</h1> */}
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search spots"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="frontpage-image">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgV4opNgXkJW3vJ1no6nvp8SCwtJuisrOjeU27QfOlESq9x-VwalxQZ1Is9wmfPClELNca7B5javckAuZodxRq4lzPW65SzPq7Kh_QVPWadFpTHSoYlgL9Z2DG8pcDYBFko1NrpcbdvC1_qTeMQABDEmPZdPL0gE8O-qsM_Ob93tZtSc0Fqyw/s1420/No_Weenies_Allowed_043.webp" />
      </div>
      <div className="recent-activity">
        <h1>Recent activity</h1>
      </div>
      <div className="spots-grid-2">
        {allSpots.map((spot) => (
          <div className="each-spots-grid-2" key={spot.id}>
            <div className="user-container">
              <div className="user-profile-picture">
                <i class="fa-solid fa-user"></i>
              </div>
              <div className="user-info">
                <p>Amy C.</p>
                <p>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
              </div>
            </div>
            <div className="recent-activity-business-name">
              <NavLink to={`/spots/${spot.id}`}>{spot.business_name}</NavLink>
            </div>
            <div className="each-spots-image-2">
              {/* <img src={spot.spot_image} /> */}
              <img src="https://img.buzzfeed.com/buzzfeed-static/static/2019-11/21/20/campaign_images/fbf76a44e63d/could-you-pass-an-interview-and-get-hired-at-the--2-2131-1574368600-0_dblbig.jpg?resize=1200:*" />
            </div>
            <div className="user-description">
              <p>
                Once upon a time, there was an ugly barnacle. So ugly that
                everyone died. The end. F is for friends who do stuff together U
                is for you and me N is for anywhere and anytime at all Down here
                in the deep blue sea.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
