<script lang="ts">
	import type { TodoModel } from "$lib/models/todoModel";

    export let todo: TodoModel;
</script>


<body>
    <div class="border-2 border-red-600 m-4">
        {todo.title}
    </div>
</body>