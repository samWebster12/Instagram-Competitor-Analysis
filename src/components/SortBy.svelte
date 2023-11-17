<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let inputValue = "";
</script>

<div class="w-60 pb-10">
    <label
        for="sortby"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:text-center md:text-left"
        >Sort By</label
    >
    <select
        on:change={(e) => dispatch("sortby", e.target.value)}
        bind:value={inputValue}
        id="sortby"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option value="newest" selected>Newest</option>
        <option value="likes">Likes</option>
        <option value="views">Views</option>
        <option value="comments">Comments</option>
        <option value="engagement">Engagement</option>
    </select>
</div>
