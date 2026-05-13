import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LANGS = ["tr", "en", "pt", "es"];

const legalLinks = {
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  cookies: "/cookie-policy"
};

const sectionIds = {
  about: "about",
  services: "services",
  cities: "cities",
  operations: "operations",
  contact: "contact"
};

const L = (value, lang) => (typeof value === "string" ? value : value?.[lang] ?? value?.tr ?? "");

const sourceData = {
  company: {
    name: "Brezilya'ya Hoş Geldiniz",
    legalGroup: "GRUPOEKER",
    travelBrand: "A LA TURCA TRAVEL & MICE",
    rentCarBrand: "KIRMIZIBEYAZ DO BRASIL RENT A CAR & SHUTTLE",
    eventsBrand: "EXPOTURQUIA EVENTS & PR",
    started: "2010",
    foundedTravel: "2016",
    foundedEvents: "2021",
    iata: "IATA TIDS: 96120975",
    addressTourism: "Praça Visc. de Mauá, 42 - Sala 93 - 11010-901 - Centro, Santos – São Paulo | Brasil",
    addressRental: "R. Alexandre Rodrigues, 43 - 11010-901 - Centro, Santos – São Paulo | Brasil",
    phones: ["+55 11 95959-0530", "+55 13 99132-3038"],
    emails: ["eker@eker.com.br", "alaturca@alaturca.com.br", "kirmizibeyaz@kirmizibeyaz.com.br"]
  },
  logos: [
    { name: "GRUPOEKER", image: "https://www.brezilyayahosgeldiniz.com/gallery_gen/76eb815414b6a749b6b31b827bc63e2a_360x370_fit.png?ts=1753540055" },
    { name: "A LA TURCA TRAVEL & MICE", image: "https://www.brezilyayahosgeldiniz.com/gallery/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202025-07-21%20124359.png?ts=1753540055" },
    { name: "KIRMIZIBEYAZ DO BRASIL", image: "https://www.brezilyayahosgeldiniz.com/gallery/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202025-07-21%20124712.png?ts=1753540055" },
    { name: "EXPOTURQUIA EVENTS & PR", image: "https://www.brezilyayahosgeldiniz.com/gallery/Ekran%20g%C3%B6r%C3%BCnt%C3%BCs%C3%BC%202025-07-21%20124623.png?ts=1753540055" }
  ],
  services: [
    {
      icon: "plane",
      title: { tr: "Turizm ve Uçak Rezervasyonu", en: "Tourism and Flight Reservations", pt: "Turismo e Reservas Aéreas", es: "Turismo y Reservas Aéreas" },
      text: { tr: "Turizm, otel, uçak rezervasyonu ve biletleme süreçlerinde yerel acenta desteği.", en: "Local agency support for tourism, hotel bookings, flight reservations and ticketing services.", pt: "Suporte local para turismo, hotéis, reservas aéreas e emissão de passagens.", es: "Soporte local para turismo, hoteles, reservas aéreas y emisión de boletos." }
    },
    {
      icon: "language",
      title: { tr: "Türkçe Rehber ve Tercüman", en: "Turkish Guide and Interpreter", pt: "Guia e Intérprete em Turco", es: "Guía e Intérprete en Turco" },
      text: { tr: "Brezilya seyahati için Türkçe rehberlik ve tercümanlık desteği.", en: "Turkish-speaking guide and interpreter support for Brazil travel experiences.", pt: "Suporte com guia e intérprete em turco para viagens e experiências no Brasil.", es: "Soporte de guía e intérprete en turco para viajes y experiencias en Brasil." }
    },
    {
      icon: "briefcase",
      title: { tr: "MICE, B2B ve Fuar Organizasyonu", en: "MICE, B2B and Trade Fair Operations", pt: "MICE, B2B e Operações em Feiras", es: "MICE, B2B y Operaciones en Ferias" },
      text: { tr: "Toplantı, B2B etkinlikleri, ticaret heyetleri, fuar organizasyonları, tercüman ve hostes temini.", en: "Meetings, B2B events, trade delegations, trade fair operations and interpreter-hostess services.", pt: "Reuniões, eventos B2B, missões comerciais, feiras e fornecimento de intérpretes e recepcionistas.", es: "Reuniones, eventos B2B, misiones comerciales, ferias y suministro de intérpretes y recepcionistas." }
    },
    {
      icon: "shield",
      title: { tr: "VIP Transfer ve Araç Kiralama", en: "VIP Transfer and Car Rental", pt: "Transfer VIP e Locação de Veículos", es: "Traslados VIP y Alquiler de Vehículos" },
      text: { tr: "Şoförlü VIP sedan, Mercedes Vito, minibüs, midibüs, otobüs ve şoförsüz araç kiralama çözümleri.", en: "Chauffeur-driven VIP sedans, Mercedes Vito, minibuses, buses and self-drive rental solutions.", pt: "Sedans VIP com motorista, Mercedes Vito, micro-ônibus, ônibus e locação sem motorista.", es: "Sedanes VIP con chofer, Mercedes Vito, minibuses, autobuses y alquiler sin conductor." }
    }
  ],
  cities: [
    ["Rio de Janeiro", "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop", "Copacabana ve Ipanema plajları, Cristo Redentor, Rio Karnavalı, Sugarloaf Dağı ve Santa Teresa bölgesiyle Brezilya’nın en ikonik şehirlerinden biridir.", "One of Brazil’s most iconic destinations, known for Copacabana, Ipanema, Christ the Redeemer, Sugarloaf Mountain and Santa Teresa.", "Um dos destinos mais icônicos do Brasil, com Copacabana, Ipanema, Cristo Redentor, Pão de Açúcar e Santa Teresa.", "Uno de los destinos más icónicos de Brasil, con Copacabana, Ipanema, Cristo Redentor, Pan de Azúcar y Santa Teresa."],
    ["Brasília", "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1200&auto=format&fit=crop", "Oscar Niemeyer mimarisi, planlı şehir yapısı, Ulusal Katedral ve Kongre Binası ile öne çıkan UNESCO Dünya Mirası başkentidir.", "Brazil’s planned capital and a UNESCO World Heritage site, known for Oscar Niemeyer architecture, the Cathedral and the National Congress.", "Capital planejada do Brasil e Patrimônio Mundial da UNESCO, reconhecida pela arquitetura de Oscar Niemeyer, Catedral e Congresso Nacional.", "Capital planificada de Brasil y Patrimonio Mundial de la UNESCO, reconocida por la arquitectura de Oscar Niemeyer, la Catedral y el Congreso Nacional."],
    ["São Paulo", "https://images.unsplash.com/photo-1543059080-f9b1272213d5?q=80&w=1200&auto=format&fit=crop", "Brezilya’nın ticaret ve kültür merkezi; MASP, Teatro Municipal, gökdelenler, sanat galerileri ve kozmopolit gastronomiyle bilinir.", "Brazil’s business and cultural hub, known for MASP, Teatro Municipal, skyscrapers, galleries and world-class gastronomy.", "Centro econômico e cultural do Brasil, com MASP, Teatro Municipal, arranha-céus, galerias e gastronomia cosmopolita.", "Centro económico y cultural de Brasil, con MASP, Teatro Municipal, rascacielos, galerías y gastronomía cosmopolita."],
    ["Salvador", "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200&auto=format&fit=crop", "Brezilya’nın kültürel kalbi; renkli sokakları, Afrika kökenli mirası, tarihi yapıları, plajları ve enerjik müziğiyle öne çıkar.", "Brazil’s cultural heart, known for colorful streets, Afro-Brazilian heritage, historic architecture, beaches and vibrant music.", "Coração cultural do Brasil, com ruas coloridas, herança afro-brasileira, arquitetura histórica, praias e música vibrante.", "Corazón cultural de Brasil, con calles coloridas, herencia afrobrasileña, arquitectura histórica, playas y música vibrante."],
    ["Fortaleza", "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1200&auto=format&fit=crop", "Kuzeydoğu Brezilya’da tropik plajları, Praia do Futuro, gece hayatı ve forró kültürüyle güçlü bir destinasyondur.", "A strong northeastern destination with tropical beaches, Praia do Futuro, nightlife and the local forró culture.", "Destino forte no Nordeste, com praias tropicais, Praia do Futuro, vida noturna e cultura do forró.", "Destino destacado del Nordeste, con playas tropicales, Praia do Futuro, vida nocturna y cultura del forró."],
    ["Foz do Iguaçu", "https://images.unsplash.com/photo-1593995863951-57c27e518295?q=80&w=1200&auto=format&fit=crop", "Iguaçu Şelaleleri, Arjantin-Paraguay sınır hattı, kültürel çeşitlilik ve Itaipu Barajı ile doğa odaklı eşsiz bir destinasyondur.", "A unique nature destination with Iguaçu Falls, the Argentina-Paraguay border region, cultural diversity and Itaipu Dam.", "Destino natural único com as Cataratas do Iguaçu, tríplice fronteira, diversidade cultural e a Usina de Itaipu.", "Destino natural único con las Cataratas del Iguazú, la triple frontera, diversidad cultural y la represa de Itaipú."],
    ["Vitória", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", "Espírito Santo eyaletinin başkenti; Atlantik kıyısı, adalarla çevrili konumu, sakin plajları ve deniz ürünleriyle bilinir.", "The capital of Espírito Santo, known for its Atlantic coastline, island setting, calm beaches and seafood culture.", "Capital do Espírito Santo, conhecida pelo litoral atlântico, ilhas, praias tranquilas e gastronomia com frutos do mar.", "Capital de Espírito Santo, conocida por su costa atlántica, islas, playas tranquilas y gastronomía de mariscos."],
    ["Maceió", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", "Alagoas eyaletinin sahil kenti; turkuaz denizi, beyaz kumlu plajları, Ponta Verde, Pajuçara ve doğal havuzlarıyla tanınır.", "A coastal city in Alagoas, known for turquoise waters, white-sand beaches, Ponta Verde, Pajuçara and natural lagoons.", "Cidade litorânea de Alagoas, conhecida pelo mar azul-turquesa, praias de areia clara, Ponta Verde, Pajuçara e piscinas naturais.", "Ciudad costera de Alagoas, conocida por aguas turquesas, playas de arena blanca, Ponta Verde, Pajuçara y piscinas naturales."],
    ["Florianópolis", "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop", "Santa Catarina’nın Büyülü Ada olarak anılan başkenti; plajları, sörf kültürü, gece hayatı ve şehir-doğa dengesiyle öne çıkar.", "The capital of Santa Catarina, known as the Magic Island, with beaches, surf culture, nightlife and a strong city-nature balance.", "Capital de Santa Catarina, conhecida como Ilha da Magia, com praias, cultura do surfe, vida noturna e equilíbrio entre cidade e natureza.", "Capital de Santa Catarina, conocida como Isla de la Magia, con playas, cultura del surf, vida nocturna y equilibrio entre ciudad y naturaleza."]
  ].map(([name, image, tr, en, pt, es]) => ({ name, image, text: { tr, en, pt, es } })),
  operations: [
    {
      title: { tr: "Turizm, Transfer ve Yerel Destek Hizmetleri", en: "Tourism, Transfer and Local Support Services", pt: "Turismo, Transfer e Suporte Local", es: "Turismo, Traslados y Soporte Local" },
      text: { tr: "Brezilya genelinde turizm operasyonları, VIP transfer, Türkçe rehberlik, kurumsal organizasyonlar, şehir destek hizmetleri ve özel taleplere yönelik yerel çözümler sunulmaktadır.", en: "Tourism operations, VIP transfers, Turkish-speaking assistance, corporate organization, city support and tailored local solutions across Brazil.", pt: "Operações turísticas, transfers VIP, atendimento em turco, organização corporativa, suporte urbano e soluções locais sob medida em todo o Brasil.", es: "Operaciones turísticas, traslados VIP, asistencia en turco, organización corporativa, soporte urbano y soluciones locales a medida en todo Brasil." }
    }
  ]
};

const copy = {
  tr: {
    nav: [["Hakkımızda", sectionIds.about], ["Hizmetler", sectionIds.services], ["Şehirler", sectionIds.cities], ["Operasyon", sectionIds.operations], ["İletişim", sectionIds.contact]],
    heroTitle: "Brezilya’da Türkçe Destekli Turizm, Transfer ve Organizasyon Hizmetleri",
    heroText: "GRUPOEKER çatısı altında Brezilya’da turizm, araç kiralama, VIP transfer, rehberlik, etkinlik ve B2B organizasyon hizmetleri.",
    ctaPrimary: "WhatsApp ile İletişim",
    ctaSecondary: "Hizmetleri Gör",
    badge: "2010’dan beri Brezilya • IATA belgeli yerel acenta • Türkçe destek",
    aboutTitle: "Güney Amerika’da yerel operasyon ve kurumsal hizmet ağı",
    aboutLead: "2010 yılından bu yana Brezilya merkezli faaliyetlerimizle, Güney Amerika genelinde güvenilir, profesyonel ve entegre çözümler sunuyoruz.",
    aboutText: "2010 yılında Brezilya São Paulo merkezli faaliyetlerine başlayan GRUPOEKER; başta Brezilya, Şili, Arjantin ve Kolombiya olmak üzere Güney Amerika bölgesinde turizm, VIP ulaşım, araç kiralama, etkinlik organizasyonu ve kurumsal operasyon hizmetleri sunmaktadır. Grup bünyesinde faaliyet gösteren KIRMIZIBEYAZ DO BRASIL RENT A CAR & SHUTTLE markası; şoförlü VIP sedan, Mercedes Vito, minibüs, midibüs, otobüs ve şoförsüz araç kiralama çözümleriyle hizmet verirken, IATA belgeli A LA TURCA TRAVEL & MICE markası ise turizm, otel, uçak rezervasyonu, biletleme ve kokartlı yerel rehberlik alanlarında faaliyet göstermektedir. GRUPOEKER bünyesindeki EXPOTURQUIA EVENTS & PR markası ise toplantı organizasyonları, B2B etkinlikleri, ticaret heyetleri, fuar operasyonları, danışmanlık, tercüman-hostes temini ve catering hizmetleri sunarak Güney Amerika operasyonlarını kurumsal ölçekte desteklemektedir.",
    servicesTitle: "Gerçek hizmet alanları",
    servicesText: "GRUPOEKER bünyesinde; turizm operasyonları, VIP ulaşım, araç kiralama, B2B etkinlikleri, fuar organizasyonları ve Türkçe yerel destek hizmetleri Güney Amerika genelinde entegre şekilde sunulmaktadır.",
    citiesTitle: "Popüler turistik şehirler",
    citiesText: "Brezilya’nın öne çıkan şehirlerinde turizm, etkinlik, transfer ve yerel destek ihtiyaçları için profesyonel operasyon çözümleri sunuyoruz.",
    operationsTitle: "Operasyon ve deneyim alanları",
    contactTitle: "Brezilya planınız için doğrudan iletişime geçin",
    contactText: "Turizm, araç kiralama, transfer veya organizasyon ihtiyacınız için Santos / São Paulo merkezli ekiple iletişime geçin.",
    formLabels: ["İsim", "Şehir", "Telefon", "Mesaj"],
    submitLabel: "Gönder",
    consentLabel: "Kişisel verilerimin LGPD kapsamında işlenmesini kabul ediyorum.",
    contactButton: "İletişim",
    legalNotice: "Bu form aracılığıyla gönderilen bilgiler yalnızca iletişim, rezervasyon, teklif ve operasyon süreçleri amacıyla işlenir."
  },
  en: {
    nav: [["About", sectionIds.about], ["Services", sectionIds.services], ["Cities", sectionIds.cities], ["Operations", sectionIds.operations], ["Contact", sectionIds.contact]],
    heroTitle: "Tourism, Transfer and Event Services in Brazil with Turkish Support",
    heroText: "GRUPOEKER provides tourism, car rental, VIP transfer, guiding, event and B2B organization services in Brazil and South America.",
    ctaPrimary: "Contact via WhatsApp",
    ctaSecondary: "View Services",
    badge: "In Brazil since 2010 • IATA-certified agency • Multilingual support",
    aboutTitle: "Corporate local operations across South America",
    aboutLead: "Since 2010, we have provided reliable, professional and integrated solutions across South America through our Brazil-based operations.",
    aboutText: "Founded in São Paulo in 2010, GRUPOEKER operates across South America, especially in Brazil, Chile, Argentina and Colombia, providing tourism, executive transport, car rental, event organization and corporate operation services. KIRMIZIBEYAZ DO BRASIL RENT A CAR & SHUTTLE provides chauffeur-driven VIP sedans, Mercedes Vito vans, minibuses, buses and self-drive rental solutions. IATA-certified A LA TURCA TRAVEL & MICE operates in tourism, hotel reservations, flight reservations, ticketing and licensed local guiding. EXPOTURQUIA EVENTS & PR supports corporate operations through meetings, B2B events, trade delegations, international fair operations, consulting, interpreter-hostess supply and catering services.",
    servicesTitle: "Core service areas",
    servicesText: "Under the GRUPOEKER structure, tourism operations, VIP transportation, car rental, B2B events, trade fair organizations and multilingual local support services are delivered across South America through an integrated operational network.",
    citiesTitle: "Featured destinations",
    citiesText: "We provide professional operational solutions for tourism, events, transfers and local support across Brazil’s key destinations.",
    operationsTitle: "Operations and experiences",
    contactTitle: "Contact our team for your Brazil plan",
    contactText: "For tourism, car rental, transfer or corporate organization, contact our Santos and São Paulo based team.",
    formLabels: ["Name", "City", "Phone", "Message"],
    submitLabel: "Send message",
    consentLabel: "I consent to the processing of my personal data under Brazil’s LGPD.",
    contactButton: "Contact",
    legalNotice: "Information submitted through this form is used only for commercial contact, reservations, quotations and operational support."
  },
  pt: {
    nav: [["Sobre", sectionIds.about], ["Serviços", sectionIds.services], ["Destinos", sectionIds.cities], ["Operações", sectionIds.operations], ["Contato", sectionIds.contact]],
    heroTitle: "Serviços Premium de Turismo, Transfer e Operações no Brasil",
    heroText: "O GRUPOEKER oferece soluções em turismo, transporte VIP, locação de veículos, eventos corporativos e suporte operacional no Brasil e na América do Sul.",
    ctaPrimary: "Falar pelo WhatsApp",
    ctaSecondary: "Conheça os Serviços",
    badge: "Desde 2010 no Brasil • Agência certificada IATA • Atendimento multilíngue",
    aboutTitle: "Estrutura operacional e corporativa na América do Sul",
    aboutLead: "Desde 2010, oferecemos soluções confiáveis, profissionais e integradas em toda a América do Sul a partir de nossas operações no Brasil.",
    aboutText: "Fundado em São Paulo em 2010, o GRUPOEKER atua em diversos países da América do Sul, especialmente no Brasil, Chile, Argentina e Colômbia, oferecendo soluções em turismo, transporte executivo, locação de veículos, organização de eventos e operações corporativas. A KIRMIZIBEYAZ DO BRASIL RENT A CAR & SHUTTLE disponibiliza sedans VIP com motorista, vans Mercedes Vito, micro-ônibus, ônibus e locação sem motorista. A A LA TURCA TRAVEL & MICE, certificada pela IATA, atua com reservas aéreas, hotéis, emissão de passagens e guias locais credenciados. A EXPOTURQUIA EVENTS & PR oferece suporte para reuniões corporativas, eventos B2B, missões comerciais, feiras internacionais, consultoria, intérpretes, recepcionistas e catering.",
    servicesTitle: "Áreas de atuação",
    servicesText: "Dentro da estrutura do GRUPOEKER, operações de turismo, transporte VIP, locação de veículos, eventos B2B, feiras internacionais e suporte local multilíngue são oferecidos de forma integrada em toda a América do Sul.",
    citiesTitle: "Destinos em destaque",
    citiesText: "Oferecemos soluções operacionais para turismo, eventos, transfers e suporte local nos principais destinos do Brasil.",
    operationsTitle: "Operações e experiências",
    contactTitle: "Entre em contato com nossa equipe",
    contactText: "Para turismo, locação de veículos, transfer ou organização corporativa, fale com nossa equipe em Santos e São Paulo.",
    formLabels: ["Nome", "Cidade", "Telefone", "Mensagem"],
    submitLabel: "Enviar mensagem",
    consentLabel: "Autorizo o tratamento dos meus dados pessoais nos termos da LGPD.",
    contactButton: "Entrar em contato",
    legalNotice: "As informações enviadas serão utilizadas exclusivamente para contato comercial, reservas, orçamentos e suporte operacional."
  },
  es: {
    nav: [["Nosotros", sectionIds.about], ["Servicios", sectionIds.services], ["Destinos", sectionIds.cities], ["Operaciones", sectionIds.operations], ["Contacto", sectionIds.contact]],
    heroTitle: "Servicios Premium de Turismo, Traslados y Operaciones en Brasil",
    heroText: "GRUPOEKER ofrece soluciones de turismo, transporte VIP, alquiler de vehículos, eventos corporativos y soporte operativo en Brasil y Sudamérica.",
    ctaPrimary: "Contactar por WhatsApp",
    ctaSecondary: "Ver Servicios",
    badge: "Desde 2010 en Brasil • Agencia certificada IATA • Atención multilingüe",
    aboutTitle: "Estructura operativa y corporativa en Sudamérica",
    aboutLead: "Desde 2010, ofrecemos soluciones confiables, profesionales e integradas en Sudamérica a partir de nuestras operaciones en Brasil.",
    aboutText: "Fundado en São Paulo en 2010, GRUPOEKER opera en distintos países de Sudamérica, especialmente en Brasil, Chile, Argentina y Colombia, ofreciendo soluciones de turismo, transporte ejecutivo, alquiler de vehículos, organización de eventos y operaciones corporativas. KIRMIZIBEYAZ DO BRASIL RENT A CAR & SHUTTLE ofrece sedanes VIP con chofer, vans Mercedes Vito, minibuses, autobuses y alquiler sin conductor. A LA TURCA TRAVEL & MICE, certificada por IATA, opera en reservas aéreas, hoteles, emisión de boletos y guías locales acreditados. EXPOTURQUIA EVENTS & PR brinda soporte para reuniones corporativas, eventos B2B, misiones comerciales, ferias internacionales, consultoría, intérpretes, recepcionistas y catering.",
    servicesTitle: "Áreas de servicio",
    servicesText: "Dentro de la estructura de GRUPOEKER, las operaciones turísticas, transporte VIP, alquiler de vehículos, eventos B2B, ferias internacionales y soporte local multilingüe se ofrecen de manera integrada en toda Sudamérica.",
    citiesTitle: "Destinos destacados",
    citiesText: "Ofrecemos soluciones operativas para turismo, eventos, traslados y soporte local en los principales destinos de Brasil.",
    operationsTitle: "Operaciones y experiencias",
    contactTitle: "Contacte a nuestro equipo",
    contactText: "Para turismo, alquiler de vehículos, traslados u organización corporativa, contacte a nuestro equipo en Santos y São Paulo.",
    formLabels: ["Nombre", "Ciudad", "Teléfono", "Mensaje"],
    submitLabel: "Enviar mensaje",
    consentLabel: "Acepto el tratamiento de mis datos personales conforme a la LGPD brasileña.",
    contactButton: "Contactar",
    legalNotice: "La información enviada será utilizada exclusivamente para contacto comercial, reservas, cotizaciones y soporte operativo."
  }
};

const ui = {
  tr: { about: "Hakkımızda", services: "Hizmetler", cities: "Şehirler", operations: "Operasyonlar", tourism: "Turizm", rental: "Araç Kiralama", phone: "Telefon", email: "E-posta", privacy: "Gizlilik Politikası", terms: "Kullanım Şartları", cookies: "Çerez Politikası", iataDescription: "IATA belgeli yerel turizm acentası ve Brezilya operasyon partneri.", travelDescription: "Turizm, otel rezervasyonu, uçak bileti işlemleri ve kokartlı yerel rehberlik hizmetleri.", eventDescription: "Toplantı, B2B etkinlikleri, ticaret heyetleri ve uluslararası fuar operasyonları.", foundedLabel: "São Paulo merkezli başlangıç", footerText: "Bu web sitesi yalnızca kurumsal tanıtım ve iletişim amacıyla hizmet vermektedir. Tüm marka ve şirket isimleri ilgili ticari yapılara aittir.", countries: "Ülkede operasyon", experience: "Yıllık deneyim", agency: "Belgeli acenta", support: "Operasyon desteği" },
  en: { about: "About", services: "Services", cities: "Cities", operations: "Operations", tourism: "Tourism", rental: "Car Rental", phone: "Phone", email: "Email", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy", iataDescription: "IATA-certified local travel agency and operational partner in Brazil.", travelDescription: "Tourism, hotel reservations, airline ticketing and licensed local guiding services.", eventDescription: "Meetings, B2B events, trade delegations and international fair operations.", foundedLabel: "Founded in São Paulo", footerText: "This website is intended solely for corporate presentation and communication purposes. All brand and company names belong to their respective legal entities.", countries: "Countries covered", experience: "Years of experience", agency: "Certified agency", support: "Operational support" },
  pt: { about: "Sobre", services: "Serviços", cities: "Destinos", operations: "Operações", tourism: "Turismo", rental: "Locação de Veículos", phone: "Telefone", email: "E-mail", privacy: "Política de Privacidade", terms: "Termos de Uso", cookies: "Política de Cookies", iataDescription: "Agência local certificada pela IATA e parceira operacional no Brasil.", travelDescription: "Turismo, reservas de hotéis, passagens aéreas e guias locais credenciados.", eventDescription: "Reuniões, eventos B2B, delegações comerciais e operações em feiras internacionais.", foundedLabel: "Fundado em São Paulo", footerText: "Este site tem finalidade exclusivamente institucional e de comunicação corporativa. Todas as marcas e empresas pertencem às suas respectivas entidades legais.", countries: "Países atendidos", experience: "Anos de experiência", agency: "Agência certificada", support: "Suporte operacional" },
  es: { about: "Nosotros", services: "Servicios", cities: "Destinos", operations: "Operaciones", tourism: "Turismo", rental: "Alquiler de Vehículos", phone: "Teléfono", email: "Correo Electrónico", privacy: "Política de Privacidad", terms: "Términos de Servicio", cookies: "Política de Cookies", iataDescription: "Agencia local certificada por IATA y socio operativo en Brasil.", travelDescription: "Turismo, reservas hoteleras, emisión de boletos y guías locales acreditados.", eventDescription: "Reuniones, eventos B2B, delegaciones comerciales y operaciones en ferias internacionales.", foundedLabel: "Fundado en São Paulo", footerText: "Este sitio web tiene fines exclusivamente institucionales y de comunicación corporativa. Todas las marcas y empresas pertenecen a sus respectivas entidades legales.", countries: "Países atendidos", experience: "Años de experiencia", agency: "Agencia certificada", support: "Soporte operativo" }
};

const icons = {
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></>,
  message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /><path d="M8 10h8" /><path d="M8 14h5" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="3" /></>,
  plane: <><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4Z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-5" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M2 12h20" /></>,
  language: <><path d="M5 8h8" /><path d="M9 4v4" /><path d="M4 14c2.5-1.2 5.5-4.2 6-6" /><path d="M12 14c-1.2-.7-2.7-2.1-3.5-3.5" /><path d="M14 20l4-9 4 9" /><path d="M15.5 17h5" /></>
};

function Icon({ name, className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{icons[name] ?? icons.globe}</svg>;
}

function runSelfTests() {
  const requiredCopy = ["nav", "heroTitle", "heroText", "ctaPrimary", "ctaSecondary", "badge", "aboutTitle", "aboutLead", "aboutText", "servicesTitle", "servicesText", "citiesTitle", "citiesText", "operationsTitle", "contactTitle", "contactText", "formLabels", "submitLabel", "contactButton", "consentLabel", "legalNotice"];
  const requiredUi = ["about", "services", "cities", "operations", "tourism", "rental", "phone", "email", "privacy", "terms", "cookies", "iataDescription", "travelDescription", "eventDescription", "foundedLabel", "footerText", "countries", "experience", "agency", "support"];
  const sections = new Set(Object.values(sectionIds));
  const missingCopy = LANGS.flatMap((lang) => requiredCopy.filter((key) => !copy[lang]?.[key]));
  const missingUi = LANGS.flatMap((lang) => requiredUi.filter((key) => !ui[lang]?.[key]));
  const badNav = LANGS.flatMap((lang) => copy[lang].nav.filter(([label, id]) => !label || !sections.has(id)));
  const badServices = sourceData.services.filter((service) => !service.icon || !icons[service.icon] || LANGS.some((lang) => !service.title[lang] || !service.text[lang]));
  const badCities = sourceData.cities.filter((city) => !city.name || !city.image || LANGS.some((lang) => !city.text[lang]));
  const badOps = sourceData.operations.filter((op) => LANGS.some((lang) => !op.title[lang] || !op.text[lang]));
  const badLogos = sourceData.logos.filter((logo) => !logo.name || !logo.image);
  return { passed: !missingCopy.length && !missingUi.length && !badNav.length && !badServices.length && !badCities.length && !badOps.length && !badLogos.length && sourceData.company.phones.length > 0 && sourceData.company.emails.length > 0 };
}

export default function BrazilWelcomeLanding() {
  const [lang, setLang] = useState("tr");
  const t = copy[lang] ?? copy.tr;
  const u = ui[lang] ?? ui.tr;
  const selfTests = useMemo(() => runSelfTests(), []);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#10251f]">
      {!selfTests.passed && <div className="fixed left-4 top-20 z-[60] rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-lg">Content self-test failed.</div>}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-[#10251f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-wide"><Icon name="globe" /> <span className="hidden sm:inline">{sourceData.company.name}</span><span className="sm:hidden">Brasil</span></a>
          <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">{t.nav.map(([label, id]) => <a key={id} href={`#${id}`} className="transition hover:text-white">{label}</a>)}</nav>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-full border border-white/20 bg-[#10251f] px-3 py-2 text-sm text-white outline-none" aria-label="Language">
            {LANGS.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
          </select>
        </div>
      </header>

      <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-[#10251f] px-5 pt-24 text-white">
        <div className="absolute inset-0 opacity-35"><img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop" alt="Brazil landscape" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251f] via-[#10251f]/75 to-transparent" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85">{t.badge}</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">{t.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{t.heroText}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://wa.me/5511959590530"><Button className="rounded-full bg-[#f5c84c] px-7 py-6 text-[#10251f] hover:bg-[#e9bb3c]"><Icon name="message" className="mr-2 h-5 w-5" /> {t.ctaPrimary}</Button></a>
              <a href={`#${sectionIds.services}`}><Button variant="outline" className="rounded-full border-white/30 bg-white/5 px-7 py-6 text-white hover:bg-white/10">{t.ctaSecondary}</Button></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <Card className="rounded-[2rem] border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-xl"><CardContent className="p-6 md:p-8">
              <div className="mb-6 text-sm uppercase tracking-[0.25em] text-[#f5c84c]">{sourceData.company.legalGroup}</div>
              <div className="grid gap-4">
                {[["shield", sourceData.company.iata, u.iataDescription], ["plane", sourceData.company.travelBrand, u.travelDescription], ["briefcase", sourceData.company.eventsBrand, u.eventDescription]].map(([icon, title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-5"><Icon name={icon} className="mb-3 h-6 w-6 text-[#f5c84c]" /><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-white/70">{text}</p></div>
                ))}
              </div>
            </CardContent></Card>
          </motion.div>
        </div>
      </section>

      <section id={sectionIds.about} className="relative mx-auto max-w-7xl px-5 py-28">
        <div className="absolute inset-x-5 top-12 -z-10 h-[520px] rounded-[3rem] bg-gradient-to-br from-white via-[#fbf7ed] to-[#efe4cf] shadow-[0_30px_100px_rgba(16,37,31,0.08)]" />
        <div className="rounded-[3rem] border border-[#eadfcb] bg-white/85 p-6 shadow-2xl shadow-[#10251f]/10 backdrop-blur md:p-10 lg:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#b0892f]"><span className="h-px w-10 bg-[#b0892f]" />{u.about}</div>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#10251f] md:text-6xl">{t.aboutTitle}</h2>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#46534c]">{t.aboutLead}</p>
            </div>
            <div className="text-[1.05rem] leading-8 text-[#46534c] lg:border-l lg:border-[#e2d6c3] lg:pl-12"><p>{t.aboutText}</p></div>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#e8decb] bg-white shadow-lg shadow-[#10251f]/8">
            <div className="grid divide-y divide-[#eadfcb] md:grid-cols-4 md:divide-x md:divide-y-0">
              {sourceData.logos.map((logo) => (
                <div key={logo.name} className="flex min-h-44 flex-col items-center justify-center gap-4 px-6 py-8">
                  <img src={logo.image} alt={logo.name} className="max-h-32 max-w-[260px] object-contain" loading="lazy" />
                  <div className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#243b34]">{logo.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[[sourceData.company.started, u.foundedLabel, "globe"], [sourceData.company.foundedTravel, sourceData.company.travelBrand, "plane"], [sourceData.company.foundedEvents, sourceData.company.eventsBrand, "briefcase"]].map(([year, label, icon]) => (
              <div key={label} className="group rounded-[2rem] border border-[#eadfcb] bg-[#fffdf8] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#b0892f] text-white shadow-lg shadow-[#b0892f]/25"><Icon name={icon} className="h-6 w-6" /></div>
                <div className="text-3xl font-semibold tracking-tight text-[#b0892f]">{year}</div>
                <div className="mt-2 text-sm font-medium leading-5 text-[#46534c]">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[2rem] bg-[#10251f] text-white shadow-2xl shadow-[#10251f]/20 md:grid-cols-4">
            {[["4+", u.countries, "globe"], ["15+", u.experience, "briefcase"], ["IATA", u.agency, "shield"], ["7/24", u.support, "users"]].map(([value, label, icon]) => (
              <div key={label} className="flex items-center gap-4 border-white/10 px-6 py-6 md:border-r last:border-r-0"><Icon name={icon} className="h-8 w-8 text-[#f5c84c]" /><div><div className="text-2xl font-semibold">{value}</div><div className="text-xs font-medium uppercase tracking-[0.12em] text-white/70">{label}</div></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id={sectionIds.services} className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl"><div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b0892f]">{u.services}</p><h2 className="text-4xl font-semibold tracking-tight">{t.servicesTitle}</h2><p className="mt-4 text-[#5b665f]">{t.servicesText}</p></div>
          <div className="grid gap-5 md:grid-cols-4">{sourceData.services.map((service) => <Card key={L(service.title, lang)} className="rounded-3xl border-[#ece6d8] shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><CardContent className="p-6"><Icon name={service.icon} className="mb-5 h-8 w-8 text-[#b0892f]" /><h3 className="text-lg font-semibold">{L(service.title, lang)}</h3><p className="mt-3 text-sm leading-6 text-[#5b665f]">{L(service.text, lang)}</p></CardContent></Card>)}</div>
        </div>
      </section>

      <section id={sectionIds.cities} className="mx-auto max-w-7xl px-5 py-24">
        <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#b0892f]">{u.cities}</p><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.citiesTitle}</h2><p className="mt-5 text-lg leading-8 text-[#5b665f]">{t.citiesText}</p></div>
        <div className="grid gap-5 md:grid-cols-3">{sourceData.cities.map((city) => <Card key={city.name} className="overflow-hidden rounded-[2rem] border-[#ece6d8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative h-56 overflow-hidden bg-[#10251f]"><img src={city.image} alt={city.name} className="h-full w-full object-cover opacity-80 transition duration-500 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /><div className="absolute bottom-5 left-5 flex items-center gap-2 text-white"><Icon name="pin" className="h-5 w-5 text-[#f5c84c]" /><span className="text-xl font-semibold">{city.name}</span></div></div><CardContent className="p-6"><p className="text-sm leading-6 text-[#5b665f]">{L(city.text, lang)}</p></CardContent></Card>)}</div>
      </section>

      <section id={sectionIds.operations} className="bg-[#10251f] px-5 py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5c84c]">{u.operations}</p><h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.operationsTitle}</h2></div>
          <div className="grid gap-5">{sourceData.operations.map((operation) => <Card key={L(operation.title, lang)} className="rounded-[2rem] border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-xl"><CardContent className="p-7"><Icon name="users" className="mb-5 h-8 w-8 text-[#f5c84c]" /><h3 className="text-2xl font-semibold">{L(operation.title, lang)}</h3><p className="mt-3 leading-7 text-white/70">{L(operation.text, lang)}</p><a href="https://wa.me/5511959590530"><Button className="mt-6 rounded-full bg-[#f5c84c] px-7 py-5 text-[#10251f] hover:bg-[#e9bb3c]"><Icon name="message" className="mr-2 h-5 w-5" /> {t.contactButton}</Button></a></CardContent></Card>)}</div>
        </div>
      </section>

      <section id={sectionIds.contact} className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2.5rem] bg-[#10251f] p-8 text-white md:p-12">
            <h2 className="text-3xl font-semibold md:text-5xl">{t.contactTitle}</h2>
            <p className="mt-4 max-w-2xl text-white/70">{t.contactText}</p>
            <div className="mt-8 space-y-4 text-sm leading-6 text-white/80">
              <p><strong className="text-white">{u.tourism}:</strong> {sourceData.company.addressTourism}</p>
              <p><strong className="text-white">{u.rental}:</strong> {sourceData.company.addressRental}</p>
              <p><strong className="text-white">{u.phone}:</strong> {sourceData.company.phones.join(" | ")}</p>
              <p><strong className="text-white">{u.email}:</strong> {sourceData.company.emails.join(" | ")}</p>
            </div>
          </div>
          <Card className="rounded-[2.5rem] border-[#ece6d8] bg-white shadow-sm"><CardContent className="p-8 md:p-12"><div className="grid gap-4">
            {t.formLabels.map((label, index) => <label key={label} className="grid gap-2 text-sm font-medium text-[#10251f]">{label}{index === 3 ? <textarea className="min-h-32 rounded-2xl border border-[#e5dece] bg-[#faf8f1] px-4 py-3 outline-none focus:border-[#b0892f]" /> : <input className="rounded-2xl border border-[#e5dece] bg-[#faf8f1] px-4 py-3 outline-none focus:border-[#b0892f]" />}</label>)}
            <label className="mt-2 flex items-start gap-3 text-sm leading-6 text-[#5b665f]"><input type="checkbox" className="mt-1" required /><span>{t.consentLabel}</span></label>
            <p className="text-xs leading-5 text-[#7b847f]">{t.legalNotice}</p>
            <Button className="mt-2 rounded-full bg-[#10251f] px-8 py-6 text-white hover:bg-[#1b3a31]"><Icon name="message" className="mr-2 h-5 w-5" /> {t.submitLabel}</Button>
          </div></CardContent></Card>
        </div>
      </section>

      <a href="https://wa.me/5511959590530" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl" aria-label="WhatsApp"><Icon name="message" className="h-7 w-7" /></a>

      <footer className="border-t border-[#e8e1d3] bg-white px-5 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[#5b665f] md:flex-row md:items-center md:justify-between"><div><div className="font-semibold text-[#10251f]">{sourceData.company.legalGroup}</div><p className="mt-1 max-w-2xl leading-6">{u.footerText}</p></div><div className="flex flex-wrap gap-5"><a href={legalLinks.privacy} className="transition hover:text-[#10251f]">{u.privacy}</a><a href={legalLinks.terms} className="transition hover:text-[#10251f]">{u.terms}</a><a href={legalLinks.cookies} className="transition hover:text-[#10251f]">{u.cookies}</a></div></div></footer>
    </main>
  );
}
