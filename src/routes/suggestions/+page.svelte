<script lang="ts">
    import type { PageData } from "./$types";
	import { enhance } from "$app/forms";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import SuggestionComponent from "$lib/components/modelComponents/SuggestionComponent.svelte";

    export let data: PageData;
    $: ({ suggestions } = data)
</script>


<body>
    <button on:click={() => getModal('AddSuggestionModal').open()}>Add suggestion</button>

    <div class="flex flex-col justify-center">
        {#each suggestions as suggestion}
            <SuggestionComponent suggestion={suggestion}>
            </SuggestionComponent>
        {/each}
    </div>

    <Modal id="AddSuggestionModal">
        <form method="POST" action="?/addSuggestion" use:enhance
            class="flex flex-col">
            <label for="description">Description:</label>
            <textarea id="description" name="description"
                class="border-3 bg-gray-200 p-2 w-80 h-40"></textarea>

            <button class="btn" type="submit">Add</button>
        </form>
    </Modal>
</body>