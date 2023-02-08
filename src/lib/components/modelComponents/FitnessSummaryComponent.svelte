<script lang="ts">
	import type { FitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";
	import FitnessMeasurementComponent from "./FitnessMeasurementComponent.svelte";

	export let fitnessMeasurements: FitnessMeasurementModel[];
</script>


<body>
    <div class="border-2 border-red-600 m-4 p-2">
        {#each fitnessMeasurements as fitnessMeasurement}
            <FitnessMeasurementComponent fitnessMeasurement={fitnessMeasurement}>
            </FitnessMeasurementComponent>
        {/each}
    </div>
</body>