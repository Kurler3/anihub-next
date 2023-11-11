export const PUBLIC_IMAGES_BASE_URL = 'https://fvdbmovmthylsjreouws.supabase.co/storage/v1/object/public/public-images/'

export const PUBLIC_IMAGES_NAMES = ['chiquita_profile_pic.png', 'naruto_mock_profile_pic', 'psyduck_profile_pic']

export const PUBLIC_IMAGES_URLS = PUBLIC_IMAGES_NAMES.map((name) => PUBLIC_IMAGES_BASE_URL + name)
