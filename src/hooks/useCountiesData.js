import geoJson from '../data/us_counties.json';
import { geoEquirectangular, geoPath } from 'd3-geo';

const defaultColor = "#111";
const borderColor = "#333";
const tribalLandColor = "#FF6700";

// Build boundaries of US Counties
const constructCounties = (mapSize) => {
    // this fitSize method doesn't exist ??
    // const projection = geoEquirectangular().fitSize(mapSize, geoJson as any);
    const projection = geoEquirectangular();
    const geoPathGenerator = geoPath().projection(projection);

    const counties = geoJson.features.map((feature) => {
        let svgProps = {
            d: geoPathGenerator(feature) || '',
            stroke: borderColor,
            fill: defaultColor,
        }

        return {
            svg: svgProps,
        }
    })

    return counties;
}

const useCountiesData = () => {
    return {
        constructCounties,
    }
}

export default useCountiesData;