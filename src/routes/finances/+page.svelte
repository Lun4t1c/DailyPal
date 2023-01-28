<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import FinanceSourceComponent from "$lib/components/modelComponents/FinanceSourceComponent.svelte";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ financeSources } = data)

    function goToFinanceById(id: ObjectId) {
        goto('/finances/source/' + id.toString());
    }

    function goToFinanceAdd(){
        goto('/finances/add');
    }
</script>


<body>
    <div>Finances</div>

    <button on:click={goToFinanceAdd}>Add finance source</button>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each financeSources as financeSource}
        <FinanceSourceComponent financeSource={financeSource}></FinanceSourceComponent>
    {/each}
    </div>    

</body>