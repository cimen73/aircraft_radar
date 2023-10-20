import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SideDetail = ({ id, setShowDetails }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
// We enabled the loading screen to appear by blanking out the details we would show every time the id changes.
    setDetails(null);
// settings we use when sending requests
  
    const options = {
      method: 'GET',
      url: 'https://flight-radar1.p.rapidapi.com/flights/detail',
      params: { flight: id },
      headers: {
        'X-RapidAPI-Key':
          '554b5c9a03msh4a008333f18e61ap1fb405jsnbaa4227abd20',
        'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com',
      },
    };

    // sending data pull request with option
    axios.request(options).then((res) => setDetails(res.data));
  }, [id]);

  console.log(details);

  return (
    <div className="detail">
      <div className="detail-inner">
        <p className="close-icon">
          <span onClick={() => setShowDetails(false)}>X</span>
        </p>
        {!details ? (
          <p>Loading....</p>
        ) : (
          <>
            <h2>{details?.aircraft?.model?.text}</h2>
            <p>{details?.aircraft?.model?.code}</p>
            <p>Queue Code: &nbsp; {details?.aircraft?.registration}</p>
            <img src={details?.aircraft?.images?.large[0]?.src} />
            <p>Company: &nbsp; {details?.airline?.short}</p>
            <p>
            Take-Off: &nbsp;
              <a href={details?.airport?.origin?.website}>
                {details?.airport?.origin.name}
              </a>
            </p>
            <p>
              Target: &nbsp;
              <a
                className="space"
                href={details?.airport?.destination?.website}
              >
                {details?.airport?.destination?.name}
              </a>
            </p>
            <p>State: &nbsp; {details?.status?.text}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SideDetail;