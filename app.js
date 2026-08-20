import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAe3Xgx_tM43hnA95WxRDNP7GqNtHmR4pI",
  authDomain: "shaban-store-26eba.firebaseapp.com",
  projectId: "shaban-store-26eba",
  storageBucket: "shaban-store-26eba.firebasestorage.app",
  messagingSenderId: "510101938927",
  appId: "1:510101938927:web:15e572837cbc652f94311a",
  measurementId: "G-2M8BXCE5DJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        let html = '';
        
        querySnapshot.forEach((doc) => {
            const p = doc.data();
            html += `
                <div class="card">
                    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
                    <h3>${p.title}</h3>
                    <p class="desc">${p.desc}</p>
                    <div class="price-box">
                        ${p.oldPrice ? `<span class="old-price">${p.oldPrice} ج.م</span>` : ''}
                        <span class="new-price">${p.price} ج.م</span>
                    </div>
                    <a href="https://wa.me/201000000000?text=طلب%20منتج:%20${encodeURIComponent(p.title)}" class="btn-card" target="_blank">طلب عبر الواتساب</a>
                </div>
            `;
        });
        
        container.innerHTML = html || '<p>لا توجد منتجات حالياً.</p>';
    } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);