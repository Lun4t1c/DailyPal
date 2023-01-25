<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ financeSources } = data)

    function goToFinanceById(id: ObjectId) {
        goto('/finances/source/' + id.toString());
    }
</script>



<body>
    <div>Finances</div>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each financeSources as financeSource}        
        <div class="border-2">
            <h2>{financeSource.name}</h2>
            <h3>{financeSource.valueInPennies / 100}</h3>

            <button on:click={() => goToFinanceById(financeSource._id)}
                class="border-2 p-1 m-1 bg-white">
                Check
            </button>

            <form
                method="POST"
                action="?/delete"
                use:enhance>
                <input type="hidden" name="_id" hidden value="{financeSource._id}"/>
                <button type="submit">Delete</button>
            </form>
        </div>
    {/each}
    </div>    

</body>