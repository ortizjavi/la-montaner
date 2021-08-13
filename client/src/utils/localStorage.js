const cart = localStorage.getItem('cart');
export const cartItemsInLocalStorage = cart ? JSON.parse(cart) : [];

let sessionStorage = localStorage.getItem('session');
export const session = sessionStorage ? JSON.parse(sessionStorage) : { token: '' };

const wishlist = localStorage.getItem('wishlist');
export const wishlistItemsInLocalStorage = wishlist ? JSON.parse(wishlist) : [];