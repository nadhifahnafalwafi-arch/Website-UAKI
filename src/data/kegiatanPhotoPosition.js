export const DEFAULT_KEGIATAN_POSITION = 'center 25%'

export const KEGIATAN_POSITION = {

  syiar: 'center 15%',
}

export const getKegiatanPosition = (slug) => KEGIATAN_POSITION[slug] ?? DEFAULT_KEGIATAN_POSITION
