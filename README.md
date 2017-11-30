# PollVault

![Logo](public/android-icon-192x192.png "App Icon") PollVault is a "content and comment" web app that is a hub for user-submitted polls. Anyone can vote on polls and authenticated users can add polls and comments.

The visual design is influenced by [Google Fonts](https://fonts.google.com/), Twitter's four option polls, and Youtube's comment section. It is a React/Redux web app that consumes a Node/Express RESTful API with careful consideration given to accessibility, client-side performance, and Progressive Web App features.

## To Do
* Refactor code. Lots of duplication currently. Split up React Components to make them as atomic as possible. They should have a single purpose.
* Add websockets real time poll results updating (at least on the show page for a poll)
* Unlisted/private polls
* Infinite Scrolling/pagination. Have had issues trying to implement this so far with the Masonry layout, redux state updating, etc.
* Perceptual Loading Speed: need more loading indicators and progressive loading placeholders
* Nicer color scheme. Looks drab right now.
* Less white space on the show page. Either make the show page poll fonts larger or add additional poll results graphs like votes over time or a doughnut chart.
* Comment markdown or formatting.

![App Screenshot](http://res.cloudinary.com/dkw0kkkgd/image/upload/v1510955122/Screen_Shot_2017-11-17_at_3.44.40_PM_wb7bur.png)
