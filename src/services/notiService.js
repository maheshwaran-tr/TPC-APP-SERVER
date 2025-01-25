const url = 'https://api.onesignal.com/notifications?c=push';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    Authorization: 'Key os_v2_app_shgzpbrktvbk7m3ipnt3ow76iukzre4bym3u5xulh57cj4keysrmij333s57syfbym2prk5lkxen2mirwg2owxan6jpir5k2kj4p7oy',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    app_id: '91cd9786-2a9d-42af-b368-7b67b75bfe45',
    contents: {en: 'UIUX From Avasoft'},
    included_segments: ["Total Subscriptions"],
    headings: {en: 'New Drive Arrived'},
    big_picture : "https://pbywhmrgjtkosnsdunvc.supabase.co/storage/v1/object/public/sit-tpc/company-logo/avasoft.jpg?t=2025-01-19T12%3A49%3A34.012Z",
    subtitle: {en: 'Hey Job'},
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));