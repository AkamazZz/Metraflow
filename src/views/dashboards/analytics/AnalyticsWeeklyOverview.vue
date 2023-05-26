<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import {getNumberOfCaRs, getNumberOfCars} from '@/api/map.service'
import {onBeforeMount} from 'vue'

const vuetifyTheme = useTheme()
const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded',
      },
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface],
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },

    dataLabels: { enabled: false },
    // colors: [
    //   currentTheme.value.background,
    //   currentTheme.value.background,
    //   currentTheme.value.background,
    //   currentTheme.value.background,
    //   currentTheme.value.primary,
    //   currentTheme.value.background,
    //   currentTheme.value.background,
    // ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    xaxis: {
      categories: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ],
      tickPlacement: 'on',
      labels: { show: false },
      crosshairs: { opacity: 0 },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    methods: {
      addData() { 
        getNumberOfCars().then((res) => {
       
          chart.value.updateSeries([{data:   res }])
        })
        
      },
    },
    yaxis: {
      show: true,
      min: 560,
    max: 800,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        style: {
          colors: disabledColor,
          fontSize: '12px',
        },
        formatter: value => `${ value > 999 ? `${ (value / 1000).toFixed(0) }` : value } cars`,
      },
    },
  }
})

const traffic = [{
  name: 'Traffic',
  data: []
}]

const chart = ref(null)

onBeforeMount(() => {
  options.value.methods.addData()
})
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Weekly Overview</VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="bar"
        ref="chart"
        :options="options"
        :series="traffic"
        :height="220"
      />
        <!--
      <div class="d-flex align-center mb-3">
        <h5 class="text-h5 me-4">
          80%
        </h5>
        <p>
          Big traffic day is on friday.
        </p>
      </div>
 

      <VBtn block>
        Details
      </VBtn>
    -->
    </VCardText>
  </VCard>
</template>

