<script>
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { fly, scale } from '$lib/helpers/transition';
	import ResultListItem from './_result-list-item.svelte';

	export let list = [];
	export let standalone = false;

	let width;

	const groupedList = {
		top: list.filter((v, i) => i < 3),
		middle: list.filter((v, i) => i > 2 && i < 7),
		bottom: list.filter((v, i) => i > 6)
	};

	const rarities = list.map(({ rarity }) => rarity);

	onMount(() => {
		if (standalone) return;

		const isContain5 = rarities.includes(5);
		if (isContain5) return playSfx('warpresult-list-5');
		playSfx('warpresult-list-4');
	});

	const customScale = (node, args) => {
		if (standalone) return;
		return scale(node, args);
	};
	const customfly = (node, args) => {
		if (standalone) return;
		return fly(node, args);
	};
</script>

<div class="result-list">
	<div class="header">
		{#if !standalone}
			<div class="logo">
				<i class="hsr-warp" />
			</div>
			<div class="title">
				<h1>{$t('warp.result')}</h1>
			</div>
		{/if}
	</div>

	<div class="list-wrapper" in:customScale={{ start: 1.3, duration: 400 }}>
		<div class="list" bind:clientWidth={width} style="--item-width:{width}px">
			{#if Object.keys(groupedList).length > 0}
				{#each Object.keys(groupedList) as key, layer}
					<div class="{key} row" in:customfly={{ x: layer === 1 ? 200 : -200, duration: 600 }}>
						{#each groupedList[key] as { name, rarity, combat_type, type, path, gachaCardOffset, isNew, eidolon, undyingType, undyingQty }, i}
							<div class=" item item{i}">
								<ResultListItem
									{rarity}
									{type}
									{path}
									{eidolon}
									{isNew}
									{undyingType}
									{undyingQty}
									{name}
									itemName={name}
									combatType={combat_type}
									cardOffset={gachaCardOffset}
								/>
							</div>
						{/each}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.result-list {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.result-list::before,
	.result-list::after {
		content: '';
		width: 100%;
		height: calc(0.0012 * var(--screen-width));
		background-color: rgba(255, 255, 255, 0.35);
		position: absolute;
		border-radius: 1rem;
		top: 70%;
	}
	.result-list::before {
		transform: rotate(-13deg);
		right: -70%;
	}
	.result-list::after {
		right: 20%;
		transform: translateY(22vw) rotate(-13deg);
	}

	.header {
		display: flex;
		align-items: center;
		padding: 3.7vh 2% 0;
		height: 8vh;
		font-size: 110%;
	}
	.title {
		width: 100%;
		padding-left: 1%;
	}

	:global(.mobileLandscape) .header {
		padding: 1.5vh 5%;
	}

	.logo {
		font-size: 200%;
		color: var(--color-second);
		line-height: 0;
	}

	h1 {
		font-size: 130%;
		width: 100%;
		font-weight: normal;
	}

	.list-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.list {
		width: 80%;
		max-width: 140vh;
		transform: rotate(-13deg) scale(1.35) translateY(-4.5%);
	}

	.row {
		display: flex;
		justify-content: center;
		width: 100%;
		padding: 1.5% 0;
	}
	.top {
		transform: translateX(-6.7%);
	}
	.middle {
		transform: translateX(-1%);
	}
	.bottom {
		transform: translateX(4%);
	}

	.item {
		flex-basis: 25%;
		width: 25%;
		padding: 0 calc(0.008 * var(--item-width));
		transition: transform 0.5s;
		perspective: 2000px;
	}

	.top .item1 {
		transform: translateY(-10%);
	}

	.bottom .item0,
	.bottom .item2 {
		transform: translateY(-5%);
	}
	.bottom .item1 {
		transform: translateY(5%);
	}
</style>
