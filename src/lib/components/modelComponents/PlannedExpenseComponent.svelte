<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import type { PlannedExpenseModel } from "$lib/models/plannedExpenseModel";
	import type { ObjectId } from "mongodb";
	import Modal, { getModal } from "../Modal.svelte";

    export let plannedExpense: PlannedExpenseModel;
    export let financeSources: FinanceSourceModel[];
    
    let _idFinanceSource: ObjectId | 'general' = plannedExpense._idFinanceSource;
</script>


<body>
    <div class="flex flex-row items-center border-2">
        <div class="bg-white m-2 p-2">
            {plannedExpense.description} : {(plannedExpense.valueInPennies / 100).toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2})}
        </div>

        <form
            method="POST"
            action="?/confirmPlannedExpense"
            use:enhance>
            <input type="hidden" name="_id" hidden value="{plannedExpense._id}"/>
            <button class="btn" type="submit">Confirm</button>
        </form>

        <button class="btn" on:click={() => getModal('UpdatePlannedExpenseModal').open()}>Edit</button>

        <form
            method="POST"
            action="?/deletePlannedExpense"
            use:enhance>
            <input type="hidden" name="_id" hidden value="{plannedExpense._id}"/>
            <button class="btn" type="submit">Delete</button>
        </form>
    </div>

    
    <Modal id="UpdatePlannedExpenseModal">
        <form method="POST" action="?/updatePlannedExpense" use:enhance>
            <div class="flex flex-col mt-3">
                <input type="hidden" name="_id" value="{plannedExpense._id}">

                <label for="valueInPennies">Amount: </label>
                <input name="valueInPennies" id="valueInPennies" type="number" step="0.01" 
                    value="{plannedExpense.valueInPennies / 100}">

                <label for="description">Description (optional): </label>
                <input name="description" id="description" type="text" 
                    value="{plannedExpense.description}">

                <label for="isTakenIntoAccount">Is taken into account: </label>
                <input name="isTakenIntoAccount" id="isTakenIntoAccount" type="checkbox" 
                    bind:checked="{plannedExpense.isTakenIntoAccount}">

                {#each financeSources as financeSource}
                    <label>
                        <input name="_idFinanceSource" type="radio" 
                            value="{financeSource._id}" bind:group="{_idFinanceSource}">
                        {financeSource.name}
                    </label>                    
                {/each}
                <label>
                    <input name="_idFinanceSource" type="radio" 
                        value="general" bind:group="{_idFinanceSource}">
                    General cost
                </label>
    
                <button type="submit">
                    Confirm
                </button>
        </form>
    </Modal>
</body>