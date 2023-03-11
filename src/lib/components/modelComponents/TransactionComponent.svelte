<script lang="ts">
	import { enhance } from "$app/forms";
	import type { TransactionModel } from "$lib/models/transactionModel";
	import { formatPenniesToLocaleString } from "$lib/utils/helpers";
	import Modal, { getModal } from "../Modal.svelte";	

    export let transaction: TransactionModel;
</script>


<body class="flex flex-col border-2 border-black m-2 p-1 {transaction.amountInPennies > 0 ? 'bg-green-400' : 'bg-red-400'}">
    <div class="text-gray-800 text-xs">
        {new Date(transaction.date).toLocaleDateString()}
    </div>

    <div>{formatPenniesToLocaleString(transaction.amountInPennies)}</div>

    <div>{transaction.description}</div>
</body>