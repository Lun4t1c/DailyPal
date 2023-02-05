<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import type { ActionData } from "../../$types";

    export let form: ActionData;

    function resetForm(): void{        
        if (form !== undefined && form !== null){
            form.body.credentials = false;
        }
    }
</script>


<h1>Login</h1>

<body>
    <form method="POST" action="?/login" use:enhance={() => {
        return async ({ result }) => {
            invalidateAll();
            await applyAction(result);
        }
    }}>
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required class="border-2">
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required class="border-2">
        </div>

        {#if form?.body.invalid}
            <div>Username or password is required.</div>
        {/if}

        {#if form?.body.credentials}
            <div>Username or password is wrong.</div>
        {/if}

        <button class="btn" type="submit" on:click={() => resetForm()}>Log in.</button>
    </form>
</body>