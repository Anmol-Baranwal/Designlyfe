![Designlyfe](https://github.com/Anmol-Baranwal/Designlyfe/assets/74038190/11a06e43-18b7-4d4c-b416-97d712d3cfd6)

# Designlyfe

> :information_source: This web application is constructed with Next.js, a framework you can find at [Next.js](https://nextjs.org/) which is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

🎨 Hub for Designers. Watch the [complete demo](https://buildspace.so/s4/demoday/designlyfe). 

I built this under six weeks during Nights & Weekends Season 4 (Buildspace).

<hr>

## :fire: Deployed Link ##

This project is hosted on [Vercel Platform](https://vercel.com/). Visit the following link to view the web application.

```
https://designlyfe.tech/
```
<hr>

## What is the problem?

- Finding the right set of icons
- Searching multiple websites
- Limited slots due to branding
- No way to know which is the best one

> Solution:

With designlyfe:

- A user can upvote, bookmark, and discover design assets, including illustrations, icons, and mockups from various websites in one centralized location.
- Each resource is accompanied by essential information such as previews, pricing details, brand, URL, available formats, and sharing options.
- A user can submit the feedback from the dashboard itself.
- There are filters and a search bar that improves UX.
- The user has a settings panel where they can switch themes and do more.
- Integrated Simple Analytics and Pageclip so that users can subscribe to emails.

I've properly and appropriately arranged the User Interface. You can view this to see labeled [snapshots](./SNAPSHOTS.md) of various parts of designlyfe.

Please note that the website is not responsive since I reached out to users, and companies while sharing what I built every couple of days across all social platforms. I got around 22 beta users for the waitlist.

<hr>

## 🗄️ Database Structure

We have three collections and the structure of asset collection is as shown:

```
.
└── assets (collection)
    └── Icons (document)
        └── Craftwork (companies)
            └── craftworkIcon1 (document)
                ├── name
                ├── companyLogoUrl
                ├── formats
                ├── assetUrl
                ├── imageUrl
                ├── category
                ├── author
                ├── upvotes (subcollection)
                │   ├── userId1 (document)
                │   ├── userId2
                │   └── ...
                └── bookmarks (subcollection)
                    ├── userId1 (document)
                    ├── userId2
                    └── ...
            └── craftworkIcon2
                └── ...
            └── Getillustrations
                └── getillustrationsIcon1
                    └── ...
                └── getillustrationsIcon2
                    └── ...
    └── Illustrations (document)
        └── Craftwork (companies)
            └── craftworkIllustration1 (document)
                ├── name
                ├── companyLogoUrl
                ├── formats
                ├── assetUrl
                ├── imageUrl
                ├── category
                ├── author
                ├── upvotes (subcollection)
                │   ├── userId1 (document)
                │   ├── userId2
                │   └── ...
                └── bookmarks (subcollection)
                    ├── userId1 (document)
                    ├── userId2
                    └── ...
            └── craftworkIllustration2
                └── ...
            └── Getillustrations
                └── getillustrationsIllustration1
                    └── ...
                └── getillustrationsIllustration2
                    └── ...
    └── mockups (document)
        └── ...
    └── ...
```


## 🌐 Setup Local Environment

You need to setup a few API keys for this project to be setup correctly otherwise you won't be able to properly work on this project

- [Firebase Services Key](https://firebase.google.com/)

For that, you need to create a `.env.local` file in your project, as shown in the [docs](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables). The file should look like this:

```
NEXT_PUBLIC_FIREBASE_API_KEY=<WRITE VALUE HERE>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<WRITE VALUE HERE>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<WRITE VALUE HERE>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<WRITE VALUE HERE>
NEXT_PUBLIC_FIREBASE_APP_ID=<WRITE VALUE HERE>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<WRITE VALUE HERE>
```

You can retrieve the above environment values by referring to their documentation linked above. Once retrieved, paste them accordingly as mentioned above.

## ✅ Guidelines to run web app locally

- For this app to work, Use these commands to run the application

```bash
# to install dependencies 
npm install
OR
pnpm install

# to run the development server
npm run dev
OR
pnpm run dev
```

- Open `http://localhost:3000` with your browser to see the application.

<br>

<hr>

## <img src="https://user-images.githubusercontent.com/74038190/221857984-5bf77e81-6f65-4502-a7c8-f29a978efb3f.png" alt="bullseye" width="35" /> Frameworks & Tools
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
