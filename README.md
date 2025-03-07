# Job Chaser Backend

The Job Chaser backend uses NodeJS, Express & Prisma and support the following routes & methods:  
  
**Users routes:**
- /users (POST & GET method)
- /users/:id (GET, PUT & DELETE method)
  
**Favorites routes:**
- /favorites (POST, GET & PUT method)
- /favorites/:id (GET & DELETE method)

The **PORT** can be configured through the **PORT** environment variable (and defaults to 3000 if not configured).
The **DATABASE_URL** must be configured through the environment variable and has been set to 
`mysql://root:root@localhost:3306/job-chaser-prisma` 
during development.

The site has been published on Vercel:  
[https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs.vercel.app/](https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs.vercel.app/)

***
*Known problems:*
  
1. 

*Notes:*
  
1. 

***
