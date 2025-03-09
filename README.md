# Job Chaser Backend

The Job Chaser backend uses NodeJS, Express & Prisma.

The Job Chaser backend have two resources:  
- Users
- Favorites 

and supports the following routes & methods:  
  
**Users routes:**
- /users (POST & GET method)
- /users/:id (GET, PUT & DELETE method)
  
**Favorites routes:**
- /favorites (POST, GET method)
- /favorites/:id (GET, PUT & DELETE method)

The Users & Favorites resources are in a 'Many to Many' relationship, and thus 3 DB Tables (users, favorites & user_favorites) are needed 'under the hood' to support this relationship.

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
