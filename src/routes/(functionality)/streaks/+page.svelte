<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import StreakComponent from "$lib/components/modelComponents/StreakComponent.svelte";
	import { getTodayDateString } from "$lib/utils/helpers";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ streaks } = data)
</script>


<body>
    <div>Streaks</div>

    <button on:click={() => getModal('addStreakModal').open()}>Add streak</button>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each streaks as streak}
        <StreakComponent streak={streak}></StreakComponent>
    {/each}
    </div>    


    <Modal id="addStreakModal">
        <form
            method="POST"
            action="?/addStreak"
            use:enhance>

            <div class="flex flex-col mt-3">
                <label for="name">Name: </label>
                <input name="name" id="name" type="text" class="border-2">

                <label for="initialBreak">Starting from: </label>
                <input name="initialBreak" id="initialBreak" type="date" class="border-2"
                    value="{getTodayDateString()}">

                <button type="submit">
                    Add
                </button>
            </div>
        </form>
    </Modal>

</body>