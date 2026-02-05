import { it, describe, expect } from 'vitest'
import type { AttributeGroupSingle } from '@scayle/storefront-nuxt'
import { getPrimaryImage, sortProductImages } from './image'

const primaryImage: AttributeGroupSingle = {
  id: 7061,
  key: 'primaryImage',
  label: 'Primary Image',
  multiSelect: false,
  type: '',
  values: {
    id: 2433,
    label: 'true',
    value: 'true',
  },
}

describe('getPrimaryImage', () => {
  it('returns the first primary image', () => {
    const image = getPrimaryImage([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash3',
      },
    ])

    expect(image).toEqual({
      hash: 'hash2',
      attributes: {
        primaryImage,
      },
    })
  })

  it('returns the first image if no primary image exists', () => {
    const image = getPrimaryImage([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
      },
      {
        hash: 'hash3',
      },
    ])

    expect(image).toEqual({ hash: 'hash1' })
  })

  it('should return the first image with matching primaryImageType', () => {
    const image = getPrimaryImage(
      [
        {
          hash: 'hash1',
        },
        {
          hash: 'hash2',
          attributes: {
            primaryImage,
          },
        },
        {
          hash: 'hash3',
          attributes: {
            primaryImageType: {
              id: 1,
              key: 'primaryImageType',
              label: 'Primary Image Type',
              multiSelect: false,
              type: '',
              values: {
                label: 'Primary',
                value: 'primary',
              },
            },
          },
        },
      ],
      'primary',
    )

    expect(image).toStrictEqual(
      expect.objectContaining({
        hash: 'hash3',
      }),
    )
  })
  it('should return use the primary image when the preferredPrimaryImageType is not found', () => {
    const image = getPrimaryImage(
      [
        {
          hash: 'hash1',
        },
        {
          hash: 'hash2',
          attributes: {
            primaryImage,
          },
        },
        {
          hash: 'hash3',
          attributes: {
            primaryImageType: {
              id: 1,
              key: 'primaryImageType',
              label: 'Primary Image Type',
              multiSelect: false,
              type: '',
              values: {
                label: 'Primary',
                value: 'primary',
              },
            },
          },
        },
      ],
      'test',
    )

    expect(image).toStrictEqual(
      expect.objectContaining({
        hash: 'hash2',
      }),
    )
  })
})

describe('getSortedImages', () => {
  it('should not change the sorting if no primary image exists', () => {
    const images = sortProductImages([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
      },
      {
        hash: 'hash3',
      },
    ])

    expect(images).toStrictEqual([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
      },
      {
        hash: 'hash3',
      },
    ])
  })

  it('should sort primary images to the front', () => {
    const images = sortProductImages([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash3',
      },
    ])

    expect(images).toStrictEqual([
      {
        hash: 'hash2',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash1',
      },
      {
        hash: 'hash3',
      },
    ])
  })

  it('should handle images with multiple primary images', () => {
    const images = sortProductImages([
      {
        hash: 'hash1',
      },
      {
        hash: 'hash2',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash3',
      },
      {
        hash: 'hash4',
        attributes: {
          primaryImage,
        },
      },
    ])

    expect(images).toStrictEqual([
      {
        hash: 'hash2',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash4',
        attributes: {
          primaryImage,
        },
      },
      {
        hash: 'hash1',
      },
      {
        hash: 'hash3',
      },
    ])
  })

  it('should sort images by type if primaryImageType is provided', () => {
    const images = sortProductImages(
      [
        {
          hash: 'hash1',
        },
        {
          hash: 'hash2',
          attributes: {
            primaryImageType: {
              id: 1,
              key: 'primaryImageType',
              label: 'Primary Image Type',
              multiSelect: false,
              type: '',
              values: {
                label: 'Primary',
                value: 'primary',
              },
            },
          },
        },
      ],
      'primary',
    )

    expect(images).toStrictEqual([
      expect.objectContaining({
        hash: 'hash2',
      }),
      expect.objectContaining({
        hash: 'hash1',
      }),
    ])
  })
  it('should sort the primary image to the front if preferredPrimaryImageType not found', () => {
    const images = sortProductImages(
      [
        {
          hash: 'hash1',
          attributes: {
            primaryImageType: {
              id: 1,
              key: 'primaryImageType',
              label: 'Primary Image Type',
              multiSelect: false,
              type: '',
              values: {
                label: 'Primary',
                value: 'primary',
              },
            },
          },
        },
        {
          hash: 'hash2',
          attributes: {
            primaryImage,
          },
        },
        {
          hash: 'hash3',
        },
      ],
      'test',
    )

    expect(images).toStrictEqual([
      expect.objectContaining({
        hash: 'hash2',
      }),
      expect.objectContaining({
        hash: 'hash1',
      }),
      expect.objectContaining({
        hash: 'hash3',
      }),
    ])
  })
})
