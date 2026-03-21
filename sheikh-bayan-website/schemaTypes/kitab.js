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
      name: 'cover',
      title: 'Book Cover (কিতাবের প্রচ্ছদ)',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'pdfUrl',
      title: 'PDF URL (Archive.org / Drive Link)',
      description: 'Google Drive বা Archive.org এর লিংক পেস্ট করুন',
      type: 'url',
      validation: Rule => Rule.required()
    }
  ]
}
