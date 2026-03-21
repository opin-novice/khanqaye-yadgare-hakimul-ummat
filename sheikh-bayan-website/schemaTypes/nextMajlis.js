export default {
  name: 'nextMajlis',
  title: 'Next Majlis (পরবর্তী মজলিস)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Majlis Title (মজলিসের নাম)',
      type: 'string',
      initialValue: 'পরবর্তী মজলিস',
      validation: Rule => Rule.required()
    },
    {
      name: 'datetime',
      title: 'Date & Time of Majlis (তারিখ ও সময়)',
      description: 'Set the exact date and time of the next Majlis. The website countdown will tick to this moment.',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: Rule => Rule.required()
    }
  ],
  // Only allow one document of this type
  __experimental_actions: ['update', 'publish']
}
