<template lang="">
    <div>
        test
    </div>
</template>
<script setup>
    const {$client} = useNuxtApp();
    const {data} = await useFetch("/api/categories");
    console.log(data.value);
    const {data: articles} =  await $client.article.getAll.useQuery();
    console.log(articles.value);
</script>
<style lang="">
    
</style>