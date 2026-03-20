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
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Tafseer', value: 'তাফসির' },
            { title: 'Jumuah', value: 'জুমুআহ' },
            { title: 'Dars', value: 'দরস' }
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'audioFile',
        title: 'Audio File',
        type: 'file',
        options: {
          accept: 'audio/*'
        },
        validation: Rule => Rule.required()
      }
    ]
  }
