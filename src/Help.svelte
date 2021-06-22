<script>
    export let doClose;
</script>

<div class="help">
    <button on:click={doClose}>Close</button>
    <h1>Usage</h1>
    <p>Select a directory on the main screen. While viewing images, the following commands will work:</p>
    <table>
        <thead>
        <tr>
            <td>Command</td>
            <td>Description</td>
            <td>Shortcut keys</td>
        </tr>
        </thead>
        <tr>
            <td>Next Image</td>
            <td>Click/Tap in the lower 75% of the screen</td>
            <td>Right Arrow; Space bar</td>
        </tr>
        <tr>
            <td>Previous Image</td>
            <td>Click/Tap in the top left or top right corner</td>
            <td>Left Arrow</td>
        </tr>
        <tr>
            <td>Back to Index</td>
            <td>Click/Tap in the top center</td>
            <td>Escape; Q</td>
        </tr>
    </table>
</div>

<style>

    .help {
        color: #dddddd;
        margin: 2em;
    }

    button {
        float: right;
        border-radius: 0.5em;
        background:linear-gradient( 180deg, #7b81ec, #3bd1d3);
        cursor: pointer;
    }

    div table {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        border: 1px solid #666666;
    }

    div table thead {
        background-color: #222222;
        font-weight: bold;
    }
    div table thead td {
        padding: 1em;
    }
</style>