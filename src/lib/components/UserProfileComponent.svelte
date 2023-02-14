<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
    import { slide } from 'svelte/transition';

    let isExpanded = false;

    function switchIsExpanded(): void {
        isExpanded = !isExpanded;
    }
</script>


<body>
    <div class="bg-black w-full text-white">
        {#if !$page.data.user}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {/if}
    
        {#if $page.data.user}
            <div class="dropdown">
                <button class="dropbtn">Profile</button>

                <div class="dropdown-content">
                    <form method="POST" action="/logout" use:enhance={() => {
                        return async ({result}) => {
                            invalidateAll();
                            applyAction(result);
                        }
                    }}>
                        <button class="" type="submit">Log out</button>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</body>


<style>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
    z-index: 1;
    right: 0;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropbtn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown:hover .dropbtn {
    background-color: #3e8e41;
}
</style>