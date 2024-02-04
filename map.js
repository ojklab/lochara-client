'use strict';

PetiteVue.createApp({
  marker: null,
  lat: 35.276456,
  lon: 136.2492734,
  map: {},
  data: {},

  async initMap() {
    const { Map } = await google.maps.importLibrary('maps');
    this.map = new Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lon },
      zoom: 10,
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: { lat: this.lat, lng: this.lon },
      visible: true,
    });

    this.map.addListener('click', (e) => {
      this.getClickLatLng(e.latLng, this.map);
    });
  },

  getClickLatLng(lat_lng, map) {
    this.marker.setVisible(false);
    this.marker.setPosition(lat_lng);
    this.marker.setVisible(true);
    this.lat = this.marker.getPosition().lat();
    this.lon = this.marker.getPosition().lng();
  },

  async getResource() {
    const query = new URLSearchParams({
      ll: `${this.lat},${this.lon}`,
    });
    const res = await fetch('https://lochara.deno.dev/?' + query);
    const obj = await res.json();
    console.log(JSON.stringify(obj, null, 2));
    this.data = obj;
  },
}).mount();
