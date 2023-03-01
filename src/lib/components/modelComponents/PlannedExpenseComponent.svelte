<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import type { PlannedExpenseModel } from "$lib/models/plannedExpenseModel";
	import { getTotalAmountInPennies, truncString } from "$lib/utils/helpers";
	import type { ObjectId } from "mongodb";
	import Modal, { getModal } from "../Modal.svelte";

    export let plannedExpense: PlannedExpenseModel;
    export let financeSources: FinanceSourceModel[];
    
    let _idFinanceSource: ObjectId | 'general' = plannedExpense._idFinanceSource;

    function calculatePercentageOfTotalString(): string {        
        return getPercentage().toString() + '%';
    }

    function getPercentage(): number {
        let totalInPennies: number = getTotalAmountInPennies(financeSources);
        return Math.round(((plannedExpense.valueInPennies / totalInPennies) * 100) * 100) / 100;
    }

    function getValueInPenniesLocaleString(): string {
        return (plannedExpense.valueInPennies / 100)
            .toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2});
    }

    function getPercentageDivClass(): string {
        let percentage = getPercentage();
        let cls: string = 'flex flex-row px-5 justify-evenly ';

        if (percentage < 15)
            return cls += 'bg-green-400';
        else if (15 < percentage && percentage < 49)
            return cls += 'bg-yellow-400';
        else if (49 < percentage)
            return cls += 'bg-red-400';

        return cls;
    }
</script>


<body>
    <div class="flex flex-row items-center border-2">
        <div class="bg-white m-2 p-2 w-full">
            <div class="text-center">
                {truncString(plannedExpense.description, 30)}
            </div>
            <div class="{getPercentageDivClass()}">
                
                <div>{getValueInPenniesLocaleString()}</div> 
                <div class="mx-3"></div>
                <div class="font-bold">
                    {calculatePercentageOfTotalString()}
                </div>

            </div>
        </div>

        <div class="flex flex-row justify-end w-full">
            <form
                method="POST"
                action="?/confirmPlannedExpense"
                use:enhance
                class="w-fit">
                <input type="hidden" name="_id" hidden value="{plannedExpense._id}"/>
                <button class="btn" type="submit">Confirm</button>
            </form>

            <button class="btn w-fit" on:click={() => getModal('UpdatePlannedExpenseModal').open()}>
                Edit
            </button>

            <form
                method="POST"
                action="?/deletePlannedExpense"
                use:enhance
                class="w-fit">
                <input type="hidden" name="_id" hidden value="{plannedExpense._id}"/>
                <button class="btn" type="submit">Delete</button>
            </form>
        </div>
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