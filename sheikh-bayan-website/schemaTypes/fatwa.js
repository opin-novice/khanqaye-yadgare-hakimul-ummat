export default {
    name: 'fatwa',
    title: 'Fatwa (ফতোয়া)',
    type: 'document',
    fields: [
      {
        name: 'question',
        title: 'Question',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'answer',
        title: 'Answer',
        type: 'text',
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
            { title: 'Ibadat', value: 'ইবাদত' },
            { title: 'Muamalat', value: 'মুয়ামালাত' },
            { title: 'Family', value: 'পারিবারিক' },
            { title: 'Other', value: 'অন্যান্য' }
          ]
        },
        validation: Rule => Rule.required()
      }
    ]
  }
