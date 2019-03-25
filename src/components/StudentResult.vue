<template>
  <div class="wpb_column vc_column_container vc_col-sm-10 vc_col-lg-6 vc_col-md-6 vc_col-has-fill">
    <div class="vc_column-inner vc_custom_1522004935044 wpb_wrapper bd-callout bd-callout-colorGold">
      <p class="niceFont">{{message}}</p>
    </div>
  </div>

</template>>


<style>

  .bd-callout {
    padding: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid #eee;
    border-left-width: 0.4rem;
    border-radius: .25rem;
    background: beige;
  }

  .bd-callout-colorNavy {
    border-left-color: #5bc0de;
  }

  .bd-callout-colorNavy h4 {
    color: #17a2b8;
  }

  .bd-callout-colorGold {
    border-left-color: #ffc107;
  }
  .bd-callout-colorGold h4{
    color: #f0ad4e;
  }

</style>

<script>
  export default {
    name:'studentResult',
    props:['message']
  }

</script>
