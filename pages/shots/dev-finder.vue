<script lang="ts" setup>
const title = 'Dev Finder App'

// SEO
useHead({ title })

// Query github user
type User = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

const config = useRuntimeConfig()
const username = ref('')

const {
  data: user,
  isFetching,
  error,
  refetch,
  isFetched
} = useQuery<User>({
  enabled: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: 0,
  gcTime: 0,
  staleTime: 0,
  queryKey: ['github-user', username],
  queryFn: () =>
    $fetch(`https://api.github.com/users/${username.value}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${config.public.githubApiToken}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
})

const searchUser = () => {
  if (isEmpty(username.value)) return

  refetch()
}

const isShowingUser = computed(() => user.value?.type === 'User')

const snackbar = useSnackbar()

watch(isFetched, (val) => {
  if (!val || isShowingUser.value || (!error.value && isShowingUser.value)) return

  snackbar.add({
    text: 'User not found.',
    type: 'error'
  })
})

const dayjs = useDayjs()

const joinedDate = computed(() => {
  if (!isShowingUser.value) return

  const formattedDate = dayjs(user.value!.created_at).format('DD MMM YYYY')

  return `Joined ${formattedDate}`
})

const bioText = computed(() => {
  if (!isShowingUser.value) return

  return user.value!.bio || 'This user has no bio.'
})

const userStatistics = computed(() => {
  if (!isShowingUser.value) return []

  return [
    {
      label: 'Repos',
      value: user.value!.public_repos
    },
    {
      label: 'Followers',
      value: user.value!.followers
    },
    {
      label: 'Following',
      value: user.value!.following
    }
  ]
})

const userProps = computed(() => {
  if (!isShowingUser.value) return []

  return [
    {
      icon: 'mdi:map-marker',
      value: user.value!.location,
      available: !isEmpty(user.value!.location)
    },
    {
      icon: 'mdi:link-variant',
      value: user.value!.blog,
      available: !isEmpty(user.value!.blog),
      isLink: true
    },
    {
      icon: 'mdi:twitter',
      value: user.value!.twitter_username,
      available: !isEmpty(user.value!.twitter_username),
      isLink: true
    },
    {
      icon: 'mdi:office-building',
      value: user.value!.company,
      available: !isEmpty(user.value!.company)
    }
  ]
})

// Theme toggle
const colorMode = useColorMode()
const isLightMode = computed(() => colorMode.value === 'light')

const switchColorMode = () => {
  colorMode.value = isLightMode.value ? 'dark' : 'light'
}
</script>

<template>
  <section class="root">
    <div class="flex w-full max-w-[36rem] flex-col gap-5 px-5 py-7 lg:max-w-[50rem]">
      <div class="mb-3 flex items-center justify-between">
        <h1 class="text-2xl font-bold">devfinder</h1>
        <button class="flex items-center justify-center gap-2 uppercase tracking-widest" @click="switchColorMode">
          {{ isLightMode ? 'Dark' : 'Light' }}
          <Icon
            :name="isLightMode ? 'material-symbols:dark-mode-rounded' : 'material-symbols:light-mode-rounded'"
            class="text-xl"
          />
        </button>
      </div>

      <form
        class="flex h-16 rounded-xl bg-[var(--color-card-bg)] shadow-xl transition-all"
        @submit.prevent="searchUser"
      >
        <label for="username" class="relative flex flex-1 gap-2">
          <Icon
            name="hugeicons:search-01"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-[var(--color-highlight)] transition-all"
          />
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full appearance-none rounded-xl bg-transparent pl-11 placeholder:text-[var(--color-subtext)]"
            placeholder="Search Github username..."
          />
        </label>
        <button :disabled="isFetching" class="search-btn" type="submit">
          <Icon v-if="isFetching" name="eos-icons:three-dots-loading" />
          <span v-else>Search</span>
        </button>
      </form>

      <transition-slide>
        <div
          v-if="isShowingUser"
          class="flex flex-col gap-8 rounded-xl bg-[var(--color-card-bg)] px-6 py-8 text-left shadow-xl transition-all sm:px-10 sm:py-12 lg:flex-row"
        >
          <img :src="user?.avatar_url" alt="" class="hidden h-40 w-40 rounded-full lg:block" />

          <div class="flex flex-1 flex-col gap-7 sm:gap-8">
            <div class="w-full">
              <div class="mb-6 flex w-full items-center gap-5 lg:items-start">
                <img
                  :src="user?.avatar_url"
                  alt=""
                  class="block h-20 w-20 rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 lg:hidden"
                />

                <div class="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div class="flex flex-col gap-2">
                    <h2 class="text-xl font-bold sm:text-2xl">{{ user!.name || 'Unknown' }}</h2>
                    <span class="text-[var(--color-highlight)]">@{{ user!.login }}</span>
                  </div>
                  <span class="mt-2 block text-[var(--color-subtext)] lg:mt-1">{{ joinedDate }}</span>
                </div>
              </div>

              <p class="text-[var(--color-subtext)]">{{ bioText }}</p>
            </div>

            <div
              class="grid grid-cols-3 gap-4 rounded-xl bg-[var(--color-bg)] px-6 py-4 text-center sm:px-8 sm:text-left"
            >
              <div
                v-for="(stat, index) in userStatistics"
                :key="index"
                class="flex flex-col items-center gap-2 sm:items-start"
              >
                <span class="text-[var(--color-subtext)]">{{ stat.label }}</span>
                <span class="text-lg font-bold sm:text-xl">{{ stat.value }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div
                v-for="(prop, index) in userProps"
                :key="index"
                class="flex items-center gap-3 text-[var(--color-subtext)]"
                :class="{
                  'opacity-50': !prop.available
                }"
              >
                <Icon :name="prop.icon" class="block h-5 w-5 min-w-5 text-[var(--color-text)]" />
                <span v-if="!prop.available">Not Available</span>
                <a v-else-if="prop.isLink" :href="prop.value!" target="_blank" class="overflow-hidden text-ellipsis">
                  {{ prop.value }}
                </a>
                <span v-else class="overflow-hidden text-ellipsis">{{ prop.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition-slide>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.root {
  @apply flex min-h-screen w-screen items-center justify-center bg-[var(--color-bg)] text-center font-['Space_Mono'] text-[var(--color-text)] transition-all;

  --color-bg: #141c31;
  --color-card-bg: #1f2a48;
  --color-text: #dbe5f6;
  --color-subtext: #9ea9bd;
  --color-highlight: #0279fe;

  html.light & {
    --color-bg: #f7f7ff;
    --color-card-bg: #fefefe;
    --color-text: #31353f;
    --color-subtext: #87919f;
    --color-highlight: #0779fa;
  }

  *:not([class*='text']) {
    @apply text-sm;
  }
}

.search-btn {
  @apply my-2 ml-3 mr-2 flex min-w-16 items-center justify-center rounded-md bg-[var(--color-highlight)] px-3 py-2 text-center text-white transition-all disabled:cursor-progress disabled:grayscale;

  --shadow-size: 0px;

  box-shadow: 0px 0px var(--shadow-size) 0px var(--color-highlight);

  &:hover {
    --shadow-size: 10px;
  }
}
</style>
