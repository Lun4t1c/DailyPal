<script>
    import "../app.css";
    import Nav from "$lib/components/Nav.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<title>DailyPal</title>

<Nav />

<div class="flex h-96">
    <div class="m-auto">
        <slot />
    </div>
</div>

<Footer />