export interface RegionStat {
  id: string
  nameRu: string
  nameKk: string
  nameEn: string
  hearingImpaired: number
}

export interface NationalOverview {
  source: string
  date: string
  totalHearingImpaired: number
  totalAdultsDisabled: number
  totalChildrenDisabled: number
}

export const nationalOverview: NationalOverview = {
  source: 'inva.gov.kz/ru/highcharts',
  date: '20.05.2025',
  totalHearingImpaired: 30578,
  totalAdultsDisabled: 626453,
  totalChildrenDisabled: 94828
}

export const regionalStatistics: RegionStat[] = [
  { id: 'almaty-city', nameRu: 'г. Алматы', nameKk: 'Алматы қ.', nameEn: 'Almaty city', hearingImpaired: 3114 },
  { id: 'astana-city', nameRu: 'г. Астана', nameKk: 'Астана қ.', nameEn: 'Astana city', hearingImpaired: 1915 },
  { id: 'shymkent-city', nameRu: 'г. Шымкент', nameKk: 'Шымкент қ.', nameEn: 'Shymkent city', hearingImpaired: 2044 },
  { id: 'turkestan', nameRu: 'Туркестанская область', nameKk: 'Түркістан облысы', nameEn: 'Turkistan region', hearingImpaired: 3896 },
  { id: 'karaganda', nameRu: 'Карагандинская область', nameKk: 'Қарағанды облысы', nameEn: 'Karaganda region', hearingImpaired: 2537 },
  { id: 'zhambyl', nameRu: 'Жамбылская область', nameKk: 'Жамбыл облысы', nameEn: 'Zhambyl region', hearingImpaired: 2000 },
  { id: 'almaty-obl', nameRu: 'Алматинская область', nameKk: 'Алматы облысы', nameEn: 'Almaty region', hearingImpaired: 1957 },
  { id: 'mangystau', nameRu: 'Мангистауская область', nameKk: 'Маңғыстау облысы', nameEn: 'Mangystau region', hearingImpaired: 1252 },
  { id: 'aktobe', nameRu: 'Актюбинская область', nameKk: 'Ақтөбе облысы', nameEn: 'Aktobe region', hearingImpaired: 1177 },
  { id: 'pavlodar', nameRu: 'Павлодарская область', nameKk: 'Павлодар облысы', nameEn: 'Pavlodar region', hearingImpaired: 1173 },
  { id: 'akmola', nameRu: 'Акмолинская область', nameKk: 'Ақмола облысы', nameEn: 'Akmola region', hearingImpaired: 1161 },
  { id: 'kyzylorda', nameRu: 'Кызылординская область', nameKk: 'Қызылорда облысы', nameEn: 'Kyzylorda region', hearingImpaired: 1145 },
  { id: 'atyrau', nameRu: 'Атырауская область', nameKk: 'Атырау облысы', nameEn: 'Atyrau region', hearingImpaired: 1110 },
  { id: 'zhetysu', nameRu: 'Область Жетісу', nameKk: 'Жетісу облысы', nameEn: 'Zhetysu region', hearingImpaired: 1054 },
  { id: 'kostanay', nameRu: 'Костанайская область', nameKk: 'Қостанай облысы', nameEn: 'Kostanay region', hearingImpaired: 1051 },
  { id: 'vko', nameRu: 'Восточно-Казахстанская область', nameKk: 'Шығыс Қазақстан облысы', nameEn: 'East Kazakhstan region', hearingImpaired: 1000 },
  { id: 'sko', nameRu: 'Северо-Казахстанская область', nameKk: 'Солтүстік Қазақстан облысы', nameEn: 'North Kazakhstan region', hearingImpaired: 985 },
  { id: 'abay', nameRu: 'Область Абай', nameKk: 'Абай облысы', nameEn: 'Abai region', hearingImpaired: 838 },
  { id: 'zko', nameRu: 'Западно-Казахстанская область', nameKk: 'Батыс Қазақстан облысы', nameEn: 'West Kazakhstan region', hearingImpaired: 811 },
  { id: 'ulytau', nameRu: 'Область Ұлытау', nameKk: 'Ұлытау облысы', nameEn: 'Ulytau region', hearingImpaired: 358 }
]
