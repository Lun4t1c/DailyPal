<script lang="ts">
    import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { ObjectId } from "mongodb";
    import type { PageData } from "./$types";

    export let data: PageData;

    $: ({ todos } = data)
</script>


<body>
    <div>Todo</div>
    
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

</body>