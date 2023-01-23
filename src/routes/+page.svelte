<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ financeSources } = data)
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each financeSources as financeSource}
        <h2>{financeSource.name}</h2>
        <h3>{financeSource.valueInPennies}</h3>
{/each}
