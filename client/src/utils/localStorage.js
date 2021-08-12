const cart = localStorage.getItem('cart');
export const cartItemsInLocalStorage = cart ? JSON.parse(cart) : [];

const session = localStorage.getItem('session');
export const token = session ? JSON.parse(session) : { token: '' };