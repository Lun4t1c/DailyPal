<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";
	import Modal, { getModal } from "../Modal.svelte";

    export let financeSource: FinanceSourceModel;
</script>


<body>
    <div class="border-2 border-red-600 bg-white m-4">
        {financeSource.name} : {(financeSource.valueInPennies / 100).toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2})}
        <form method="POST" action="?/deleteFinanceSource" use:enhance>
            <input type="hidden" name="_id" hidden value="{financeSource._id}"/>
            <button type="submit" class="btn">Delete</button>
        </form>

        <button on:click={() => getModal('HardSetFinanceSourceModal' + financeSource._id).open()}>Hard set</button>
    </div>

    <Modal id="{'HardSetFinanceSourceModal' + financeSource._id}">
        <form method="POST" action="?/hardSetFinanceSourceAmount" use:enhance>
            <div class="flex flex-col mt-3">
                <input type="hidden" name="_id" value="{financeSource._id}">

                <div>{financeSource.name} ({financeSource.valueInPennies / 100})</div>
    
                <label for="amount">Amount: </label>
                <input name="amount" id="amount" type="number" step="0.01">
    
                <button type="submit">
                    Set
                </button>
        </form>
    </Modal>
</body>