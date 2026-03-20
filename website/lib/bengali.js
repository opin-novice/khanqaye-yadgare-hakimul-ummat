export function toBengaliNumerals(str) {
  if (!str) return '';
  const benNum = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return str.toString().replace(/[0-9]/g, w => benNum[w]);
}

export function formatBengaliMonth(isoDateString) {
  if (!isoDateString) return '';
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const [year, month] = isoDateString.split('-');
  const monthName = months[parseInt(month, 10) - 1];
  return `${monthName} ${toBengaliNumerals(year)}`;
}

export function formatBengaliDate(isoDateString) {
  if (!isoDateString) return '';
  const [year, month, day] = isoDateString.split('-');
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const monthName = months[parseInt(month, 10) - 1];
  return `${toBengaliNumerals(parseInt(day, 10))} ${monthName} ${toBengaliNumerals(year)}`;
}
