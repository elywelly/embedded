# Embedded

So many memes, so many platforms and so little time. Embedded is a platform to consolidate your favourite posts from various social media platforms. Just embed them onto your embedded profile. The best way to share all your top hits with others or revisit them.

View `Embedded` the app [here](https://embedded-the-app.herokuapp.com/).

## Snapshot of the App

#### Test Data

Username:
Password:

## Tech Used

-   React
-   Express
-   Node JS
-   Postgres
-   Tailwind
-   Material UI
-   Test Packages (Jest, Supertest)

## Installation

## Vision

Simplifying the way `users` share their favourite posts or revisit content that they enjoy across multiple platforms. Embedded consolidates (embeds) them into one spot, their embedded profile.

`Users` require an account to use the platform. Upon login, the `user` can add to their profile through pasting an embedded link to a post they would like to add to their profile. They can also look up `other users` by their username to view their profile. If they enjoy a post they see, they can click to embed the post onto their own profile. Users are also able to rate posts out of 5.

**Note:** All `users` will only be able to embed public posts

**Potential future feature:**

-   Ability for users to comment on posts they like.
-   Ability for users to customise their profile (background image and avatars)
-   Ability for users to upload unique posts that they created.
-   Ability for users to search for posts by tags/topics within Embedded.
-   Ability for users to include embedded links from more social platforms.
-   Security: Consider a safer way for users to use external links

## User Stories/Flow

-   `Jon` is across multiple platforms and enjoys revisiting funny memes and videos he sees online. He enjoys sharing them with his friend, `Rose`, but often forgets where he saw it from (Was it Facebook? Or was it Instagram?). Embedded is the perfect platform to consolidate all his favourite posts and share them.

-   `Rose` prefers to be on only one platform, she enjoys short videos and the life hack tips she sees online. She uses Embedded to revisit them and view posts shared by her friends who are on other/multiple platforms. She enjoys the occassional memes, which her friend, `Jon` shares on his embedded profile.

![Split Login](/assets/userStory.png)

## Wireframe

From Figma:
![Wireframe](/assets/wireframe.png)

## Entity Relationship Diagram

![Entity Relationship Diagram](/assets/final-erd.png)

## Approach

After planning, I created a Trello board and broke down the different pieces of work that needed to be completed into cards. They were separated by `Planning`, `MVP` and `Extension`.

I worked on the main functionalities first such as the ability to embed posts, search for users and rate posts. I then looked into extensions such as error handling and styles, utilising my figma wireframe designs as a guide and established UI libraries.

A challenge that I faced was that `Embedded` uses code from external sites. With user safety as a consideration, I included `regex` to ensure that the `user`'s input does not have any unwanted code. This then limited the approved platforms that `users` are can embed code from to about a handful of sites.

With functionalities and some planned extension completed, I left some time for myself to look into and write a few backend and front-end tests for the app. This was a bit of a challenge as I was not as familiar with mocking HTTP requests. However, with some research, I found packages like `supertest` and `pgmock2` to support what I needed to test so I was able to write some tests in the time that I had.

### Credits

Pixabay for images
