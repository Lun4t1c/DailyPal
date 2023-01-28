<script lang="ts">
	import { goto } from "$app/navigation";
	import FitnessSummaryComponent from "$lib/components/modelComponents/FitnessSummaryComponent.svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ fitnessMeasurements } = data)

    function gotoAddMeasurement(): void{
        goto('/fitness/measurements/add');
    }

</script>


<body>
    <button on:click={gotoAddMeasurement}>Add Measurement</button>
    <FitnessSummaryComponent fitnessMeasurements={fitnessMeasurements}></FitnessSummaryComponent>
</body>