<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FinanceSourceModel } from "$lib/models/financeSourceModel";

    export let financeSource: FinanceSourceModel;
</script>


<body>
    <div class="border-2 border-red-600 bg-white m-4">
        {financeSource.name} : {(financeSource.valueInPennies / 100).toLocaleString("pl-PL", {style: "currency", currency: "PLN", minimumFractionDigits: 2})}
        <form method="POST" action="?/deleteFinanceSource" use:enhance>
            <input type="hidden" name="_id" hidden value="{financeSource._id}"/>
            <button type="submit" class="btn">Delete</button>
        </form>
    </div>
</body>