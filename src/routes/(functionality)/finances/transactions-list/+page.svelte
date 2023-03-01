<script lang="ts">
	import type { PageData } from "../$types";

    export let data: PageData;
    $: ({ transactions } = data)
</script>


<body>
    <div>trans list yo</div>
</body>