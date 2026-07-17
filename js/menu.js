//==================================================
// SUNNY BURGER & JUICE BAR
// menu.js
// Full Menu Database (from in-store menu board) + Search + Filters
//==================================================

//==============================
// FOOD DATABASE
//==============================

const menuItems = [
  /* BREAK FAST */
  { id:1, name:"Breakfast", category:"breakfast", price:420, image:"images/break-fast.jpg", description:"Our signature hearty breakfast plate." },
  { id:2, name:"Fasting Breakfast", category:"breakfast", price:360, image:"images/break-fast.jpg", description:"Fasting-friendly breakfast plate." },
  { id:3, name:"Chechebsa with Egg", category:"breakfast", price:190, image:"images/break-fast.jpg", description:"Traditional chechebsa served with egg." },
  { id:4, name:"Fetira with Egg", category:"breakfast", price:180, image:"images/break-fast.jpg", description:"Classic fetira served with egg." },
  { id:5, name:"Omelet", category:"breakfast", price:200, image:"images/break-fast.jpg", description:"Freshly made omelet." },
  { id:6, name:"Cheese Omelet", category:"breakfast", price:270, image:"images/break-fast.jpg", description:"Omelet loaded with melted cheese." },
  { id:7, name:"Scrambled Egg", category:"breakfast", price:200, image:"images/break-fast.jpg", description:"Soft scrambled eggs." },
  { id:8, name:"Pancake", category:"breakfast", price:200, image:"images/break-fast.jpg", description:"Fluffy pancakes." },
  { id:9, name:"Avocado with Egg", category:"breakfast", price:220, image:"images/break-fast.jpg", description:"Fresh avocado served with egg." },

  /* BURGER */
  { id:10, name:"Ultra", category:"burger", price:1090, image:"images/burger.jpg", description:"Our biggest, most loaded ultra burger." },
  { id:11, name:"Doctor's Triple Treat", category:"burger", price:570, image:"images/burger.jpg", description:"Triple layered signature burger." },
  { id:12, name:"Saucy Melt", category:"burger", price:470, image:"images/burger.jpg", description:"Melted cheese burger with special sauce." },
  { id:13, name:"Beef with Chicken", category:"burger", price:450, image:"images/burger.jpg", description:"Beef and chicken patty combo burger." },
  { id:14, name:"Chilli", category:"burger", price:420, image:"images/burger.jpg", description:"Spicy chilli-kicked burger." },
  { id:15, name:"Double Trouble", category:"burger", price:420, image:"images/burger.jpg", description:"Double beef patty burger." },
  { id:16, name:"Cheese Chunk", category:"burger", price:360, image:"images/burger.jpg", description:"Loaded with chunky melted cheese." },
  { id:17, name:"Beef Chunk", category:"burger", price:330, image:"images/burger.jpg", description:"Classic beef chunk burger." },
  { id:18, name:"Doctor's Pill (Two Tabs)", category:"burger", price:470, image:"images/burger.jpg", description:"Doctor's Pill burger — two tabs." },
  { id:19, name:"Doctor's Pill (Three Tabs)", category:"burger", price:650, image:"images/burger.jpg", description:"Doctor's Pill burger — three tabs." },
  { id:20, name:"Doctor's Pill (Four Tabs)", category:"burger", price:790, image:"images/burger.jpg", description:"Doctor's Pill burger — four tabs." },

  /* PIZZA */
  { id:21, name:"Special Pizza", category:"pizza", price:495, image:"images/pizza.jpg", description:"Our house special pizza." },
  { id:22, name:"Beef Pizza", category:"pizza", price:410, image:"images/pizza.jpg", description:"Topped with seasoned beef." },
  { id:23, name:"Meatlover Pizza", category:"pizza", price:495, image:"images/pizza.jpg", description:"Loaded with a variety of meats." },
  { id:24, name:"Chicken Pizza", category:"pizza", price:490, image:"images/pizza.jpg", description:"Topped with tender chicken." },
  { id:25, name:"Tuna Pizza", category:"pizza", price:380, image:"images/pizza.jpg", description:"Topped with fresh tuna." },
  { id:26, name:"Tuna with Cheese Pizza", category:"pizza", price:430, image:"images/pizza.jpg", description:"Tuna pizza loaded with extra cheese." },
  { id:27, name:"Margarita Pizza", category:"pizza", price:390, image:"images/pizza.jpg", description:"Classic margarita pizza." },

  /* SNACKS */
  { id:28, name:"Egg Roll", category:"snacks", price:280, image:"images/snacks.jpg", description:"Crispy egg roll." },
  { id:29, name:"Beef Roll", category:"snacks", price:430, image:"images/snacks.jpg", description:"Savory beef roll." },
  { id:30, name:"Chicken Roll", category:"snacks", price:470, image:"images/snacks.jpg", description:"Tender chicken roll." },
  { id:31, name:"Egg Sandwich", category:"snacks", price:190, image:"images/snacks.jpg", description:"Classic egg sandwich." },
  { id:32, name:"French Fries", category:"snacks", price:150, image:"images/snacks.jpg", description:"Golden crispy fries." },
  { id:33, name:"Special French Fries", category:"snacks", price:190, image:"images/snacks.jpg", description:"Loaded special fries." },

  /* FASTING */
  { id:34, name:"Fasting Burger", category:"fasting", price:250, image:"images/fasting.jpg", description:"Fasting-friendly plant-based burger." },
  { id:35, name:"Vegetable Sandwich", category:"fasting", price:180, image:"images/fasting.jpg", description:"Fresh vegetable sandwich." },
  { id:36, name:"Vegetable Roll", category:"fasting", price:250, image:"images/fasting.jpg", description:"Vegetable-filled roll." },
  { id:37, name:"Vegetable Pizza", category:"fasting", price:290, image:"images/fasting.jpg", description:"Fasting-friendly vegetable pizza." },
  { id:38, name:"Fetira with Honey", category:"fasting", price:150, image:"images/fasting.jpg", description:"Traditional fetira served with honey." },
  { id:39, name:"Chechebsa with Honey", category:"fasting", price:160, image:"images/fasting.jpg", description:"Traditional chechebsa served with honey." },
  { id:40, name:"Tuna Sandwich", category:"fasting", price:290, image:"images/fasting.jpg", description:"Fresh tuna sandwich." },
  { id:41, name:"Vegetable with Tuna Pizza", category:"fasting", price:410, image:"images/fasting.jpg", description:"Fasting pizza with vegetables and tuna." }
];

const categoryLabels = {
  breakfast:"Break Fast",
  burger:"Burger",
  pizza:"Pizza",
  snacks:"Snacks",
  fasting:"Fasting"
};

const categoryOrder = ["breakfast","burger","pizza","snacks","fasting"];

//==============================
// VARIABLES
//==============================

const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("filterCategory");

//==============================
// FORMAT PRICE
//==============================

function formatPrice(price){
  return `${price} ETB`;
}

//==============================
// DISPLAY MENU (grouped by category)
//==============================

function displayMenu(items){
  if(!menuContainer) return;
  menuContainer.innerHTML="";

  if(items.length===0){
    menuContainer.innerHTML=`
      <div class="empty-menu">
        <i class="fa-solid fa-burger"></i>
        <h3>No Food Found</h3>
        <p>Try another search.</p>
      </div>
    `;
    return;
  }

  // group by category, preserving defined order
  categoryOrder.forEach(cat=>{
    const catItems = items.filter(item=>item.category===cat);
    if(catItems.length===0) return;

    const block = document.createElement("div");
    block.className="menu-category-block";

    const title = document.createElement("h3");
    title.className="menu-category-title";
    title.textContent = categoryLabels[cat] || cat;

    const grid = document.createElement("div");
    grid.className="menu-grid";

    catItems.forEach(item=>{
      const card=document.createElement("div");
      card.className="food-card reveal visible";
      card.innerHTML=`
        <div class="food-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="food-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="food-bottom">
            <span class="price">${formatPrice(item.price)}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    block.appendChild(title);
    block.appendChild(grid);
    menuContainer.appendChild(block);
  });
}

//==============================
// FILTER SYSTEM
//==============================

function filterMenu(){
  let filtered=[...menuItems];

  const search = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  if(search){
    filtered = filtered.filter(item=>item.name.toLowerCase().includes(search));
  }

  if(category !== "all"){
    filtered = filtered.filter(item=>item.category===category);
  }

  displayMenu(filtered);
}

searchInput?.addEventListener("input", filterMenu);
categoryFilter?.addEventListener("change", filterMenu);

//==============================
// CATEGORY CARD FILTER
//==============================

document.querySelectorAll(".category-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const category = card.dataset.category;

    // Remove active class from all cards
    document.querySelectorAll(".category-card").forEach(c=>c.classList.remove("active"));
    // Add active to clicked card
    card.classList.add("active");

    categoryFilter.value = category;
    filterMenu();
    document.querySelector("#menu").scrollIntoView({ behavior:"smooth" });
  });
});

// Reset active category cards when "All Categories" is selected
categoryFilter?.addEventListener("change",()=>{
  if(categoryFilter.value === "all"){
    document.querySelectorAll(".category-card").forEach(c=>c.classList.remove("active"));
  }
});

//==============================
// TOAST
//==============================

function showToast(message){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className="toast";
    document.body.appendChild(toast);
  }
  toast.innerHTML=message;
  toast.classList.add("show");
  setTimeout(()=>{
    toast.classList.remove("show");
  },2500);
}

//==============================
// INITIAL LOAD
//==============================

document.addEventListener("DOMContentLoaded",()=>{
  displayMenu(menuItems);
});
