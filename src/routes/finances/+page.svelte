<script lang="ts">

    async function load(): Promise<void> {
        console.log("get test func yo");    
    }

</script>


<!-- HTML -->
<body>
    <div>Finances</div>
    <button on:click={() => load()}>test</button>
</body>