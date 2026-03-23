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
      of: [{ type: 'block' }],
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
