import React from "react";
import { Link } from "react-router-dom";

const CardSection = ({
  header,
  body,
  footer,
  boxProperty,
  bodyIcon,
  link,
  footerIcon,
}) => {
  return (
    <>
      {/* Small boxes (Stat box) */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className={boxProperty}>
            <div className="inner">
              <h3>{header}</h3>
              <p>{body}</p>
            </div>
            <div className="icon">
              <i className={bodyIcon} />
            </div>
            <Link to={link} className="small-box-footer">
              {footer} <i className={footerIcon} />
            </Link>
          </div>
        </div>
      {/* /.row */}
    </>
  );
};

CardSection.defaultProps = {
  header: "Give me header",
  body:"Give me body",
  footer: "Footer title",
  footerIcon: "fas fa-arrow-circle-right",
  boxProperty: "small-box bg-info",
  bodyIcon: "ion ion-bag",
  link: "https://google.com",
};

export default CardSection;
