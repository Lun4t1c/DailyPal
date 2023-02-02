<script lang="ts">
	import { enhance } from "$app/forms";
	import type { StreakModel } from "$lib/models/streakModel";

    export let streak: StreakModel;

    function getLastBreak(): Date | null {
        if (streak.breaks.length <= 0) return null;
        
        let result: Date = streak.breaks[streak.breaks.length - 1];
        return new Date(result);
    }

    function getDaysPassedString(): string {
        let days: number = 0;
        let lastBrake = getLastBreak();

        if (lastBrake !== null){
            const diff = Math.abs(new Date().getTime() - lastBrake.getTime());
            days = Math.ceil(diff / (1000 * 3600 * 24)) - 1;
        }

        return days + ' days';
    }
</script>


<body>
    <div class="flex flex-col justify-center m-1 bg-white border-2">
        <h2 class="self-center">{streak.name}</h2>
        <div class="self-center">{getDaysPassedString()}</div>

        <form
            method="POST"
            action="?/breakStreak"
            use:enhance>

            <input type="hidden" name="_id" hidden value="{streak._id}"/>
            <input type="hidden" name="breakDate" hidden value="{new Date()}"/>
            <button type="submit" class="bg-black w-full">Break</button>
        </form>

        <form
            method="POST"
            action="?/deleteStreak"
            use:enhance>

            <input type="hidden" name="_id" hidden value="{streak._id}"/>
            <button type="submit" class="bg-black w-full">Delete</button>
        </form>
    </div>
</body>