import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { createMapper } from '@automapper/core'

export const mobiusLoginResponseMapper = createMapper({
  strategyInitializer: pojos()
})

export interface Root {
  customer: Customer
  customerConsent: CustomerConsent
  customerAddresses: any[]
  customerCreditCards: any[]
  accessToken: string
  refreshToken: string
}

export interface Customer {
  customerId: number
  email: string
  firstName: string
  lastName: string
  phone1: string
  phone2: string
  passwordExists: boolean
}

export interface CustomerConsent {
  allowSmsOrderStatusUpdates: number
  allowSmsLocalRestaurantOffers: number
  allowEmailRestaurantFeedback: number
  allowEmailLocalRestaurantOffers: number
  allowPushNotificationLocalRestaurantOffers: number
}

/**
 * This method basically create the Mapped meta data to the attributes of the interface
 * @param String of identifier string to identify the mapped interface by name
 * @param Root Interface that you want to map the values to its objects
 */
PojosMetadataMap.create<Root>('mobiusLoginResponseMapper', {
  customer: Object,
  customerConsent: Object,
  customerAddresses: Array,
  customerCreditCards: Array,
  accessToken: String,
  refreshToken: String
})
