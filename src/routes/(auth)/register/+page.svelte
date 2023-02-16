<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

    export let form: ActionData;
</script>


<body>
    <h1>Register</h1>

    <form method="POST" action="?/register" use:enhance>
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required class="border-2">
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required class="border-2">
        </div>

        <div>
            <label for="passwordConfirm">Confirm password</label>
            <input id="passwordConfirm" name="passwordConfirm" type="password" required class="border-2">
        </div>

        {#if form?.body.user}
            <p class="error">Username already taken.</p>
        {/if}
        {#if form?.body.passwordConfirm}
            <p class="error">Passwords are not identical.</p>
        {/if}

        <button class="btn" type="submit">Register</button>
    </form>
</body>