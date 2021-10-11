import React from "react";

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
      <div className="row">
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
            <a href="#" className="small-box-footer">
              {footer} <i className={footerIcon} />
            </a>
          </div>
        </div>
      </div>
      {/* /.row */}
    </>
  );
};

export default CardSection;
