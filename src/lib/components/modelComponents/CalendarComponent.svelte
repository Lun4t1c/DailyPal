<script lang="ts">
	import type { StreakModel } from "$lib/models/streakModel";
	import type { TodoModel } from "$lib/models/todoModel";
	import type { TransactionModel } from "$lib/models/transactionModel";

    export let transactions: TransactionModel[] | null = null;
    export let streaks: StreakModel[] | null = null;
    export let todos: TodoModel[] | null = null;
</script>


<body>
    <div>Calendar yo</div>
</body>