<!-- <script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
var trigoStrength = 3
function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0
  var series = []
  while (i < count) {
    var x = baseval
    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

    series.push([x, y])
    baseval += 300000
    i++
  }
  
  return series
}

const vuetifyTheme = useTheme()
const currentTheme = computed(() => vuetifyTheme.current.value.colors)
const series = [{
  data: [
    28,
    58,
    40,
    68,
  ],
}]
const chartOptions = computed(() => {
  return {
    grid: {
      show: false,
      padding: {
        left: -2,
        top: -10,
      },
    },
    chart: {
      parentHeightOffset: 0,
      type: 'line',
      offsetX: -8,
      stacked: true,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      dropShadow: {
        enabled: true,
        top: 10,
        blur: 4,
        color: currentTheme.value.primary,
        opacity: 0.09,
      },
      toolbar: { show: false },
    },
    markers: {
      size: 0,
      hover: {
        size: 0,
      },
    },
    stroke: {
      width: 5,
      curve: 'smooth',
      lineCap: 'round',
    },
    series: [
      {
        name: 'Amount',
        data: [
          // Provide your data points here in the format [time, amount]
          ['2023-05-12 08:00:00', 10],
          ['2023-05-12 09:00:00', 20],
          ['2023-05-12 10:00:00', 15],

          // Add more data points as needed
        ],
      },
    ],
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false,
      },
  
      range: 2700000,
    },
    legend: {
      show: true,
      floating: true,
      horizontalAlign: 'left',
      onItemClick: {
        toggleDataSeries: false,
      },
      position: 'top',
      offsetY: -28,
      offsetX: 60,
    },
    yaxis: { labels: { show: false } },

    tooltip: { 
      x: {
        format: 'yyyy-mm-dd hh:mm:ss',
      },
      y: {
        title: {
          formatter: seriesName => 'Amount',
        },
      },
    },
    colors: [currentTheme.value.primary],
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <h6 class="text-h6">
        $35.4k
      </h6>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="116"
      />

      <h6 class="text-sm text-center font-weight-semibold">
        Total Revenue
      </h6>
    </VCardText>
  </VCard>
</template> -->

<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = computed(() => vuetifyTheme.current.value.colors)
const chart = ref(null)
const  series = [{
  data: [
   0,1 
  ],
}]

const chartOptions = computed(() => {
  return {
    grid: {
      show: false,
      padding: {
        left: -2,
        top: -10,
      },
    },
    
    chart: {
      parentHeightOffset: 0,
      type: 'line',
      offsetX: -8,
      dropShadow: {
        enabled: true,
        top: 10,
        blur: 4,
        color: currentTheme.value.primary,
        opacity: 0.09,
      },
      
      toolbar: { show: false },
    },
    methods: {
      addData() { 
        console.log('bruh')
        chart.value.updateSeries([{data:   [100,98,91,93,111,85,81] }])
        series[0].data = [5, 15, 8, 10, 16, 34,343,4]
      },
    },
    markers: {
      size: 6,
      colors: 'transparent',
      strokeColors: 'transparent',
      strokeWidth: 4,
      discrete: [{
        seriesIndex: 0,
        dataPointIndex: series[0].data.length - 1,
        fillColor: currentTheme.value.surface,
        strokeColor: currentTheme.value.primary,
        size: 6,
      }],
      hover: { size: 7 },
    },
    stroke: {
      width: 5,
      curve: 'smooth',
      lineCap: 'round',
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    colors: [currentTheme.value.primary],
  }
})
onBeforeMount(() => {
  setTimeout(() => {
    chartOptions.value.methods.addData()
  }, 3000)
})
</script>

<template>
  <VCard>
    <VCardText>
      <h6 class="text-h6">
        Medium number of cars by time
      </h6>
      <VueApexCharts
        ref="chart"
        :options="chartOptions"
        :series="series"
        :height="423"
      />


    </VCardText>
  </VCard>
</template>