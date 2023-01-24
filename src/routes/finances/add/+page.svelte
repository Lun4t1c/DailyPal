<script lang="ts">
	import { financeSourcesCollection } from "$db/financeSources";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";

    let name = '';
    let startingAmount = 0;

    function submit(): void {
        console.log('Submitting...');

        let financeSource: FinanceSourceModel = {
            id: null,
            name: name,
            valueInPennies: startingAmount
        }

        financeSourcesCollection.insertOne(financeSource);

        console.log('Done')
    }

</script>


<h1>Add new finance source:</h1>
<form on:submit={submit}>
    <div class="flex-col">
        <label for="nameInput">Name: </label>
        <input name="name" id="nameInput" class="border-2" type="text" bind:value={name}>

        <label for="startingAmount">Starting amount: </label>
        <input name="startingAmount" id="startingAmount" class="border-2" type="number" bind:value={startingAmount}>

        <button type="submit" class="border-2">Add</button>
    </div>
  </form>