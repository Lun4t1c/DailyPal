<script lang="ts">
	import { enhance } from "$app/forms";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import TransactionsListEntryComponent from "$lib/components/modelComponents/TransactionsListEntryComponent.svelte";
	import type { TransactionModel } from "$lib/models/transactionModel";
	import { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ financeSources, transactions } = data)

    let transactionBuffer: TransactionModel = {
		_idUser: new ObjectId('63ded1bed6656453041c2c83'),
		_idFinanceSource: new ObjectId('63ded1bed6656453041c2c83'),
		amountInPennies: 0,
		description: 'null',
		date: 0,
		isMonthly: false
	};
    let _idFinanceSource: ObjectId = transactionBuffer._idFinanceSource;

    function getSortedOneTimeTransactions(): TransactionModel[] {
        return transactions
            .filter((t: TransactionModel) => { return !t.isMonthly })
            .sort((a: any, b: any) => {
                return new Date(b.date) - new Date(a.date);
            });
    }

    function editTransaction(transaction: TransactionModel): void {
        transactionBuffer = transaction;
        getModal('UpdateTransactionModal').open();
    }
</script>


<body>
    <div>trans list yo</div>

    <div class="flex flex-row justify-start">
        <div class="flex flex-col">
            One-time transactions
            {#each getSortedOneTimeTransactions() as transaction}
                <TransactionsListEntryComponent transaction={transaction}></TransactionsListEntryComponent>
                <button on:click={() => editTransaction(transaction)} class="mb-4">
                    Edit
                </button>
            {/each}
        </div>

        <div class="mx-5"></div>
    
        <div class="flex flex-col">
            Monthly transactions
            {#each transactions.filter((t) => { return t.isMonthly }) as transaction}
                <TransactionsListEntryComponent transaction={transaction}></TransactionsListEntryComponent>
            {/each}
        </div>
    </div>

    <Modal id="UpdateTransactionModal">
        <form method="POST" action="?/updatePlannedExpense" use:enhance>
            <div class="flex flex-col mt-3">
                <input type="hidden" name="_id" value="{transactionBuffer._id}">
                <input type="hidden" name="isMonthly" value="{transactionBuffer.isMonthly}">
                
                <div class="flex flex-col mt-3">
                    <label for="date">Date: </label>
                    <input name="date" id="date" type="date" 
                        value="{transactionBuffer.date}">
        
                    <label for="amount">Amount: </label>
                    <input name="amount" id="amount" type="number" step="0.01"
                        value="{transactionBuffer.amountInPennies * 100}">
    
                    <label for="description">Description (optional): </label>
                    <input name="description" id="description" type="text"
                        value="{transactionBuffer.description}">
    
                    <label for="isMonthly">Is monthly: </label>
                    <input name="isMonthly" id="isMonthly" type="checkbox" 
                        bind:checked={transactionBuffer.isMonthly}>
    
                    {#each financeSources as financeSource}
                        <label>
                            <input name="_idFinanceSource" type="radio" value="{financeSource._id}" bind:group="{_idFinanceSource}">
                            {financeSource.name}
                        </label>
                        
                    {/each}
        
                    <button type="submit">
                        Confirm
                    </button>
        </form>
    </Modal>
</body>