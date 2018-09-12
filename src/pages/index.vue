<template>
  <div class="container">
    <div class="field">
      <form action="/search" method="get">
        <div class="control">
          <input class="input is-rounded" type="text" name="query" placeholder="Normal input">
        </div>
        <div class="control">
          <input type="submit" class="button is-primary" placeholder="Normal input" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  }
}
</script>

<style>
</style>

