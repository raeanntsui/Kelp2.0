import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessOwner, setBusinessOwner] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp({
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          business_owner: businessOwner,
          password,
        })
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 id="login-h1">Sign Up</h1>
      <div className="modal-errors">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </div>

      <div className="form-content">
        <div className="form-chunk">
          <label>Is this a business account?</label>
          <div className="sub-form-chunk">
            <p>Yes</p>
            <input
              type="checkbox"
              checked={businessOwner}
              onChange={() => setBusinessOwner((prev) => !prev)}
              // required
            />
          </div>
        </div>
        <div className="form-chunk">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-chunk">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-chunk">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-chunk">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-chunk">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-chunk">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="sign-up">
          <button className="sign-up-button" type="submit">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignupFormModal;
