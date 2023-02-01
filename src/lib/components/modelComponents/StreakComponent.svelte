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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let id = streak._id;

        const res = await fetch('/streaks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        const data = await res.json();
    };
</script>


<body>
    <div class="border-2">
        <h2>{streak.name}</h2>
        <div>{getDaysPassedString()}</div>

        <form
            method="POST"
            action="?/deleteStreak"
            use:enhance>
            <input type="hidden" name="_id" hidden value="{streak._id}"/>
            <button type="submit">Delete</button>
        </form>
    </div>
</body>