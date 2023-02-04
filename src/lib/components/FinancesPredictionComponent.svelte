<script lang="ts">
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import type { TransactionModel } from "$lib/models/transactionModel";
	import { getDifferenceInMonths } from "$lib/utils/helpers";

    export let financeSources: FinanceSourceModel[];
    export let monthlyTransactions: TransactionModel[];    

    let selectedDate: Date;
    let predictedAmountString: string;

    function getCurrentTotalAmountInPennies(): number {
        let result: number = 0;

        for (let i in financeSources){
            result += financeSources[i].valueInPennies;
        }

        return result;
    }

    function getMonthlyDifferenceInPennies(): number {
        let result: number = 0;

        for (let i in monthlyTransactions) {
            result += monthlyTransactions[i].amountInPennies;
        }

        return result;
    }

    function calculateFutureAmount(): void {
        let result: number = getCurrentTotalAmountInPennies();
        result += (getMonthlyDifferenceInPennies() * getDifferenceInMonths(new Date, new Date(selectedDate)));
        predictedAmountString =  (result / 100).toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2});
    }
</script>


<body>
    <div>Predictions</div>

    <label for="date">Select date:</label>
    <input id="date" type="date" 
        bind:value={selectedDate} 
        on:change={() => calculateFutureAmount()}>

    <div>Predicted amount: {predictedAmountString}</div>

</body>