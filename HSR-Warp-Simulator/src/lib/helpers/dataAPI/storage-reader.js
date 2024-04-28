import {
	storageVersion,
	version as siteVersion,
	warpPhase,
	initialAmount
} from '$lib/data/warp-setup.json';
import {
	activePhase,
	activeVersion,
	animatedLC,
	autoskip,
	embers,
	liteMode,
	oneiric,
	regReward,
	regularPass,
	showStarterBanner,
	specialPass,
	starlight,
	starterRemaining,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import {
	customTracks,
	localBalance,
	localConfig,
	rollCounter
} from '$lib/helpers/dataAPI/api-localstorage';
import { musics, muted } from '$lib/stores/phonograph-store';

const importLocalConfig = () => {
	const { stellarJade: isj, ticketPass: pass, oneiric: ios } = initialAmount;
	const {
		stellarJade: sj,
		specialPass: sp,
		regularPass: rp,
		oneiric: os,
		embers: eb,
		starlight: sl
	} = localBalance.all() || {};
	stellarJade.set(isNaN(sj) ? isj : sj);
	specialPass.set(isNaN(sp) ? pass : sp);
	regularPass.set(isNaN(rp) ? pass : rp);
	oneiric.set(isNaN(os) ? ios : os);
	embers.set(isNaN(eb) ? 0 : eb);
	starlight.set(isNaN(sl) ? 0 : sl);

	const lSkipConfig = localConfig.get('autoskip') || {};
	const { express = false, art = true } = lSkipConfig === true ? { express: true } : lSkipConfig;
	autoskip.set({ express, art });

	const llitemode = localConfig.get('litemode') || false;
	liteMode.set(llitemode);

	const llivecone = localConfig.get('livecone') || false;
	animatedLC.set(llivecone);

	const lWarpAmount = localConfig.get('warpAmount') || 'unlimited';
	warpAmount.set(lWarpAmount);

	const starterRollCount = rollCounter.get('starter') || 0;
	starterRemaining.set(50 - starterRollCount);

	const regularRollCount = rollCounter.get('regular') || 0;
	const isRegRewardClaimed = localConfig.get('additionalClaimed');
	regReward.set({ rollcount: regularRollCount, isClaimed: isRegRewardClaimed });

	// Sounds
	const { sfx = false, bgm = false } = localConfig.get('mutedSounds') || {};
	muted.set({ bgm, sfx });

	// Custom Music
	const customBGM = customTracks.getAll();
	musics.update((m) => {
		customBGM.forEach(({ sourceID, title, description }) => {
			m.push({ album: 'custom-musics', sourceID, title, description });
		});
		return m;
	});
};

const setBannerVersionAndPhase = () => {
	const localstoreVersion = localConfig.get('storageVersion');
	const localVersion = localConfig.get('version') || '';
	let [patch, phase] = localVersion.split('-');
	const cancelPro = parseInt(patch) === 1000000;

	if (cancelPro || localstoreVersion !== storageVersion || !localVersion) {
		localConfig.set('version', `${siteVersion}-${warpPhase}`);
		localConfig.set('storageVersion', storageVersion);
		[patch, phase] = [siteVersion, warpPhase];
	}

	activePhase.set(parseInt(phase));
	activeVersion.set(patch);

	console.log(`Banner version set to ${patch} phase ${phase}`);
};

const restartBannerVersion = () => {
	localConfig.set('version', `${siteVersion}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	let [patch, phase] = [siteVersion, warpPhase];

	activePhase.set(parseInt(phase));
	activeVersion.set(patch);
};

const checkStarterBanner = () => {
	const starterRollCount = rollCounter.get('starter');
	const isShowStarter = starterRollCount < 50;
	showStarterBanner.set(isShowStarter);
	return isShowStarter;
};

export { setBannerVersionAndPhase, restartBannerVersion, checkStarterBanner, importLocalConfig };
