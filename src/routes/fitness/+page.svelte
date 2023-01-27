<script lang="ts">
	import { goto } from "$app/navigation";

    function gotoAddMeasurement(): void{
        goto('/fitness/measurements/add');
    }

</script>


<body>
    <button on:click={gotoAddMeasurement}>Add Measurement</button>
</body>