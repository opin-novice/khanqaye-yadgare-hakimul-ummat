import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings (সাইট সেটিংস)',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Singleton
  fields: [
    defineField({
      name: 'isLive',
      title: 'Live Audio Active?',
      type: 'boolean',
      description: 'Turn ON before going live. Turn OFF when bayan ends.',
      initialValue: false,
    }),
    defineField({
      name: 'livePlaybackUrl',
      title: 'Livepeer Playback URL',
      type: 'url',
      description: 'Your permanent Livepeer HLS URL (starts with https://livepeercdn...)',
    }),
    defineField({
      name: 'newsTicker',
      title: 'News Ticker (নোটিশ বোর্ড)',
      description: 'The scrolling text that appears below the hero banner.',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'showAnnouncement',
      title: 'Show Special Announcement? (বিশেষ ঘোষণা দেখাবে?)',
      type: 'boolean',
      description: 'Turn this ON to show the message on the homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'announcementMessage',
      title: 'Announcement Message (ঘোষণার বার্তা)',
      type: 'text',
      description: 'The message you want to show murids.',
    })
  ]
})
