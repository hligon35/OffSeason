import storeData from '@/lib/storefront/storeData.json'

import { VideoStoreClient } from '@/components/storefront/VideoStoreClient'

export default function StorePage() {
  return <VideoStoreClient data={storeData} />
}
