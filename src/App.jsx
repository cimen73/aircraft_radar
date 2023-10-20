import { useEffect, useState } from 'react';
import ListView from './components/ListView';
import MapView from './components/MapView';
import axios from 'axios';
import { getFlights } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  //Should we print the screen map component? We keep the state of the question.
  const [showMapView, setShowMapView] = useState(true);

  useEffect(() => {
    // Retrieve flight data and transfer to store.
    dispatch(getFlights());
  }, []);

  return (
    <>
      {/* header  */}
      <header>
        <img src="src/foto.png" />
        <div class="contain"><div> <img class="main"src="https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png" /></div>
       <div><h2 class="main">FLIGHT RADAR</h2></div></div>
       
        
      </header>

      <div className="view-buttons">
        <button
          className={`${showMapView && 'active'}`}
          onClick={() => setShowMapView(true)}
        >
       Map View
        </button>
        <button
          className={`${!showMapView && 'active'}`}
          onClick={() => setShowMapView(false)}
        >
          List View
        </button>
      </div>
      {/* Deciding which component to screen print*/}
      {showMapView ? <MapView /> : <ListView />}
    </>
  );
}

export default App;