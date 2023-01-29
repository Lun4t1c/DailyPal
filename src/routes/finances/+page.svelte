<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import ComboBoxComponent from "$lib/components/ComboBoxComponent.svelte";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import FinanceSourceComponent from "$lib/components/modelComponents/FinanceSourceComponent.svelte";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import { getTodayDateString } from "$lib/utils/helpers";
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
    <button on:click={() => getModal('AddTransactionModal').open()} class="btn btn-blue">Add transaction</button>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each financeSources as financeSource}
        <FinanceSourceComponent financeSource={financeSource}></FinanceSourceComponent>
    {/each}
    </div>
    
    <div>
        Total: {getTotalMoney()} PLN
    </div>

    <Modal id="AddTransactionModal">
        <form method="POST" action="?/addTransaction" use:enhance>
            <div class="flex flex-col mt-3">
                <label for="date">Date: </label>
                <input name="date" id="date" type="date"class="border-2"
                    value="{getTodayDateString()}">
    
                <label for="amount">Amount: </label>
                <input name="amount" id="amount" type="number" step="0.01" class="border-2">

                <label for="isNegative">Is negative: </label>
                <input name="isNegative" id="isNegative" type="checkbox" class="border-2">

                <label for="isMonthly">Is monthly: </label>
                <input name="isMonthly" id="isMonthly" type="checkbox" class="border-2">
    
                <button type="submit">
                    Add
                </button>
        </form>
    </Modal>

</body>