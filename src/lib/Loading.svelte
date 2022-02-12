<script lang="ts">
    import { loading } from '$lib/loading';
</script>

{#if $loading}
    <div class="position-fixed top-10 start-50 translate-middle">
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
{/if}
