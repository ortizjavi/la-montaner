const cart = localStorage.getItem('cart');
export const cartItemsInLocalStorage = cart ? JSON.parse(cart) : [];

let sessionStorage = localStorage.getItem('session');
export const session = sessionStorage ? JSON.parse(sessionStorage) : { token: '' };