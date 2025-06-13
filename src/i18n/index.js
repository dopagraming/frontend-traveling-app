import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        explore: "Explore",
        about: "About",
        allTrips: "All Trips",
        advancedSearch: "Advanced Search",
        createTrip: "Create Your Trip",
        exclusiveOffers: "Exclusive Offers",
        aboutUs: "About Us",
        customerStories: "Customer Stories",
        contact: "Contact Us",
        wishlist: "Wishlist",
        cart: "Cart",
        login: "Login",
        signup: "Sign Up",
        myAccount: "My Account",
        logout: "Logout"
      },
      // Hero Section
      hero: {
        title: "Your Next",
        titleAccent: "Adventure",
        titleEnd: "Awaits",
        subtitle: "Explore breathtaking destinations, create unforgettable memories, and discover the world's hidden gems with our curated travel experiences.",
        searchPlaceholder: "Search destinations...",
        whereTo: "Where to?",
        checkIn: "Check In",
        checkOut: "Check Out",
        travelers: "Travelers",
        person: "Person",
        people: "People",
        searchAdventures: "Search Adventures"
      },
      // Common
      common: {
        loading: "Loading...",
        error: "Error",
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        confirm: "Confirm",
        back: "Back",
        next: "Next",
        submit: "Submit",
        close: "Close",
        viewMore: "View More",
        bookNow: "Book Now",
        learnMore: "Learn More",
        readMore: "Read More",
        showMore: "Show More",
        showLess: "Show Less"
      },
      // Destinations
      destinations: {
        topDestinations: "Top Destinations",
        popularDestinations: "Popular Destinations",
        subtitle: "Discover the world's most breathtaking destinations, handpicked by our travel experts",
        from: "From",
        perPerson: "per person",
        exploreNow: "Explore Now",
        viewAllDestinations: "View All Destinations"
      },
      // Footer
      footer: {
        quickLinks: "Quick Links",
        services: "Services",
        getInTouch: "Get in Touch",
        newsletter: "Newsletter",
        newsletterDesc: "Get travel tips and exclusive deals",
        yourEmail: "Your email",
        subscribe: "Subscribe",
        allRightsReserved: "All rights reserved",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        cookiePolicy: "Cookie Policy"
      },
      map: {
        sectionTag: "Explore the World",
        title: "Interactive Travel Map",
        subtitle: "Discover amazing destinations around the world and get personalized recommendations",
        bestTime: "Best Time to Visit",
        season: "Spring & Fall",
        averageCost: "Average Cost",
        flightTime: "Flight Time",
        flightDuration: "8-12 hours",
        day: "day",
        viewPackages: "View Packages",
        selectDestination: "Select a Destination",
        clickToExplore: "Click on any pin to explore destination details and travel packages",
        quickActions: "Quick Actions",
        getRecommendations: "Get Recommendations",
        planRoute: "Plan Route"
      }
    }
  },
  ar: {
    translation: {
      // Navigation
      nav: {
        home: "الرئيسية",
        explore: "استكشف",
        about: "حول",
        allTrips: "جميع الرحلات",
        advancedSearch: "البحث المتقدم",
        createTrip: "إنشاء رحلتك",
        exclusiveOffers: "العروض الحصرية",
        aboutUs: "من نحن",
        customerStories: "قصص العملاء",
        contact: "اتصل بنا",
        wishlist: "المفضلة",
        cart: "السلة",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        myAccount: "حسابي",
        logout: "تسجيل الخروج"
      },
      // Hero Section
      hero: {
        title: "مغامرتك",
        titleAccent: "القادمة",
        titleEnd: "تنتظرك",
        subtitle: "استكشف وجهات خلابة، واصنع ذكريات لا تُنسى، واكتشف الجواهر المخفية في العالم مع تجاربنا السياحية المنتقاة بعناية.",
        searchPlaceholder: "ابحث عن الوجهات...",
        whereTo: "إلى أين؟",
        checkIn: "تاريخ الوصول",
        checkOut: "تاريخ المغادرة",
        travelers: "المسافرون",
        person: "شخص",
        people: "أشخاص",
        searchAdventures: "ابحث عن المغامرات"
      },
      // Common
      common: {
        loading: "جاري التحميل...",
        error: "خطأ",
        save: "حفظ",
        cancel: "إلغاء",
        edit: "تعديل",
        delete: "حذف",
        confirm: "تأكيد",
        back: "رجوع",
        next: "التالي",
        submit: "إرسال",
        close: "إغلاق",
        viewMore: "عرض المزيد",
        bookNow: "احجز الآن",
        learnMore: "اعرف المزيد",
        readMore: "اقرأ المزيد",
        showMore: "عرض المزيد",
        showLess: "عرض أقل"
      },
      // Destinations
      destinations: {
        topDestinations: "أفضل الوجهات",
        popularDestinations: "الوجهات الشائعة",
        subtitle: "اكتشف أجمل الوجهات في العالم، منتقاة بعناية من قبل خبراء السفر لدينا",
        from: "من",
        perPerson: "للشخص الواحد",
        exploreNow: "استكشف الآن",
        viewAllDestinations: "عرض جميع الوجهات"
      },
      // Footer
      footer: {
        quickLinks: "روابط سريعة",
        services: "الخدمات",
        getInTouch: "تواصل معنا",
        newsletter: "النشرة الإخبارية",
        newsletterDesc: "احصل على نصائح السفر والعروض الحصرية",
        yourEmail: "بريدك الإلكتروني",
        subscribe: "اشترك",
        allRightsReserved: "جميع الحقوق محفوظة",
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        cookiePolicy: "سياسة ملفات تعريف الارتباط"
      },
      map: {
        sectionTag: "استكشف العالم",
        title: "خريطة السفر التفاعلية",
        subtitle: "اكتشف وجهات مذهلة حول العالم واحصل على توصيات مخصصة",
        bestTime: "أفضل وقت للزيارة",
        season: "الربيع والخريف",
        averageCost: "التكلفة المتوسطة",
        flightTime: "مدة الرحلة",
        day: "يوم",
        flightDuration: "من 8 إلى 12 ساعة",
        viewPackages: "عرض الباقات",
        selectDestination: "اختر وجهة",
        clickToExplore: "اضغط على أي دبوس لاستكشاف تفاصيل الوجهة والباقات السياحية",
        quickActions: "إجراءات سريعة",
        getRecommendations: "احصل على توصيات",
        planRoute: "خطط المسار"
      },
      blog: {
        sectionTag: "رؤى السفر",
        title: "أحدث نصائح السفر والقصص",
        subtitle: "استلهم من نصائح الخبراء، وأدلة الوجهات، وقصص المسافرين الحقيقيين",
        readMore: "اقرأ المزيد",
        viewAll: "عرض جميع المقالات"
      }
    }
  },
  tr: {
    translation: {
      // Navigation
      nav: {
        home: "Ana Sayfa",
        explore: "Keşfet",
        about: "Hakkında",
        allTrips: "Tüm Turlar",
        advancedSearch: "Gelişmiş Arama",
        createTrip: "Turunuzu Oluşturun",
        exclusiveOffers: "Özel Teklifler",
        aboutUs: "Hakkımızda",
        customerStories: "Müşteri Hikayeleri",
        contact: "İletişim",
        wishlist: "Favoriler",
        cart: "Sepet",
        login: "Giriş Yap",
        signup: "Kayıt Ol",
        myAccount: "Hesabım",
        logout: "Çıkış Yap"
      },
      // Hero Section
      hero: {
        title: "Bir Sonraki",
        titleAccent: "Maceranız",
        titleEnd: "Sizi Bekliyor",
        subtitle: "Nefes kesen destinasyonları keşfedin, unutulmaz anılar yaratın ve özenle seçilmiş seyahat deneyimlerimizle dünyanın gizli mücevherlerini keşfedin.",
        searchPlaceholder: "Destinasyonları ara...",
        whereTo: "Nereye?",
        checkIn: "Giriş",
        checkOut: "Çıkış",
        travelers: "Yolcular",
        person: "Kişi",
        people: "Kişi",
        searchAdventures: "Maceraları Ara"
      },
      // Common
      common: {
        loading: "Yükleniyor...",
        error: "Hata",
        save: "Kaydet",
        cancel: "İptal",
        edit: "Düzenle",
        delete: "Sil",
        confirm: "Onayla",
        back: "Geri",
        next: "İleri",
        submit: "Gönder",
        close: "Kapat",
        viewMore: "Daha Fazla Gör",
        bookNow: "Şimdi Rezerve Et",
        learnMore: "Daha Fazla Öğren",
        readMore: "Devamını Oku",
        showMore: "Daha Fazla Göster",
        showLess: "Daha Az Göster"
      },
      // Destinations
      destinations: {
        topDestinations: "En İyi Destinasyonlar",
        popularDestinations: "Popüler Destinasyonlar",
        subtitle: "Seyahat uzmanlarımız tarafından özenle seçilmiş dünyanın en nefes kesen destinasyonlarını keşfedin",
        from: "Başlangıç",
        perPerson: "kişi başı",
        exploreNow: "Şimdi Keşfet",
        viewAllDestinations: "Tüm Destinasyonları Görüntüle"
      },
      // Footer
      footer: {
        quickLinks: "Hızlı Bağlantılar",
        services: "Hizmetler",
        getInTouch: "İletişime Geçin",
        newsletter: "Haber Bülteni",
        newsletterDesc: "Seyahat ipuçları ve özel teklifler alın",
        yourEmail: "E-posta adresiniz",
        subscribe: "Abone Ol",
        allRightsReserved: "Tüm hakları saklıdır",
        privacyPolicy: "Gizlilik Politikası",
        termsOfService: "Hizmet Şartları",
        cookiePolicy: "Çerez Politikası"
      },
      map: {
        sectionTag: "Dünyayı Keşfet",
        title: "Etkileşimli Seyahat Haritası",
        subtitle: "Dünyanın dört bir yanındaki harika destinasyonları keşfedin ve kişisel öneriler alın",
        bestTime: "Ziyaret İçin En Uygun Zaman",
        season: "İlkbahar ve Sonbahar",
        averageCost: "Ortalama Maliyet",
        flightTime: "Uçuş Süresi",
        day: "gün",
        flightDuration: "8-12 saat",
        viewPackages: "Paketleri Görüntüle",
        selectDestination: "Bir Destinasyon Seçin",
        clickToExplore: "Detayları ve seyahat paketlerini görmek için haritadaki herhangi bir noktaya tıklayın",
        quickActions: "Hızlı İşlemler",
        getRecommendations: "Öneri Al",
        planRoute: "Rota Planla"
      },
      blog: {
        sectionTag: "Seyahat Bilgileri",
        title: "Son Seyahat İpuçları ve Hikayeleri",
        subtitle: "Uzman tavsiyeleri, rehberler ve gerçek gezgin hikayeleriyle ilham alın",
        readMore: "Devamını Oku",
        viewAll: "Tüm Makaleleri Gör"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;