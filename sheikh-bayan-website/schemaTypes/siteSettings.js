export default {
  name: 'siteSettings',
  title: 'Site Settings (সাইট সেটিংস)',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Singleton
  fields: [
    {
      name: 'newsTicker',
      title: 'News Ticker (নোটিশ বোর্ড)',
      description: 'The scrolling text that appears below the hero banner.',
      type: 'string',
      validation: Rule => Rule.required()
    }
  ]
}
