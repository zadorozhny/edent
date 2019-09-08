<template>
  <div id="map"/>
</template>

<script>

export default {
  data: () => ({}),
  mounted() {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'AIzaSyAFBrCwBNg9F6345BFfK-5faTNO5aNU8GY'
    });
    google.charts.setOnLoadCallback(this.drawRegionsMap);

    this.drawRegionsMap();
  },
  methods: {
    drawRegionsMap() {
      const data = google.visualization.arrayToDataTable([
        ['Regions', 'Доставка'],
        ['Kharkiv', 'Самовывоз'],
      ]);

      const options = {
        region: 'UA',
        displayMode: 'markers',
        defaultColor: '#283b56',
        resolution: 'provinces',
        datalessRegionColor: 'white'
      };

      const chart = new google.visualization.GeoChart(document.getElementById('map'));
      chart.draw(data, options);
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>
