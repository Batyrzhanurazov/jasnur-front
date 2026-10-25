export interface NewsItem {
  id: string
  titleRu: string
  titleKk: string
  titleEn: string
  summaryRu: string
  summaryKk: string
  summaryEn: string
  contentRu: string
  contentKk: string
  contentEn: string
  date: string
  category: 'education' | 'finance' | 'partnership' | 'digital'
  image: string
}

export const newsArticles: NewsItem[] = [
  {
    id: 'kaspi-finance-seminar',
    titleRu: 'Семинары по финансовой грамотности в 16 регионах совместно с Kaspi Bank',
    titleKk: 'Kaspi Bank-пен бірлесе 16 өңірде қаржылық сауаттылық семинарлары өтті',
    titleEn: 'Financial Literacy Workshops across 16 Regions with Kaspi Bank',
    summaryRu: 'Масштабный проект повышения финансовой безопасности и грамотности людей с нарушением слуха по всему Казахстану.',
    summaryKk: 'Есту қабілеті бұзылған азаматтардың қаржылық қауіпсіздігі мен сауаттылығын арттыруға арналған ауқымды жоба.',
    summaryEn: 'Nationwide initiative empowering hearing-impaired citizens with vital personal finance and anti-fraud knowledge.',
    contentRu: `ОО «Ассоциация Глухих «ЖасНұр» совместно с АО «Kaspi Bank» провело серию масштабных семинаров по финансовой грамотности для людей с нарушением слуха в 16 регионах Казахстана.

В рамках обучающей программы участники узнали о правилах кибергигиены, защите от интернет-мошенников, возможностях мобильного банкинга, депозитах и ответственном управлении семейным бюджетом. Все лекции сопровождались синхронным профессиональным переводом на жестовый язык и наглядными визуальными материалами.`,
    contentKk: `«ЖасНұр» саңыраулар қауымдастығы «Kaspi Bank» АҚ-мен бірлесіп, Қазақстанның 16 өңірінде есту қабілеті шектеулі жандарға арналған қаржылық сауаттылық бойынша бірқатар кең ауқымды семинарлар өткізді.

Бағдарлама аясында қатысушылар киберқауіпсіздік, интернет-алаяқтардан қорғану, мобильді банкинг мүмкіндіктері, депозиттер мен отбасылық бюджетті тиімді басқару туралы құнды білім алды. Барлық сабақтар ым тіліндегі кәсіби аудармамен және көрнекі құралдармен сүйемелденді.`,
    contentEn: `ZhasNur Association of the Deaf, in partnership with Kaspi Bank JSC, successfully delivered financial literacy seminars for deaf and hard-of-hearing communities across 16 regions of Kazakhstan.

The educational workshops focused on cyber hygiene, fraud prevention, digital banking accessibility, savings and responsible budgeting, fully delivered in sign language with adapted visual guides.`,
    date: '2024-11-18',
    category: 'finance',
    image: '/assets/photos/seminar-480.webp'
  },
  {
    id: 'sign-language-courses',
    titleRu: 'Бесплатные курсы английского, турецкого и американского жестового языка',
    titleKk: 'Ағылшын, түрік және американдық ым тілін тегін оқыту курстары',
    titleEn: 'Free Courses in English, Turkish and American Sign Language (ASL)',
    summaryRu: 'Впервые в Казахстане организованы бесплатные международные курсы жестовых языков для детей и взрослых.',
    summaryKk: 'Қазақстанда алғаш рет балалар мен ересектерге арналған халықаралық ым тілдерін оқыту ұйымдастырылды.',
    summaryEn: 'Pioneering free language education opening international horizons for deaf adults and children.',
    contentRu: `При Ассоциации «ЖасНұр» впервые в Республике Казахстан были открыты специализированные курсы изучения английского языка, турецкого жестового языка и американского жестового языка (ASL) для детей и взрослых с нарушением слуха на бесплатной основе.

Программа помогает преодолевать языковые границы, расширяет возможности образования, участия в международных молодежных программах и развивает международную мобильность наших сограждан.`,
    contentKk: `«ЖасНұр» қауымдастығы жанында Қазақстан тарихында тұңғыш рет есту қабілеті бұзылған балалар мен ересектер үшін ағылшын тілі, түрік ым тілі және американдық ым тілі (ASL) бойынша тегін негізде оқыту курстары ұйымдастырылды.

Бұл бағдарлама тілдік кедергілерді жоюға, халықаралық білім беру жобаларына қатысуға және азаматтарымыздың жаһандық деңгейде еркін қарым-қатынас орнатуына жаңа мүмкіндіктер ашады.`,
    contentEn: `For the first time in Kazakhstan, ZhasNur Association has launched free specialized courses teaching English, Turkish Sign Language, and American Sign Language (ASL) for both youth and adults.

This landmark program opens global educational opportunities, career prospects and international exchange for Kazakhstan's deaf community.`,
    date: '2024-09-05',
    category: 'education',
    image: '/assets/photos/sign-dialogue-480.webp'
  },
  {
    id: 'turkmenistan-partnership',
    titleRu: 'Международный обмен опытом с партнерами из Республики Туркменистан',
    titleKk: 'Түрікменстан Республикасынан келген әріптестермен халықаралық тәжірибе алмасу',
    titleEn: 'International Experience Exchange with Partners from Turkmenistan',
    summaryRu: 'Передача методик организации диспетчерской службы сурдоперевода и инклюзивных рабочих мест.',
    summaryKk: 'Сурдоаударма диспетчерлік қызметін ұйымдастыру және инклюзивті жұмыс орындарын құру тәжірибесін бөлісу.',
    summaryEn: 'Sharing expertise in sign interpretation dispatch operations and inclusive manufacturing clusters.',
    contentRu: `В период 2023–2024 годов ОО «Ассоциация Глухих «ЖасНұр» организовало серию встреч и практических сессий по обмену опытом с делегацией партнерских организаций из Республики Туркменистан.

Казахстанские специалисты поделились 15-летним опытом организации круглосуточной диспетчерской службы сурдоперевода, методиками взаимодействия с экстренными службами, а также механизмами создания производственных мастерских с постоянными рабочими местами для людей с инвалидностью.`,
    contentKk: `2023–2024 жылдар аралығында «ЖасНұр» саңыраулар қауымдастығы Түрікменстан Республикасының серіктес ұйымдарымен тәжірибе алмасу бағытында кездесулер мен практикалық семинарлар өткізді.

Қазақстандық сарапшылар тәулік бойы жұмыс істейтін диспетчерлік қызметтің 15 жылдық тәжірибесімен, шұғыл қызметтермен байланыс орнату тетіктерімен және мүмкіндігі шектеулі жандарға арналған өндірістік орындарды құру жолдарымен бөлісті.`,
    contentEn: `During 2023–2024, ZhasNur Association hosted working visits and knowledge-exchange sessions with colleagues from Turkmenistan.

Discussions focused on operational workflows of 24/7 sign language video dispatch, emergency integrations, and sustainable models of social employment enterprises.`,
    date: '2024-04-12',
    category: 'partnership',
    image: '/assets/photos/sign-conversation-480.webp'
  },
  {
    id: 'digital-skills-egov',
    titleRu: 'Цифровые навыки: семинары по e-Gov, aleumet.egov.kz и получению ЭЦП',
    titleKk: 'Цифрлық дағдылар: e-Gov, aleumet.egov.kz және ЭЦП алу бойынша оқыту',
    titleEn: 'Digital Skills: Training on e-Gov, Aleumet Social Portal, and Digital Signatures',
    summaryRu: 'Обучение самостоятельному получению государственных услуг и социальных льгот онлайн.',
    summaryKk: 'Мемлекеттік және әлеуметтік қызметтерді онлайн форматта дербес алуға үйрету.',
    summaryEn: 'Practical courses training deaf citizens in independent access to digital government services.',
    contentRu: `Организацией был проведен комплексный обучающий курс: «Базовые цифровые навыки, электронное правительство, электронные государственные услуги и портал социальных услуг aleumet.egov.kz».

Сурдопереводчики и IT-инструкторы ассоциации обучили участников самостоятельному оформлению ЭЦП, получению технико-компенсаторных средств, подаче заявлений в акиматы и онлайн-записи на приемы в государственные учреждения.`,
    contentKk: `Ұйым «Базалық цифрлық дағдылар, электрондық үкімет, электрондық мемлекеттік қызметтер және aleumet.egov.kz әлеуметтік қызметтер порталы» тақырыбында кешенді оқыту курсын өткізді.

Қауымдастықтың сурдоаудармашылары мен IT-нұсқаушылары қатысушыларды ЭЦП кілттерін алуға, әлеуметтік портал арқылы техникалық оңалту құралдарына тапсырыс беруге және мемлекеттік қызметтерді дербес пайдалануға үйретті.`,
    contentEn: `ZhasNur conducts targeted training covering basic computer literacy, eGov portals, and aleumet.egov.kz (social benefits portal).

Deaf citizens learn how to generate digital signatures (EDS), order technical rehabilitation equipment, and manage their social benefits independently without third-party hurdles.`,
    date: '2024-02-15',
    category: 'digital',
    image: '/assets/photos/operator-signing-480.webp'
  }
]
