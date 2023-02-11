<script lang="ts">
	import { enhance } from "$app/forms";
	import type { SuggestionModel } from "$lib/models/suggestionModel";

    export let suggestion: SuggestionModel;
</script>


<body>
    <div class="flex flex-row justify-between my-2 px-4 py-2 bg-green-200 text-center">
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