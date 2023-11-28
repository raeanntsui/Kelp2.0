import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { getAllSpotsThunk } from "../../store/spots";
import "./Homepage.css";

function Homepage() {
  // const [searchInput, setSearchInput] = useState("");
  // const history = useHistory();

  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.allSpots);
  // console.log("🚀🚀🚀🚀🚀🚀 ~ spots:", spots);

  // const handleSearchInputChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();

  //   history.push(`/spots?search=${encodeURIComponent(searchInput)}`);
  // };

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
      {/* <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search spots"
          />
          <button type="submit">Search</button>
        </form>
      </div> */}
      {/* <div className="frontpage-image">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgV4opNgXkJW3vJ1no6nvp8SCwtJuisrOjeU27QfOlESq9x-VwalxQZ1Is9wmfPClELNca7B5javckAuZodxRq4lzPW65SzPq7Kh_QVPWadFpTHSoYlgL9Z2DG8pcDYBFko1NrpcbdvC1_qTeMQABDEmPZdPL0gE8O-qsM_Ob93tZtSc0Fqyw/s1420/No_Weenies_Allowed_043.webp" />
      </div> */}
      <div className="recent-activity">
        <h1>Recent activity</h1>
      </div>
      <div className="spots-grid-2">
        {allSpots.map((spot) => (
          <div className="each-spots-grid-2" key={spot.id}>
            <div className="user-container">
                {spot.review.length === 0 ? null : (
              <div className="user-profile-picture">
                  <i class="fa-solid fa-user"></i>
              </div>
                )}
              <div className="user-info">
                {spot.review.length === 0 ? (
                  <div>
                    <p>Be the first to leave a review!</p>
                  </div>
                ) : (
                  spot.review.slice(0, 1).map((review) => (
                    <div key={review.id}>
                      <p>{review.user.first_name}</p>
                      {/* Additional content related to the review */}
                    </div>
                  ))
                )}
                {/* <p>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </p> */}
              </div>
            </div>

            <div className="recent-activity-business-name">
              <NavLink to={`/spots/${spot.id}`}>{spot.business_name}</NavLink>
            </div>
            <div className="each-spots-image-2">
              {/* <img src={spot.spot_image} /> */}
              {spot.img_urls.length > 0 ? (
                spot.img_urls &&
                spot.img_urls[0] && (
                  <img src={spot.img_urls[0]} alt={`Spot Image 0`} />
                )
              ) : (
                <img
                  src="https://m.media-amazon.com/images/M/MV5BZjgzNGUyNDQtMWMxMS00Nzc0LWE1NWQtODRkYzZiMDNlODQ2XkEyXkFqcGdeQXVyMTM0Mjc1MDYw._V1_.jpg"
                  alt="default spot image"
                />
              )}
            </div>
            <div className="user-description">
              {spot.review.slice(0, 1).map((review) => (
                <div key={review.id}>
                  <p>{review.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
