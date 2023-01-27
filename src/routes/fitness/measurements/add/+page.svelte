<script lang="ts">
	import { enhance } from "$app/forms"; 
    
    function getTodayDateString(): string{
        let today: Date = new Date();
        let month: string = '' + (today.getMonth() + 1);
        let day: string = '' + today.getDate();
        let year: string = today.getFullYear().toString();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        let dateString: string = [year, month, day].join('-');
        return dateString
    }
</script>


<h1>Add new measurement:</h1>
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

        <button type="submit" class="
        border-2 mt-6 
        hover:border-green-700 hover:bg-orange-400/50
        active:bg-orange-400"
        >
            Add
        </button>
    </div>
</form>