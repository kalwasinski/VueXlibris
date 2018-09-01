<template>
  <div>
    <em>Zmień nazwę listy zakupów</em>
    <input :value="title" @input="onInput({ title: $event.target.value, id: id })"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['title', 'id'],
    methods: mapActions({
      onInput: 'changeTitle'
    })
  }
</script>

<style scoped>
</style>
