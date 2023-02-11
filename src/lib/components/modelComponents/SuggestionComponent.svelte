<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SuggestionModel } from "$lib/models/suggestionModel";
	import { SuggestionStatus } from "$lib/utils/enums";
	import { formatDate } from "$lib/utils/helpers";

    export let suggestion: SuggestionModel;

    function getBgColorClass(): string {
        let result: string = '';

        switch (suggestion.status) {
            case SuggestionStatus.NOT_TOUCHED:
                result += 'bg-green-300';
                break;
            
            case SuggestionStatus.IN_PROGRESS:
                result += 'bg-blue-300';
                break;

            case SuggestionStatus.DISCARDED:
                result += 'bg-red-300';
                break;
        }

        return result;
    }
</script>


<body>
    <div class="flex flex-col my-1 {getBgColorClass()}">
        <div class="text-gray-700 text-xs m-1">
            {new Date(suggestion.date).toLocaleDateString()}
        </div>

        <div class="flex flex-row justify-between my-2 px-4 py-2 text-center">
            <div class="mr-4">
                {suggestion.description}
            </div>
            
            <div class="flex flex-row border-2">
                <div class="mr-3">
                    {suggestion.usersWhoLikedIds.length}
                </div>
                {#if suggestion.isLikePossible}
                    <form method="POST" action="?/likeSuggestion" use:enhance>
                        <input type="hidden" name="_id" value="{suggestion._id}">
                        <button type="submit" class="btn">+</button>
                    </form>
                {/if}
            </div>
        
            {#if suggestion.isOwner}
                <form method="POST" action="?/deleteSuggestion" use:enhance>
                    <input type="hidden" name="_id" value="{suggestion._id}">
                    <button type="submit" class="btn">Delete</button>
                </form>
            {/if}
        </div>

        <div>

        </div>
    </div>
</body>