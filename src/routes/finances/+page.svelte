<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import FinanceSourceComponent from "$lib/components/modelComponents/FinanceSourceComponent.svelte";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ financeSources } = data)

    function goToFinanceById(id: ObjectId): void {
        goto('/finances/source/' + id.toString());
    }

    function goToFinanceAdd(): void {
        goto('/finances/add');
    }

    function getTotalMoney(): number {
        let result: number = 0;

        for (let i in financeSources) {
            result += financeSources[i].valueInPennies;
        }

        result /= 100;
        return result;
    }
</script>


<body>
    <div>Finances</div>

    <button on:click={goToFinanceAdd} class="btn btn-blue">Add finance source</button>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each financeSources as financeSource}
        <FinanceSourceComponent financeSource={financeSource}></FinanceSourceComponent>
    {/each}
    </div>
    
    <div>
        Total: {getTotalMoney()} PLN
    </div>

</body>