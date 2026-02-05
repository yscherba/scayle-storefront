import type { Preview } from '@storybook-vue/nuxt'
import { useI18n } from '#imports'

const preview: Preview = {
  // https://storybook.js.org/docs/writing-stories/parameters
  // https://storybook.js.org/docs/api/parameters#available-parameters
  parameters: {
    controls: {
      // These controls automatically match properties to a better fitting control.
      // e.g. props with color will be displayed as a color picker.
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    test: {
      // This is needed to ignore errors for the interaction addon. If not set the addon will shown an error for missing assertions in the interaction.
      dangerouslyIgnoreUnhandledErrors: true,
    },
    options: {
      // https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#sorting-stories
      storySort: (a, b) => {
        // If both stories have the same title, they are equal
        if (a.title === b.title) {
          return 0
        }

        // Check if either story title contains "Base Components/"
        const aIsBaseComponent = a.title.includes('Base Components/')
        const bIsBaseComponent = b.title.includes('Base Components/')

        // If only one is a base component, prioritize it
        if (aIsBaseComponent && !bIsBaseComponent) {
          return -1
        }
        if (!aIsBaseComponent && bIsBaseComponent) {
          return 1
        }

        // For all other cases, use default sorting
        return a.title.localeCompare(b.title)
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<div class="flex justify-center items-center p-8"><story /></div>',
      setup: () => {
        const i18n = useI18n()
        i18n.locale.value = 'en'
      },
    }),
  ],
}

export default preview
