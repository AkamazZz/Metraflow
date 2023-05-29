<!-- eslint-disable vue/attribute-hyphenation -->
<!-- eslint-disable vue/attribute-hyphenation -->
<script setup>
import { useRoute } from 'vue-router'
import AccountSettingsAccount from '@/views/pages/account-settings/AccountSettingsAccount.vue'
import AccountSettingsSecurity from '@/views/pages/account-settings/AccountSettingsSecurity.vue'
import { getUserInfo } from '@/api/user.service'

const route = useRoute()
const activeTab = ref(route.params.tab)
let accountData = {
  Username: '',
  firstName:  '',
  lastName:  '',
  email: '',
  phone: '',
  address: '',
  state: '',
}
const getUser = async () => {

  const userInfo = await getUserInfo()
  accountData.Username = userInfo.username
  accountData.firstName = userInfo.first_name
  accountData.lastName = userInfo.last_name
  accountData.email = userInfo.email
  console.log(accountData)
} 

onBeforeMount(async ()  => {
  await getUser()
})

// tabs
const tabs = [
  {
    title: 'Account',
    icon: 'mdi-account-outline',
    tab: 'account',
  },
  {
    title: 'Security',
    icon: 'mdi-lock-open-outline',
    tab: 'security',
  },

  // {
  //   title: 'Notifications',
  //   icon: 'mdi-bell-outline',
  //   tab: 'notification',
  // },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
      :touch="false"
    >
      <!-- Account -->
      <VWindowItem
        value="account"
        :user="accountData"
      >
        <AccountSettingsAccount />
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <AccountSettingsSecurity />
      </VWindowItem>
    </VWindow>
  </div>
</template>


<route lang="yaml">
meta:
  navActiveLink: pages-account-settings-tab
  requiresAuth: false
</route>