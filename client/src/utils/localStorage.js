const cart = localStorage.getItem('cart');
export const cartItemsInLocalStorage = cart ? JSON.parse(cart) : [];

const wishlist = localStorage.getItem('wishlist');
export const wishlistItemsInLocalStorage = wishlist ? JSON.parse(wishlist) : [];

let sessionStorage = localStorage.getItem('session');
export const session = sessionStorage ? JSON.parse(sessionStorage) : { token: '' };
