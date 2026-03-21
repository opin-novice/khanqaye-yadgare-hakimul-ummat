export default {
    name: 'bayan',
    title: 'Bayan (বয়ান)',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'date',
        title: 'Date',
        type: 'date',
        validation: Rule => Rule.required()
      },
      {
        name: 'category',
        title: 'Category (বিভাগ — বাংলায় লিখুন)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'audioUrl',
        title: 'Audio URL (Internet Archive.org Link)',
        type: 'url',
        validation: Rule => Rule.required()
      }
    ]
  }
