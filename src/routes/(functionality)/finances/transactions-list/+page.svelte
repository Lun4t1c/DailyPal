<script lang="ts">
	import TransactionsListEntryComponent from "$lib/components/modelComponents/TransactionsListEntryComponent.svelte";
	import type { TransactionModel } from "$lib/models/transactionModel";
    import type { PageData } from "../$types";

    export let data: PageData;
    $: ({ transactions } = data)

    function getSortedOneTimeTransactions(): TransactionModel[] {
        return transactions
            .filter((t: TransactionModel) => { return !t.isMonthly })
            .sort((a: any, b: any) => {
                return new Date(b.date) - new Date(a.date);
            });
    }
</script>


<body>
    <div>trans list yo</div>

    <div class="flex flex-row justify-start">
        <div class="flex flex-col">
            One-time transactions
            {#each getSortedOneTimeTransactions() as transaction}
                <TransactionsListEntryComponent transaction={transaction}></TransactionsListEntryComponent>
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

</body>