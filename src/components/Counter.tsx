import React from "react";
import "../styles/Counter.css";
import { StationList } from "./StationList";
import type { RadioStation } from "../types/types";

interface CounterProps {
  stations: RadioStation[];
}

const Counter: React.FC<CounterProps> = (props) => {
  const { stations } = props;
  console.log("Stations################:", stations);

  // Speichere den Count-Wert im LocalStorage, wenn er sich ändert

  // Handler für die Auswahl einer Station
  const handleStationSelect = (station: RadioStation) => {
    // Hier kannst du die Logik für die Auswahl einer Station implementieren
    console.log("Ausgewählte Station:", station);
  };

  return (
    <div className="counter-component">
      <StationList stations={stations} onStationSelect={handleStationSelect} />
    </div>
  );
};

export default Counter;
