/* =============================================
   BREVA CAFÉ — script.js
   ============================================= */

/* ─────────────────────────────────────────────
   MENU DATA
───────────────────────────────────────────── */
const menuItems = [
  {
    id: 1, name: 'Classic Espresso', cat: 'coffee', price: 180,
    badge: 'Bestseller', rating: 4.9, reviews: 312,
    desc: 'Rich double shot with velvety crema. Our most loved classic.',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=75'
  },
  {
    id: 2, name: 'Oat Milk Latte', cat: 'coffee', price: 260,
    badge: 'New', rating: 4.8, reviews: 187,
    desc: 'Smooth espresso with creamy oat milk. Naturally sweet, perfectly balanced.',
    img: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=75'
  },
  {
    id: 3, name: 'Cardamom Cappuccino', cat: 'coffee', price: 240,
    badge: 'Signature', rating: 5.0, reviews: 98,
    desc: 'Aromatic cardamom spiced cappuccino with microfoam art.',
    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=75'
  },
  {
    id: 4, name: 'Cold Brew Tonic', cat: 'cold', price: 290,
    badge: '', rating: 4.7, reviews: 143,
    desc: '24-hr steeped cold brew over sparkling tonic. Refreshingly bold.',
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=75'
  },
  {
    id: 5, name: 'Matcha Latte', cat: 'tea', price: 270,
    badge: 'Popular', rating: 4.9, reviews: 234,
    desc: 'Ceremonial grade matcha whisked with steamed oat milk. Earthy & smooth.',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&q=75'
  },
  {
    id: 6, name: 'Butter Croissant', cat: 'pastry', price: 140,
    badge: 'Fresh Daily', rating: 4.8, reviews: 421,
    desc: 'Hand-laminated with French butter. Perfectly flaky, golden crust.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=75'
  },
  {
    id: 7, name: 'Avocado Toast', cat: 'food', price: 320,
    badge: '', rating: 4.7, reviews: 176,
    desc: 'Smashed avocado on sourdough with chilli flakes, lemon zest & seeds.',
    img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=75'
  },
  {
    id: 8, name: 'Caramel Frappe', cat: 'cold', price: 310,
    badge: '', rating: 4.6, reviews: 119,
    desc: 'Blended espresso with caramel sauce, cream and crushed ice.',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=75'
  },
  {
    id: 9, name: 'Earl Grey Tea', cat: 'tea', price: 160,
    badge: '', rating: 4.5, reviews: 88,
    desc: 'Premium loose leaf Earl Grey steeped to perfection. Bergamot & floral.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75'
  },
  {
    id: 10, name: 'Blueberry Muffin', cat: 'pastry', price: 160,
    badge: '', rating: 4.8, reviews: 267,
    desc: 'Bursting with fresh blueberries, golden and moist with a crunchy top.',
    img: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400&q=75'
  },
  {
    id: 11, name: 'Shakshuka Toast', cat: 'food', price: 380,
    badge: 'Chef Special', rating: 4.9, reviews: 142,
    desc: 'Poached eggs in spiced tomato sauce over artisan bread. Bold & warming.',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=75'
  },
  {
    id: 12, name: 'Vanilla Iced Coffee', cat: 'cold', price: 250,
    badge: '', rating: 4.6, reviews: 93,
    desc: 'Espresso over ice with vanilla syrup and cold oat milk. Sweet & light.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=75'
  }
];

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let cart        = [];
let currentCat  = 'all';
let toastTimer  = null;

/* ─────────────────────────────────────────────
   MENU RENDERING
───────────────────────────────────────────── */
function renderMenu(cat) {
  const grid     = document.getElementById('menuGrid');
  const filtered = cat === 'all' ? menuItems : menuItems.filter(i => i.cat === cat);

  grid.innerHTML = filtered.map(item => `
    <div class="menu-card fade-up visible">
      <div class="menu-card-img-wrap">
        <img
          class="menu-card-img img-placeholder"
          src="${item.img}"
          alt="${item.name}"
          loading="lazy"
          onload="this.classList.remove('img-placeholder')"
          onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=75'"
        >
        ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-rating">
          <span class="stars">${'★'.repeat(Math.round(item.rating))}</span>
          <span class="rating-text">${item.rating} (${item.reviews})</span>
        </div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-price">₹${item.price} <span>/ item</span></div>
          <button class="add-btn" onclick="addToCart(${item.id})" aria-label="Add ${item.name} to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────
   CATEGORY TABS
───────────────────────────────────────────── */
document.getElementById('categoryTabs').addEventListener('click', e => {
  if (!e.target.classList.contains('tab')) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  e.target.classList.add('active');
  currentCat = e.target.dataset.cat;
  renderMenu(currentCat);
});

/* ─────────────────────────────────────────────
   CART — ADD / CHANGE QTY / REMOVE
───────────────────────────────────────────── */
function addToCart(id) {
  const item     = menuItems.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartUI();
  showToast(`☕ ${item.name} added to cart!`);
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

/* ─────────────────────────────────────────────
   CART — UI UPDATE
───────────────────────────────────────────── */
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = total;
  renderCartItems();
}

function renderCartItems() {
  const el     = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (!cart.length) {
    el.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">☕</div>
        <p>Your cart is empty.<br>Add something delicious!</p>
      </div>`;
    footer.style.display = 'none';
    return;
  }

  el.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price * item.qty}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <button class="cart-remove" onclick="removeItem(${item.id})">🗑</button>
        </div>
      </div>
    </div>
  `).join('');

  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = Math.round(sub * 0.05);

  document.getElementById('cartSubtotal').textContent = `₹${sub}`;
  document.getElementById('cartTax').textContent       = `₹${tax}`;
  document.getElementById('cartTotal').textContent     = `₹${sub + tax}`;
  footer.style.display = 'block';
}

/* ─────────────────────────────────────────────
   CART DRAWER — OPEN / CLOSE
───────────────────────────────────────────── */
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCartItems();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

/* ─────────────────────────────────────────────
   CHECKOUT
───────────────────────────────────────────── */
function checkout() {
  if (!cart.length) return;
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cart = [];
  updateCartUI();
  closeCart();
  showToast(`✅ Order placed! ₹${sub} — Thank you!`);
}

/* ─────────────────────────────────────────────
   RESERVATION FORM
───────────────────────────────────────────── */
function submitReservation() {
  const fname  = document.getElementById('fname').value.trim();
  const remail = document.getElementById('remail').value.trim();
  const rdate  = document.getElementById('rdate').value;

  if (!fname || !remail || !rdate) {
    showToast('⚠️ Please fill in all required fields');
    return;
  }

  showToast(`🎉 Table reserved for ${fname}! See you soon.`);

  /* reset form */
  ['fname', 'lname', 'remail', 'rdate', 'rnotes'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

/* Set minimum date to today */
document.getElementById('rdate').setAttribute('min', new Date().toISOString().split('T')[0]);

/* ─────────────────────────────────────────────
   TOAST NOTIFICATION
───────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─────────────────────────────────────────────
   MOBILE HAMBURGER MENU
───────────────────────────────────────────── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER — FADE-UP ANIMATIONS
───────────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ─────────────────────────────────────────────
   LAZY IMAGE — CLEAR SHIMMER IF ALREADY LOADED
───────────────────────────────────────────── */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  if (img.complete) img.classList.remove('img-placeholder');
});

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
renderMenu('all');
