# Fullstack Blog App

A full stack blog app using Next.js and MySql.

## Features

- 

## To-Do's

- [x] Implement post privacy: public posts can be found by anybody, while private posts are just seen by the original user.
- [ ] When a user deletes their account, delete their posts and comments, as well.
- [ ] Let users import markdown files to create posts.
- [ ] Implement a 'show password' toggle for password inputs.
- [ ] Add cookies consent notification.
- [x] Host the project on Hostinger to test if the Sql database works.
- [x] Change favicon.
- [ ] Cookies notification.
- [ ] Make the tag system look and feel better in posts and creation.
- [ ] Sanytize HTML content for Markdown renderer to avoid hacks.
- [ ] Rewrite code with more comments.
- [ ] Figure out the best way to construct the URL for the posts.
  - `/author/slug`
  - `/create-post`
  - `/edit-post/author/slug`

## Bugs

- [x] There may be a problem with deprecated or dependancies of `bcrypt`. See if they cause any issues.
- [x] User value change bug.

## Info

- run the dev server with `npm run dev`
- consider Vercel for deployment

### Deployment:

- cd nextjs-blog
- git pull origin main
- npm install (if new dependencies)
- npm run build
- pm2 restart nextjs-blog

### Site References

- https://www.reddit.com/
- https://scp-wiki.wikidot.com/
- https://fontawesome.com/