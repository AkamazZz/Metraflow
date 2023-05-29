<script setup>
// import AnalyticsAward from '@/views/dashboards/analytics/AnalyticsAward.vue'

// import AnalyticsBarCharts from '@/views/dashboards/analytics/AnalyticsBarCharts.vue'
// import AnalyticsDatatable from '@/views/dashboards/analytics/AnalyticsDatatable.vue'
// import AnalyticsDepositWithdraw from '@/views/dashboards/analytics/AnalyticsDepositWithdraw.vue'
// import AnalyticsSalesByCountries from '@/views/dashboards/analytics/AnalyticsSalesByCountries.vue'
// import AnalyticsTotalEarning from '@/views/dashboards/analytics/AnalyticsTotalEarning.vue'
// import AnalyticsTotalProfitLineCharts from '@/views/dashboards/analytics/AnalyticsTotalProfitLineCharts.vue'
// import AnalyticsTransactions from '@/views/dashboards/analytics/AnalyticsTransactions.vue'
import AnalyticsWeeklyOverview from '@/views/dashboards/analytics/AnalyticsWeeklyOverview.vue'

// import CardStatisticsVertical from '@core/components/CardStatisticsVertical.vue'
// import CardStatisticsAreaCharts from '@/views/pages/cards/card-statistics/CardStatisticsAreaCharts.vue'
// import CardStatisticsBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsBarCharts.vue'
// import CardStatisticsBarWithGapCharts from '@/views/pages/cards/card-statistics/CardStatisticsBarWithGapCharts.vue'
import CardStatisticsRadialBarCharts from '@/views/pages/cards/card-statistics/CardStatisticsRadialBarCharts.vue'

// import CardStatisticsTotalProfiteLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsTotalProfitLineCharts.vue'
// import CardStatisticsTransations from '@/views/pages/cards/card-statistics/CardStatisticsTransactions.vue'

import CardStatisticsLineCharts from '@/views/pages/cards/card-statistics/CardStatisticsLineCharts.vue'


// const totalProfit = {
//   title: 'Total Profit',
//   color: 'secondary',
//   icon: 'mdi-poll',
//   stats: '$25.6k',
//   change: 42,
//   subtitle: 'Weekly Project',
// }
// const newProject = {
//   title: 'New Project',
//   color: 'primary',
//   icon: 'mdi-briefcase-variant-outline',
//   stats: '862',
//   change: -18,
//   subtitle: 'Yearly Project',
// }
</script>

<template>
  <!--
    <VRow class="match-height">
    <VCol
    cols="12"
    md="4"
    >
    <AnalyticsAward />
    </VCol>

    <VCol
    cols="12"
    md="8"
    >
    <AnalyticsTransactions />
    </VCol>
    <VCol
     
    cols="12"
    md="12"
    >
    <CardStatisticsAreaCharts />
    </VCol>
    <VCol
    cols="12"
    md="6"
    >
    <AnalyticsWeeklyOverview />
    </VCol>

    <VCol
    cols="12"
    md="6"
    >
    <CardStatisticsRadialBarCharts />
    </VCol>
    </VRow>
  -->
  <VRow>
    <VCol cols="12">
      <AnalyticsWeeklyOverview />
    </VCol>
    <VCol cols="5">
      <CardStatisticsRadialBarCharts />
    </VCol>
    <VCol cols="7">
      <CardStatisticsLineCharts />
    </Vcol>
  </VRow>
</template>


<route lang="yaml">
  meta:
    requiresAuth: true
  </route>