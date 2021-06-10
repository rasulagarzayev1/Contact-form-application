import React, { useState } from "react";

import "../../assets/scss/style.scss";

const AddressDetail = () => {
  return (
    <div className="addressDetailsPart">
      <div className="mediaEnquiries">
        <p>Media enquiries:</p>
        <a href="press@modularbank.co">press@modularbank.co</a>
      </div>
      <div className="careerQuestions">
        <p>Career questions:</p>
        <a href="careers@modularbank.co">careers@modularbank.co</a>
      </div>
      <div className="offices">
        <address>
          <span className="adr1">
            <span>Tallinn, Estonia </span>
            <br />
            <span className="locality">Vabaduse Workland </span>
            <br />
            <span className="postal-code">Pärnu mnt 12, 10146 </span>
            <br />
          </span>
        </address>
        <address>
          <span className="adr2">
            <span>Berlin, Germany </span>
            <br />
            <span className="locality">
              Bikini Berlin, Scaling Spaces, 2.OG
            </span>
            <br />
            <span className="postal-code">Budapester Str. 46 </span>
            <br />
            <span>10787 Berlin</span>
            <br />
          </span>
        </address>
      </div>
    </div>
  );
};

export default AddressDetail;
