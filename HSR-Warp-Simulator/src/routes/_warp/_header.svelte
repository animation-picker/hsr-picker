<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { regularPass, specialPass, stellarJade, warpAmount } from '$lib/stores/app-store';

	import Header from '$lib/components/Header.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let bannerType = '';
	export let bannerName = '';

	$: event = bannerType.match('event');
	$: balance = event ? $specialPass : $regularPass;
	$: unlimitedWarp = $warpAmount === 'unlimited';

	const navigate = getContext('navigate');
	const openAllBanners = () => {
		playSfx();
		navigate('allbanner');
	};

	const closeApp = () => {
		console.log('toCloseApp');
		fetch('http://localhost:9990/api/shutdown', {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				magicNumber: '9987', // Replace with your actual magic number
			})
		})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch((error) => {
				console.error('错误:', error);
			});
	};
</script>

<Header icon="warp" h1={$t('warp.heading')} h2={$t(`banner.${bannerName}`)} hideDesktopIcon>
	<div class="budget">
		<MyFund type={event ? 'specialPass' : 'regularPass'}>
			{unlimitedWarp ? '∞' : balance}
		</MyFund>
		<MyFund type="stellarJade" plusbutton>
			{unlimitedWarp ? '∞' : $stellarJade}
		</MyFund>
	</div>
	<div class="close">
		<!-- <ButtonIcon on:click={openAllBanners} /> -->
		<ButtonIcon on:click={closeApp} />
	</div>
</Header>
