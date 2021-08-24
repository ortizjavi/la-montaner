const numChicha = '5493515992780';
const mensajeChicha ='Che quiero comprar birras🍻';
const USER = 'USER';
const ADMIN = 'ADMIN';

export const WHATSAPP_LINK = `https://wa.me/${numChicha}?text=${encodeURIComponent(mensajeChicha)}`;
export const ROLE = {
  USER,
  ADMIN
};
export const FIXED_CATEGORIES = [
  "cervezas",
  "conservas",
  "merchandising",
  "otros",
];
