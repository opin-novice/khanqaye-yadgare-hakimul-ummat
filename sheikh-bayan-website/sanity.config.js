import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sheikh-bayan-website',

  projectId: '0e1b5dx8',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the "New Document" menu
    templates: (prev) =>
      prev.filter((template) => !['nextMajlis'].includes(template.id)),
  },
  document: {
    // For the "Next Majlis" singleton, we don't want to allow 'duplicate' either
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !['nextMajlis'].includes(template.templateId))
      }
      return prev
    },
  },
})
