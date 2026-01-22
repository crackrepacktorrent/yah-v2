import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Permanent redirect for /donate
	if (event.url.pathname === '/donate' || event.url.pathname === '/donate/') {
		throw redirect(301, 'https://www.every.org/yah');
	}

	return resolve(event);
};
