<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SuggestionModel } from "$lib/models/suggestionModel";
	import { SuggestionStatus } from "$lib/utils/enums";

    export let suggestion: SuggestionModel;

    function getClass(): string {
        let result: string = 'flex flex-row justify-between my-2 px-4 py-2 text-center ';

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
    <div class="{getClass()}">
        {suggestion.usersWhoLikedIds.length} | 
        {new Date(suggestion.date).toLocaleDateString()} | 
        {suggestion.description}
            
        {#if suggestion.isLikePossible}
            <form method="POST" action="?/likeSuggestion" use:enhance>
                <input type="hidden" name="_id" value="{suggestion._id}">
                <button type="submit" class="btn">+</button>
            </form>
        {/if}
        
        {#if suggestion.isOwner}
            <form method="POST" action="?/deleteSuggestion" use:enhance>
                <input type="hidden" name="_id" value="{suggestion._id}">
                <button type="submit" class="btn">Delete</button>
            </form>
        {/if}
    </div>
</body>