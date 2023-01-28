<script lang="ts">
	import type { StreakModel } from "$lib/models/streakModel";

    export let streak: StreakModel;
</script>


<body>
    <div class="border-2 border-red-600 m-4">
        {streak.name}
    </div>
</body>