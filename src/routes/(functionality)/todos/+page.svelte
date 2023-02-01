<script lang="ts">
    import Modal, { getModal } from "$lib/components/Modal.svelte";
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ todos } = data)
</script>


<body>
    

    <button on:click="{() => getModal('main').open()}" class="border-2 w-full mb-5">
        New todo
    </button>
    
    <div class="flex-col p-5 bg-amber-500">
    {#each todos as todo}
        <div class="border-2">
            <h2>{todo.title}</h2>

            <form
                method="POST"
                action="?/delete"
                use:enhance>
                <input type="hidden" name="_id" hidden value="{todo._id}"/>
                <button type="submit">Delete</button>
            </form>
        </div>
    {/each}
    </div>   
    

	<Modal id="main">
		<form
            method="POST"
            use:enhance>

            <div class="flex flex-col">
                <label for="title">Title: </label>
                <input name="title" id="title" class="border-2" type="text">

                <label for="remind">Remind: </label>
                <input name="remind" id="remind" type="date"class="border-2">

                <label for="deadline">Deadline: </label>
                <input name="deadline" id="deadline" type="date"class="border-2">

                <button type="submit" class="border-2 mt-5"
                on:click={() => getModal('main').close()}>
                    Add
                </button>
            </div>
        </form>
	</Modal>
</body>