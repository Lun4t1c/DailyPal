<script lang="ts">
	import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ financeSources } = data)
</script>


<!-- HTML -->
<body>
    <div>Finances</div>
    
    {#each financeSources as financeSource}
        <article>
            <h2>{financeSource.name}</h2>
            <h3>{financeSource.valueInPennies}</h3>
        </article>
    {/each}

</body>