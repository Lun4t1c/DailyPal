<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import FinancesPredictionComponent from "$lib/components/FinancesPredictionComponent.svelte";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import FinanceSourceComponent from "$lib/components/modelComponents/FinanceSourceComponent.svelte";
	import PlannedExpenseComponent from "$lib/components/modelComponents/PlannedExpenseComponent.svelte";
	import TransactionComponent from "$lib/components/modelComponents/TransactionComponent.svelte";
	import { getTodayDateString, getTotalAmountInPennies } from "$lib/utils/helpers";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ financeSources, transactions, plannedExpenses } = data)

    let _idFinanceSource: ObjectId | 'general';
    let isMonthly: boolean = false;

    function goToFinanceById(id: ObjectId): void {
        goto('/finances/source/' + id.toString());
    }

    function goToFinanceAdd(): void {
        goto('/finances/add');
    }

    function getTotalMoneyString(): string {
        return (getTotalAmountInPennies(financeSources) / 100)
            .toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2});
    }
</script>


<body>
    <div class="overflow-x-auto flex flex-row w-screen">
        {#each transactions.filter(t => !t.isMonthly) as transaction}
            <TransactionComponent transaction={transaction}></TransactionComponent>
        {/each}
    </div>

    <div class="h-0.5 w-screen bg-black mb-4"></div>

    <div class="flex flex-row justify-evenly">
        <div class="mr-5">
            <div>Finances</div>

            <button on:click={() => goToFinanceAdd()} class="btn btn-blue">Add finance source</button>
            <button on:click={() => getModal('AddTransactionModal').open()} class="btn btn-blue">Add transaction</button>
    
            <div class="flex-col p-5 bg-amber-500">
            {#each financeSources as financeSource}
                <FinanceSourceComponent financeSource={financeSource}></FinanceSourceComponent>
            {/each}
            </div>
    
            <div>
                Total: {getTotalMoneyString()}
            </div>
            
            <button on:click={() => getModal('PredictModal').open()}>Predict</button>
        </div>

        <div>
            Planned expenses
            <button on:click={() => getModal('PlannedExpenseModal').open()}>Plan new expense</button>

            <div class="overflow-y-scroll max-h-full bg-green-500">
                {#each plannedExpenses as plannedExpense}
                    <PlannedExpenseComponent 
                        plannedExpense={plannedExpense}
                        financeSources={financeSources}>
                    </PlannedExpenseComponent>
                {/each}
            </div>

        </div>
    </div>

    <Modal id="AddTransactionModal">
        <form method="POST" action="?/addTransaction" use:enhance>
            <div class="flex flex-col mt-3">
                {#if isMonthly !== true}
                    <label for="date">Date: </label>
                    <input name="date" id="date" type="date" 
                        value="{getTodayDateString()}">
                {:else}
                    <label for="date">Day of the month: </label>
                    <input name="date" id="date" type="number" value="1">
                {/if}
    
                <label for="amount">Amount: </label>
                <input name="amount" id="amount" type="number" step="0.01">

                <label for="description">Description (optional): </label>
                <input name="description" id="description" type="text">

                <label for="isMonthly">Is monthly: </label>
                <input name="isMonthly" id="isMonthly" type="checkbox" bind:checked={isMonthly}>

                {#each financeSources as financeSource}
                    <label>
                        <input name="_idFinanceSource" type="radio" value="{financeSource._id}" bind:group="{_idFinanceSource}">
                        {financeSource.name}
                    </label>
                    
                {/each}
    
                <button type="submit">
                    Add
                </button>
        </form>
    </Modal>

    <Modal id="PlannedExpenseModal">
        <form method="POST" action="?/addPlannedExpense" use:enhance>
            <div class="flex flex-col mt-3">
                <label for="valueInPennies">Amount: </label>
                <input name="valueInPennies" id="valueInPennies" type="number" step="0.01">

                <label for="description">Description (optional): </label>
                <input name="description" id="description" type="text">

                {#each financeSources as financeSource}
                    <label>
                        <input name="_idFinanceSource" type="radio" value="{financeSource._id}" bind:group="{_idFinanceSource}">
                        {financeSource.name}
                    </label>                    
                {/each}
                <label>
                    <input name="_idFinanceSource" type="radio" value="general" bind:group="{_idFinanceSource}">
                    General cost
                </label>
    
                <button type="submit">
                    Confirm
                </button>
        </form>
    </Modal>

    <Modal id="PredictModal">
        <FinancesPredictionComponent 
            financeSources={financeSources}
            monthlyTransactions={transactions.filter(t => t.isMonthly === true)}>
        </FinancesPredictionComponent>
    </Modal>
</body>