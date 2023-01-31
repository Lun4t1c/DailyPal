<script lang="ts">
	import type { ActionData } from "../$types";

    export let form: ActionData;
</script>


<body>
    <form method="POST" action="?/login">
        <div>
            <label for="username">Username</label>
            <input id="username" name="username" type="text" required class="border-2">
        </div>

        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" required class="border-2">
        </div>

        {#if form?.invalid}
            <p class="error">Username or password is required.</p>
        {/if}

        {#if form?.credentials}
            <p class="error">Username or password is wrong.</p>
        {/if}

        <button class="btn" type="submit">Log in.</button>
    </form>
</body>