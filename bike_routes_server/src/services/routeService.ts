import { Route, RouteDifficulty, RouteType, FileExtension } from "../types/route";

export const buildGeoJsonRouteObject = async (
  routeFile: Express.Multer.File,
  routeName: string,
  difficulty: RouteDifficulty,
  routeType: RouteType
): Promise<Route> => {
  // Parse and build the Route object
  const geoJsonFileContent = Buffer.from(routeFile.buffer); // Placeholder logic for conversion
  return {
    id: crypto.randomUUID(),
    visibleToAll: false, // Default to false until admin approval
    routeName,
    routeLength: 0, // Compute based on file parsing
    routeType,
    routeDifficulty: difficulty,
    origFileExtension: FileExtension.GeoJson, // Extract from file metadata if needed
    origFileContent: routeFile.buffer,
    geoJsonFileContent,
    startLat: 0, // Placeholder
    startLng: 0, // Placeholder
    endLat: 0, // Placeholder
    endLng: 0, // Placeholder
    minAltitude: 0, // Placeholder
    maxAltitude: 0, // Placeholder
    elevationGain: 0, // Placeholder
  };
};

