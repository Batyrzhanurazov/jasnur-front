export interface ClubEvent {
  id: string
  titleRu: string
  titleKk: string
  titleEn: string
  date: string
  time: string
  locationRu: string
  locationKk: string
  locationEn: string
  type: 'creative' | 'education' | 'career' | 'social'
  typeLabelRu: string
  typeLabelKk: string
  typeLabelEn: string
  descRu: string
  descKk: string
  descEn: string
}

export const clubEvents: ClubEvent[] = [
  {
    id: 'sign-songs-workshop',
    titleRu: 'Мастер-класс по сценическому жестовому пению',
    titleKk: 'Сахналық ыммен ән айту шеберлік сабағы',
    titleEn: 'Scenic Sign Language Singing Masterclass',
    date: '2026-11-05',
    time: '15:00 - 17:00',
    locationRu: 'г. Астана, Клуб «ЖасНұр» (адрес: TODO уточняется)',
    locationKk: 'Астана қ., «ЖасНұр» клубы (мекенжайы: TODO нақтылануда)',
    locationEn: 'Astana, ZhasNur Club (venue: TODO to be confirmed)',
    type: 'creative',
    typeLabelRu: 'Творчество',
    typeLabelKk: 'Шығармашылық',
    typeLabelEn: 'Creative Arts',
    descRu: 'Подготовка номеров к ежегодному фестивалю «Поющие руки»: выразительность жестов, синхронизация с ритмом, сценическое движение.',
    descKk: '«Ән салатын қолдар» фестиваліне дайындық: ым мәнерлілігі, ырғақты сезіну және сахналық пластика.',
    descEn: 'Preparation for the annual "Singing Hands" festival: expressive sign articulation, rhythm synch, and stage poise.'
  },
  {
    id: 'career-guidance-fair',
    titleRu: 'Ярмарка вакансий и профориентационные консультации',
    titleKk: 'Бос орындар жәрмеңкесі және кәсіби бағдар беру',
    titleEn: 'Inclusive Job Fair & Career Counseling',
    date: '2026-11-14',
    time: '11:00 - 14:00',
    locationRu: 'г. Астана (площадка уточняется, TODO)',
    locationKk: 'Астана қ. (өтетін орны нақтылануда, TODO)',
    locationEn: 'Astana (venue to be confirmed, TODO)',
    type: 'career',
    typeLabelRu: 'Профориентация',
    typeLabelKk: 'Кәсіптік бағдар',
    typeLabelEn: 'Career Guidance',
    descRu: 'Прямые собеседования с работодателями столицы при поддержке сурдопереводчиков ассоциации, консультации по резюме.',
    descKk: 'Қауымдастықтың сурдоаудармашыларының көмегімен елордалық жұмыс берушілермен тікелей сұхбаттасу және түйіндеме жазу кеңестері.',
    descEn: 'Direct interviews with inclusive employers assisted by sign language interpreters, resume advisory, and portfolio review.'
  },
  {
    id: 'legal-financial-roundtable',
    titleRu: 'Семинар: «Юридическая защита и портал Aleumet»',
    titleKk: 'Семинар: «Құқықтық қорғау және Aleumet порталы»',
    titleEn: 'Workshop: "Legal Rights & Aleumet Social Portal"',
    date: '2026-11-22',
    time: '16:00 - 18:00',
    locationRu: 'г. Астана, Зал ассоциации «ЖасНұр»',
    locationKk: 'Астана қ., «ЖасНұр» қауымдастығының залы',
    locationEn: 'Astana, ZhasNur Assembly Hall',
    type: 'education',
    typeLabelRu: 'Образование',
    typeLabelKk: 'Білім беру',
    typeLabelEn: 'Education',
    descRu: 'Правовые консультации юриста, оформление документов на портале aleumet.egov.kz, вопросы льгот и жилья.',
    descKk: 'Заңгерден құқықтық кеңес, aleumet.egov.kz арқылы өтініш беру, жеңілдіктер мен баспана кезегі мәселелері.',
    descEn: 'Legal aid session with disability rights lawyers on e-portal benefits, housing programs and legislative protection.'
  },
  {
    id: 'deaf-gaming-board',
    titleRu: 'Игротека и свободное общение на жестовом языке',
    titleKk: 'Ойын алаңы және ым тілінде еркін сұхбаттасу кеші',
    titleEn: 'Board Games Evening & Sign Language Social',
    date: '2026-11-28',
    time: '17:00 - 20:00',
    locationRu: 'г. Астана, Клуб «ЖасНұр»',
    locationKk: 'Астана қ., «ЖасНұр» клубы',
    locationEn: 'Astana, ZhasNur Community Club',
    type: 'social',
    typeLabelRu: 'Коммуникация',
    typeLabelKk: 'Қарым-қатынас',
    typeLabelEn: 'Community Social',
    descRu: 'Настольные игры, живое общение на жестовом языке, чайная зона и знакомство новых участников клуба.',
    descKk: 'Үстел ойындары, ым тіліндегі еркін қарым-қатынас, жайлы орта және жаңа достар табу кеші.',
    descEn: 'Friendly board games, community networking, sign language banter and tea social for deaf youth and families.'
  }
]
