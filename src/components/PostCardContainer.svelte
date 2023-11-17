<script>
    export let posts;
    import PostCard from "./PostCard.svelte";
</script>

<div class="w-full flex flex-wrap md:justify-between justify-center">
    {#each posts as post (post.id)}
        <PostCard
            username={post.username}
            shortcode={post.shortcode}
            likes={post.likes}
            views={post.views}
            comments={post.comments}
            engagement={post.engagement}
        ></PostCard>
    {/each}
</div>
