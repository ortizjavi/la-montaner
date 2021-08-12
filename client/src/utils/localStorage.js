const cart = localStorage.getItem('cart');
export const cartItemsInLocalStorage = cart ? JSON.parse(cart) : [];

const session = localStorage.getItem('userSession');
export const userSession = session ? JSON.parse(session) : { user: {}, token: '' };