import {
  GoogleMap,
  Marker,
  Polyline,
  LoadScript,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import TakeUserInput from "./userInput";

export const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const data = [];

const DromeSimulator = () => {
  const [path, setPath] = useState(data);

  const [polylinePath, setPolylinePath] = useState([]);
  const [markerPosition, setMarkerPosition] = useState({});
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onLoad = (polyline) => {
    setPolylinePath(polyline.getPath().getArray());
    console.log({ new: polyline.getPath().getArray(), poly: data });
  };

  useEffect(() => {
    if (
      isPlaying &&
      polylinePath.length > 1 &&
      animationStep < polylinePath.length
    ) {
      const interval = setInterval(() => {
        setMarkerPosition({
          lat: polylinePath[animationStep].lat,
          lng: polylinePath[animationStep].lng,
        });
        setAnimationStep(animationStep + 1);
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, animationStep]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const polylinePath = path.map((coordinate) => ({
      lat: coordinate.lat,
      lng: coordinate.lng,
    }));
    setPolylinePath(polylinePath);
  }, [path.length]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-semibold">Drone Simulator</p>
      <TakeUserInput
        path={path}
        setPath={setPath}
        handlePlayPause={handlePlayPause}
      />
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          zoom={8}
          center={{
            lat: data[animationStep]?.lat || 10.99835602,
            lng: data[animationStep]?.lng || 77.01502627,
          }}
          mapContainerStyle={{
            height: "50vh",
            width: "50vw",
          }}
        >
          <Polyline
            path={polylinePath}
            options={{ strokeColor: "#FF0000" }}
            onLoad={onLoad}
          />
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>
      <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default DromeSimulator;
