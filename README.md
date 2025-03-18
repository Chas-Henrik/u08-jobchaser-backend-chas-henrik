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
  
**SignUp routes:**
- /sign-up (POST method)

**SignIn routes:**
- /sign-in (POST method)

**SignOut routes:**
- /sign-out (POST method)

**Users routes:**
- /users (GET, PUT & DELETE method)
  
**Favorites routes:**
- /favorites (POST, GET & DELETE method)
- /favorites/:id (GET, PUT & DELETE method)

The Users & Favorites resources are in a 'Many to Many' relationship, and 3 DB Tables (users, favorites & user_favorites) are used to support this relationship.

A JWT token is used for authorization and is returned as a JWT Cookie after a successful Sign-In. 
The JWT Cookie is automatically included in the Cookies header for all subsequent calls to the backend API to authorize the user for routes that require authorization. The JWT Cookie will expire after 15 mins forcing the user to sign-in again if he/she wishes to continue.
  
CORS is enabled with the following settings:
- origin: ["http://localhost:3000", "http://localhost:3001"]
- methods: ["POST", "GET", "PUT",  "DELETE"]
- credentials: true

*Also note that credentials must be enabled when using JWT Cookies.*
  
Both the Users & Favorites resource data are validated with Express Validator before accepted, and here follows an example of valid Users & Favorites resource data (that can be used for test purposes in Thunder Client):

**Users resource data**
```
{
    "firstname": "Pelle",
    "lastname": "Svanslös",
    "address": "Kattgatan 5",
    "postalCode": "123 45",
    "city": "Katerineholm",
    "country": "Sweden",
    "phone": "+46 (70) 718 0388",
    "dateOfBirth": "1980-03-22",
    "email": "pelle@chasacademy.se",
    "password": "123456"
}
```

**Favorites resource data**
```
{
    "id": "29503793",
    "employer": "Vattenfall AB",
    "logo_url": "https://arbetsformedlingen.se/rest/agas/api/v1/arbetsplatser/88251606/logotyper/logo.png",
    "headline": "Rutinerad och driven Fullstack-utvecklare",
    "position": "Mjukvaru- och systemutvecklare m.fl.",
    "role": "Systemutvecklare/Programmerare",
    "posted": "2025-02-28T06:50:32.000Z",
    "expires": "2025-03-30T21:59:59.000Z",
    "contract": "Vanlig anställning",
    "city": "Solna",
    "region": "Stockholms län",
    "country": "Sverige",
    "url": "https://arbetsformedlingen.se/platsbanken/annonser/29503793"
}
```

The **PORT** can be configured through the **PORT** environment variable (and defaults to 3008 if not configured).
The **DATABASE_URL** must be configured through the environment variable and has been set to 
`mysql://root:root@localhost:3306/job-chaser-prisma` 
during development.
  
The site has not been deployed and currently only runs on the local machine.
  
***
*Known problems:*
  
1. The Web Browser just deletes the JWT Cookie from its storage when it expires, so it is not possible to detect an expired JWT. Since the user eventually will end up with a `401 Unauthorized` response after the expired Cookie is deleted, all accesses resulting in a `401 Unauthorized` will be redirected to `/signin`. This seems reasonable as if the user is 'Unauthorized' he/she needs to login to continue (even if it wasn't an expired JWT Cookie that caused the problem).
  
*Notes:*
  
1. As the favorite DB Table is shared among the users, all users will be affected if one user updates a favorite (with the PUT method).
2. The primary key for the favorites table is recycled from the JobTechDev API (see [https://jobsearch.api.jobtechdev.se/](https://jobsearch.api.jobtechdev.se/)).
3. `/users GET` gets the currently signed-in user (and not all users).

***
