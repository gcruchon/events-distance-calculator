<script>
    import { navigating } from '$app/stores'
  
    import { loading } from '$lib/loading'
    import Loading from '$lib/Loading.svelte'
  
    $: $loading = !!$navigating
  </script>
  
  <slot />
  
  <Loading />