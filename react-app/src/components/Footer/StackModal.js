import React, { useState } from "react";


function StackModal() {
  return (
    <div id="about-kelp-div">
      <h1>Tools Used for this Project</h1>
      <div className="stack-container">
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://www.svgrepo.com/show/349419/javascript.svg"
          ></img>
          <p>JavaScript</p>
        </div>
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://www.svgrepo.com/show/452091/python.svg"
          ></img>
          <p>Python</p>
        </div>
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://www.svgrepo.com/show/358128/react.svg"
          ></img>
          <p>React.js</p>
        </div>
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://cdn.worldvectorlogo.com/logos/redux.svg"
          ></img>
          <p>Redux</p>
        </div>
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://www.svgrepo.com/show/473611/flask.svg"
          ></img>
          <p>Flask</p>
        </div>
        <div className="one-stack">
          <img
            className="stack-img"
            src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
          ></img>
          <p>PostgreSQL</p>
        </div>
      </div>
    </div>
  );
}

export default StackModal;
