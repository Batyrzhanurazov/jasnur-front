export interface ProjectItem {
  id: string
  titleRu: string
  titleKk: string
  titleEn: string
  category: 'implemented' | 'proposed'
  shortDescRu: string
  shortDescKk: string
  shortDescEn: string
  fullDescRu: string
  fullDescKk: string
  fullDescEn: string
  partner?: string
  image: string
  impactRu?: string
  impactKk?: string
  impactEn?: string
}

export const projectsData: ProjectItem[] = [
  {
    id: 'raznye-ravnye',
    titleRu: 'Республиканский конкурс «Разные-равные»',
    titleKk: '«Әр түрлі - теңдей» республикалық байқауы',
    titleEn: 'Republican Competition "Different - Equal"',
    category: 'implemented',
    shortDescRu: 'Конкурс среди детей и молодежи с особыми потребностями и общественная премия за выдающиеся достижения.',
    shortDescKk: 'Мүмкіндігі шектеулі балалар мен жастар арасындағы байқау және қоғамдық сыйлық.',
    shortDescEn: 'National competition for youth with disabilities and social achievement awards.',
    fullDescRu: 'Проведение первого Республиканского конкурса «Разные-равные» среди детей, молодежи из числа лиц с ограниченными возможностями, общественных объединений, созданных инвалидами, и проведение общественной премии за выдающиеся достижения лиц с ограниченными возможностями в области культуры, спорта, образования и общественной деятельности.',
    fullDescKk: 'Мүмкіндігі шектеулі балалар мен жастар, мүгедектер құрған қоғамдық бірлестіктер арасында алғашқы «Әр түрлі - теңдей» республикалық байқауын өткізу және мәдениет, спорт, білім беру мен қоғамдық қызмет саласындағы жетістіктері үшін қоғамдық сыйлық тағайындау.',
    fullDescEn: 'Organization of the first National Competition "Different - Equal" for youth with disabilities and disability NGOs, including public awards for achievements in culture, sports, education and civic leadership.',
    image: '/assets/photos/sign-dialogue-480.webp',
    impactRu: 'Стимулирование инклюзии, признание талантов и вдохновение сотен участников по всей стране.',
    impactKk: 'Инклюзияны дамыту, таланттарды тану және еліміз бойынша жүздеген қатысушыға шабыт беру.',
    impactEn: 'Fostered inclusion, talent recognition and empowerment for hundreds of participants across Kazakhstan.'
  },
  {
    id: 'poyushchie-ruki',
    titleRu: 'Фестиваль творчества «Поющие руки»',
    titleKk: '«Ән салатын қолдар» шығармашылық фестивалі',
    titleEn: '"Singing Hands" Creative Festival',
    category: 'implemented',
    partner: 'Аджип Карачаганак (Agip Karachaganak)',
    shortDescRu: 'Республиканский фестиваль жестовой песни и творчества молодых талантов с нарушением слуха.',
    shortDescKk: 'Есту қабілеті бұзылған жас таланттар арасындағы ыммен ән айту және шығармашылық фестивалі.',
    shortDescEn: 'National sign-singing and performing arts festival for deaf and hard-of-hearing youth.',
    fullDescRu: 'Республиканский и городской фестиваль творчества молодых талантов среди лиц с нарушением слуха «Поющие руки», реализованный при благотворительной поддержке Компании Аджип Карачаганак. Диспетчерская служба сурдоперевода принимала активное организационное и сурдопереводческое участие.',
    fullDescKk: '«Аджип Қарашығанақ» компаниясының қайырымдылық қолдауымен өткізілген есту қабілеті бұзылған жастардың «Ән салатын қолдар» республикалық және қалалық шығармашылық фестивалі.',
    fullDescEn: 'National and capital creative festival "Singing Hands" for hearing-impaired youth supported by Agip Karachaganak, featuring sign singing, choreography and theater.',
    image: '/assets/photos/hands-480.webp',
    impactRu: 'Развитие жестового пения как уникального направления искусства и творческой самореализации.',
    impactKk: 'Ыммен ән айтуды өнердің ерекше бағыты ретінде дамыту және шығармашылық өзін-өзі жүзеге асыру.',
    impactEn: 'Pioneered sign-singing as an accessible performing art and empowered deaf performers.'
  },
  {
    id: 'sewing-workshop',
    titleRu: 'Швейный цех социальной занятости',
    titleKk: 'Әлеуметтік жұмыспен қамту тігін шеберханасы',
    titleEn: 'Social Sewing Workshop',
    category: 'implemented',
    shortDescRu: 'Создание специализированных рабочих мест и профессиональное обучение швейному делу.',
    shortDescKk: 'Мамандандырылған жұмыс орындарын ашу және тігін ісіне кәсіби оқыту.',
    shortDescEn: 'Creation of inclusive workplaces and vocational training in tailoring and apparel.',
    fullDescRu: 'Швейный цех был открыт для обеспечения постоянной занятости людей с нарушением слуха. Входит в производственный кластер организации (совместно с цехом полуфабрикатов, парикмахерской и тепличным комплексом), обеспечивший 30 постоянных рабочих мест.',
    fullDescKk: 'Есту қабілеті бұзылған азаматтарды тұрақты жұмыспен қамту мақсатында тігін шеберханасы ашылды. Ұйымның 30 тұрақты жұмыс орнын ашқан өндірістік бағыттарының бірі.',
    fullDescEn: 'A fully equipped sewing workshop providing steady employment and tailoring apprenticeships for deaf individuals as part of the 30 permanent jobs initiative.',
    image: '/assets/photos/operator-signing-480.webp',
    impactRu: 'Стабильный доход, трудовая социализация и востребованная квалификация.',
    impactKk: 'Тұрақты табыс, еңбек арқылы бейімделу және сұранысқа ие біліктілік.',
    impactEn: 'Financial independence, professional training and inclusive workplace integration.'
  },
  {
    id: 'food-production',
    titleRu: 'Цех по производству полуфабрикатов',
    titleKk: 'Жартылай фабрикаттар өндірісі цехы',
    titleEn: 'Semi-Finished Food Production Unit',
    category: 'implemented',
    shortDescRu: 'Производство качественных полуфабрикатов с участием неслышащих специалистов.',
    shortDescKk: 'Естімейтін мамандардың қатысуымен сапалы жартылай фабрикаттар өндіру.',
    shortDescEn: 'Food manufacturing facility employing skilled deaf specialists.',
    fullDescRu: 'Открытие цеха по производству полуфабрикатов позволило создать постоянные рабочие места и подтвердило высокую конкурентоспособность и ответственность сотрудников с нарушением слуха в сфере общественного питания и пищевого производства.',
    fullDescKk: 'Жартылай фабрикаттар өндірісі цехын ашу тұрақты жұмыс орындарын құруға және есту қабілеті шектеулі мамандардың тамақ өнеркәсібіндегі жоғары бәсекеге қабілеттілігін көрсетуге мүмкіндік берді.',
    fullDescEn: 'Production facility producing quality culinary goods while creating sustainable employment opportunities for deaf staff in food processing.',
    image: '/assets/photos/sign-conversation-480.webp',
    impactRu: 'Доказательство экономической эффективности инклюзивного социального предпринимательства.',
    impactKk: 'Инклюзивті әлеуметтік кәсіпкерліктің экономикалық тиімділігін дәлелдеу.',
    impactEn: 'Demonstrated the sustainability of social enterprise and inclusive hiring.'
  },
  {
    id: 'proposed-ecosystem',
    titleRu: 'Комплексный проект: Диспетчерская служба, Досуговый клуб и Видеостудия',
    titleKk: 'Кешенді жоба: Диспетчерлік қызмет, Бос уақыт клубы және Бейнестудия',
    titleEn: 'Comprehensive Project: Dispatch Service, Leisure Club and Video Studio',
    category: 'proposed',
    shortDescRu: 'Трехкомпонентная экосистема доступной среды: 24/7 видеосвязь, социализация и жестовые медиа.',
    shortDescKk: 'Қолжетімді ортаның үш компонентті экожүйесі: 24/7 бейнебайланыс, әлеуметтену және ымдау медиасы.',
    shortDescEn: 'Three-component accessibility ecosystem: 24/7 video interpretation, leisure club and sign video media.',
    fullDescRu: 'Функционирование диспетчерской службы сурдоперевода, досугового клуба и мультимедийной студии для производства информационных видеороликов и обеспечения доступа к социально значимой информации с переводом на жестовый язык. Проект направлен на обеспечение информационной доступности для людей с нарушением слуха в Казахстане, повышение их безопасности, правовой осведомлённости и качества жизни.',
    fullDescKk: 'Диспетчерлік қызметтің, бос уақыт клубының және әлеуметтік маңызы бар ақпаратты ым тіліне аударылған бейнероликтермен қамтамасыз ететін мультимедиялық студияның үздіксіз жұмысы. Жоба Қазақстандағы есту қабілеті бұзылған жандардың ақпараттық қолжетімділігін, қауіпсіздігін, құқықтық сауаттылығын және өмір сүру сапасын арттыруға бағытталған.',
    fullDescEn: 'Sustained operation of the 24/7 sign language dispatch service, leisure community club and video studio. Dedicated to equal access to public info, emergency response readiness and enhanced quality of life for deaf citizens.',
    image: '/assets/photos/dispatcher-headset-480.webp',
    impactRu: 'Равный доступ к важной информации, безопасность в экстренных ситуациях (МЧС, полиция, скорая), повышение информированности, самостоятельности и социализации.',
    impactKk: 'Маңызды ақпаратқа тең қолжетімділік, төтенше жағдайлардағы қауіпсіздік (ТЖМ, полиция, жедел жәрдем), ақпараттылықты, дербестікті және әлеуметтенуді арттыру.',
    impactEn: 'Guarantees equal access to essential information, life-saving emergency response, independent access to public services and active socialization.'
  }
]
