<template>
  <div>
    {{ movie }}
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    return { movie: context.req.maData.apiResult };
  }
}
</script>

<style>

</style>
