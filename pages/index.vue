<template>
  <ClientOnly>
    <div>
      <h1>Hello World</h1>
      <p>{{ data.greeting }}</p>
    </div>
  </ClientOnly>
</template>

<script setup>
const { $client } = useNuxtApp();
  const { data } = await $client.hello.useQuery({text:"hauvu"})
  console.log(data)
</script>
