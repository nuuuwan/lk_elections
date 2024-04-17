export default class LatLng {
  static positions(multiPolygon) {
    return multiPolygon.map(function (polygon) {
      return polygon.map(function (latLng) {
        const [lat, lng] = latLng;
        return [lng, lat];
      });
    });
  }

  static bounds(multiPolygon) {
    return multiPolygon.reduce(
      function ([[minLng, minLat], [maxLng, maxLat]], polygon) {
        return polygon.reduce(
          function ([[minLng, minLat], [maxLng, maxLat]], latLng) {
            const [lat, lng] = latLng;
            minLat = Math.min(minLat, lat);
            minLng = Math.min(minLng, lng);
            maxLat = Math.max(maxLat, lat);
            maxLng = Math.max(maxLng, lng);
            return [
              [minLng, minLat],
              [maxLng, maxLat],
            ];
          },
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ]
        );
      },
      [
        [180, 90],
        [-180, -90],
      ]
    );
  }
}
