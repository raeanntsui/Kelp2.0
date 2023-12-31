// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import { NavLink } from "react-router-dom";

// function BusinessButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();
//   const sessionUser = useSelector((state) => state.session.user);
//   const businessOwner = sessionUser?.business_owner;
//   console.log("🚀🚀🚀🚀🚀🚀 ~ businessOwnerStatus:", businessOwner);

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     dispatch(logout());
//   };

//   const ulClassName = "business-dropdown" + (showMenu ? "" : " hidden");
//   const closeMenu = () => setShowMenu(false);

//   return (
//     <>
//       <button onClick={openMenu}>
//         Kelp for Business
//         <i class="fa-solid fa-caret-up fa-flip-vertical"></i>
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>
//               {businessOwner ? (
//                 <p>Business Account</p>
//               ) : (
//                 <p>Customer Account</p>
//               )}
//             </li>
//             <li>Hello, {user.username}!</li>
//             <li>{user.email}</li>
//             <li>
//               <NavLink exact to="/spots/new">
//                 Create a New Spot
//               </NavLink>
//             </li>
//             <li>
//               <button onClick={handleLogout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalButton
//               buttonText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />

//             <OpenModalButton
//               buttonText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default BusinessButton;
