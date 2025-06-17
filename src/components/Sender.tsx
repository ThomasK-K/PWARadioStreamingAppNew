import React, { useState } from "react";
import "../styles/Counter.css";
import { StationList } from "./StationList";
import { StreamList } from "./StreamList";
import type { RadioStation } from "../types/types";
var debug = require("debug")("sender");

interface CounterProps {
  stations: RadioStation[];
}

const Counter: React.FC<CounterProps> = (props) => {
  const { stations } = props;
  const [selectedStation, setSelectedStation] = useState<RadioStation | undefined>(undefined);
  
  debug("Stations: ", stations);

  // Handler für die Auswahl einer Station
  const handleStationSelect = (station: RadioStation) => {
    debug("Ausgewählte Station:", station);
    setSelectedStation(station);
  };

  // Handler für die Rückkehr zur Stationsliste
  const handleBackToStations = () => {
    setSelectedStation(undefined);
  };

  return (
    <div className="counter-component">
      {selectedStation ? (
        <StreamList station={selectedStation} onBack={handleBackToStations} />
      ) : (
        <StationList stations={stations} onStationSelect={handleStationSelect} />
      )}
    </div>
  );
};

export default Counter;
