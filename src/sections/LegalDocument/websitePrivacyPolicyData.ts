import type { LegalBlock } from './LegalDocument';

type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

const processingTable = {
  columns: ['Цель', 'Законные основания', 'Обрабатываемые данные', 'Срок хранения'],
  rows: [
    [
      'Улучшение качества использования Сайта, разработка новых опций использования, таргетирование рекламных материалов.',
      'Согласие.',
      'Обезличенные аналитические данные: информация о посещаемости сайта, действия пользователей на сайте, время, проведенное на сайте.',
      'В ходе использования Сайта и не более 12 месяцев после последнего использования Сайта.',
    ],
    [
      'Идентификация вас на Сайте, размещение рекламы, повышение качества работы Сайта.',
      'Согласие.',
      'Cookie-файлы: IP-адрес, тип браузера и устройства, операционная система, данные об интернет-провайдере, страна входа, дата и время посещения, количество кликов.',
      'Не более 12 месяцев после последнего использования Сайта.',
    ],
  ],
};

const analyticsTable = {
  columns: ['Данные', 'Аналитический сервис', 'Политика конфиденциальности'],
  rows: [
    [
      'Обезличенные аналитические данные.',
      'Google Analytics 4 через Google Tag Manager.',
      'https://policies.google.com/privacy; https://business.safety.google/adsprocessorterms/',
    ],
  ],
};

const ruWebsitePrivacySections: LegalSection[] = [
  {
    title: 'Кто мы',
    blocks: [
      {
        type: 'paragraph',
        text: 'Мы — компания MALJOY LTD, учрежденная и действующая в соответствии с законодательством Великобритании. Мы являемся контролером ваших персональных данных, то есть самостоятельно определяем цели и средства их обработки. Регистрационный номер: 16216055. Юридический адрес: Suite 12 2nd Floor Queens House, 180 Tottenham Court Road, London, United Kingdom, W1T 7PD.',
      },
      {
        type: 'paragraph',
        text: 'Chatus предназначен для пользователей 18+. Если вам меньше 18 лет, пожалуйста, не используйте Сайт и сервисы Chatus. Если вы не согласны с условиями настоящей Политики, прекратите дальнейшее использование Сайта.',
      },
      {
        type: 'paragraph',
        text: 'Актуальная версия Политики размещается на этой странице. Мы можем обновлять Политику, чтобы учитывать изменения применимого законодательства, судебной практики и работы сервиса. Изменения вступают в силу по истечении 15 дней после опубликования, если в новой версии не указано иное.',
      },
    ],
  },
  {
    title: 'Определения',
    blocks: [
      {
        type: 'list',
        items: [
          'Контактная информация — данные, которыми Пользователь может поделиться с MALJOY для получения справочной информации, связи со службой поддержки, маркетинговых предложений, уведомлений и соблюдения законодательства. Такая информация включает, помимо прочего, адрес электронной почты.',
          'Персональные данные — информация или данные любого характера, позволяющие идентифицировать физическое лицо, включая Контактную информацию и Обезличенные аналитические данные.',
          'Cookie-файлы — текстовые файлы, сгенерированные Сайтом для улучшения пользовательского опыта и хранящиеся на вашем устройстве, а также иные схожие технологии.',
          'Обезличенные аналитические данные — аналитическая обезличенная информация о действиях Пользователя на Сайте, сбор и обработка которой направлены на повышение качества наших услуг.',
          'Применимое законодательство — правовые положения о защите персональных данных и конфиденциальности, субъектом которых вы являетесь в соответствии с вашим местом нахождения или другими правовыми критериями.',
          'Трансграничная передача — передача данных на территорию иностранного государства физическому или юридическому лицу для целей обработки данных, в том числе их хранения.',
        ],
      },
    ],
  },
  {
    title: 'Какие данные мы обрабатываем',
    blocks: [
      {
        type: 'paragraph',
        text: 'Мы получаем данные от вас лично, в том числе из коммуникации и заполненных форм, а также из Cookie-файлов и иных схожих технологий, устанавливаемых нашим Сайтом в вашем браузере.',
      },
      {
        type: 'table',
        ...processingTable,
      },
      {
        type: 'paragraph',
        text: 'Обезличенные аналитические данные помогают нам понять, как посетители взаимодействуют с Сайтом, исправлять ошибки, оценивать демографическую информацию, поддерживать новые типы устройств и улучшать маркетинговые процессы.',
      },
      {
        type: 'table',
        ...analyticsTable,
      },
    ],
  },
  {
    title: 'Кому мы можем передавать данные',
    blocks: [
      {
        type: 'paragraph',
        text: 'Соглашаясь с Политикой, вы подтверждаете согласие на передачу ваших данных нашим аффилированным компаниям и партнерам, которые не являются нашими аффилированными компаниями, в соответствии с положениями настоящей Политики.',
      },
      {
        type: 'paragraph',
        text: 'Мы гарантируем, что уровень защиты Персональных данных, предусмотренный договорами с третьими лицами, такой же либо выше уровня, предусмотренного настоящей Политикой.',
      },
      {
        type: 'list',
        items: [
          'Маркетинговые и деловые коммуникации. В зависимости от характера ваших отношений с MALJOY мы обрабатываем ваши Персональные данные для продвижения наших услуг для вас или наших партнеров.',
          'Улучшение качества Сайта и услуг, исследование рынка. Мы можем предоставлять возможность сторонним службам собирать данные, чтобы оценивать, анализировать и улучшать работу Сайта и услуг.',
          'Передача на основании закона. Мы можем раскрывать информацию в ответ на повестки, запросы, извещения, постановления суда, запросы государственных органов, а также для реализации и защиты наших прав.',
          'Предотвращение нарушений. Мы можем передавать информацию, чтобы расследовать, предотвращать или принимать меры в отношении незаконных действий, предполагаемого мошенничества и ситуаций, связанных с потенциальными угрозами безопасности.',
        ],
      },
    ],
  },
  {
    title: 'Автоматизированные решения',
    blocks: [
      {
        type: 'paragraph',
        text: 'Мы не используем автоматизированное принятие решений и не используем ваши данные для автоматической оценки аспектов вашей личности, включая автоматизированное профилирование.',
      },
    ],
  },
  {
    title: 'Трансграничная передача и хранение',
    blocks: [
      {
        type: 'paragraph',
        text: 'Мы храним данные на территории Соединенного Королевства, обеспечивающего адекватный уровень защиты данных. Соглашаясь с Политикой, вы выражаете согласие на передачу Персональных данных на территорию Соединенного Королевства.',
      },
    ],
  },
  {
    title: 'Безопасность данных',
    blocks: [
      {
        type: 'paragraph',
        text: 'Для нас важна безопасность ваших Персональных данных. Мы следуем общепринятым стандартам для защиты информации как во время передачи, так и после ее получения. Однако ни один метод передачи через Интернет или электронного хранения не является безопасным на 100%.',
      },
      {
        type: 'paragraph',
        text: 'Мы и наши партнеры принимаем соответствующие меры безопасности для защиты от несанкционированного доступа или раскрытия собранной информации. Для MALJOY это включает недопущение раскрытия данных без необходимости, передачу информации через защищенные соединения, а также защиту и шифрование программным обеспечением надлежащего уровня. Наши сотрудники и третьи лица, получающие доступ к вашим данным, обязуются сохранять конфиденциальность.',
      },
    ],
  },
  {
    title: 'Ваши права',
    blocks: [
      {
        type: 'paragraph',
        text: 'Для резидентов Европейской экономической зоны (ЕЭЗ): если вы являетесь резидентом ЕЭЗ, у вас есть права в соответствии с применимыми законами о защите данных.',
      },
      {
        type: 'list',
        items: [
          'Право на доступ: запросить и получить копию имеющихся у нас ваших данных.',
          'Право на исправление или удаление: запросить исправление или удаление имеющихся у нас ваших данных.',
          'Право на ограничение обработки: ограничить обработку имеющихся у нас ваших данных.',
          'Право на переносимость данных: получить данные и передать их иному контролеру.',
          'Право возражать против обработки в определенных обстоятельствах.',
          'Право отозвать согласие в любое время, если мы полагаемся на согласие как на основание обработки.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Для резидентов Российской Федерации: если вы являетесь субъектом персональных данных из Российской Федерации, вы имеете право на защиту прав и свобод при обработке Персональных данных, включая право на неприкосновенность частной жизни, личную и семейную тайну.',
      },
      {
        type: 'list',
        items: [
          'Требовать уточнения, блокирования или уничтожения Персональных данных, если они являются неполными, устаревшими, неточными, незаконно полученными или не нужны для заявленной цели обработки.',
          'Получать информацию, касающуюся обработки Персональных данных, включая факт обработки, правовые основания, цели, способы обработки, сведения о лицах, имеющих доступ к данным, сроки обработки и хранения, сведения о трансграничной передаче и иную предусмотренную законом информацию.',
          'Защищать свои права и законные интересы, включая возмещение убытков и компенсацию морального вреда в судебном порядке.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Для резидентов Бразилии: если бразильское законодательство применимо к обработке ваших Персональных данных, вы имеете права, предусмотренные LGPD.',
      },
      {
        type: 'list',
        items: [
          'Запросить подтверждение факта обработки данных и доступ к обработанным данным.',
          'Запросить исправление неполных, неточных или устаревших данных.',
          'Запросить анонимизацию, блокировку или удаление ненужных, избыточных данных или данных, обработанных с нарушением LGPD.',
          'Запросить перенос данных другому поставщику услуг или продуктов.',
          'Запросить удаление персональных данных, обрабатываемых с вашего согласия.',
          'Получить информацию о государственных и частных организациях, с которыми MALJOY поделилась данными.',
          'Получить сведения о возможности отказа в согласии и последствиях такого отказа.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Для резидентов Индонезии: Закон № 27 от 2022 года о защите персональных данных (UU PDP), вступивший в силу в октябре 2024 года, предоставляет вам права в отношении ваших персональных данных.',
      },
      {
        type: 'list',
        items: [
          'Право на доступ: запросить подтверждение обработки и доступ к данным, включая цели обработки, категории данных и получателей.',
          'Право на исправление: запросить исправление неточных или неполных персональных данных без неоправданной задержки.',
          'Право на прекращение обработки и удаление, если данные больше не нужны, согласие отозвано, возражение удовлетворено или обработка незаконна.',
          'Право на отзыв согласия в любое время.',
          'Право возражать против исключительно автоматизированной обработки, включая профилирование, если оно имеет юридические или аналогичные существенные последствия.',
          'Право запросить временную приостановку обработки на время разрешения спора относительно точности данных или законности обработки.',
          'Право на переносимость данных, если это технически возможно.',
          'Право требовать компенсацию или иное возмещение ущерба в гражданском порядке.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Для резидентов Индии: Закон о защите персональных данных в цифровую эпоху 2023 года (DPDPA) предоставляет вам права как субъекту данных в отношении персональных данных, которые мы обрабатываем в качестве доверительного управляющего данными.',
      },
      {
        type: 'list',
        items: [
          'Право доступа к информации об обработке, включая описание персональных данных, способы обработки и сведения о лицах, с которыми данные были переданы.',
          'Право на исправление, дополнение, обновление и удаление неточных, неполных, устаревших или более не нужных данных.',
          'Право на отзыв согласия в любое время.',
          'Право на оперативное рассмотрение жалоб.',
          'Право назначить другое лицо для осуществления прав на защиту данных в случае смерти или недееспособности.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Мы сознательно не обрабатываем персональные данные детей без подтвержденного согласия родителей или законных опекунов. Если вы считаете, что мы могли обработать персональные данные ребенка без надлежащего согласия, немедленно свяжитесь с нами по адресу privacy@maljoy.io.',
      },
      {
        type: 'paragraph',
        text: 'Для резидентов Турецкой Республики: Закон о защите персональных данных № 6698 (DPL) предоставляет права субъектам данных, получающим доступ к услугам из Турецкой Республики.',
      },
      {
        type: 'list',
        items: [
          'Узнать, обрабатываются ли ваши персональные данные, и запросить информацию об обработке.',
          'Узнать цель обработки и используются ли данные в соответствии с этой целью.',
          'Знать третьих лиц, которым передаются данные в стране или за рубежом.',
          'Запросить исправление неполных или неточных данных.',
          'Запросить удаление персональных данных в соответствии со статьей 7 DPL.',
          'Запросить уведомление третьих лиц о выполненных операциях.',
          'Возражать против результата, возникшего вследствие анализа данных исключительно автоматизированными системами.',
          'Требовать компенсации ущерба, возникшего в результате незаконной обработки данных.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Для жителей Калифорнии: Закон штата Калифорния о защите конфиденциальности потребителей (CCPA) предоставляет резидентам Калифорнии специальные права.',
      },
      {
        type: 'list',
        items: [
          'Право на доступ и информирование о категориях и конкретных элементах Персональных данных, источниках, целях обработки, категориях раскрытия, продажи или передачи данных.',
          'Право на удаление Персональных данных при определенных обстоятельствах.',
          'Право на исправление неточных Персональных данных.',
          'Право отказаться от продажи и обмена Персональных данных. Мы не продаем ваши Персональные данные.',
          'Право на недискриминацию за осуществление прав, изложенных в CCPA.',
        ],
      },
    ],
  },
  {
    title: 'Как реализовать свои права',
    blocks: [
      {
        type: 'paragraph',
        text: 'Чтобы реализовать любое из перечисленных выше прав, свяжитесь с нами по адресу privacy@maljoy.io. Мы ответим на ваш запрос в разумные сроки и, в любом случае, в течение тридцати (30) дней. Нам может потребоваться подтвердить вашу личность перед обработкой запроса.',
      },
      {
        type: 'paragraph',
        text: 'Если предоставление информации может привести к нарушению прав и законных интересов третьих лиц, мы можем отказать в предоставлении информации.',
      },
      {
        type: 'list',
        items: [
          'Ваш адрес электронной почты.',
          'Информация, подтверждающая, что вы связаны с нами, или иная информация, подтверждающая, что мы обрабатываем ваши персональные данные.',
          'Ваша подпись или подпись вашего представителя.',
        ],
      },
    ],
  },
  {
    title: 'Связаться с органами по защите данных',
    blocks: [
      {
        type: 'list',
        items: [
          'Для резидентов ЕЭЗ: вы можете подать жалобу в местный надзорный орган по защите данных. Контактная информация доступна на сайте Европейской комиссии: https://commission.europa.eu/about-european-commission/contact_en.',
          'Для резидентов Российской Федерации: вы можете обратиться в Роскомнадзор: https://rkn.gov.ru/contacts/.',
          'Для резидентов Бразилии: вы можете направить запрос в Бразильский орган по защите данных (ANPD).',
          'Для резидентов Калифорнии: вы можете подать жалобу в California Privacy Protection Agency по адресу PRA@cppa.ca.gov.',
          'Для резидентов Индонезии: жалобы могут быть направлены в Министерство связи и цифровых технологий (Komdigi): https://komdigi.go.id. Портал для подачи жалоб: https://aduankonten.id.',
          'Для резидентов Индии: вы можете подать жалобу в Совет по защите данных Индии: https://dpboard.gov.in. Мы рекомендуем сначала связаться с нами по адресу privacy@maljoy.io, чтобы мы могли попытаться решить вопрос напрямую.',
          'Для резидентов Турецкой Республики: вы можете обратиться в Управление по защите персональных данных: https://www.kvkk.gov.tr/Icerik/6655/Contact-Us.',
        ],
      },
    ],
  },
];

const englishProcessingTable = {
  columns: ['Purpose', 'Legal basis', 'Data processed', 'Storage period'],
  rows: [
    [
      'Improving the quality of Site use, developing new Site features, and targeting advertising materials.',
      'Consent.',
      'Depersonalized analytical data: Site traffic information, user actions on the Site, and time spent on the Site.',
      'During use of the Site and for no more than 12 months after the last use of the Site.',
    ],
    [
      'Identifying you on the Site, displaying advertising, and improving Site performance.',
      'Consent.',
      'Cookies: IP address, browser and device type, operating system, internet provider data, country of access, visit date and time, and number of clicks.',
      'No more than 12 months after the last use of the Site.',
    ],
  ],
};

const englishAnalyticsTable = {
  columns: ['Data', 'Analytics service', 'Privacy policy'],
  rows: [
    [
      'Depersonalized analytical data.',
      'Google Analytics 4 via Google Tag Manager.',
      'https://policies.google.com/privacy; https://business.safety.google/adsprocessorterms/',
    ],
  ],
};

const enWebsitePrivacySections: LegalSection[] = [
  {
    title: 'Who we are',
    blocks: [
      {
        type: 'paragraph',
        text: 'We are MALJOY LTD, a company incorporated and operating under the laws of the United Kingdom. We are the controller of your personal data, meaning that we independently determine the purposes and means of processing it. Registration number: 16216055. Legal address: Suite 12 2nd Floor Queens House, 180 Tottenham Court Road, London, United Kingdom, W1T 7PD.',
      },
      {
        type: 'paragraph',
        text: 'Chatus is intended for users aged 18 and over. If you are under 18, please do not use the Site or Chatus services. If you do not agree with this Policy, stop using the Site.',
      },
      {
        type: 'paragraph',
        text: 'The current version of this Policy is published on this page. We may update the Policy to reflect changes in applicable law, court practice, and service operation. Changes take effect 15 days after publication unless the new version states otherwise.',
      },
    ],
  },
  {
    title: 'Definitions',
    blocks: [
      {
        type: 'list',
        items: [
          'Contact information means data that a User may provide to MALJOY to receive reference information, contact support, receive marketing offers and notices, or comply with legal requirements. This information includes, among other things, an email address.',
          'Personal data means information or data of any nature that can identify an individual, including Contact information and Depersonalized analytical data.',
          'Cookies mean text files generated by the Site to improve user experience and stored on your device, as well as other similar technologies.',
          'Depersonalized analytical data means analytical depersonalized information about User actions on the Site, collected and processed to improve the quality of our services.',
          'Applicable law means personal data protection and privacy rules that apply to you based on your location or other legal criteria.',
          'Cross-border transfer means transferring data to the territory of a foreign state to an individual or legal entity for data processing purposes, including storage.',
        ],
      },
    ],
  },
  {
    title: 'What data we process',
    blocks: [
      {
        type: 'paragraph',
        text: 'We receive data from you directly, including through communications and completed forms, and through Cookies and other similar technologies installed by our Site in your browser.',
      },
      {
        type: 'table',
        ...englishProcessingTable,
      },
      {
        type: 'paragraph',
        text: 'Depersonalized analytical data helps us understand how visitors interact with the Site, fix errors, evaluate demographic information, support new device types, and improve marketing processes.',
      },
      {
        type: 'table',
        ...englishAnalyticsTable,
      },
    ],
  },
  {
    title: 'Who we may share data with',
    blocks: [
      {
        type: 'paragraph',
        text: 'By agreeing to this Policy, you confirm your consent to the transfer of your data to our affiliated companies and partners that are not our affiliated companies, in accordance with this Policy.',
      },
      {
        type: 'paragraph',
        text: 'We ensure that the level of protection of Personal data provided under contracts with third parties is the same as or higher than the level provided by this Policy.',
      },
      {
        type: 'list',
        items: [
          'Marketing and business communications. Depending on the nature of your relationship with MALJOY, we process your Personal data to promote our services to you or to our partners.',
          'Improving the quality of the Site and services, and market research. We may allow third-party services to collect data in order to evaluate, analyze, and improve the Site and services.',
          'Disclosure required by law. We may disclose information in response to subpoenas, requests, notices, court orders, requests from public authorities, and to exercise or protect our rights.',
          'Preventing violations. We may transfer information to investigate, prevent, or take measures against unlawful actions, suspected fraud, and situations involving potential security threats.',
        ],
      },
    ],
  },
  {
    title: 'Automated decisions',
    blocks: [
      {
        type: 'paragraph',
        text: 'We do not use automated decision-making and do not use your data for automated evaluation of aspects of your personality, including automated profiling.',
      },
    ],
  },
  {
    title: 'Cross-border transfer and storage',
    blocks: [
      {
        type: 'paragraph',
        text: 'We store data in the United Kingdom, which provides an adequate level of data protection. By agreeing to this Policy, you consent to the transfer of Personal data to the territory of the United Kingdom.',
      },
    ],
  },
  {
    title: 'Data security',
    blocks: [
      {
        type: 'paragraph',
        text: 'The security of your Personal data is important to us. We follow generally accepted standards to protect information both during transmission and after we receive it. However, no method of transmission over the Internet or electronic storage is 100% secure.',
      },
      {
        type: 'paragraph',
        text: 'We and our partners take appropriate security measures to protect against unauthorized access to or disclosure of collected information. For MALJOY, this includes preventing unnecessary disclosure of data, transmitting information through secure connections, and protecting and encrypting it with software of an appropriate level. Our employees and third parties who receive access to your data undertake to maintain confidentiality.',
      },
    ],
  },
  {
    title: 'Your rights',
    blocks: [
      {
        type: 'paragraph',
        text: 'For residents of the European Economic Area (EEA): if you are an EEA resident, you have rights under applicable data protection laws.',
      },
      {
        type: 'list',
        items: [
          'Right of access: request and receive a copy of the data we hold about you.',
          'Right to rectification or deletion: request correction or deletion of the data we hold about you.',
          'Right to restriction of processing: restrict processing of the data we hold about you.',
          'Right to data portability: receive the data and transfer it to another controller.',
          'Right to object to processing in certain circumstances.',
          'Right to withdraw consent at any time if we rely on consent as the basis for processing.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For residents of the Russian Federation: if you are a personal data subject from the Russian Federation, you have the right to protect your rights and freedoms when Personal data is processed, including the right to privacy, personal secrets, and family secrets.',
      },
      {
        type: 'list',
        items: [
          'Require clarification, blocking, or destruction of Personal data if it is incomplete, outdated, inaccurate, unlawfully obtained, or no longer necessary for the stated processing purpose.',
          'Receive information concerning the processing of Personal data, including the fact of processing, legal grounds, purposes, processing methods, information about persons with access to the data, processing and storage periods, cross-border transfer information, and other information provided by law.',
          'Protect your rights and legitimate interests, including compensation for losses and moral damages through court proceedings.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For residents of Brazil: if Brazilian law applies to the processing of your Personal data, you have the rights provided by LGPD.',
      },
      {
        type: 'list',
        items: [
          'Request confirmation that data is processed and access to processed data.',
          'Request correction of incomplete, inaccurate, or outdated data.',
          'Request anonymization, blocking, or deletion of unnecessary or excessive data, or data processed in violation of LGPD.',
          'Request portability of data to another service or product provider.',
          'Request deletion of personal data processed with your consent.',
          'Receive information about public and private organizations with which MALJOY has shared data.',
          'Receive information about the possibility of refusing consent and the consequences of such refusal.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For residents of Indonesia: Law No. 27 of 2022 on Personal Data Protection (UU PDP), which came into force in October 2024, gives you rights regarding your personal data.',
      },
      {
        type: 'list',
        items: [
          'Right of access: request confirmation of processing and access to data, including processing purposes, data categories, and recipients.',
          'Right to rectification: request correction of inaccurate or incomplete personal data without undue delay.',
          'Right to stop processing and delete data if the data is no longer necessary, consent has been withdrawn, an objection has been upheld, or processing is unlawful.',
          'Right to withdraw consent at any time.',
          'Right to object to exclusively automated processing, including profiling, if it has legal or similarly significant consequences.',
          'Right to request temporary suspension of processing while a dispute regarding data accuracy or processing lawfulness is resolved.',
          'Right to data portability where technically possible.',
          'Right to claim compensation or other civil remedies for damages.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For residents of India: the Digital Personal Data Protection Act, 2023 (DPDPA) gives you rights as a data principal regarding personal data that we process as a data fiduciary.',
      },
      {
        type: 'list',
        items: [
          'Right to access information about processing, including a description of personal data, processing methods, and information about persons with whom the data was shared.',
          'Right to correction, completion, updating, and deletion of inaccurate, incomplete, outdated, or no longer necessary data.',
          'Right to withdraw consent at any time.',
          'Right to prompt grievance redressal.',
          'Right to nominate another person to exercise data protection rights in the event of death or incapacity.',
        ],
      },
      {
        type: 'paragraph',
        text: 'We do not knowingly process children\'s Personal data without verified consent from parents or legal guardians. If you believe we may have processed a child\'s Personal data without proper consent, contact us immediately at privacy@maljoy.io.',
      },
      {
        type: 'paragraph',
        text: 'For residents of the Republic of Turkey: Personal Data Protection Law No. 6698 (DPL) grants rights to data subjects accessing services from the Republic of Turkey.',
      },
      {
        type: 'list',
        items: [
          'Learn whether your personal data is being processed and request information about processing.',
          'Learn the purpose of processing and whether data is used in accordance with that purpose.',
          'Know the third parties to whom data is transferred domestically or abroad.',
          'Request correction of incomplete or inaccurate data.',
          'Request deletion of personal data in accordance with Article 7 of the DPL.',
          'Request notification of third parties about completed operations.',
          'Object to a result arising from analysis of data exclusively by automated systems.',
          'Claim compensation for damages arising from unlawful data processing.',
        ],
      },
      {
        type: 'paragraph',
        text: 'For California residents: the California Consumer Privacy Act (CCPA) grants California residents special rights.',
      },
      {
        type: 'list',
        items: [
          'Right to access and receive information about categories and specific pieces of Personal data, sources, processing purposes, categories of disclosure, sale, or transfer of data.',
          'Right to delete Personal data in certain circumstances.',
          'Right to correct inaccurate Personal data.',
          'Right to opt out of the sale and sharing of Personal data. We do not sell your Personal data.',
          'Right to non-discrimination for exercising rights set out in the CCPA.',
        ],
      },
    ],
  },
  {
    title: 'How to exercise your rights',
    blocks: [
      {
        type: 'paragraph',
        text: 'To exercise any of the rights listed above, contact us at privacy@maljoy.io. We will respond to your request within a reasonable time and, in any case, within thirty (30) days. We may need to verify your identity before processing the request.',
      },
      {
        type: 'paragraph',
        text: 'If providing information may violate the rights and legitimate interests of third parties, we may refuse to provide such information.',
      },
      {
        type: 'list',
        items: [
          'Your email address.',
          'Information confirming that you are connected with us, or other information confirming that we process your Personal data.',
          'Your signature or the signature of your representative.',
        ],
      },
    ],
  },
  {
    title: 'Contacting data protection authorities',
    blocks: [
      {
        type: 'list',
        items: [
          'For EEA residents: you may lodge a complaint with your local data protection supervisory authority. Contact information is available on the European Commission website: https://commission.europa.eu/about-european-commission/contact_en.',
          'For residents of the Russian Federation: you may contact Roskomnadzor: https://rkn.gov.ru/contacts/.',
          'For residents of Brazil: you may send a request to the Brazilian Data Protection Authority (ANPD).',
          'For California residents: you may file a complaint with the California Privacy Protection Agency at PRA@cppa.ca.gov.',
          'For residents of Indonesia: complaints may be submitted to the Ministry of Communication and Digital Technology (Komdigi): https://komdigi.go.id. Complaint portal: https://aduankonten.id.',
          'For residents of India: you may file a complaint with the Data Protection Board of India: https://dpboard.gov.in. We recommend contacting us first at privacy@maljoy.io so that we can try to resolve the matter directly.',
          'For residents of the Republic of Turkey: you may contact the Personal Data Protection Authority: https://www.kvkk.gov.tr/Icerik/6655/Contact-Us.',
        ],
      },
    ],
  },
];

export const ruWebsitePrivacyBlocks: LegalBlock[] = ruWebsitePrivacySections.flatMap(({ title, blocks }) => [
  { type: 'paragraph', text: title },
  ...blocks,
]);

export const enWebsitePrivacyBlocks: LegalBlock[] = enWebsitePrivacySections.flatMap(({ title, blocks }) => [
  { type: 'paragraph', text: title },
  ...blocks,
]);
