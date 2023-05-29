<!-- eslint-disable vue/component-api-style -->
<template>
  <VCard>
    <section
      id="hero"
      class="mt-10"
    >
      <VRow
        align="center"
        justify="center"
      >
        <VCol cols="10">
          <VRow 
            align="center"
            justify="center"
          >
            <VCol
              cols="12"
              md="6"
              xl="8"
            >
              <h1 class="display-2 font-weight-bold mb-4 text-7xl">
                Metraflow
              </h1>
              <h1 class="font-weight-light">
                Our mission is to revolutionize the way<br>
                traffic flows through our cities making transportation<br>
                more efficient and accessible for everyone
              </h1>
              <VBtn
                append-icon="mdi-arrow-down"
                rounded
                variant="tonal"
                size="large"
                single-line
                color="primary"
                class="mt-5"
                to="/register"
              >
                Join Us
              </VBtn>
            </VCol>
            <VCol
              cols="12"
              md="6"
              xl="4"
              class="hidden-sm-and-down"
            />
          </VRow>
        </VCol>
      </VRow>

      <VContainer
        id="features"
        fluid
        class="mt-4"
      >
        <VRow
          align="center"
          justify="center"
        >
          <VCol cols="10">
            <VRow
              align="center"
              justify="space-around"
            >
              <!--
                <v-col cols="12" class="text-center">
                <h1 class="font-weight-light display-2">Title</h1>
                <h1 class="font-weight-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h1>
                </v-col> 
              -->
              <VCol
                v-for="(feature, i) in features"
                :key="i"
                cols="12"
                sm="4"
                class="text-center"
              >
                <VHover v-slot="{ hover }">
                  <VCard
                   
                    
                    class="card rounded-xl"
                    shaped
                    :elevation="hover ? 29 : 14"
                    :class="{ up: hover }"
                  >
                    <VImg
                      :src="feature.img"
                      max-width="100px"
                      class="d-block ml-auto mr-auto"
                      :class="{ 'zoom-effect': hover }"
                    />
                    <h1 class="font-weight-regular">
                      {{ feature.title }}
                    </h1>
                    <h4 class="font-weight-regular subtitle-1">
                      {{ feature.text }}
                    </h4>
                  </VCard>    
                </VHover>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer> 
    </section>

    <section id="about">
      <VContainer fluid>
        <VRow
          align="center"
          justify="center"
        >
          <VCol cols="10">
            <VRow
              align="center"
              justify="center"
            >
              <VCol
                cols="12"
                md="7"
              >
                <h1 class="font-weight-light display-2 text-4xl">
                  About us 
                </h1>
                <h1 class="font-weight-light display-1 mb-3">
                  Empowering cities with data-driven traffic insights!
                </h1>
                <VRow>
                  <VCol
                    cols="12"
                    class="d-flex align-center"
                  >
                    <VImg
                      src="landing/icon3.svg"
                      max-width="120px"
                      min-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      We're developing a web application to measure traffic flow in cities. Our goal is to empower cities with valuable data that will optimize traffic management, improve road safety, and enhance urban life.
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex align-center"
                  >
                    <VImg
                      src="landing/icon2.svg"
                      icon
                      max-width="120px"
                      min-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      Our web application collects real-time traffic data using advanced sensors and algorithms. With a user-friendly interface, city planners and decision-makers can access a comprehensive dashboard to analyze traffic patterns, identify congestion hotspots, and make data-driven decisions for optimizing traffic management strategies.
                    </p>
                  </VCol>
                  <VCol
                    cols="12"
                    class="d-flex align-center"
                  >
                    <VImg
                      src="landing/icon1.svg"
                      max-width="120px"
                      min-width="60px"
                      class="mr-4"
                    />
                    <p class="text-justify">
                      By using our web application, cities can experience reduced congestion, improved travel times, and enhanced safety. The data-driven insights provided help with urban planning, infrastructure development, and resource allocation, resulting in smarter and more sustainable cities with better mobility and quality of life.
                    </p>
                  </VCol>
                </VRow>
              </VCol>
              <VCol
                cols="12"
                md="5"
                class="d-none d-md-flex"
              >
                <VImg
                  src="landing/ill1.svg"
                  class="d-block ml-auto mr-auto"
                  max-width="400px"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!--
      <section
      id="contact"
      class="pb-8"
      >
      <VContainer fluid>
      <VRow
      align="center"
      justify="center"
      >
      <VCol cols="10">
      <VRow justify="center">
      <VCol
      cols="12"
      sm="5"
      >
      <h1 class="font-weight-light display-1">
      Contact Us
      </h1>
      <h3 class="font-weight-light mt-3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
      explicabo commodi quisquam asperiores dolore ad enim provident
      veniam perferendis voluptate, perspiciatis.
      </h3>
      <h3 class="font-weight-light mt-3">
      Lorem ipsum dolor sit amet consectetur adipisicing.
      </h3>
      <h3 class="font-weight-light mt-3">
      Phone: +7 (xxx) xxx-xx-xx
      </h3>
      <h3 class="font-weight-light">
      Email: email@email.com
      </h3>
      </VCol>
      <VCol
      cols="12"
      sm="7"
      >
      <VForm
      ref="form"
      v-model="valid"
      >
      <VTextField
      v-model="name"
      class="ma-2 pa-2"
            
      :rules="nameRules"
      variant="underlined"
      label="Name and Surname"
      required
      />

      <VTextField
      v-model="email"
      class="ma-2 pa-2"
      :rules="emailRules"
      variant="underlined"
      label="E-mail"
      required
      />

      <VTextarea
      v-model="textArea"
      class="ma-2 pa-2"
      :rules="textAreaRules"
      variant="underlined"
      label="Message"
      required
      />

      <VBtn
      color="primary"
      :dark="valid"
      rounded
      block
      class="mt-3"
      @click="submit"
      >
      Send Message
      </VBtn>
      </VForm>
      </VCol>
      </VRow>
      </VCol>
      </VRow>
      </VContainer>
      </section> 
    -->
  </VCard>
</template>
  
<script>
export default {
    
  data() {
    return {
      features: [
        {
          img: "/landing/icon2.png",
          title: "Advanced Technology",
          text: "Our advanced technology uses cutting-edge algorithms to optimize traffic flow in real-time, even during periods of high traffic volume.",
        },
        {
          img: "/landing/icon1.png",
          title: "Customizable Solutions",
          text: "We offer fully customizable technology, and we work closely with cities to understand their unique traffic patterns and design a system that works best for them.",
        },
        {
          img:"/landing/icon3.png",
          title: "Environmental Benefits",
          text: "By reducing traffic congestion and wait times, our traffic flow project also has environmental benefits. Fewer cars idling in traffic means reduced emissions and a cleaner, healthier environment.",
        },

      ], 
      icons: ["fa-facebook", "fa-twitter", "fa-linkedin", "fa-instagram"],
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "The text field is required",
        v => (v && v.length >= 6) || "Name must be more than 6 characters",
      ],
      email: "",
      emailRules: [
        v => !!v || "The text field is required",
        v => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      textArea: "",
      textAreaRules: [
        v => !!v || "The text field is required",
        v => (v && v.length >= 10) || "Minimum 10 characters",
      ],
      lazy: false,
      form: {},
    }
  },
   
 
}
</script>
  
  <style lang="scss">
  .circle {
    stroke: white;
    stroke-dasharray: 650;
    stroke-dashoffset: 650;
    -webkit-transition: all 0.5s ease-in-out;
    opacity: 0.3;
  }
  
  .playBut {
    /*  border: 1px solid red;*/
    display: inline-block;
    -webkit-transition: all 0.5s ease;
  
    .triangle {
      -webkit-transition: all 0.7s ease-in-out;
      stroke-dasharray: 240;
      stroke-dashoffset: 480;
      stroke: white;
      transform: translateY(0);
    }
  
    &:hover {
      .triangle {
        stroke-dashoffset: 0;
        opacity: 1;
        stroke: white;
        animation: nudge 0.7s ease-in-out;
  
        @keyframes nudge {
          0% {
            transform: translateX(0);
          }
          30% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          70% {
            transform: translateX(-2px);
          }
          100% {
            transform: translateX(0);
          }
        }
      }
  
      .circle {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }
  }
  </style>
  
  <style>
  .btn-play {
    transition: 0.2s;
  }
  
  .svg-border-waves .v-image {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    overflow: hidden;
  }
  
  #hero {
    z-index: 0;
  }
  .svg-border-waves img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    margin-bottom: -2px;
    z-index: -1;
  }
  
  .card {
    min-height: 300px;
    padding: 10px;
    transition: 0.5s ease-out;
  }
  
  .card .v-image {
    margin-bottom: 15px;
    transition: 0.75s;
  }
  
  .card h1 {
    margin-bottom: 10px;
  }
  
  .zoom-effect {
    transform: scale(1.1);    
  }
  
  .up {
    transform: translateY(-20px);
    transition: 0.5s ease-out;
  }
  </style>
  
  <style>
  section {
    position: relative;
  }
  </style>

<route lang="yaml">
  meta:
    requiresAuth: false
</route>