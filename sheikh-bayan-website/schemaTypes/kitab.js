export default {
  name: 'kitab',
  title: 'কিতাব (বই)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Book Name (কিতাবের নাম)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL (Archive.org Link)',
      description: 'Archive.org এ আপলোড করে লিংক পেস্ট করুন',
      type: 'url',
      validation: Rule => Rule.required()
    }
  ]
}
