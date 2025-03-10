# Job Chaser Backend

The Job Chaser backend uses NodeJS, Express & Prisma and supports the following resources:  
**Users:**
```
type User = {
    firstname: string;
    lastname: string;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
    country?: string | null;
    phone: string;
    dateOfBirth?: string | null;
    email: string;
    password: string;
}
```
  
**Favorites:**
```
type Favorite = {
    id: string;
    employer: string;
    logo_url?: string | null;
    headline?: string | null;
    position?: string | null;
    role?: string;
    posted?: Date | null;
    expires?: Date | null;
    contract: string;
    city?: string | null;
    region?: string | null;
    country?: string | null;
    url: string;
}
``` 

The following routes & methods are supported:  
  
**Users routes:**
- /users (POST & GET method)
- /users/:id (GET, PUT & DELETE method)
  
**Favorites routes:**
- /favorites (POST, GET method)
- /favorites/:id (GET, PUT & DELETE method)

The Users & Favorites resources are in a 'Many to Many' relationship, and 3 DB Tables (users, favorites & user_favorites) are needed 'under the hood' to support this relationship.

The **PORT** can be configured through the **PORT** environment variable (and defaults to 3008 if not configured).
The **DATABASE_URL** must be configured through the environment variable and has been set to 
`mysql://root:root@localhost:3306/job-chaser-prisma` 
during development.

The site has been published on Vercel:  
[https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs.vercel.app/](https://u07-individuell-uppgift-jobchaser-chas-henrik-nextjs.vercel.app/)

***
*Known problems:*
  
1. 

*Notes:*
  
1. As the favorite DB Table is shared among the users, all users will be affected if one user updates a favorite (with the PUT method).

***
