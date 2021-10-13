import React from "react";
import { Link } from "react-router-dom";

const AuditFIleViewComponent = ({ image, name, date, download }) => {
  return (
    <div>
      <div class="card" style={{ width: "10rem" }}>
        <img class="card-img-top" src={image} alt="Card cap" />
        <div class="card-body">
          <h5 class="card-title" style={{ fontWeight: "bold" }}>
            {name}
          </h5>
          <p class="card-text">Uploaded date: {date}</p>
          <a
            href={download}
            class="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuditFIleViewComponent;
