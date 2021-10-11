import React from 'react'

const CardSection = () => {
    return (
        <>
            {/* Small boxes (Stat box) */}
              <div className="row">
                <div className="col-lg-3 col-6">
                  {/* small box */}
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>150</h3>
                      <p>Clients</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <a href="#" className="small-box-footer">
                      More info <i className="fas fa-arrow-circle-right" />
                    </a>
                  </div>
                </div>
              </div>
              {/* /.row */}
        </>
    )
}

export default CardSection
