<script lang="ts">
    import Modal, { getModal } from "$lib/components/Modal.svelte";
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";
	import TodoComponent from "$lib/components/modelComponents/TodoComponent.svelte";
	import type { TodoModel } from "$lib/models/todoModel";

    export let data: PageData;
    let updatedTodo: TodoModel | null = null;

    $: ({ todos } = data)
</script>


<body>
    <button on:click="{() => getModal('AddTodoModal').open()}" class="border-2 w-full mb-5">
        New todo
    </button>
    
    <div class="flex-col p-5 bg-amber-500">
        {#each todos.filter(t => !t.isDone) as todo}
            <TodoComponent todo={todo}></TodoComponent>
        {/each}
    </div>
        
    <div>
        Done
        {#each todos.filter(t => t.isDone) as todo}
            <TodoComponent todo={todo}></TodoComponent>
        {/each}
    </div>
    

	<Modal id="AddTodoModal">
		<form
            method="POST"
            action="?/addTodo"
            use:enhance>

            <div class="flex flex-col">
                <label for="title">Title: </label>
                <input name="title" id="title" class="border-2" type="text">

                <label for="remind">Remind: </label>
                <input name="remind" id="remind" type="date"class="border-2">

                <label for="deadline">Deadline: </label>
                <input name="deadline" id="deadline" type="date"class="border-2">

                <button type="submit" class="border-2 mt-5" on:click={() => getModal('main').close()}>
                    Add
                </button>
            </div>
        </form>
	</Modal>
</body>