<script>
    export let doShowHelp;
    export let currentPath;
    export let basePath;
    export let doHome;
</script>

<header>
    <h1>Canvas Omnibus</h1>

    <button class="right" on:click={doShowHelp}>Help</button>
    {#if currentPath !== basePath}
        <button class="right" on:click={doHome}>Home</button>
    {/if}

</header>

<style>
    header {
        color: #dddddd;
        background-color: #222222;
        margin-top: 4px;
        padding-top: 1px;
        padding-left: 1em;
        padding-right: 1em;
        text-align: left;
        font-weight: bold;
        height: 2.5em;
    }

    header h1 {
        margin: 0;
        padding: 0;
        float: left;
        font-style: oblique;
    }

    header button {
        float: right;
        padding-left: 1em;
        padding-right: 1em;
        background:linear-gradient( 180deg, #727a89, #A9Aefa );
        cursor: pointer;
        border-radius: 0.5em;
        margin-right: 1em;
    }
</style>