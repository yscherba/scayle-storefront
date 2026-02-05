import { describe, expect, it } from 'vitest'
import { Factory } from 'fishery'
import { getFormattedLocaleAddresses } from './address'
import type { OrderAddress } from '~~/types/order'

const orderAddressFactory = Factory.define<OrderAddress>(() => ({
  city: 'Weiden',
  countryCode: 'DE',
  createdAt: '2024-04-16T11:52:23+02:00',
  houseNumber: '1',
  id: 48,
  isBillingAddress: true,
  isDefault: {
    billing: false,
    shipping: false,
  },
  isShippingAddress: false,
  recipient: {
    firstName: 'Joe',
    lastName: 'Smith',
    type: 'personal',
  },
  street: 'Bahnhofstraße',
  updatedAt: '2024-04-16T11:52:23+02:00',
  zipCode: '92637',
}))

describe('getFormattedLocaleAddresses', () => {
  it('should have correct address format for US', () => {
    const address = orderAddressFactory.build({
      city: 'Geneva',
      countryCode: 'USA',
      houseNumber: '31',
      street: 'State Rte',
      state: 'IL',
      zipCode: '60134',
      recipient: {
        firstName: 'FirstName',
        gender: 'm',
        lastName: 'LastName',
        type: 'personal',
      },
    })
    const formattedUsAddress = getFormattedLocaleAddresses(address)

    expect(formattedUsAddress).toEqual([
      'FirstName LastName',
      '31 State Rte',
      'Geneva, IL 60134',
    ])
  })

  it('should have correct address format for UK', () => {
    const address = orderAddressFactory.build({
      city: 'London',
      countryCode: 'GBR',
      houseNumber: '12',
      street: 'Test street',
      zipCode: '12345',
      recipient: {
        firstName: 'FirstName',
        gender: 'm',
        lastName: 'LastName',
        type: 'personal',
      },
    })
    const formattedUkAddress = getFormattedLocaleAddresses(address)

    expect(formattedUkAddress).toEqual([
      'FirstName LastName',
      '12 Test street',
      'London 12345',
    ])
  })

  it('should have correct address format for other countries', () => {
    const address = orderAddressFactory.build({
      city: 'Hamburg',
      countryCode: 'DEU',
      houseNumber: '12',
      street: 'Test Strasse',
      zipCode: '54321',
      recipient: {
        firstName: 'FirstName',
        gender: 'm',
        lastName: 'LastName',
        type: 'personal',
      },
    })
    const formattedOtherAddress = getFormattedLocaleAddresses(address)

    expect(formattedOtherAddress).toEqual([
      'FirstName LastName',
      'Test Strasse 12',
      '54321 Hamburg',
    ])
  })

  it('should show additional data if set', () => {
    const address = orderAddressFactory.build({
      city: 'Hamburg',
      countryCode: 'DEU',
      houseNumber: '12',
      street: 'Test Strasse',
      zipCode: '54321',
      additional: 'additional value',
      recipient: {
        firstName: 'FirstName',
        gender: 'm',
        lastName: 'LastName',
        type: 'personal',
      },
    })
    const formattedOtherAddress = getFormattedLocaleAddresses(address)

    expect(formattedOtherAddress).toEqual([
      'FirstName LastName',
      'Test Strasse 12',
      '54321 Hamburg',
      'additional value',
    ])
  })
})
