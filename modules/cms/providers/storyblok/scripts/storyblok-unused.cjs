// Script taken from https://www.storyblok.com/faq/how-to-get-all-unused-components
// Requires STORYBLOK_PERSONAL_TOKEN to be set as an env variable
// You can create it here https://app.storyblok.com/#/me/account?tab=token
// Then add it to your .env file

// https://nodejs.org/docs/latest-v20.x/api/process.html#processloadenvfilepath
process.loadEnvFile('.env.storyblok')

// Install dependency: npm install storyblok-js-client
const StoryblokClient = require('storyblok-js-client')

// Initialize the client with the oauth token
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_PERSONAL_TOKEN,
})

const start = async () => {
  const usedComponents = []
  const unusedComponents = []

  // Some more output, so you see what is going on here
  console.log('Loading list of components')

  let components
  try {
    // load information of first 100 components - otherwise we would need to use paging as 100 is max.
    components = await Storyblok.get(
      `spaces/${process.env.STORYBLOK_SPACE_ID}/components/`,
      {
        per_page: 100,
      },
    )
  } catch (e) {
    console.error(e)
  }

  // Some more output, so you see what is going on here
  console.log('Looking for unused components')

  // loop through all components
  for (
    let index = 0, max = components.data.components.length;
    index < max;
    index++
  ) {
    const component = components.data.components[index]

    // call the management api with the contain_component query parameter and the per_page
    // parameter 1 to reduce payload and speed up to process even tho it is sync
    const stories = await Storyblok.get(
      `spaces/${process.env.STORYBLOK_SPACE_ID}/stories/`,
      {
        contain_component: component.name,
        per_page: 10,
      },
    )

    // check if at least one story returned; if no story would contain a component
    // the stories array of the call above would be empty, and assign component accordingly.
    if (stories.data.stories.length > 0) {
      usedComponents.push({
        name: component.name,
        usages:
          stories.data.stories.length >= 10
            ? '10+'
            : stories.data.stories.length,
      })
    } else {
      unusedComponents.push(component.name)
    }

    // Some more output, so you see what is going on here
    console.log(`Looking for unused components (${index + 1}/${max})`)
  }

  // Output
  console.log('Used Components: ')
  console.table(usedComponents)
  console.log('Unused Components: ', unusedComponents)
}

start()
