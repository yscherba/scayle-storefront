import { describe, expect, it } from 'vitest'
import { getQuantitySelectionList } from './quantity'

describe('getQuantitySelectionList', () => {
  it('get list including zero', () => {
    const list = getQuantitySelectionList(5, false)
    expect(list).toEqual([0, 1, 2, 3, 4, 5])
  })
  it('get list excluding zero', () => {
    const list = getQuantitySelectionList(5, true)
    expect(list).toEqual([1, 2, 3, 4, 5])
  })
})
