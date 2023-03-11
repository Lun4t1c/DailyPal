<script lang="ts">
	
	import UserProfileComponent from "./UserProfileComponent.svelte";
</script>

<div class="flex fixed top-0 w-full">
    <nav class="px-4 py-3 bg-purple-900 text-white w-full">
        <a class="mx-2 hover:underline" href="/">Home</a>
        <a class="mx-2 hover:underline" href="/todos">Todos</a>
        <a class="mx-2 hover:underline" href="/streaks">Streaks</a>
        <a class="mx-2 hover:underline" href="/fitness">Fitness</a>
        <a class="mx-2 hover:underline" href="/finances">Finances</a>
        <a class="mx-2 hover:underline" href="/calendar">Calendar</a>
        <a class="mx-2 hover:underline" href="/about">About</a>
        <a class="mx-2 hover:underline" href="/suggestions">Suggestions</a>
    </nav>
    
    <UserProfileComponent />
</div>