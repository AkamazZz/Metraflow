<template>
  <div>
    <VTextField
      v-model="searchText"
      label="Search"
      hide-details
      class="ma-2"
      variant="filled"
      density="comfortable"
    />
    <!-- Add a list of checkboxes for car type filtering -->
    <!--
      <VCol cols="12">
      <VRow class="justify-space-around">
      <VCheckbox
      v-for="carType in typeCars"
      :key="carType"
      v-model="selectedCarTypes"
      :label="carType"
      :value="carType"
      class="mb-1"
      />
      </VRow>
      </VCol> 
    -->
    <VList 
      :disabled="props.isDisabled"
      lines="one"
    >
      <TransitionGroup
        name="list"
        tag="ul"
      >
        <VListItem 
          v-for="(carType, index) in paginatedCarTypes"
          :key="carType"

          height="80"
          class="border-class"    
          :value="carType"
          :disabled="selectedCarType.value && carType !== selectedCarType.value"
          @click="selectCarType(carType)"
        >
          <template #prepend>
            <VIcon icon="mdi-car" />
          </template>
   
          <VListItemTitle v-text="carType" />
     
          <VProgressLinear
            v-if="carType == selectedCarType && props.isDisabled"
            color="primary"
            indeterminate
          />
        </VListItem>
      </TransitionGroup>
    </VList>
   
    <VContainer  
      v-if="paginatedCarTypes.length === 0 "  
      class="d-flex justify-center align-center ma-1 pa-1"
    >
      <VProgressCircular
        
      
        size="48  "
        color="primary"
        indeterminate
      />
    </VContainer>
 
    <VRow
      justify="center"
      align="center"  
    >
      <VCol cols="auto">
        <VBtn
          :disabled="currentPage === 0"
          @click="previousPage"
        >
          Previous
        </VBtn>
      </VCol>
      <VCol cols="auto">
        <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      </VCol>
      <VCol cols="auto">
        <VBtn
          :disabled="currentPage === totalPages - 1"
          @click="nextPage"
        > 
          Next
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>
  
<script setup>
import tokenService from "@/api/token.service"

import { ref, computed } from 'vue'
  



const props = defineProps({
  carTypes: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isRouteEnabled: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['select'])
const isDisabled = ref(false)

const typeCars = ['Taxi', 'Car', 'Bus', 'Motorcycle', 'Truck']

const searchText=ref("")
const selectedCarTypes=ref([])  
const selectCarType = car => {
  if(!props.isRouteEnabled) {
    return
  } 
  selectedCarType.value = car
  
  console.log(selectedCarType.value)
  emit('select', car)
  isDisabled.value = true     
  console.log(isDisabled.value)
  setTimeout(() => {
    isDisabled.value = false       
    console.log(isDisabled.value) 
  }, 10000)
  
 
}
console.log(props.carTypes)
  
const itemsPerPage = ref(5)
const currentPage = ref(0)

// watch([selectedCarTypes, searchText], () => {
//   filteredCarTypes.value = props.carTypes.filter(carType => {
//     const textMatch = searchText.value ? carType.name.toLowerCase().includes(searchText.value.toLowerCase()) : true
    
//     return textMatch && typeMatch
//   }) 
// })
const filteredCarTypes = computed(() => {
  if( searchText.value.length > 0) {
    console.log(selectedCarTypes.value, searchText.value) 
    
    return props.carTypes.filter(carType => {
      return searchText.value ? carType.toLowerCase().includes(searchText.value.toLowerCase()) : true
    })
  
  }
  
  return props.carTypes
  
})

const totalPages = computed(() => {
  
  
  return Math.ceil(filteredCarTypes.value.length / props.itemsPerPage)
})
const filteredCars=ref()
const paginatedCarTypes = computed(() => {
  
  const startIndex = currentPage.value * props.itemsPerPage
  const endIndex = startIndex + props.itemsPerPage

  
  return filteredCarTypes.value.slice(startIndex, endIndex)
})
  
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}
  
const previousPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}
  
const selectedCarType = ref([])
</script>
  
  <style scoped>
    .pagination {
      margin-top: 0px;
    }
    .border-class {
  border: 1px solid $primary;
}
.list-enter-active {
  transition: opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
  
  
  
  
  
  
  