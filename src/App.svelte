<script>
    const mode = import.meta.env.VITE_MODE;

    import {
        Navbar,
        NavLi,
        NavUl,
        NavHamburger,
        Spinner,
        Button,
        Dropdown,
        DropdownItem,
        DropdownDivider,
    } from "flowbite-svelte";
    import { ChevronDownOutline } from "flowbite-svelte-icons";

    import SearchBar from "./components/SearchBar.svelte";
    import PostCardContainer from "./components/PostCardContainer.svelte";
    import SortBy from "./components/SortBy.svelte";
    import HandleMore from "./components/HandleMore.svelte";

    import dummyPosts from "./lib/utils/dummyposts.js";

    const URL = "http://192.168.1.25:3005";
    let notloading = true;
    let viewPosts = false;
    let handlingMore = false;
    let userNotFound = false;
    let posts = [];
    let accountId;
    let endCursor;
    let username;
    let followedBy;
    let sortBySelected = "newest";

    async function handleSearch(username) {
        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        userNotFound = false;
        notloading = false;

        //DO THE SEARCH (Make a Call to the backend...)
        if (mode != "mock") {
            const response = await (
                await fetch(
                    `${URL}/api/instagram/getaccountinfo?username=${username.detail.inputValue}`,
                )
            ).json();

            //    console.log(response);

            if (JSON.stringify(response.data) == "{}") {
                userNotFound = true;
            } else {
                let newPosts = [];

                for (let post of response.data.graphql.user
                    .edge_owner_to_timeline_media.edges) {
                    let engagment =
                        ((post.node.edge_media_preview_like.count +
                            post.node.edge_media_to_comment.count) /
                            response.data.graphql.user.edge_followed_by.count) *
                        100;

                    newPosts.push({
                        username: username.detail.inputValue,
                        shortcode: post.node.shortcode,
                        age: post.node.taken_at_timestamp,
                        likes: post.node.edge_media_preview_like.count,
                        views: post.node.video_view_count,
                        comments: post.node.edge_media_to_comment.count,
                        engagement:
                            Math.round((engagment + Number.EPSILON) * 100) /
                            100,
                        id: Math.floor(Math.random() * 1000000),
                    });
                }
                endCursor =
                    response.data.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor.substring(
                        0,
                        response.data.graphql.user.edge_owner_to_timeline_media
                            .page_info.end_cursor.length - 2,
                    );
                username = username.detail.inputValue;
                accountId = response.data.graphql.user.id;
                followedBy = response.data.graphql.user.edge_followed_by.count;
                posts = newPosts;
                viewPosts = true;
            }
        } else {
            await delay(800);
            posts = dummyPosts;
            viewPosts = true;
        }

        //FINISH
        notloading = true;
    }

    async function handleMore() {
        handlingMore = true;
        const numberPosts = 40;
        /*   console.log(
            `${URL}/api/instagram/getposts?accountId=${accountId}&numberPosts=${numberPosts}&endCursor=${endCursor}`,
        );*/
        if (mode != "mock") {
            const response = await (
                await fetch(
                    `${URL}/api/instagram/getposts?accountId=${accountId}&numberPosts=${numberPosts}&endCursor=${endCursor}`,
                )
            ).json();

            //      console.log(response);

            let newPosts = posts;
            for (let post of response.data.data.user
                .edge_owner_to_timeline_media.edges) {
                let engagment =
                    ((post.node.edge_media_preview_like.count +
                        post.node.edge_media_to_comment.count) /
                        followedBy) *
                    100;
                newPosts.push({
                    username,
                    shortcode: post.node.shortcode,
                    age: post.node.taken_at_timestamp,
                    likes: post.node.edge_media_preview_like.count,
                    views: post.node.video_view_count,
                    comments: post.node.edge_media_to_comment.count,
                    engagement:
                        Math.round((engagment + Number.EPSILON) * 100) / 100,
                    id: Math.floor(Math.random() * 1000000),
                });
            }
            endCursor =
                response.data.data.user.edge_owner_to_timeline_media.page_info.end_cursor.substring(
                    0,
                    response.data.data.user.edge_owner_to_timeline_media
                        .page_info.end_cursor.length - 2,
                );
            newPosts = sortBy(newPosts, sortBySelected);
            posts = newPosts;
        } else {
            posts = [
                ...posts,
                {
                    username: "businessimperials",
                    shortcode: "CzTwZAjvRzf",
                    age: 11,
                    likes: 52,
                    views: 789,
                    comments: 224,
                    id: Math.floor(Math.random() * 1000000),
                },
            ];
        }

        handlingMore = false;
    }

    function sortByLikes(post1, post2) {
        if (post1.likes > post2.likes) return -1;
        else if (post1.likes < post2.likes) return 1;
        else return 0;
    }

    function sortByViews(post1, post2) {
        if (!post1.views) return 1;
        if (!post2.views) return -1;
        if (post1.views > post2.views) return -1;
        else if (post1.views < post2.views) return 1;
        else return 0;
    }

    function sortByComments(post1, post2) {
        if (post1.comments > post2.comments) return -1;
        else if (post1.comments < post2.comments) return 1;
        else return 0;
    }

    function sortByNewest(post1, post2) {
        if (post1.age > post2.age) return -1;
        else if (post1.age < post2.age) return 1;
        else return 0;
    }

    function sortByEngagement(post1, post2) {
        if (post1.engagement > post2.engagement) return -1;
        else if (post1.engagement < post2.engagement) return 1;
        else return 0;
    }

    function handleSortby(sortby) {
        sortBySelected = sortby.detail;
        posts = sortBy(posts, sortby.detail);
    }

    function sortBy(posts, sortByVal) {
        if (sortByVal == "newest") {
            posts = [...posts.sort(sortByNewest)];
        } else if (sortByVal == "likes") {
            posts = [...posts.sort(sortByLikes)];
        } else if (sortByVal == "comments") {
            posts = [...posts.sort(sortByComments)];
        } else if (sortByVal == "views") {
            posts = [...posts.sort(sortByViews)];
        } else if (sortByVal == "engagement") {
            posts = [...posts.sort(sortByEngagement)];
        }

        return posts;
    }
</script>

<main>
    <Navbar let:hidden let:toggle>
        <div class="flex justify-center w-full">
            <NavHamburger on:click={toggle} />
            <NavUl {hidden}>
                <NavLi href="/" active={true}>Home</NavLi>
                <NavLi href="/about">About</NavLi>
                <NavLi href="/pricing">Pricing</NavLi>
                <NavLi href="/contact">Contact</NavLi>
                <NavLi class="cursor-pointer">
                    Tools<ChevronDownOutline
                        class="w-2 h-2 ml-2 text-primary-800 dark:text-white inline"
                    />
                </NavLi>
                <Dropdown class="w-44 z-20">
                    <DropdownItem href="/">Post Fetcher</DropdownItem>
                    <DropdownItem href="/market-research"
                        >Market Research</DropdownItem
                    >
                </Dropdown>
            </NavUl>
        </div>
    </Navbar>
    <div class="pt-20">
        <div class="w-full flex justify-center pb-7">
            <div class="grid grid-cols-3">
                <!-- Invisible spacer with the same width as the left element -->
                <div class="col-span-1 flex justify-end">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        class="mr-3 h-full"
                        alt="Flowbite Logo"
                    />
                </div>

                <!-- Centered Element -->
                <span
                    class="self-center whitespace-nowrap text-5xl font-semibold dark:text-white col-start-2 col-span-1 text-center"
                >
                    ViralPeek
                </span>

                <div class="col-span-1"></div>
            </div>
        </div>

        <div class="flex justify-center">
            {#if notloading}
                <div class="w-1/2">
                    <SearchBar on:search={handleSearch}></SearchBar>
                </div>
            {/if}
        </div>

        {#if viewPosts && notloading}
            <div class="w-full flex justify-center py-12">
                <div class="w-10/12 flex flex-col items-center md:items-start">
                    <SortBy on:sortby={handleSortby}></SortBy>
                    <PostCardContainer bind:posts></PostCardContainer>
                    {#if !handlingMore}
                        <HandleMore on:click={handleMore}>More</HandleMore>
                    {/if}
                </div>
            </div>
        {/if}

        {#if userNotFound}
            <div class="flex w-full justify-center pt-10">
                <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    <span class="font-medium">User Not Found!</span> Try typing another
                    username
                </div>
            </div>
        {/if}

        {#if !notloading || handlingMore}
            <div class="flex justify-center">
                <div class="pt-10 pb-10">
                    <Spinner color={"blue"} size={"9"}></Spinner>
                </div>
            </div>
        {/if}
    </div>
</main>
