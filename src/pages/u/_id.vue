<template>
  <div id="u">
    {{ userData }}
    <img :src="userData.picture" />
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return { 
      userData: { "email": "taishi.k0903@gmail.com", "userId": "M9sStVtpJYURadp8fi9YUa89oyI2", "lastLogin": 1537151120, "created": 1537093183, "displayName": "Taishi Kato", "picture": "https://res.cloudinary.com/guidesquare/image/upload/v1526218605/profile-default.png" }
    }
    // return { userData: context.req.maData.userData };
  }
}
</script>

<style scoped>
body {
  background-color: #f7f7f7;
}
</style>
