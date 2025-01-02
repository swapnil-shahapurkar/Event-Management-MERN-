import React, { useState } from 'react';
import './astr.css'

// Graph data
const graph = {
  Mumbai: {
    lat: 19.0760,
    lon: 72.8777,
    neighbors: {
      Pune: 151,
      TerraceLounge: 1.2,
    },
  },
  Pune: {
    lat: 18.5204,
    lon: 73.8567,
    neighbors: {
      Mumbai: 151,
      Kolhapur: 240,
      SkyLounge: 0.3,
    },
  },
  Kolhapur: {
    lat: 16.7050,
    lon: 74.2433,
    neighbors: {
      Pune: 240,
      Belgavi: 112,
      GardenHall: 0.5,
    },
  },
  Belgavi: {
    lat: 15.8481,
    lon: 74.4977,
    neighbors: {
      Kolhapur: 112,
      Hubli:  94,
      SwimmingPoolPavilion: 0.7,
    },
  },
  Hubli: {
    lat: 15.3647,
    lon: 75.1305,
    neighbors: {
      Belgavi: 94,
      Bangalore: 412,
      MajesticCourtyard: 0.4,
    },
  },
  Bangalore: {
    lat: 12.9716,
    lon: 77.5946,
    neighbors: {
      Hubli: 412,
      ElegantBallroom: 0.5,
    },
  },
  TerraceLounge: {
    lat: 19.0760,
    lon: 72.8777,
    neighbors: {
      Mumbai: 1.2,
    },
  },
  ElegantBallroom: {
    lat: 12.5204,
    lon: 77.5567,
    neighbors: {
      Bangalore: 0.5,
    },
  },
  GardenHall: {
    lat: 16.7050,
    lon: 74.2433,
    neighbors: {
      Kolhapur: 0.5,
    },
  },
  SwimmingPoolPavilion: {
    lat: 15.8481,
    lon: 74.4977,
    neighbors: {
      Belgavi: 0.7,
    },
  },
  MajesticCourtyard: {
    lat: 15.3647,
    lon: 75.1305,
    neighbors: {
      Hubli: 0.4,
    },
  },
  SkyLounge: {
    lat: 18.5281,
    lon: 73.8577,
    neighbors: {
      Pune: 0.7,
    },
  },
};

// Venue details
const venuesli = [
  {
    id: 'GardenHall',
    name: 'Garden Hall',
    description: `Garden Hall accommodates up to 300 guests and is ideal for weddings, anniversaries, or family gatherings. The hall features customizable floral arrangements, themed lighting, and draped canopies. Food options include a wide range of buffet and plated meals, with both vegetarian and non-vegetarian options, as well as live counters for chaat, barbecue, or desserts.`,
    imgSrc: '/assets/garden_hall.png',
  },
  {
    id: 'SwimmingPoolPavilion',
    name: 'Swimming Pool Pavilion',
    description: `The Swimming Pool Pavilion is perfect for gatherings of 100–150 guests. Its poolside décor includes floating candles, lanterns, fairy lights, and tropical themes.`,
    imgSrc: '/assets/pool_pavilion.png',
  },
  {
    id: 'ElegantBallroom',
    name: 'Elegant Ballroom',
    description: `The Elegant Ballroom is a large venue that can accommodate up to 500 guests. It features luxurious chandeliers, grand stage setups, and royal-themed décor, making it perfect for high-end events.`,
    imgSrc: '/assets/ballroom.png',
  },
  {
    id: 'TerraceLounge',
    name: 'Terrace Lounge',
    description: `The Terrace Lounge provides an intimate and cozy setting for up to 100 guests. Its open-air ambiance, featuring fairy lights, minimalist furniture, and boho-themed arrangements, creates a perfect atmosphere for small gatherings.`,
    imgSrc: '/assets/terrace_lounge.png',
  },
  {
    id: 'MajesticCourtyard',
    name: 'Majestic Courtyard',
    description: `The Majestic Courtyard can comfortably host up to 400 guests. It features rustic and vintage-themed décor, with hanging lights, floral arches, and elegant seating arrangements.`,
    imgSrc: '/assets/courtyard.png',
  },
  {
    id: 'SkyLounge',
    name: 'Sky Lounge',
    description: `The Sky Lounge is a premium venue that can host up to 200 guests. Its modern and chic design, featuring LED lighting, modular furniture, and panoramic skyline views, creates an exclusive atmosphere.`,
    imgSrc: '/assets/sky_lounge.png',
  },
];

// A* algorithm implementation
function aStar(graph, start, goal) {
  const openList = [];
  const closedList = new Set();
  const gScores = { [start]: 0 };
  const fScores = { [start]: heuristic(start, goal) };
  const cameFrom = {};

  openList.push(start);

  while (openList.length > 0) {
    const current = openList.reduce((lowest, node) => (fScores[node] < fScores[lowest] ? node : lowest), openList[0]);

    if (current === goal) {
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift(temp);
        temp = cameFrom[temp];
      }

      // Calculate the total actual distance using neighbors' distance
      let totalDistance = 0;
      for (let i = 0; i < path.length - 1; i++) {
        totalDistance += graph[path[i]].neighbors[path[i + 1]];  // Sum the distances between nodes in the path
      }
      return totalDistance;  // Return the total actual distance
    }

    openList.splice(openList.indexOf(current), 1);
    closedList.add(current);

    for (const [neighbor, distance] of Object.entries(graph[current].neighbors)) {
      if (closedList.has(neighbor)) continue;

      const tentativeGScore = gScores[current] + distance;
      if (!openList.includes(neighbor)) {
        openList.push(neighbor);
      } else if (tentativeGScore >= gScores[neighbor]) {
        continue;
      }

      cameFrom[neighbor] = current;
      gScores[neighbor] = tentativeGScore;
      fScores[neighbor] = gScores[neighbor] + heuristic(neighbor, goal);
    }
  }

  return null; // No path found
}

function heuristic(node, goal) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (graph[goal].lat - graph[node].lat) * (Math.PI / 180);
  const dLon = (graph[goal].lon - graph[node].lon) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(graph[node].lat * (Math.PI / 180)) *
      Math.cos(graph[goal].lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
const VenueFinder = () => {
  const [city, setCity] = useState('');
  const [nearestVenues, setNearestVenues] = useState([]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleFindNearest = () => {
    const normalizedCity = city.trim().toLowerCase(); // Normalize user input
    const cityKey = Object.keys(graph).find(
      (key) => key.toLowerCase() === normalizedCity
    );

    if (!cityKey) {
      alert('Not conneted to this city yet, We will connect soon');
      return;
    }

    const distances = Object.keys(graph)
      .filter((key) => key !== cityKey)
      .map((venue) => {
        if (venuesli.some((v) => v.id.toLowerCase() === venue.toLowerCase())) {
          const distance = aStar(graph, cityKey, venue); // Direct geographical distance
          return { venue, distance };
        }
        return null;
      })
      .filter(Boolean);

    distances.sort((a, b) => a.distance - b.distance);
    setNearestVenues(distances);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
    <h1>Find Nearest Venue</h1>
    <div style={{ width: "50%", textAlign: "center" }}>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city name"
        style={{ width: "100%", padding: "10px", marginBottom: "10px", boxSizing: "border-box" }}
      />
      <button 
        onClick={handleFindNearest} 
        style={{ width: "100%", padding: "10px", cursor: "pointer" }}
      >
        Find Nearest Venue
      </button>
    </div>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {nearestVenues.map((item, index) => (
          <li
            key={index}
            style={{
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontSize: '16px',
              color: '#333',
              width: '30%',
            }}
          >
            <strong>{item.venue}</strong>: <span>{item.distance.toFixed(2)} km</span>
          </li>
        ))}
      </ul>

      <div
        className="venue-details"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {nearestVenues.map((venue, index) => {
          const venueDetails = venuesli.find(
            (v) => v.id.toLowerCase() === venue.venue.toLowerCase()
          );
          return (
            <div
              className="venue-item"
              key={index}
              style={{
                flex: '1 1 calc(33.33% - 20px)', // Ensures three items in a row
                boxSizing: 'border-box',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={venueDetails.imgSrc}
                alt={venueDetails.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <h3>{venueDetails.name}</h3>
              <p>{venueDetails.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VenueFinder;
