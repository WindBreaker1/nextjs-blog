# Fullstack Blog App

A full stack blog app using Next.js and MySql.

## To-Do's

- [ ] Sanytize HTML content for Markdown renderer to avoid hacks.
- [ ] Host the project on Hostinger to test if the Sql database works.
- [ ] Make the tag system look and feel better in posts and creation.
- [ ] Rewrite code with more comments.
- [ ] Figure out the best way to construct the URL for the posts (`/blog/id` or `/blog/slug`).

## Bugs

- [x] There may be a problem with deprecated or dependancies of `bcrypt`. See if they cause any issues.
- [x] User value change bug.

## Info

- run the dev server with `npm run dev`
- consider Vercel for deployment
- user schema: id, username, email, password_hash, profile_picture, banner_picture, description, created_at, last_edited_at