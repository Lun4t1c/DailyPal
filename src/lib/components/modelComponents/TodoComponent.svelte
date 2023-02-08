<script lang="ts">
	import { enhance } from "$app/forms";
	import type { TodoModel } from "$lib/models/todoModel";
	import Modal, { getModal } from "../Modal.svelte";

    export let todo: TodoModel;
</script>


<body>
    <div class="flex flex-row items-center border-2">
        <h2>{todo.title}</h2>

        <form
            method="POST"
            action="?/switchTodoIsDone"
            use:enhance>
            <input type="hidden" name="_id" value="{todo._id}"/>
            <button class="btn" type="submit">Done</button>
        </form>

        <button class="btn" type="submit" on:click={() => getModal('UpdateTodoModal').open()}>Edit</button>

        <form
            method="POST"
            action="?/deleteTodo"
            use:enhance>
            <input type="hidden" name="_id" value="{todo._id}"/>
            <button class="btn" type="submit">Delete</button>
        </form>
    </div>

    
    <Modal id="UpdateTodoModal">
        <form
            method="POST"
            action="?/updateTodo"
            use:enhance>
            <div class="flex flex-col">
                <input type="hidden" name="_id" value="{todo._id}"/>
                <input type="hidden" name="isDone" value="{todo.isDone}"/>

                <label for="title">Title: </label>
                <input name="title" id="title" type="text" value="{todo.title}"
                    class="border-2">

                <label for="remind">Remind: </label>
                <input name="remind" id="remind" type="date" value="{todo.remind}"
                    class="border-2">

                <label for="deadline">Deadline: </label>
                <input name="deadline" id="deadline" type="date" value="{todo.deadline}"
                    class="border-2">                

                <button type="submit" class="border-2 mt-5" on:click={() => getModal('main').close()}>
                    Save changes
                </button>
            </div>
        </form>
    </Modal>
</body>