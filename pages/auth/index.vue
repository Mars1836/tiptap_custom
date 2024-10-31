<template lang="">
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>
<script setup>
    const {data, error, isLoading} = useFetch('/api/auth/setToken');
    const message = data.value?.message;
</script>
<style lang="">
    
</style>