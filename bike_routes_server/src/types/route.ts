export enum FileExtension {
    NotSupported = "NotSupported",
    Gpx = "Gpx",
    GeoJson = "GeoJson",
  }
  
  export enum RouteType {
    Mtb = "Mtb",
    Gravel = "Gravel",
    Road = "Road",
    Mixed = "Mixed",
  }
  
  export enum RouteDifficulty {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Proficient = "Proficient",
    Beast = "Beast",
  }
  
  export interface Route {
    id: string; // UUID
    visibleToAll: boolean;
    routeName: string;
    routeDescription?: string;
    author?: string;
    routeLength: number;
    routeType: RouteType;
    routeDifficulty: RouteDifficulty;
    origFileExtension: FileExtension;
    origFileContent: Buffer; // File content as a binary buffer
    geoJsonFileContent: Buffer; // GeoJSON file content
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    minAltitude: number;
    maxAltitude: number;
    elevationGain: number;
  }
  