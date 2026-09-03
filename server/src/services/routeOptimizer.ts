import { RoutePoint, OptimizedRoute, RouteStop } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
};

export const optimizeRoute = (points: RoutePoint[], vehicleCapacity: number): OptimizedRoute => {
  // Nearest-neighbor heuristic
  const stops: RouteStop[] = [];
  let unvisited = [...points];
  
  // Start from depot or first point
  const depotIndex = unvisited.findIndex(p => p.type === 'depot');
  let currentPoint = depotIndex >= 0 ? unvisited.splice(depotIndex, 1)[0] : unvisited.shift()!;
  
  let currentLoad = 0;
  let cumulativeDistance = 0;
  let naiveDistance = 0;

  stops.push({
    index: 0,
    point: currentPoint,
    arrivalDistance: 0,
    cumulativeDistance: 0,
    loadAfterStop: currentLoad
  });

  // Calculate naive distance for comparison (visiting in original order)
  for (let i = 0; i < points.length - 1; i++) {
    naiveDistance += getDistance(points[i].lat, points[i].lng, points[i+1].lat, points[i+1].lng);
  }

  let stopIndex = 1;
  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let shortestDist = Infinity;
    
    for (let i = 0; i < unvisited.length; i++) {
      const dist = getDistance(currentPoint.lat, currentPoint.lng, unvisited[i].lat, unvisited[i].lng);
      if (dist < shortestDist) {
        shortestDist = dist;
        nearestIdx = i;
      }
    }
    
    const nextPoint = unvisited.splice(nearestIdx, 1)[0];
    cumulativeDistance += shortestDist;
    
    if (nextPoint.type === 'pickup') {
      currentLoad += nextPoint.quantity;
    } else if (nextPoint.type === 'delivery') {
      currentLoad -= nextPoint.quantity;
    }
    
    stops.push({
      index: stopIndex++,
      point: nextPoint,
      arrivalDistance: shortestDist,
      cumulativeDistance: cumulativeDistance,
      loadAfterStop: currentLoad
    });
    
    currentPoint = nextPoint;
  }

  return {
    id: uuidv4(),
    stops,
    totalDistance: cumulativeDistance,
    estimatedTime: cumulativeDistance / 40, // Assume 40 km/h average
    estimatedCost: cumulativeDistance * 15, // Assume 15 INR per km
    distanceSaved: naiveDistance - cumulativeDistance,
    distanceBefore: naiveDistance,
    vehicleCapacity
  };
};
