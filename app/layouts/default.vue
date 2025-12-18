<script setup lang="ts">
// 确保 session 在服务端已加载，避免 hydration mismatch
const { fetch } = useUserSession()
if (import.meta.server) {
  await fetch()
}
</script>

<template>
  <div class="min-h-screen bg-(--ui-bg) flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
