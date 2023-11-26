import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleLogInDemo = (e) => {
    e.preventDefault();
    const demoAcc = "spongebob@bb.io";
    const demoPassword = "password";
    return dispatch(login(demoAcc, demoPassword))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 id="login-h1">Log In</h1>

        <div className="modal-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        {/* </ul> */}
        <div className="email-pw">
          <div className="email">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login">
            <button type="submit">Log In</button>
          </div>
          <div className="demo-login">
            <button className="demo-button" onClick={handleLogInDemo}>
              Log in as Demo User
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
