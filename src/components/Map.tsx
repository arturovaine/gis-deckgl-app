// src/components/Map.tsx
import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

const initialViewState = {
  longitude: -49.2648,
  latitude: -25.4411,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

type Position = [number, number];

interface DataPoint {
  sourcePosition: Position;
  targetPosition: Position;
}

const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      sourcePosition: [
        -49.2648 + Math.random() * 0.1 - 0.05,
        -25.4411 + Math.random() * 0.1 - 0.05,
      ],
      targetPosition: [
        -49.2648 + Math.random() * 0.1 - 0.05,
        -25.4411 + Math.random() * 0.1 - 0.05,
      ],
    });
  }
  return data;
};

const Map: React.FC = () => {
  const [data] = useState(generateData());

  const layers = [
    new ArcLayer<DataPoint>({
      id: 'arc-layer',
      data,
      getSourcePosition: (d) => d.sourcePosition,
      getTargetPosition: (d) => d.targetPosition,
      getSourceColor: [255, 0, 0],
      getTargetColor: [0, 0, 255],
      getWidth: 2,
    }),
    new HexagonLayer<DataPoint>({
      id: 'hexagon-layer',
      data,
      getPosition: (d) => d.sourcePosition,
      radius: 1000,
      elevationScale: 0,
      extruded: true,
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <StaticMap
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v9"
      />
    </DeckGL>
  );
};

export default Map;
