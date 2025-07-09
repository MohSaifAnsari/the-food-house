import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCartPlus, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Product({ showHeader, title }) {
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem("userStatus") === "loggedIn";

  const handleLoginRedirect = () => {
    toast.error("⚠️ Please login first to continue", { position: "top-center" });
    setTimeout(() => navigate("/"), 1500);
  };

  const addToCart = (product) => {
    if (!isUserLoggedIn) {
      handleLoginRedirect();
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  const shareProduct = (product) => {
    if (!isUserLoggedIn) {
      handleLoginRedirect();
      return;
    }

    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out this item: ${product.name} for ₹${product.price}`,
          url: window.location.href,
        })
        .then(() => toast.success("Product shared!"))
        .catch(() => toast.error("Sharing failed."));
    } else {
      toast.info("Sharing not supported on this device.");
    }
  };

  const vegProducts = [
    { name: "Chowmein", price: 80, image: "src/images/chowmein.jpg", caption: "Stir-fried noodles tossed with fresh vegetables and sauces." },
    { name: "Burger", price: 90, image: "src/images/burger.jpg", caption: "Classic veggie burger loaded with cheese and crisp lettuce." },
    { name: "Idli", price: 50, image: "src/images/images.jpg", caption: "Soft steamed rice cakes served with sambhar and chutney." },
    { name: "Nuggets", price: 70, image: "src/images/nuggets.jpg", caption: "Crunchy vegetarian nuggets with a golden coating." },
    { name: "Pizza", price: 120, image: "src/images/pizza.jpg", caption: "Delicious veg pizza topped with cheese and vegetables." },
    { name: "Spring Rolls", price: 80, image: "src/images/spring roll.jpg", caption: "Crispy rolls filled with spiced mixed veggies." },
    { name: "Creamy Veg Pasta", price: 110, image: "src/images/pasta.jpg", caption: "Pasta tossed in a rich and creamy white sauce with herbs." },
    { name: "Samosa", price: 30, image: "src/images/samosa.jpg", caption: "Fried pastry stuffed with spicy potato filling." },
    { name: "Momos", price: 70, image: "src/images/momos.jpg", caption: "Steamed dumplings filled with savory vegetable mix." },
    { name: "Jalebi", price: 58, image: "src/images/jalebi.jpg", caption: "Crispy. Golden. Irresistibly Sweet — Taste the Magic of Jalebi!" },
    { name: "Rasmalai", price: 110, image: "src/images/rasmalai.jpg", caption: "A melt-in-the-mouth masterpiece — Rasmalai done right." },
    { name: "Rasgulla", price: 70, image: "src/images/rasgulla.jpg", caption: "Delicate, airy, syrup-soaked Rasgullas — a timeless classic." },
  ];

  const nonVegProducts = [
    { name: "Chicken Biryani", price: 160, image: "src/images/biryani.jpg", caption: "Fragrant rice layered with spicy marinated chicken." },
    { name: "Butter Chicken", price: 170, image: "src/images/butter chicken.jpg", caption: "Tender chicken chunks cooked in buttery tomato gravy." },
    { name: "Chicken Roasted", price: 150, image: "src/images/chiken ki taang.jpg", caption: "Slow-roasted chicken leg marinated with Indian spices." },
    { name: "Chicken Lollipop", price: 130, image: "src/images/chicken lollipop.jpg", caption: "Deep-fried chicken drumettes tossed in spicy sauce." },
    { name: "Fish Fry", price: 140, image: "src/images/fish fry.jpg", caption: "Crispy shallow-fried fish coated in masala batter." },
    { name: "Chicken Afghani", price: 180, image: "src/images/chicken afghan.jpg", caption: "Juicy chicken grilled in creamy Afghani marinade." },
    { name: "Mutton Jahangiri", price: 220, image: "src/images/mutton jhagiri.jpg", caption: "Royal mutton curry in Mughlai-style gravy." },
    { name: "Seekh Kabab", price: 150, image: "src/images/Seekh-kebab.jpg", caption: "Spiced minced meat skewers grilled to perfection." },
    { name: "Chicken Changezi", price: 170, image: "src/images/changezi.jpg", caption: "Succulent chicken in creamy, tangy gravy." },
    { name: "Egg Curry", price: 120, image: "src/images/egg curry.jpg", caption: "Boiled eggs simmered in flavorful, spicy masala curry." },
    { name: "Tandoori Chicken", price: 160, image: "src/images/tandoori chicken.jpg", caption: "Juicy chicken marinated and grilled to smoky perfection." },
    { name: "Fish Curry", price: 170, image: "src/images/fish curry.jpg", caption: "Fresh fish cooked in rich, tangy coconut gravy." },
  ];

  const renderProductCard = (product, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col w-full max-w-xs mx-auto"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-center mb-1">{product.name}</h3>
        <p className="text-center text-green-700 font-medium mb-2">₹{product.price}</p>
        <p className="text-gray-600 text-sm text-center mb-4">{product.caption}</p>
        <div className="flex justify-center items-center gap-2 flex-wrap mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="min-w-[140px] bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2 transition"
          >
            <FaCartPlus /> Add to Cart
          </button>
          <button
            onClick={() => shareProduct(product)}
            className="min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow flex items-center justify-center gap-2 transition"
          >
            <FaShareAlt /> Share
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-yellow-100 py-12 px-4 sm:px-6 lg:px-16" id="products">
      {showHeader && (
        <div className="bg-green-500 border-2 border-red-500 flex justify-center items-center h-20 mb-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-pink-500">Food</span> Menu 🍔
          </h1>
        </div>
      )}

      

      <h3 className="text-3xl font-bold text-center text-green-700 mb-8">🥗 Veg Items</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 justify-items-center">
        {vegProducts.map(renderProductCard)}
      </div>

      <h3 className="text-3xl font-bold text-center text-red-700 mb-8">🍗 Non-Veg Items</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {nonVegProducts.map(renderProductCard)}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </section>
  );
}

export default Product;
