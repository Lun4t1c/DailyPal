<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import type { TransactionModel } from "$lib/models/transactionModel";
	import { formatDate, formatPenniesToLocaleString } from "$lib/utils/helpers";
	import type { ObjectId } from "mongodb";
	import Modal, { getModal } from "../Modal.svelte";

    export let transaction: TransactionModel;
    export let financeSources: FinanceSourceModel[];

    let _idFinanceSource: ObjectId = transaction._idFinanceSource;
</script>


<body class="flex flex-col border-2 border-black m-2 p-1 {transaction.amountInPennies > 0 ? 'bg-green-400' : 'bg-red-400'}">
    <div class="text-gray-800 text-xs">
        {new Date(transaction.date).toLocaleDateString()}
    </div>

    <div>{formatPenniesToLocaleString(transaction.amountInPennies)}</div>

    <div>{transaction.description}</div>

    <button on:click={() => {getModal('UpdateTransactionModal' + transaction._id).open(); console.log(transaction._id)}}>
        Edit
    </button>


    <Modal id="{'UpdateTransactionModal' + transaction._id}">
        <form method="POST" action="?/updateTransaction" use:enhance>
            <div class="flex flex-col mt-3">
                <input type="hidden" name="_id" value="{transaction._id}">
                <input type="hidden" name="isMonthly" value="{transaction.isMonthly}">
                
                <div class="flex flex-col mt-3">
                    <label for="date">Date: </label>
                    <input name="date" id="date" type="date" 
                        value="{formatDate(transaction.date)}">
        
                    <label for="amount">Amount: </label>
                    <input name="amount" id="amount" type="number" step="0.01"
                        value="{transaction.amountInPennies / 100}">
    
                    <label for="description">Description (optional): </label>
                    <input name="description" id="description" type="text"
                        value="{transaction.description}">
    
                    <label for="isMonthly">Is monthly: </label>
                    <input name="isMonthly" id="isMonthly" type="checkbox" 
                        bind:checked={transaction.isMonthly}>
    
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