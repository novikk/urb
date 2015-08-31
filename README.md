# Ultra Random Builds
## What is URB?
URB is a new game mode for League of Legends. It consists on giving both teams random champs and builds. You then download the itemset for your build and head right into the game. This mode is meant to be played in the ARAM map.

## Project structure
The project is fully clientside (meaning it has no backend such as Apache, NodeJS, etc), and was developed using AngularJS. For the UI we're using the amazing Semantic UI.
So, how does this all work?

There are 2 views, the index and the result page. Each of these is controlled by its own controller.
The index controller is the one that actually decides the champions and the items when you click the button. It also does some filtering through the items so that there are no SR items for example. It also discards jungle items, makes sure there are only 1 boots, and also makes sure you're getting decent items (depth > 3).
Then, an URL is generated that contains all this information, and is passed to the result controller.

The result controller then gets all this information, and because the URL is really long, makes a call to the Google API to shorten the URL so that you can share the match with your friends.
Then, it displays every champ with its items, and also allows you to "re-roll" champs in case you or someone in your team don't have them.
It also generates all the item sets and creates the download button.

## Try it live
You can try it live at http://novikk.github.io
