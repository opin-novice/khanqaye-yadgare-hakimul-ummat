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
      title: 'PDF Path or URL (পিডিএফ মেমোরি / লিংক)',
      description: "ইন্সট্যান্ট লোডিংয়ের জন্য '/books/filename.pdf' দিন। অথবা Google Drive / Archive.org লিংক দিন।",
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
