<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    
</script>

<button on:click={() => dispatch('click')} type="button" class="mt-10 self-center justify-self-center w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">More</button>
