# Fullstack Blog App

A full stack blog app using Next.js and MySql.

## Features

- 

## To-Do's

- [ ] Add comments.
- [ ] Add a user page where everybody can see a user's posts.
- [ ] Add the ability to like and dislike posts and comments.
- [ ] Add the ability to post reactions to posts and comments.
- [ ] When a user deletes their account, delete their posts and comments, as well.
- [ ] Let users import markdown files to create posts.
- [ ] Add smart links.
- [ ] Implement a 'show password' toggle for password inputs.
- [ ] Add cookies consent notification.
- [ ] Make the tag system look and feel better in posts and creation.
- [ ] Sanytize HTML content for Markdown renderer to avoid hacks.
- [ ] Add notifications to other things when the user accesses them, like their dashboard.
- [ ] Add the ability for users to customize CSS to make their pages look however they want.
- [x] Implement post privacy: public posts can be found by anybody, while private posts are just seen by the original user.
- [x] Host the project on Hostinger to test if the Sql database works.
- [x] Change favicon.
- [x] Figure out the best way to construct the URL for the posts.
  - `/author/slug`
  - `/create-post`
  - `/edit-post/author/slug`

## Bugs

- [x] There may be a problem with deprecated or dependancies of `bcrypt`. See if they cause any issues.
- [x] User value change bug.

## Info

- run the dev server with `npm run dev`

### Deployment (updates):

- apt update && apt upgrade -y
- cd nextjs-blog
- git pull origin main
- npm install (if new dependencies)
- npm run build
- pm2 restart nextjs-blog

### Deployment (first time):

- Go into your VPS terminal (through your VPS provider or SSH)
- Update Package Lists
  - apt update && apt upgrade -y
- Install Node.js and npm
  - curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  - apt install -y nodejs
  - node -v
  - npm -v
- Install Git
  - apt install -y git
- Clone repository
  - git clone https://github.com/username/repoName.git
  - cd nextjs-blog
- Create env file with your credentials
  - nano .env
- Install, build, and run your app
  - npm install
  - npm run build
  - npm start
- Keep the app running
  - npm install -g pm2
  - pm2 start npm --name "yourAppName" -- start
  - pm2 startup
  - pm2 save
- Configure Ngnix as a reverse proxy
  - apt install -y nginx
  - nano /etc/nginx/sites-available/yourDomainName
- Add the following configuration:

```
server {
    listen 80;
    server_name domain_name;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Enable the Server Block and Restart Nginx
  - ln -s /etc/nginx/sites-available/domain_name /etc/nginx/sites-enabled/
  - nginx -t
  - systemctl restart nginx
- Point Your Domain to the VPS (from wherever you got your domain from)
  - Be sure your SSL Encryption Mode is set to Full
- Secure app with SSL
  - apt install -y certbot python3-certbot-nginx
  - certbot --nginx -d domain_name
  - certbot renew --dry-run

### Site References

- https://www.reddit.com/
- https://scp-wiki.wikidot.com/
- https://fontawesome.com/
- https://universe.leagueoflegends.com/en_US/champions/