/*
 * @format
 */

import UTM, { LatLon } from 'geodesy/utm';

const toUtm = (lat: number, lon: number, digit?: number): string => {
  const latlon = new LatLon(lat, lon);
  return latlon.toUtm().toString(digit);
};

const toLatLon = (
  utmCoord: string,
): { latitude: number; longitude: number } => {
  const { latitude, longitude } = UTM.parse(utmCoord).toLatLon();
  return { latitude, longitude };
};

const GeolocationSerivce = { toUtm, toLatLon };

export default GeolocationSerivce;
