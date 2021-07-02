<script>
	import {getDirectories, getLinks} from "./files";
	import Header from "./Header.svelte";
	import Help from "./Help.svelte";

	export let basePath;

	let currentPath = basePath;
	let currentImageIndex = 0;
	let imageUrl = '';

	let directories = [];
	let images = [];
	let page = "";

	loadPath(currentPath)

	async function loadPath(path) {
		console.log('Loading ' + path + '...');
		let links = await getLinks(path)
		currentPath = path;
		directories = links.filter(e => e.type === 'directory')
		images = links.filter(e => e.type === 'image')

		if (directories.length > 0) {
			showDirectoryList();
		} else if (images.length > 0) {
			showRandomImage();
		} else {
			alert('no images found');
		}
	}

	function showDirectoryList() {
		page = 'directoryList';
	}

	function showHome() {
		loadPath(basePath);
	}

	function showRandomImage() {
		page = 'slide';
		currentImageIndex = Math.floor(Math.random() * images.length);
		imageUrl = images[currentImageIndex].url;
	}

	function showNext() {
		if (currentImageIndex < images.length - 1) {
			currentImageIndex += 1;
		} else {
			currentImageIndex = 0;
		}
		imageUrl = images[currentImageIndex].url;
	}

	function showPrev() {
		if (currentImageIndex > 0) {
			currentImageIndex -= 1;
		} else {
			currentImageIndex = images.length - 1;
		}
		imageUrl = images[currentImageIndex].url;
	}

	function showHelp() {
		if (page !== 'help') {
			page = 'help';
		} else {
			page = 'directoryList';
		}
	}

	function handleKeydown(event) {
		if (page === 'slide' || page === 'help') {
			switch (event.key) {
				case "ArrowLeft":
					showPrev();
					break;
				case "ArrowRight":
				case " ":
					showNext();
					break;
				case "Escape":
				case "q":
				case "Q":
					showDirectoryList();
					break;
			}
		}
	}

</script>

<svelte:window on:keydown={handleKeydown}/>

<main>
	{#if page === 'slide'}
		<div class="fullscreen" id="fullscreen" style="background-image: url('{imageUrl}')">
			<div class="nav navUp" on:click="{showDirectoryList}"></div>
			<div class="nav navNext" on:click="{showNext}"></div>
			<div class="nav navPrev" on:click="{showPrev}"></div>
			<div class="back" on:click={showDirectoryList}>Back</div>
			<div class="filename" id="filename">{currentImageIndex+1}/{images.length}</div>
		</div>
	{:else if page === 'directoryList'}
		<Header doHome={showHome} currentPath={currentPath} basePath={basePath} doShowHelp={showHelp} />
		{#if images.length > 0}
			<button on:click={showRandomImage}>Show {images.length} images</button>
		{/if}
		{#each directories as dir}
			<button on:click={loadPath(dir.link)}>
				{dir.name}
			</button>
		{/each}
	{:else if page === 'help'}
		<Header doHome={showHome} currentPath={currentPath} basePath={basePath} doShowHelp={showHelp} />
		<Help doClose={showDirectoryList}/>
	{:else}
		<Header doHome={showHome} currentPath={currentPath} basePath={basePath} doShowHelp={showHelp} />
		Loading...
	{/if}
</main>

<style>
	main {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		text-align: center;
		background-color: #333333;
		background:linear-gradient( 180deg, #333333, #222222 );

	}

	button {
		width: 40%;
		margin: 1em;
		border-radius: 0.5em;
		overflow: hidden;
		text-overflow: ellipsis;
		background:linear-gradient( 180deg, #7b81ec, #3bd1d3);
		cursor: pointer;
	}

	.fullscreen {
		position: absolute;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #111111;
		height: 100%;
		width: 100%;
		-webkit-transition: background 50ms linear;
		-moz-transition: background 50ms linear;
		-o-transition: background 50ms linear;
		-ms-transition: background 50ms linear;
		transition: background 50ms linear;
	}

	.nav {
		background-color: transparent;
		position: absolute;
		z-index: 5;
		color: #EEEEEE;
		padding: 1em;
		cursor: pointer;
		opacity: 0.6;
	}

	.navNext {
		top: 25%;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: left;
		vertical-align: middle;
	}
	.navPrev {
		top: 0;
		left: 0;
		right: 0;
		bottom: 75%;
		text-align: right;
		vertical-align: middle;
	}
	.navUp {
		top: 0;
		left: 25%;
		right: 25%;
		bottom: 80%;
		padding: 1em;
		z-index: 6;
	}
	.filename {
		position: fixed;
		top: .25em;
		right: 1em;
		color:#cccccc;
		background: #333333;
		opacity: 0.9;
		font-size: .9em;
		padding: .5em;
		border-radius: 0.5em;
	}
	.back {
		position: fixed;
		top: 0;
		left: 45%;
		right: 45%;
		color:#cccccc;
		background: #333333;
		opacity: 0.8;
		text-align: center;
		font-size: .75em;
		padding: .25em;
		z-index: 4;
		cursor: pointer;
		border-bottom-right-radius: 0.5em;
		border-bottom-left-radius: 0.5em;
	}
</style>