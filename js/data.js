// All shop content lives here. Edit this file to change contact details, prices or items.

const SHOP = {
  name: "Handcraft",
  subtitle: "Chocolate & Cookies",
  chef: "Sonali Gandhe",
  orderContact: "Ruchi",
  phone: "8329311771",
  whatsapp: "918329311771",
  location: "Katol",
  mapQuery: "Katol, Maharashtra",
};

const CATEGORIES = [
  { id: "all", label: "All Treats" },
  { id: "chocolates", label: "Chocolates" },
  { id: "cookies", label: "Cookies" },
  { id: "cupcakes", label: "Cupcakes" },
  { id: "bar", label: "Chocolate Bar" },
];

// `img` is looked up in the images/ folder. Until that file exists, the
// illustration described by `art` is shown instead.
const MENU = [
  // Chocolates (per piece)
  { id: "mix-fruit", cat: "chocolates", name: "Mix Fruit Chocolate", price: 15, unit: "piece", label: "#7B1E4A", img: "choco-mix-fruit.jpg",
    art: { kind: "piece", body: "#3E1F14", bits: ["#E53935", "#FBC02D", "#7CB342", "#FB8C00"] } },
  { id: "orive", cat: "chocolates", name: "Orive Chocolate", price: 15, unit: "piece", label: "#556B2F", img: "choco-orive.jpg",
    art: { kind: "piece", body: "#2E160E", bits: ["#8BAA3C", "#A5C25A"], big: true } },
  { id: "butterscotch", cat: "chocolates", name: "Butterscotch Chocolate", price: 15, unit: "piece", label: "#C8742B", img: "choco-butterscotch.jpg",
    art: { kind: "piece", body: "#C47A2C", bits: ["#F6C453", "#E9A23B", "#8D4F16"] } },
  { id: "rice-crispy", cat: "chocolates", name: "Rice Crispy Chocolate", price: 15, unit: "piece", label: "#6B1F2A", img: "choco-rice-crispy.jpg",
    art: { kind: "piece", body: "#3A1C12", bits: ["#F3E3C3", "#E8D2A6"] } },
  { id: "milk", cat: "chocolates", name: "Milk Chocolate", price: 15, unit: "piece", label: "#1E3A5F", img: "choco-milk.jpg",
    art: { kind: "piece", body: "#7B4A2E", bits: [], drizzle: "#B07A55" } },
  { id: "rose", cat: "chocolates", name: "Rose Flavour Chocolate", price: 12, unit: "piece", label: "#C2416F", img: "choco-rose.jpg",
    art: { kind: "piece", body: "#F08BB0", bits: ["#C2185B", "#FCE4EC", "#AD1457"] } },
  { id: "rasmalai", cat: "chocolates", name: "Rasmalai Chocolate", price: 12, unit: "piece", label: "#D9A021", img: "choco-rasmalai.jpg",
    art: { kind: "piece", body: "#F6EBD3", bits: ["#F2A93B", "#9CCC65", "#E57C1E"] } },
  { id: "pista", cat: "chocolates", name: "Pista Chocolate", price: 15, unit: "piece", label: "#3F5F2A", img: "choco-pista.jpg",
    art: { kind: "piece", body: "#9DBF6A", bits: ["#5E8C31", "#C5E1A5", "#7A5230"] } },

  // Chocolate bar
  { id: "bar", cat: "bar", name: "Dry Fruit Chocolate Bar", price: 80, unit: "bar", label: "#3E1F14", img: "choco-bar.jpg",
    art: { kind: "bar", body: "#4A2418", bits: ["#E9D3A6", "#8BC34A", "#9C2B2B", "#D7B98E"] } },

  // Cookies (per 250g pack)
  { id: "coconut", cat: "cookies", name: "Coconut Cookies", price: 250, unit: "250g", label: "#9C4A1A", img: "cookie-coconut.jpg",
    art: { kind: "cookie", body: "#D79A4E", bits: ["#FFF8EC", "#F5E6CC"] } },
  { id: "karachi", cat: "cookies", name: "Karachi Biscuits", price: 220, unit: "250g", label: "#7B1E34", img: "cookie-karachi.jpg",
    art: { kind: "cookie", body: "#E9B65C", bits: ["#D32F2F", "#43A047", "#C62828"] } },
  { id: "ragi", cat: "cookies", name: "Ragi Cookies", price: 250, unit: "250g", label: "#556B2F", img: "cookie-ragi.jpg",
    art: { kind: "cookie", body: "#6B3E2A", bits: ["#3E2117", "#A1887F"] } },
  { id: "multigrain", cat: "cookies", name: "Multi Grain Cookies", price: 250, unit: "250g", label: "#B8691E", img: "cookie-multigrain.jpg",
    art: { kind: "cookie", body: "#B98A55", bits: ["#6D4C2F", "#E8D5A8", "#3E2723"] } },
  { id: "butter", cat: "cookies", name: "Butter Cookies", price: 200, unit: "250g", label: "#1E3A5F", img: "cookie-butter.jpg",
    art: { kind: "swirl", body: "#F2C46D" } },

  // Cupcakes (per piece)
  { id: "cupcake-chocolate", cat: "cupcakes", name: "Chocolate Cupcake", price: 50, unit: "piece", label: "#4A2418", img: "cupcake-chocolate.jpg",
    art: { kind: "cupcake", liner: "#4A2418", frost: "#3E1F14", topping: "chips" } },
  { id: "cupcake-pineapple", cat: "cupcakes", name: "Pineapple Cupcake", price: 45, unit: "piece", label: "#E8A417", img: "cupcake-pineapple.jpg",
    art: { kind: "cupcake", liner: "#E8C46A", frost: "#FFF3D6", topping: "pineapple" } },
  { id: "cupcake-mixfruit", cat: "cupcakes", name: "Mix Fruit Cupcake", price: 45, unit: "piece", label: "#E0628E", img: "cupcake-mixfruit.jpg",
    art: { kind: "cupcake", liner: "#F3D9A4", frost: "#F7B6C8", topping: "fruits" } },
];

const QUOTES = [
  { text: "Life is short — eat the chocolate first.", lang: "en" },
  { text: "Small bites. Big happiness.", lang: "en" },
  { text: "प्रत्येक घासात घरगुती प्रेम ❤️", lang: "mr" },
  { text: "Happiness is homemade.", lang: "en" },
  { text: "A balanced diet is a cookie in each hand.", lang: "en" },
  { text: "गोड खा, गोड बोला, गोड राहा! 🍫", lang: "mr" },
  { text: "Crafted with love, baked with happiness.", lang: "en" },
  { text: "All you need is love… and a little chocolate.", lang: "en" },
];
