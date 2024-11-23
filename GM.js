async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const center = { lat: 43.2556, lng: -79.8711 };
  const map = new Map(document.getElementById("map"), {
    zoom: 12,
    center,
    mapId: "4504f8b37365c3d0"
  });

  for (const property of properties) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(property),
      position: property.position,
      title: property.description,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });
  }
}

function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="details">
        <div class="name">${property.name}</div>
        <div class="address">${property.address}</div>
    </div>
    `;
  return content;
}

const properties = [
  {
    address: "1280 Main St W, Hamilton",
    description: "VERY FUN(TRUST)",
    name: "HammyHackz",
    type: "building",
    position: {
      lat: 43.2614,
      lng: -79.9197 ,
    },
  },
  {
    address: "98 Aleh Ave, Palo Alto",
    description: "great for dogs",
    name: "Conga Lessons",
    type: "building",
    position: {
      lat: 43.2057,
      lng: -79.8711,
    },
  },
  {
    address: "2117 Su St, MountainView",
    description: "I like Cheese",
    name: "Cheese eating",
    type: "building",
    position: {
      lat: 43.225702,
      lng: -79.8011,
    },
  },
  {
    address: "197 Alicia Dr, Santa Clara",
    description: "I'm going to eat dinner",
    name: "Hamilton City Marathon",
    type: "building",
    position: {
      lat: 43.295601,
      lng: -79.7911,
    },
  }
];

initMap();