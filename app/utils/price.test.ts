import { describe, it, expect } from 'vitest'
import type { CentAmount } from '@scayle/storefront-nuxt'
import { getShippingCost, divideByHundred, type AppliedFees } from './price'

describe('getShippingCost', () => {
  it('should return shipping net fee excluding tax', () => {
    const appliedFees: AppliedFees = [
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'delivery',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'delivery',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'payment',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
    ]
    const fees = getShippingCost(appliedFees)
    expect(fees).toEqual(1000)
  })

  it('should return the total cost of delivery, including tax', () => {
    const appliedFees: AppliedFees = [
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'delivery',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'delivery',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
      {
        amount: {
          withoutTax: 500 as CentAmount,
          withTax: 700 as CentAmount,
        },
        category: 'payment',
        key: 'test-key',
        option: 'test-option',
        tax: {
          vat: {
            amount: 500,
            rate: 1,
          },
        },
      },
    ]
    const fees = getShippingCost(appliedFees, { includeTax: true })
    expect(fees).toEqual(1400)
  })

  it('should return 0 if applied fees are empty', () => {
    expect(getShippingCost([])).toEqual(0)
  })
})

describe('divideByHundred', () => {
  it('should divide number by hundred', () => {
    expect(divideByHundred(1000)).toEqual(10)
    expect(divideByHundred(-1000)).toEqual(-10)
    expect(divideByHundred(0)).toEqual(0)
  })
})
