<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
var colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

const vuetifyTheme = useTheme()
const currentTheme = computed(() => vuetifyTheme.current.value.colors)
const variableTheme = computed(() => vuetifyTheme.current.value.variables)
const series = [78]
const chartOptions = computed(() => {
  return {
    // chart: { sparkline: { enabled: true } },
    // colors: [currentTheme.value.info],
    // plotOptions: {
    //   radialBar: {
    //     startAngle: -90,
    //     endAngle: 90,
    //     hollow: { size: '65%' },
    //     dataLabels: {
    //       name: { show: false },
    //       value: {
    //         fontSize: '1.25rem',
    //         fontWeight: '600',
    //         offsetY: 0,
    //         color: `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['high-emphasis-opacity'] })`,
    //       },
    //     },
    //     track: { background: currentTheme.value.background },
    //   },
    // },
    // stroke: { lineCap: 'round' },

    chart: {
      type: 'donut',
      width: '100%',
      height: 400
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      customScale: 0.8,
      donut: {
        size: '75%',
      },
      offsetY: 20,
    },
    stroke: {
      colors: undefined
    },
    track: { background: currentTheme.value.background },
  },
  colors: colorPalette,
  title: {
    text: 'Number of accidents',
    style: {
      fontSize: '18px'
    }
  },
  series: [21, 23, 19],
  labels: ['Car crash', 'Road works', 'Congestion'],
  legend: {
    position: 'left',
    offsetY: 80
  }

  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <h6 class="text-h6">
        Current congestion
      </h6>
      <VRow
        justify="space-around"
        align="center"
      >
        <VCol cols="4">
          <VueApexCharts
            id="stats-radial-bar-chart"
            :options="chartOptions"
            :series="series"
            type="radialBar"
            :height="400"
          />
          <h6 class="text-sm text-center font-weight-semibold mt-9">
            Traffic jam percentage
          </h6>
        </VCol>
        <VCol cols="4">
          <VueApexCharts
            id="stats-radial-bar-chart"
            :options="chartOptions"
            :series="series"
            type="radialBar"
            :height="400"
          />
          <h6 class="text-sm text-center font-weight-semibold mt-9">
            Traffic jam percentage
          </h6>
        </VCol>
        <VCol cols="4">
          <VueApexCharts
            id="stats-radial-bar-chart"
            :options="chartOptions"
            :series="series"
            type="radialBar"
            :height="400"
          />
          <h6 class="text-sm text-center font-weight-semibold mt-9">
            Traffic jam percentage
          </h6>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

  <style lang="scss">
  #stats-radial-bar-chart {
    .apexcharts-canvas {
      .apexcharts-text {
        &.apexcharts-datalabel-value {
          font-weight: 600;
        }
      }
    }
  }
  </style>

