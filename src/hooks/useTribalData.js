import tribalLands from '../data/tribal-geojson.json';
import { geoEquirectangular, geoPath } from 'd3-geo';

const strokeColor = "#333";
const tribalLandColor = "#FF6700";

const constructTribalLands = (mapSize) => {
    // this fitSize method doesn't exist ??
    // const projection = geoEquirectangular().fitSize(mapSize, geoJson as any);
    const projection = geoEquirectangular();
    const geoPathGenerator = geoPath().projection(projection);

    // TODO: add code to get names of tribal lands
    // const tribalLandsDict = 
    //     tribalLands.reduce( (a, c) => {
    //         return {
    //             ...a,
    //             [c.features.properties.namelsad]: c,
    //         };
    //     }, {});

    // geoJson.features.forEach( (feature) => {
    //     feature.properties = {
    //         ...feature.properties
    //     }
    // })

    const tribals = tribalLands.features.map((feature) => {
        let svgProps = {
            d: geoPathGenerator(feature) || '',
            stroke: strokeColor,
            fill: tribalLandColor,
        }

        return {
            svg: svgProps,
        }
    })

    return tribals;
}

const useTribalData = () => {
    return {
        constructTribalLands,
    }
}

export default useTribalData;