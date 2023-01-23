<script lang="ts">

    let name = '';
    let startingAmount = 0;

    function submit(): void {
        console.log('Submitting...');
    }

</script>

<h1>Add new finance source:</h1>
<form on:submit={submit}>
    <div class="flex-col">
        <label for="nameInput">Name: </label>
        <input id="nameInput" class="border-2" type="text" bind:value={name}>

        <label for="startingAmount">Starting amount: </label>
        <input id="startingAmount" class="border-2" type="number" bind:value={startingAmount}>

        <button type="submit" class="border-2">Add</button>
    </div>
  </form>