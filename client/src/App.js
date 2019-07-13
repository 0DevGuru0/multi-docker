import React from 'react';
import './App.css';
import { Link,Route } from 'react-router-dom';
import otherPage from './otherPage';
import Home from './Fib';
// import VectorMap from './map/VectorMap/VectorMap'
import {VectorMap} from 'react-jvectormap';
function App() {
  const mapData = { CN: 100000, IN: 9900, SA: 86, EG: 70, SE: 0, FI: 0, FR: 0, US: 20 };
  const handleClick = (e, countryCode) => { console.log(countryCode); };
  return (
    <div className="App">
      <VectorMap map={"world_mill"} backgroundColor="transparent" zoomOnScroll={false} containerStyle={{ width: "100%", height: "520px" }} onRegionClick={handleClick} containerClassName="map" regionStyle={{ initial: { fill: "#e4e4e4", "fill-opacity": 0.9, stroke: "none", "stroke-width": 0, "stroke-opacity": 0 }, hover: { "fill-opacity": 0.8, cursor: "pointer" }, selected: { fill: "#2938bc" }, selectedHover: {} }} regionsSelectable={true} series={{ regions: [ { values: mapData, scale: ["#146804", "#ff0000"], normalizeFunction: "polynomial" } ] }} />
      <Route exact path="/" component={Home}/>
      <Route path="/news" component={otherPage}/>
    </div>
  );
}

export default App;
