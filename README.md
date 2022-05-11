# Embedded

So many memes, so many platforms and so little time. Embedded is a platform to consolidate your favourite posts from various social media platforms. Just embed them onto your embedded profile. The best way to share all your top hits with others or revisit them.

View `Embedded` the app [here](https://embedded-the-app.herokuapp.com/).

## Snapshot of the App

#### Homepage

![home desktop](/assets/homepage-desktop.png)![home mobile](/assets/homepage-mobile.png)

#### Profile

![profile desktop](/assets/profile-desktop.png)![profile mobile](/assets/profile-mobile.png)

### Test Data

**Username:** johndoe
**Password:** test123

**Username:** jandoe
**Password:** test123

## Tech Used

-   React
-   Express
-   TypeScript
-   Node JS
-   Postgres
-   Tailwind
-   Material UI

### Installation

Clone the repository:
`git clone embedded`

Install dependencies:

```
cd embedded
npm install
```

Create a Postgres database with schema `/server/database/schema.sql`

Create enviornment variables with your own `.env` file in your `server` directory. Example variables:

```
SESSION_SECRET=secret
SECURE_COOKIE=false
NODE_ENV=development
```

To start project locally:

```
cd embedded
npm run dev
Open browser to http://localhost:3000
```

## Vision

Simplifying the way `users` share their favourite posts or revisit content that they enjoy across multiple platforms. Embedded consolidates (embeds) them into one spot, their embedded profile.

`Users` require an account to use the platform. Upon login, the `user` can add to their profile through pasting an embedded link to a post they would like to add to their profile. They can also look up `other users` by their username to view their profile. If they enjoy a post they see, they can click to embed the post onto their own profile. Users are also able to rate posts out of 5.

**Note:** All `users` will only be able to embed public posts

**Potential future feature:**

-   Ability for users to comment on posts they like.
-   Ability for users to access more information on each post
-   Ability for users to customise their profile (background image and avatars)
-   Ability for users to upload unique posts that they created.
-   Ability for users to search for posts by tags/topics within Embedded.
-   Ability for users to include embedded links from more social platforms.
-   Security: Consider a safer way for users to use external links

## User Stories/Flow

-   `Jon` is across multiple platforms and enjoys revisiting funny memes and videos he sees online. He enjoys sharing them with his friend, `Rose`, but often forgets where he saw it from (Was it Facebook? Or was it Instagram?). Embedded is the perfect platform to consolidate all his favourite posts and share them.

-   `Rose` prefers to be on only one platform, she enjoys short videos and the life hack tips she sees online. She uses Embedded to revisit them and view posts shared by her friends who are on other/multiple platforms. She enjoys the occassional memes, which her friend, `Jon` shares on his embedded profile.

![User Story](/assets/userStory.png)

## Wireframe (Figma)

![Wireframe](/assets/wireframe.png)

## Entity Relationship Diagram

![Entity Relationship Diagram](/assets/final-erd.png)

## Approach

After planning, I created a Trello board and broke down the different pieces of work that needed to be completed into cards. They were separated by `Planning`, `MVP` and `Extension`.

I worked on the main functionalities first such as the ability to embed posts, search for users and rate posts. I then looked into extensions such as error handling and styles, utilising my figma wireframe designs as a guide and established UI libraries.

A challenge that I faced was that `Embedded` uses code from external sites (`iframes`). With user safety as a consideration, I included `regex` to ensure that the `user`'s input does not have any unwanted code. This then limited the approved platforms that `users` are can embed code from to about a handful of sites. I initially had helmet for security but navigating through headers security whilst using `iframes` was another challenge in the time that I had.

When I was done, I added in some test data and had a few users test the app. I then fixed a few found bugs such as case sensitivity and the `instagram` regex not accounting for `instagram` mobile users' links.

![Trello Board](/assets/TrelloBoard.png)

### Credits

Pixabay for images
