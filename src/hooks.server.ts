import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Permanent redirect for /donate
	if (event.url.pathname === '/donate' || event.url.pathname === '/donate/') {
		throw redirect(
			301,
			'https://www.every.org/yah?suggestedAmounts=50%2C100%2C200&theme_color=ff6f00&method=card%2Cbank%2Cpaypal%2Cpay%2Cgift%2Cdaf&designation=Website+button&min_value=2&utm_campaign=donate-link#/donate/card'
		);
	}

	return resolve(event);
};
