<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
    import { page } from "$app/stores";
</script>

<nav class="px-4 py-3 bg-purple-900 text-white">
    <a class="mx-2 hover:underline" href="/">Home</a>
    <a class="mx-2 hover:underline" href="/todos">Todos</a>
    <a class="mx-2 hover:underline" href="/streaks">Streaks</a>
    <a class="mx-2 hover:underline" href="/fitness">Fitness</a>
    <a class="mx-2 hover:underline" href="/finances">Finances</a>
    <a class="mx-2 hover:underline" href="/about">About</a>

    <div class="bg-black">
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
                <button type="submit">Log out</button>
            </form>
        {/if}
    </div>
</nav>
