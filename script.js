/* ============================================
   ملف JavaScript لموقع سيرفر إلكترو FiveM
   يحتوي على جميع الوظائف التفاعلية
   ============================================ */

// ============ متغيرات عامة ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const backToTopBtn = document.getElementById('backToTopBtn');
const contactForm = document.getElementById('contactForm');

// ============ وظيفة: تبديل القائمة على الهاتف ============
/**
 * تفعيل/إيقاف قائمة الملاحة على الهاتف
 */
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // تأثير بصري على أيقونة القائمة
    menuToggle.classList.toggle('active');
});

// ============ وظيفة: إغلاق القائمة عند الضغط على رابط ============
/**
 * إغلاق القائمة تلقائياً عند اختيار رابط
 */
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============ وظيفة: زر العودة للأعلى ============
/**
 * عرض/إخفاء زر العودة للأعلى حسب موضع التمرير
 */
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

/**
 * العودة للأعلى بسلاسة عند الضغط على الزر
 */
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ وظيفة: معالجة نموذج التواصل ============
/**
 * التعامل مع إرسال نموذج التواصل
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // الحصول على قيم النموذج
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // التحقق من صحة البيانات
    if (!name || !email || !message) {
        showNotification('الرجاء ملء جميع الحقول', 'error');
        return;
    }
    
    // التحقق من صحة البريد الإلكتروني
    if (!isValidEmail(email)) {
        showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // محاكاة إرسال الرسالة
    showNotification('جاري إرسال رسالتك...', 'info');
    
    // محاكاة تأخير الإرسال
    setTimeout(() => {
        showNotification('تم إرسال رسالتك بنجاح! شكراً لك 🎉', 'success');
        contactForm.reset();
    }, 1500);
});

// ============ وظيفة: التحقق من صحة البريد الإلكتروني ============
/**
 * التحقق من صحة البريد الإلكتروني باستخدام regex
 * @param {string} email - البريد الإلكتروني المراد التحقق منه
 * @returns {boolean} - صحة البريد الإلكتروني
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============ وظيفة: عرض الإشعارات ============
/**
 * عرض إشعار مؤقت للمستخدم
 * @param {string} message - نص الرسالة
 * @param {string} type - نوع الإشعار (success, error, info)
 */
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // إضافة أنماط الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ وظيفة: الحصول على لون الإشعار ============
/**
 * الحصول على لون الإشعار حسب النوع
 * @param {string} type - نوع الإشعار
 * @returns {string} - اللون
 */
function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// ============ وظيفة: تأثير التمرير السلس ============
/**
 * إضافة تأثير التمرير السلس للروابط الداخلية
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // تجاهل الروابط الفارغة
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ وظيفة: تأثير الظهور عند التمرير ============
/**
 * إضافة تأثير الظهور للعناصر عند التمرير إليها
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// مراقبة العناصر المختلفة
document.querySelectorAll('.feature-item, .feature-card, .link-card, .rule-section').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============ وظيفة: تأثير الهوفر على الأزرار ============
/**
 * إضافة تأثيرات بصرية على الأزرار عند التمرير
 */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============ وظيفة: تحديث الملاحة النشطة ============
/**
 * تحديث الرابط النشط في الملاحة حسب القسم الحالي
 */
window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============ وظيفة: تأثير الكتابة المتحركة ============
/**
 * تأثير الكتابة المتحركة للعنوان الرئيسي
 */
function typewriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let index = 0;
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            title.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// ============ وظيفة: تحميل الصفحة ============
/**
 * تنفيذ الوظائف عند تحميل الصفحة
 */
document.addEventListener('DOMContentLoaded', () => {
    // تشغيل تأثير الكتابة
    typewriterEffect();
    
    // تحديث الملاحة النشطة
    updateActiveNavLink();
    
    // إضافة تأثيرات على الصور
    addImageEffects();
    
    // تهيئة الرسوم المتحركة
    initializeAnimations();
});

// ============ وظيفة: إضافة تأثيرات على الصور ============
/**
 * إضافة تأثيرات بصرية على الصور
 */
function addImageEffects() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.animation = 'fadeInUp 0.6s ease';
        });
    });
}

// ============ وظيفة: تهيئة الرسوم المتحركة ============
/**
 * تهيئة جميع الرسوم المتحركة على الصفحة
 */
function initializeAnimations() {
    // تأثير الظهور للعناصر الرئيسية
    const mainElements = document.querySelectorAll('.hero-content, .section-title');
    mainElements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s backwards`;
    });
}

// ============ وظيفة: معالجة الأخطاء ============
/**
 * معالجة الأخطاء العامة
 */
window.addEventListener('error', (event) => {
    console.error('خطأ:', event.error);
    showNotification('حدث خطأ ما. الرجاء المحاولة لاحقاً', 'error');
});

// ============ وظيفة: تحسين الأداء ============
/**
 * تحسين أداء الصفحة بتأجيل تحميل الموارد
 */
if ('IntersectionObserver' in window) {
    // استخدام Intersection Observer لتحميل الموارد بكفاءة
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // تحميل المورد
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                }
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// ============ وظيفة: دعم الوضع الليلي (اختياري) ============
/**
 * تبديل الوضع الليلي/النهاري
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// استعادة الوضع المحفوظ
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============ وظيفة: تحسين الوصول (Accessibility) ============
/**
 * تحسين سهولة الوصول للموقع
 */
document.addEventListener('keydown', (e) => {
    // الضغط على Escape لإغلاق القائمة
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // الضغط على Tab للتنقل بين العناصر
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============ وظيفة: مراقبة الأداء ============
/**
 * قياس أداء الصفحة
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('وقت تحميل الصفحة: ' + pageLoadTime + 'ms');
    });
}

// ============ وظيفة: دعم الرسائل المخصصة ============
/**
 * عرض رسائل مخصصة للمستخدم
 */
function showCustomMessage(title, message, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="btn btn-primary" onclick="this.closest('.custom-modal').remove()">حسناً</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
    `;
    
    document.body.appendChild(modal);
}

// ============ وظيفة: نسخ النص ============
/**
 * نسخ النص إلى الحافظة
 * @param {string} text - النص المراد نسخه
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم النسخ بنجاح!', 'success');
    }).catch(() => {
        showNotification('فشل النسخ. الرجاء المحاولة يدوياً', 'error');
    });
}

// ============ تصدير الوظائف ============
// جعل الوظائف متاحة عالمياً إذا لزم الأمر
window.copyToClipboard = copyToClipboard;
window.showCustomMessage = showCustomMessage;
window.showNotification = showNotification;
window.toggleDarkMode = toggleDarkMode;

console.log('✅ تم تحميل جميع سكريبتات الموقع بنجاح');
