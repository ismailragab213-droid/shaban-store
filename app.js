import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// اكتب رقم الواتساب الحقيقي هنا بدلاً من الرقم الوهمي
const PHONE_NUMBER = "201000000000"; 

async function loadProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;

    try {
        // ترتيب المنتجات من الأحدث للأقدم
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        let html = '';
        
        querySnapshot.forEach((doc) => {
            const p = doc.data();
            const whatsappMsg = `السلام عليكم، أرغب في طلب منتج: ${p.title} بسعر: ${p.price} ج.م`;
            
            html += `
                <div class="card">
                    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
                    ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.title}" class="product-img">` : ''}
                    <h3>${p.title}</h3>
                    <p class="desc">${p.desc}</p>
                    <div class="price-box">
                        ${p.oldPrice ? `<span class="old-price">${p.oldPrice} ج.م</span>` : ''}
                        <span class="new-price">${p.price} ج.م</span>
                    </div>
                    <a href="https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(whatsappMsg)}" class="btn-card" target="_blank">طلب عبر الواتساب 💬</a>
                </div>
            `;
        });
        
        container.innerHTML = html || '<p>لا توجد منتجات حالياً.</p>';
    } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
        container.innerHTML = '<p>حدث خطأ أثناء تحميل المنتجات. الرجاء المحاولة لاحقاً.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);