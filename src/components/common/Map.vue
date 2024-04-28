<script setup>
import leaflet from "leaflet";
// import 'leaflet-control-geocoder';
import { onMounted, watchEffect, ref, reactive } from "vue";
import { useGeolocation } from "@vueuse/core";
import { userMarker, nearbyMarkers } from "@/extend/mapStore";
import currentLocationIcon from "@/assets/currentLocation.svg";
import userLocation from "@/assets/mapMarker.svg";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
const emits = defineEmits(["emitLocationName"]);
const props = defineProps({
  latitude: {
    type: Number,
    require: false,
    default: null,
  },
  longitude: {
    type: Number,
    require: false,
    default: null,
  },
  state: {
    type: String,
    require: false,
    default: null,
  },
});


const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
  provider: provider,
  autoComplete: true,
  searchLabel: "Location Name",
  autoClose: true,
});
// const center = { lat: 40.689247, lng: -74.044502 }
// const map2 = ref(null)
let map;
let userGeoMarker = ref([]);
let markers;
const { coords } = useGeolocation();
let previousZoomLevel = 0;
const locationName = ref("");
const eventLocation = reactive({
  latitude: props.latitude,
  longitude: props.longitude,
});

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  leaflet
      .map("map")
      .setView([latitude,longitude], previousZoomLevel);

  
};

const error = (err) => {
  console.log(error);
};

// This will open permission popup
navigator.geolocation.getCurrentPosition(success, error);

onMounted(() => {
  console.log(coords.value);
  console.log(eventLocation.latitude);
  console.log(eventLocation.longitude);

  if (
    props.state == "edit" &&
    eventLocation.latitude != null &&
    eventLocation.longitude != null
  ) {
    console.log("user location");
    map = leaflet
      .map("map")
      .setView([eventLocation.latitude, eventLocation.longitude], 13);
  } else {
    map = leaflet
      .map("map")
      .setView([userMarker.value.latitude, userMarker.value.longitude], 13);
  }

  ////// Display map layer
  leaflet
    .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      minZoom: 10,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map);

  map.addControl(searchControl);
  map.on("geosearch/showlocation", (data) => {
    locationName.value = data.location.label;
    console.log(locationName.value);
    emits("emitLocationName", locationName.value);
  });

  if (markers) {
      map.removeLayer(markers);
      nearbyMarkers.value = [];
    }
  ///// Loop display event marker on map when reload web
  if (eventLocation.latitude != null && eventLocation.longitude != null) {
    markers = leaflet
      .marker([eventLocation.latitude, eventLocation.longitude], {
        icon: markerIcon,
      })
      .addTo(map)
      .bindPopup(
        `Event here
      </strong>`
      );
    nearbyMarkers.value.push({
      latitude: eventLocation.latitude,
      longitude: eventLocation.longitude,
    });
    // map.setView([eventLocation.latitude, eventLocation.longitude], previousZoomLevel)
  }

  ////// add event that collect lat lng from click on the map at store it to nearby marker.
  map.addEventListener("click", (e) => {
    console.log(coords.value);
    if (markers) {
      map.removeLayer(markers);
      nearbyMarkers.value = [];
    }
    const { lat: latitude, lng: longitude } = e.latlng;
    console.log(e);
    markers = leaflet
      .marker([latitude, longitude], { icon: markerIcon })
      .addTo(map)
      .bindPopup(
        `Saved Marker at <strong>${latitude.toFixed(2)},${longitude.toFixed(
          2
        )}</strong>`
      );

    nearbyMarkers.value.push({ latitude, longitude });

    map.on("zoomend", () => {
      previousZoomLevel = map.getZoom();
    });
  });
});

////// watch effect to map and coords lat lng
watchEffect(() => {
  ///// condition make sure lat long is potitive value
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  ) {
    nearbyMarkers.value.latitude = coords.value.latitude;
    nearbyMarkers.value.longitude = coords.value.longitude;
    console.log("lat nearby"+nearbyMarkers.value.latitude);
    console.log("lng nearby"+nearbyMarkers.value.longitude);
    if (userGeoMarker) {
      map.removeLayer(userGeoMarker);
    }

    userGeoMarker = leaflet
      .marker([nearbyMarkers.value.latitude, nearbyMarkers.value.longitude], {
        icon: userHereIcon,
      })
      .addTo(map)
      .bindPopup("You're Here");

    map.on("zoomend", () => {
      previousZoomLevel = map.getZoom();
    });

    // map.setView([nearbyMarkers.value.latitude, nearbyMarkers.value.longitude], previousZoomLevel);
  }
});

let userHereIcon = leaflet.icon({
  iconUrl: currentLocationIcon,
  iconSize: [50, 50],
});

let markerIcon = leaflet.icon({
  iconUrl: userLocation,
  iconSize: [30, 30],
});

const clearMarker = () => {
  map.removeLayer(markers);
  nearbyMarkers.value = [];
};
</script>

<template>
  <div class="relative">
    <div id="map" class="h-[180px] w-[333px] z-20"></div>
    <!-- <div id="map" class="h-screen w-screen z-20"></div> -->
    <!-- <div ref="map" style="width: 500px;height: 500px;"></div> -->
    <button
      class="absolute top-0 right-0 z-40 p-2 bg-gray-200 rounded-[8px] w-[120px] hover:bg-gray-300 text-[13px]"
      @click="clearMarker()"
    >
      Clear Marker
    </button>
  </div>
</template>

<style>
/* #map { height: screen } */
</style>
