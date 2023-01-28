<script lang="ts">
	import type { FitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";

	export let fitnessMeasurements: FitnessMeasurementModel[];
</script>


<body>
    <div class="border-2 border-red-600 m-4">
        {#each fitnessMeasurements as fitnessMeasurement}
            <div>{fitnessMeasurement.date}</div>
        {/each}
    </div>
</body>