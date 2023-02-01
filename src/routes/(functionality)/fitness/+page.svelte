<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import Modal, { getModal } from "$lib/components/Modal.svelte";
	import FitnessSummaryComponent from "$lib/components/modelComponents/FitnessSummaryComponent.svelte";
	import { getTodayDateString } from "$lib/utils/helpers";
	import type { PageData } from "./$types";

    export let data: PageData;
    $: ({ fitnessMeasurements } = data)

    function gotoAddMeasurement(): void{
        goto('/fitness/measurements/add');
    }

</script>


<body>
    <button on:click={() => getModal('main').open()}>Add Measurement</button>
    <FitnessSummaryComponent fitnessMeasurements={fitnessMeasurements}></FitnessSummaryComponent>

    <Modal id="main">
        <form
            method="POST"
            use:enhance>

            <div class="flex flex-col mt-3">
            <label for="date">Date: </label>
            <input name="date" id="date" type="date"class="border-2"
                value="{getTodayDateString()}">

            <label for="weight">Weight (kg): </label>
            <input name="weight" id="weight" type="number" step="0.1" min="0" class="border-2">

            <label for="bmi">BMI: </label>
            <input name="bmi" id="bmi" type="number" step="0.1" min="0" class="border-2">

            <label for="bodyFat">Body fat (%): </label>
            <input name="bodyFat" id="bodyFat" type="number" step="0.1" min="0" class="border-2">

            <label for="bodyWater">Body water: </label>
            <input name="bodyWater" id="bodyWater" type="number" step="0.1" min="0" class="border-2">

            <label for="muscleMass">Muscle mass (kg): </label>
            <input name="muscleMass" id="muscleMass" type="number" step="0.1" min="0" class="border-2">

            <label for="boneMass">Bone mass: </label>
            <input name="boneMass" id="boneMass" type="number" step="0.1" min="0" class="border-2">

            <label for="dci">DCI: </label>
            <input name="dci" id="dci" type="number" step="0.1" min="0" class="border-2">

            <label for="metabolicAge">Metabolic age: </label>
            <input name="metabolicAge" id="metabolicAge" type="number" step="0.1" min="0" class="border-2">

            <button type="submit">
                Add
            </button>
    </div>
</form>
    </Modal>
</body>