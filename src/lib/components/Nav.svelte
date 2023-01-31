<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
</script>

<div class="flex">
    <nav class="px-4 py-3 bg-purple-900 text-white w-full">
        <a class="mx-2 hover:underline" href="/">Home</a>
        <a class="mx-2 hover:underline" href="/todos">Todos</a>
        <a class="mx-2 hover:underline" href="/streaks">Streaks</a>
        <a class="mx-2 hover:underline" href="/fitness">Fitness</a>
        <a class="mx-2 hover:underline" href="/finances">Finances</a>
        <a class="mx-2 hover:underline" href="/about">About</a>
    </nav>
    
    <div class="bg-black w-fit text-white">
        {#if !$page.data.user}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {/if}
    
        {#if $page.data.user}
            <form method="POST" action="/logout" use:enhance={() => {
                return async ({result}) => {
                    invalidateAll();
                    applyAction(result);
                }
            }}>
                <button class="" type="submit">Log out</button>
            </form>
        {/if}
    </div>
</div>