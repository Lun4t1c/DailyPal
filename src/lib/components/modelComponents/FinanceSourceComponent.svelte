<script lang="ts">
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";

    export let financeSource: FinanceSourceModel;
</script>


<body>
    <div class="border-2 border-red-600 m-4">
        {financeSource.name}
    </div>
</body>