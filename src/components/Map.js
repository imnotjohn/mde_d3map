/*

Based on Example File from:
https://github.com/DriLLFreAK100/coffee-region-taste-profile-map/tree/main/src

*/

import './Map.css';
import useCountiesData from '../hooks/useCountiesData';
import useTribalData from '../hooks/useTribalData';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

const WorldMap = () => {
  const [mapCounties, setMapCounties] = useState([]);
  const [mapTribals, setMapTribals] = useState([]);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const {constructCounties} = useCountiesData();
  const {constructTribalLands} = useTribalData();

  const mapSize = useMemo( () => {
    return [
      (width) || 0,
      (height) || 0
    ];
  }, [width, height])

  // TODO: mouseOver Handler

  useEffect(() => {
    const initialMapCounties = constructCounties(mapSize);
    const initialMapTribals = constructTribalLands(mapSize);
    setMapCounties(initialMapCounties);
    setMapTribals(initialMapTribals);
  }, [constructCounties, mapSize]);

  return (
    <div className="Map">
      <svg
        className="WorldMap--svg"
        width={mapSize[0]}
        height={mapSize[1]}
      >
        {mapCounties.map((county, index) => {
          return (
            <path
              id={index}
              key={index}
              {...county.svg}
              // onMouseMove={(e) => handleMouseOverCountry(e, country)}
              // onMouseLeave={() => handleMouseLeaveCountry(country)}
            />
          )
        })}
      </svg>

      <svg
        className="Tribals"
      >
        {mapTribals.map((tribe, index) => {
          return (
            <path
              id={index}
              key={index}
              {...tribe.svg}
            />
          )
        })}
      </svg>
    </div>
  );
}

export default WorldMap;