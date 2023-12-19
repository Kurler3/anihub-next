export const LOADING_MODAL_ID = 'global_loading_modal_id'

export const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_APP_URL : 'localhost:3000'

export const BASE_PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
