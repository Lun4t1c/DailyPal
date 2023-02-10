<script lang="ts">
	import type { SuggestionModel } from "$lib/models/suggestionModel";

    export let suggestion: SuggestionModel;
</script>


<body>
    <div class="bg-green-200 my-2 text-center px-4 py-2">
        {suggestion.description}
    </div>
</body>