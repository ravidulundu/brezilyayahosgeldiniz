import { company } from "./content.js";

export const legalContent = {
  privacy: {
    title: {
      tr: "Gizlilik Bildirimi ve LGPD",
      en: "Privacy Notice and LGPD",
      pt: "Aviso de Privacidade e LGPD",
      es: "Aviso de Privacidad y LGPD",
    },
    lead: {
      tr: "Bu bildirim, GRUPOEKER'in bu site aracılığıyla aldığı kişisel verileri Brezilya LGPD (Kişisel Veri Koruma Kanunu) kapsamında nasıl işlediğini açıklamaktadır.",
      en: "This notice explains how GRUPOEKER processes personal data received through this website, in compliance with Brazil's General Data Protection Law (LGPD).",
      pt: "Este aviso explica, de forma objetiva, como o GRUPOEKER trata dados pessoais recebidos por este site, em conformidade com a Lei Geral de Proteção de Dados Pessoais - LGPD.",
      es: "Este aviso explica cómo GRUPOEKER trata los datos personales recibidos a través de este sitio, conforme a la Ley General de Protección de Datos Personales de Brasil (LGPD).",
    },
    sections: [
      {
        title: {
          tr: "Veri sorumlusu ve yetkili iletişim",
          en: "Data controller and DPO contact",
          pt: "Controlador e contato do encarregado",
          es: "Responsable y contacto del DPO",
        },
        text: [
          {
            tr: `Veri Sorumlusu: ${company.legalGroup}; ${company.travelBrand}, ${company.rentalBrand} ve ${company.eventsBrand} markalarını kapsar.`,
            en: `Data Controller: ${company.legalGroup}, including brands ${company.travelBrand}, ${company.rentalBrand} and ${company.eventsBrand}.`,
            pt: `Controlador: ${company.legalGroup}, incluindo as marcas ${company.travelBrand}, ${company.rentalBrand} e ${company.eventsBrand}.`,
            es: `Responsable: ${company.legalGroup}, incluidas las marcas ${company.travelBrand}, ${company.rentalBrand} y ${company.eventsBrand}.`,
          },
          {
            tr: `Yetkili / LGPD Kanalı: ${company.dpoName} - ${company.dpoEmail}. Bu kanal; işleme onayı, erişim, düzeltme, silme, itiraz, rıza geri çekme ve LGPD kapsamındaki tüm diğer haklar için başvuru kabul etmektedir.`,
            en: `DPO / LGPD Channel: ${company.dpoName} - ${company.dpoEmail}. This channel receives requests regarding processing confirmation, access, correction, deletion, objection, consent withdrawal and all other rights under the LGPD.`,
            pt: `Encarregado / canal LGPD: ${company.dpoName} - ${company.dpoEmail}. Este canal recebe solicitações sobre confirmação de tratamento, acesso, correção, eliminação, oposição, revogação de consentimento e demais direitos previstos na LGPD.`,
            es: `DPO / Canal LGPD: ${company.dpoName} - ${company.dpoEmail}. Este canal recibe solicitudes sobre confirmación de tratamiento, acceso, corrección, eliminación, oposición, revocación del consentimiento y demás derechos previstos en la LGPD.`,
          },
        ],
      },
      {
        title: {
          tr: "İşlenen kişisel veriler",
          en: "Personal data processed",
          pt: "Dados pessoais tratados",
          es: "Datos personales tratados",
        },
        text: [
          {
            tr: "Formu gönderdiğinizde veya e-posta/WhatsApp ile iletişime geçtiğinizde şu veriler işlenebilir: ad, şehir, telefon, e-posta, mesaj içeriği, hizmet dili ve ticari ya da operasyonel talebi karşılamak için gerekli bilgiler.",
            en: "When you submit the form or contact us by email or WhatsApp, we may process: name, city, phone, email, message content, service language and information necessary to respond to the commercial or operational request.",
            pt: "Quando você envia o formulário ou entra em contato por e-mail/WhatsApp, podemos tratar: nome, cidade, telefone, e-mail, conteúdo da mensagem, idioma de atendimento e informações necessárias para responder ao pedido comercial ou operacional.",
            es: "Cuando envía el formulario o se pone en contacto por e-mail o WhatsApp, podemos tratar: nombre, ciudad, teléfono, e-mail, contenido del mensaje, idioma de atención e información necesaria para responder a la solicitud comercial u operativa.",
          },
          {
            tr: "Bu site genel form üzerinden hassas veri, resmi belge, ödeme bilgisi veya çocuk/ergen bilgisi talep etmemektedir.",
            en: "This site does not request sensitive data, official documents, payment information or data concerning children or adolescents through the public form.",
            pt: "Este site não solicita dados sensíveis, documentos oficiais, dados de pagamento ou informações de crianças/adolescentes por meio do formulário público.",
            es: "Este sitio no solicita datos sensibles, documentos oficiales, datos de pago ni información de menores a través del formulario público.",
          },
        ],
      },
      {
        title: {
          tr: "Amaçlar ve hukuki dayanaklar",
          en: "Purposes and legal bases",
          pt: "Finalidades e bases legais",
          es: "Finalidades y bases legales",
        },
        text: [
          {
            tr: "Taleplere yanıt verme, fiyat teklifi hazırlama, rezervasyon, transfer düzenleme, turizm, araç kiralama, yerel destek, etkinlik ve ilgili iletişim faaliyetleri.",
            en: "Responding to requests, preparing quotations, reservations, transfer coordination, tourism, car rental, local support, events and related communications.",
            pt: "Atendimento de solicitações, elaboração de orçamento, reserva, organização de transfer, turismo, locação de veículos, suporte local, eventos e comunicações relacionadas.",
            es: "Atención de solicitudes, elaboración de presupuestos, reservas, coordinación de traslados, turismo, alquiler de vehículos, soporte local, eventos y comunicaciones relacionadas.",
          },
          {
            tr: "Kullanılan hukuki dayanaklar; rıza, sözleşme öncesi işlemler, yasal yükümlülük, hakkın düzenli kullanımı ve ticari iletişimlere yanıt vermek için meşru menfaati kapsayabilir. Tüm işlemler zorunluluk, şeffaflık ve amaç sınırlaması ilkeleriyle yürütülür.",
            en: "Legal bases may include consent, pre-contractual procedures, compliance with legal obligations, exercise of rights and legitimate interest in responding to commercial contacts, always observing necessity, transparency and purpose limitation.",
            pt: "As bases legais utilizadas podem incluir consentimento, execução de procedimentos preliminares relacionados a contrato, cumprimento de obrigação legal/regulatória, exercício regular de direitos e legítimo interesse para responder contatos comerciais, sempre observando necessidade, transparência e finalidade.",
            es: "Las bases legales pueden incluir consentimiento, procedimientos precontractuales, cumplimiento de obligaciones legales, ejercicio regular de derechos e interés legítimo para responder contactos comerciales, siempre con observancia de necesidad, transparencia y finalidad.",
          },
        ],
      },
      {
        title: {
          tr: "Paylaşım ve uluslararası aktarım",
          en: "Sharing and international transfers",
          pt: "Compartilhamento e transferência",
          es: "Compartición y transferencia internacional",
        },
        text: [
          {
            tr: "Veriler yalnızca gerektiğinde grup şirketleri, operasyonel ortaklar, oteller, havayolları, rehberler, sürücüler, etkinlik tedarikçileri, e-posta/hosting sağlayıcıları ve yasal zorunluluk halinde yetkili makamlarla paylaşılabilir.",
            en: "Data may be shared only when necessary with group companies, operational partners, hotels, airlines, guides, drivers, event suppliers, email/hosting providers and competent authorities when legally required.",
            pt: "Os dados podem ser compartilhados somente quando necessário com empresas do grupo, parceiros operacionais, hotéis, companhias aéreas, guias, motoristas, fornecedores de eventos, provedores de e-mail/hospedagem e autoridades competentes quando houver obrigação legal.",
            es: "Los datos podrán compartirse solo cuando sea necesario con empresas del grupo, socios operativos, hoteles, aerolíneas, guías, conductores, proveedores de eventos, proveedores de e-mail/hosting y autoridades competentes cuando exista obligación legal.",
          },
          {
            tr: "Uluslararası hizmet söz konusu olduğunda, talep edilen hizmeti yerine getirmek için gereken ölçüde Brezilya dışına veri aktarımı gerçekleşebilir.",
            en: "When the operation involves international service, information may be transferred outside Brazil to the extent necessary to fulfil the requested service.",
            pt: "Quando a operação envolver atendimento internacional, pode haver transferência de informações para fora do Brasil apenas na medida necessária para executar o serviço solicitado.",
            es: "Cuando la operación implique atención internacional, puede producirse transferencia de información fuera de Brasil en la medida necesaria para ejecutar el servicio solicitado.",
          },
        ],
      },
      {
        title: {
          tr: "Saklama, güvenlik ve silme",
          en: "Storage, security and deletion",
          pt: "Armazenamento, segurança e eliminação",
          es: "Almacenamiento, seguridad y eliminación",
        },
        text: [
          {
            tr: `Veriler belirtilen amaç için gerekli süre boyunca saklanır. Mevcut operasyonel kriter: ${company.retention}`,
            en: `Data is retained for the period necessary for the stated purpose. Current operational criterion: ${company.retention}`,
            pt: `Os dados são mantidos pelo período necessário à finalidade informada. Critério operacional atual: ${company.retention}`,
            es: `Los datos se conservan durante el período necesario para la finalidad indicada. Criterio operacional actual: ${company.retention}`,
          },
          {
            tr: "Makul erişim kontrolü, amaç sınırlaması ve veri minimizasyonu tedbirleri uygulanmaktadır. Amacın sona ermesi veya geçerli talep üzerine veriler, LGPD'nin izin verdiği saklama halleri dışında silinir ya da anonimleştirilir.",
            en: "We implement reasonable access control, purpose limitation and data minimisation measures. Upon expiry of the purpose or upon a valid request, data will be deleted or anonymised, except where the LGPD authorises retention.",
            pt: "Adotamos medidas razoáveis de controle de acesso, limitação de finalidade e minimização de dados. Ao fim da finalidade ou mediante solicitação válida, os dados serão eliminados ou anonimizados, salvo hipóteses de conservação autorizadas pela LGPD.",
            es: "Adoptamos medidas razonables de control de acceso, limitación de finalidad y minimización de datos. Al término de la finalidad o ante solicitud válida, los datos serán eliminados o anonimizados, salvo los supuestos de conservación autorizados por la LGPD.",
          },
        ],
      },
      {
        title: {
          tr: "Veri sahibinin hakları",
          en: "Data subject rights",
          pt: "Direitos do titular",
          es: "Derechos del titular",
        },
        text: [
          {
            tr: "İşleme onayı, erişim, düzeltme, anonimleştirme, engelleme, silme, uygulanabilir durumlarda taşınabilirlik, paylaşım bilgisi, rıza reddi sonuçları hakkında bilgi, rızanın geri çekilmesi ve usulsüz işlemeye itiraz haklarınızı kullanabilirsiniz.",
            en: "You may request processing confirmation, access, correction, anonymisation, blocking, deletion, portability where applicable, information on sharing, information on the consequences of refusing consent, withdrawal of consent and objection to irregular processing.",
            pt: "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade quando aplicável, informação sobre compartilhamentos, informação sobre consequências da negativa de consentimento, revogação do consentimento e oposição a tratamento irregular.",
            es: "Puede solicitar confirmación de tratamiento, acceso, corrección, anonimización, bloqueo, eliminación, portabilidad cuando sea aplicable, información sobre comparticiones, información sobre las consecuencias de la negativa al consentimiento, revocación del consentimiento y oposición al tratamiento irregular.",
          },
          {
            tr: `Haklarınızı kullanmak için "${company.dpoEmail}" adresine "LGPD - Veri Sahibi Hakları" konusuyla mesaj gönderin. Hizmet ücretsizdir ve LGPD ile geçerli mevzuat kapsamında makul süre içinde yanıtlanacaktır.`,
            en: `To exercise your rights, send a message to ${company.dpoEmail} with the subject "LGPD - Data Subject Rights". The service is free and will be responded to within a reasonable timeframe as prescribed by the LGPD and applicable regulations.`,
            pt: `Para exercer seus direitos, envie uma mensagem para ${company.dpoEmail} com o assunto "LGPD - Direitos do Titular". O atendimento é gratuito e será respondido dentro de prazo razoável conforme a LGPD e regulamentação aplicável.`,
            es: `Para ejercer sus derechos, envíe un mensaje a ${company.dpoEmail} con el asunto "LGPD - Derechos del Titular". La atención es gratuita y se responderá en un plazo razonable conforme a la LGPD y la normativa aplicable.`,
          },
        ],
      },
    ],
  },
  terms: {
    title: {
      tr: "Kullanım Şartları",
      en: "Terms of Service",
      pt: "Termos de Uso",
      es: "Términos de Servicio",
    },
    text: [
      {
        tr: "Bu web sitesi GRUPOEKER ve bağlı markalarının kurumsal tanıtımı ve iletişim kanalı olarak hazırlanmıştır.",
        en: "This website has been prepared as a corporate presentation and communication channel for GRUPOEKER and its affiliated brands.",
        pt: "Este site foi criado como canal de apresentação corporativa e comunicação do GRUPOEKER e suas marcas afiliadas.",
        es: "Este sitio web ha sido preparado como canal de presentación corporativa y comunicación de GRUPOEKER y sus marcas asociadas.",
      },
      {
        tr: "Sitedeki tur, transfer, araç kiralama ve organizasyon bilgileri genel bilgilendirme niteliğindedir; kesin hizmet kapsamı talebe göre tekliflendirilir.",
        en: "Information on tours, transfers, car rental and events on this site is for general information purposes; the exact scope of services is quoted upon request.",
        pt: "As informações sobre tours, transfers, locação de veículos e organização de eventos neste site têm caráter informativo; o escopo exato dos serviços é orçado mediante solicitação.",
        es: "La información sobre tours, traslados, alquiler de vehículos y organización de eventos en este sitio es de carácter informativo; el alcance exacto de los servicios se cotiza previa solicitud.",
      },
      {
        tr: "Marka, logo, metin ve görsellerin izinsiz kullanımı uygun değildir.",
        en: "Unauthorized use of brand names, logos, texts and images is not permitted.",
        pt: "O uso não autorizado de marcas, logos, textos e imagens não é permitido.",
        es: "El uso no autorizado de marcas, logotipos, textos e imágenes no está permitido.",
      },
    ],
  },
  cookies: {
    title: {
      tr: "Çerez Politikası",
      en: "Cookie Policy",
      pt: "Política de Cookies",
      es: "Política de Cookies",
    },
    lead: {
      tr: "Bu site, düşük veri toplama ilkesiyle ve aktif reklam izleme olmaksızın yapılandırılmıştır.",
      en: "This site is structured to operate with minimal data collection and without active advertising tracking.",
      pt: "Este site foi estruturado para operar com baixa coleta de dados e sem rastreamento publicitário ativo.",
      es: "Este sitio está estructurado para operar con baja recopilación de datos y sin seguimiento publicitario activo.",
    },
    sections: [
      {
        title: {
          tr: "Mevcut çerez kullanımı",
          en: "Current cookie usage",
          pt: "Uso atual de cookies",
          es: "Uso actual de cookies",
        },
        text: [
          {
            tr: "Mevcut kodda pazarlama, yeniden hedefleme veya davranışsal reklamcılık çerezi yapılandırılmamıştır.",
            en: "In the current codebase, no marketing, remarketing or behavioural advertising cookies are configured.",
            pt: "No código atual, não há cookies de marketing, remarketing ou publicidade comportamental configurados.",
            es: "En el código actual no hay cookies de marketing, remarketing ni publicidad conductual configurados.",
          },
          {
            tr: "Site; sayfa, görsel, stil ve komut dosyalarını yüklemek için tarayıcının ve hosting hizmetinin gerektirdiği teknik kaynakları kullanabilir.",
            en: "The site may use necessary technical browser and hosting resources to load pages, images, styles and scripts.",
            pt: "O site pode utilizar recursos técnicos necessários do navegador e de serviços de hospedagem para carregar páginas, imagens, estilos e scripts.",
            es: "El sitio puede utilizar los recursos técnicos necesarios del navegador y del servicio de alojamiento para cargar páginas, imágenes, estilos y scripts.",
          },
        ],
      },
      {
        title: {
          tr: "Gelecekteki değişiklikler",
          en: "Future changes",
          pt: "Alterações futuras",
          es: "Cambios futuros",
        },
        text: [
          {
            tr: "Analitik araçlar, ücretli medya, izleme pikseli veya zorunlu olmayan çerezler eklenirse bu politika güncellenmeli ve uygulanabilir durumlarda site açık bilgi ile tercih/rıza mekanizması sunmalıdır.",
            en: "If analytics tools, paid media, tracking pixels or non-essential cookies are added, this policy must be updated and the site must provide clear information and a preference/consent mechanism where applicable.",
            pt: "Se ferramentas de analytics, mídia paga, pixel de rastreamento ou cookies não essenciais forem adicionados, esta política deverá ser atualizada e o site deverá oferecer informação clara e mecanismo de preferência/consentimento quando aplicável.",
            es: "Si se añaden herramientas de analítica, medios de pago, píxeles de seguimiento o cookies no esenciales, esta política deberá actualizarse y el sitio deberá ofrecer información clara y un mecanismo de preferencia/consentimiento cuando sea aplicable.",
          },
        ],
      },
    ],
  },
};
