<script lang="ts">
	import { enhance } from "$app/forms";
	import type { TodoModel } from "$lib/models/todoModel";

    export let todo: TodoModel;
</script>


<body>
    <div class="border-2">
        <h2>{todo.title}</h2>

        <form
            method="POST"
            action="?/deleteTodo"
            use:enhance>
            <input type="hidden" name="_id" hidden value="{todo._id}"/>
            <button type="submit">Delete</button>
        </form>
    </div>
</body>