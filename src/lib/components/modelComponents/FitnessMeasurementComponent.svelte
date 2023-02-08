<script lang="ts">
	import { enhance } from "$app/forms";
	import type { FitnessMeasurementModel } from "$lib/models/fitnessMeasurementModel";
	import { formatDate } from "$lib/utils/helpers";
	import type { ObjectId } from "mongodb";
	import Modal, { getModal } from "../Modal.svelte";

    export let fitnessMeasurement: FitnessMeasurementModel;
    export let previousFitnessMeasurement: FitnessMeasurementModel | null = null;
    
</script>


<body>
    <div>
        {formatDate(fitnessMeasurement.date)} - 
        BMI: {fitnessMeasurement.bmi} - 
        Weight: {fitnessMeasurement.weight}kg - 
        Body fat: {fitnessMeasurement.bodyFat}% - 
        Muscle mass: {fitnessMeasurement.muscleMass}kg
    </div>
</body>