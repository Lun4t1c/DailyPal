<script lang="ts">
	import { enhance } from "$app/forms";

    let name = '';
    let startingAmount = 0;
</script>


<h1>Add new finance source:</h1>
<form
    method="POST"
    use:enhance>

    <div class="flex-col">
        <label for="nameInput">Name: </label>
        <input name="name" id="nameInput" class="border-2" type="text" bind:value={name}>

        <label for="startingAmount">Starting amount: </label>
        <input name="startingAmount" id="startingAmount" type="number" step="0.01" class="border-2" bind:value={startingAmount}>

        <button type="submit" class="border-2">Add</button>
    </div>
</form>