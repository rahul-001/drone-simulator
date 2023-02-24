import { useState } from "react";
import clsx from "clsx";

const TakeUserInput = (props) => {
  const { path, setPath, handlePlayPause } = props;

  // For Validation Check (I have to add that validation for value check)
  const [error, setError] = useState({ lat: false, lng: false });

  const [coOrdinates, setCoOrdinates] = useState({
    lat: null,
    lng: null,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const temp = [...path, { ...coOrdinates, timestamp: Date.now() }];
    setPath(temp);
    handlePlayPause(false);
  };

  // this function is for read csv file
  const handlePathChange = (event) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const content = e.target.result;
      const lines = content.trim().split("\n");
      const path = [];

      for (let line of lines) {
        const [latitude, longitude] = line.split(",");
        path.push({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
      }
      console.log(path);

      setPath([...path]);
    };

    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="flex justify-between mx-32 w-full">
      <form
        class="bg-white rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleFormSubmit}
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="latitude"
          >
            Latitude:
          </label>
          <input
            class={clsx(
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
              error.lat ? "border-red" : ""
            )}
            id="latitude"
            type="text"
            req
            placeholder="Latitude"
            onChange={(e) =>
              setCoOrdinates({ ...coOrdinates, lat: Number(e.target.value) })
            }
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="longitude"
          >
            Longitude:
          </label>
          <input
            class={clsx(
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
              error.lng ? "border-red" : ""
            )}
            id="longitude"
            type="text"
            required
            placeholder="Longitude"
            onChange={(e) =>
              setCoOrdinates({ ...coOrdinates, lng: Number(e.target.value) })
            }
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="my-10">
        <label htmlFor="path">Path:</label>
        <input
          type="file"
          id="path"
          accept=".csv"
          onChange={handlePathChange}
        />
      </div>
    </div>
  );
};

export default TakeUserInput;
