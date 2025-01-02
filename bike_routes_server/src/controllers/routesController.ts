import { Request, Response } from "express";
import { Route, RouteDifficulty, RouteType, FileExtension } from "../types/route";
import { RoutesRepository } from "../repositories/routesRepository";
import { Logger } from "../utils/logger";
import { buildGeoJsonRouteObject } from "../services/routeService";

export const uploadRouteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { routeName, difficulty, routeType } = req.body;

    if (!routeName) {
      throw new Error("Route name parameter is incorrect!");
    }

    // Check if the route already exists
    const routeExists = await RoutesRepository.exists((r) => r.routeName === routeName);
    if (routeExists) {
      res.status(405).json({ message: `Route with name ${routeName} already exists` });
      return;
    }

    // Validate uploaded file
    const routeFile = req.file;
    if (!routeFile) {
      res.status(400).json({ message: "Route file is required" });
      return;
    }

    // Build Route object
    const geoJsonRouteObject: Route = await buildGeoJsonRouteObject(
      routeFile,
      routeName,
      difficulty as RouteDifficulty,
      routeType as RouteType
    );

    // Save the route to the repository
    await RoutesRepository.add(geoJsonRouteObject);

    res.status(200).send();
  } catch (error: any) {
    Logger.logError(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const downloadRouteFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { routeName, fileExtension = FileExtension.GeoJson } = req.query;
  
      if (!routeName) {
        res.status(400).json({ message: "Route name is required" });
        return;
      }
  
      if (fileExtension === FileExtension.NotSupported) {
        res.status(404).json({ message: "Must provide a valid file extension" });
        return;
      }
  
      // Fetch the route object from the repository
      const routeObject: Route | undefined = await RoutesRepository.get((r) => r.routeName === routeName);
  
      if (!routeObject) {
        res.status(404).json({ message: `Route with name ${routeName} not found` });
        return;
      }
  
      // Handle file extension cases
      if (fileExtension === FileExtension.GeoJson) {
        getRouteAsGeoJsonFile(routeObject, res);
      } else {
        getRouteAsOriginalFile(routeObject, res);
      }
    } catch (error: any) {
      Logger.logError(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  export const getRouteAsGeoJsonFile = (route: Route, res: Response): void => {
    const fileName = `${route.routeName}.geojson`;
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/json");
    res.send(route.geoJsonFileContent); // Send GeoJSON file content
  };
  
  export const getRouteAsOriginalFile = (route: Route, res: Response): void => {
    const fileName = `${route.routeName}.${route.origFileExtension.toLowerCase()}`;
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(route.origFileContent); // Send original file content
  };