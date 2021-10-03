/*

Based on Example File from:
https://github.com/DriLLFreAK100/coffee-region-taste-profile-map/tree/main/src

*/

import coffeeDistributor2019 from '../data/coffee-distributor-2019.json';
import geoJson from '../data/world.json';
import { geoEquirectangular, geoPath } from 'd3-geo';
// import { SVGProps } from 'react';

// export interface ICoffeeDistributor {
//   Rank: string;
//   Country: string;
//   Bags: string;
//   MetricTons: string;
//   Pounds: string;
// }

// export interface ITasteProfile {
//   summary: string;
// }

// export interface IMapCountry {
//   coffeeRegionName: string;
//   countryName: string;
//   continent: string;
//   isCoffeeRegion: boolean;
//   regionUn: string;
//   regionWb: string;
//   subRegion: string;
//   tasteProfile: ITasteProfile;
  // svg: SVGProps<SVGPathElement>;
// }

const defaultColor = '#ddd'
const africaColor = '#d3a564'
const africaColorAlt = '#ffd693';
const americaColor = '#af855f';
const americaColorAlt = '#e2b58d';
const asiaColor = '#563625';
const asiaColorAlt = '#84604d';
const exceptionCountryNames = {
  'Tanzania': 'United Republic of Tanzania',
  'Timor Leste': 'East Timor',
}
const exceptionRegionCountryNames = {
  'Yemen': { REGION_UN: 'Africa' },
}

const constructContries = (mapSize) => {
  // this fitSize method doesn't exist ??
  // const projection = geoEquirectangular().fitSize(mapSize, geoJson as any);
  const projection = geoEquirectangular();

  const geoPathGenerator = geoPath().projection(projection);

  const coffeeDistributorDict =
    coffeeDistributor2019.reduce((a, c) => {
      return {
        ...a,
        [exceptionCountryNames[c.Country] ?? c.Country]: c,
      };
    }, {});

  geoJson.features.forEach((feature) => {
    if (exceptionRegionCountryNames[feature.properties.ADMIN]) {
      feature.properties = {
        ...feature.properties,
        ...exceptionRegionCountryNames[feature.properties.ADMIN],
      }
    }
  })

  const countries = geoJson.features.map((feature) => {
    let svgProps = {
      d: geoPathGenerator(feature) || '',
      stroke: defaultColor,
      fill: defaultColor,
    }

    let isCoffeeRegion = false;

    if (coffeeDistributorDict[feature.properties.ADMIN]) {
      isCoffeeRegion = true;

      svgProps = {
        ...svgProps,
        stroke: getRegionColor(feature.properties.REGION_UN),
        fill: getRegionColor(feature.properties.REGION_UN),
      }
    }

    return {
      coffeeRegionName: getCoffeeRegionName(feature.properties.REGION_UN),
      continent: feature.properties.CONTINENT,
      countryName: feature.properties.ADMIN,
      isCoffeeRegion,
      regionUn: feature.properties.REGION_UN,
      regionWb: feature.properties.REGION_WB,
      subRegion: feature.properties.SUBREGION,
      tasteProfile: getRegionTasteProfile(feature.properties.REGION_UN),
      svg: svgProps,
    };
  });

  return countries;
}

const getCoffeeRegionName = (region) => {
  if (region.includes('America')) {
    return 'Latin America';
  } else if (region.includes('Africa')) {
    return 'Africa';
  } else if (region.includes('Asia')) {
    return 'Asia';
  }
  return null;
};

const getRegionColor = (region) => {
  if (region.includes('America')) {
    return americaColor;
  } else if (region.includes('Africa')) {
    return africaColor;
  } else if (region.includes('Asia')) {
    return asiaColor;
  }
  return defaultColor;
};

const getRegionHoverColor = (region) => {
  if (region.includes('America')) {
    return americaColorAlt;
  } else if (region.includes('Africa')) {
    return africaColorAlt;
  } else if (region.includes('Asia')) {
    return asiaColorAlt;
  }
  return defaultColor;
};

const getRegionTasteProfile = (region) => {
  if (region.includes('America')) {
    return {
      summary: 'Chocolate, Nutty, Caramel'
    };
  } else if (region.includes('Africa')) {
    return {
      summary: 'Fruity, Floral, Sweet'
    };
  } else if (region.includes('Asia')) {
    return {
      summary: 'Dark Chocolate, Earthy, Herbal, Spice'
    };
  }
  return null;
};

const isMatchCoffeeRegion = (source, target) => {
  return source.isCoffeeRegion
    && target.isCoffeeRegion
    && source.regionUn === target.regionUn;
}

const useCoffeeData = () => {
  return {
    constructContries,
    getCoffeeRegionName,
    getRegionColor,
    getRegionHoverColor,
    getRegionTasteProfile,
    isMatchCoffeeRegion,
  };
}

export default useCoffeeData;