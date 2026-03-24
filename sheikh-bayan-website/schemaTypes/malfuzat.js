import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'malfuzat',
  title: 'Malfuzat (মালফুজাত)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (শিরোনাম)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug (ইউআরএল)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date (তারিখ)',
      type: 'date',
    }),
    defineField({
      name: 'content',
      title: 'Content (প্রবন্ধ)',
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Hukm Heading (হুকুম)', value: 'hukmHeading'},
            {title: 'Section Title (বিভাগ)', value: 'sectionTitle'},
          ],
        },
        {
          name: 'arabic',
          type: 'object',
          title: 'Arabic (আরবি)',
          fields: [
            {name: 'text', type: 'text', title: 'Arabic Text'}
          ]
        },
        {
          name: 'urduShair',
          type: 'object',
          title: 'Urdu Shair (উর্দু কবিতা)',
          fields: [
            {name: 'text', type: 'text', title: 'Urdu Text'}
          ]
        },
        {
          name: 'farmaya',
          type: 'object',
          title: 'Farmaya (ফরমায়েছেন)',
          fields: [
            {name: 'text', type: 'text', title: 'Quote Text'}
          ]
        },
        {
          name: 'waquia',
          type: 'object',
          title: 'Waquia (ঘটনা)',
          fields: [
            {name: 'title', type: 'string', title: 'Waquia Title'},
            {name: 'text', type: 'text', title: 'Waquia Text'}
          ]
        },
        {
          name: 'islamicPhrase',
          type: 'object',
          title: 'Islamic Phrase (সুবহানাল্লাহ/আল্লাহু আকবার)',
          fields: [
            {name: 'text', type: 'string', title: 'Phrase'}
          ]
        },
        {
          name: 'summaryList',
          type: 'object',
          title: 'Summary List (খুলাসা)',
          fields: [
            {
              name: 'items',
              type: 'array',
              of: [{type: 'string'}],
              title: 'Summary Items'
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date'
    },
    prepare(selection) {
      const { title, date } = selection
      return {
        title: title,
        subtitle: date
      }
    }
  }
})
