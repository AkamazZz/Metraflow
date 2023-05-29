<template>
  <VCard
    class="d-flex justify-center align-center pa-0"
    height="100%"
  >
    <VRow>
      <VCol>
        <VContainer class="pa-0 ma-0">
          <VImg
            class="elevation-10"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            height="220px"
            cover
          />
        </VContainer>
        <VRow
          class="mr-5 ml-5 mt-10 mb-10"
          justify="center"
          align="center"
        >
          <VCol
            cols="4"
          >
            <h1>Frequently Asked Questions</h1>
          </VCol>
          <VCol>
            <VExpansionPanels variant="accordion">
              <VExpansionPanel
                v-for="(faq, index) in faqs"
                :key="index"
                elevation="10"
                :title="faq.question"
                :text="faq.answer"
              />
            </VExpansionPanels>
            <VCol />
          </vcol>
        </VRow>
      </VCol>
    </VRow>
  </VCard>
</template>
  
<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: "What is a traffic flow measurement system?",
          answer: "A traffic flow measurement system is a set of sensors and software used to monitor and analyze the movement of vehicles on roads or highways.",
        },
        {
          question: "What types of sensors are used in traffic flow measurement systems?",
          answer: "Traffic flow measurement systems typically use various sensors, such as loop detectors embedded in the road, infrared sensors, radar sensors, or cameras.",
        },
        {
          question: "What data can be obtained from a traffic flow measurement system?",
          answer: "A traffic flow measurement system can provide data on traffic volume, vehicle speed, travel time, occupancy, and other parameters that help analyze traffic patterns and congestion.",
        },
        {
          question: "How is the data collected by the traffic flow measurement system processed?",
          answer: "The data collected by the traffic flow measurement system is typically processed using algorithms and software to generate meaningful traffic statistics, such as average speed, congestion levels, and travel time information.",
        },
        {
          question: "What are the benefits of using a traffic flow measurement system?",
          answer: "A traffic flow measurement system helps transportation authorities and planners make informed decisions for optimizing traffic flow, identifying bottlenecks, managing congestion, and improving overall transportation efficiency.",
        },
        {
          question: "Can a traffic flow measurement system integrate with other traffic management systems?",
          answer: "Yes, a traffic flow measurement system can integrate with other traffic management systems, such as intelligent transportation systems (ITS), traffic signal control systems, or highway management systems to provide comprehensive traffic monitoring and control capabilities.",
        },
        {
          question: "Are traffic flow measurement systems accurate?",
          answer: "Traffic flow measurement systems can provide accurate data when properly calibrated and maintained. However, accuracy may vary depending on the sensor technology, environmental factors, and system configuration.",
        },
        {
          question: "Can traffic flow measurement systems handle high traffic volumes?",
          answer: "Yes, traffic flow measurement systems are designed to handle high traffic volumes. They can scale to monitor multiple lanes or road sections simultaneously and process large amounts of data in real-time.",
        },
        {
          question: "Are traffic flow measurement systems used for research purposes?",
          answer: "Yes, traffic flow measurement systems are widely used in transportation research to study traffic patterns, model traffic behavior, and evaluate the impact of new infrastructure or traffic management strategies.",
        },
      ],
    }
  },
}
</script>
  
  <style scoped>
  .faq-page {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>


<route lang="yaml">
meta:
  requiresAuth: false
</route>
  
  
  
  
  
  