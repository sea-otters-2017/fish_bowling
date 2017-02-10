# FishBowling Presentation Outline

![fish bowling logo](./app/assets/images/logo.png "Fish Bowling Logo")

## Game Overview

* What is Fish Bowl?
* What is Fish Bowling?
    * Gameplay
   
## Workflow & Team Dynamics
* Planning (+ Jordan Picture)
* Trello
* Slack
* AGILE Workflow
* Git Workflow [+Contributing MD]

## Technologies Used

* Ruby
* Rails 5.0.1
    * ActionCable
* Heroku
* Redis
* JavaScript (ES6)
* RSpec
* Travis CI
* SimpleCov
* PostgreSQL

## Design Philosophies

* Mobile-first design
* Responsiveness

## Features & Challenges [+code samples]
* Less is more
   * Single Responsibility
   * Service Objects [ex: Random Team]
* ActionCable
   * Multiple Subscriptions per game
   * Challenge: Blocking re-entry during game session
* Game Design Challenges
   * Nonlinear nature of gameplay
   * Asychronicity [AJAX -> Manipulate Game Data -> Broadcasting -> REPEAT cross fingers]
* Maintaining gameState [Data shared between Front+Back]
   * Rendering on Client Side
   * Dependency on AJAX
* Heroku deployment [TBD by Pat]
   * Setup for Redis 
   * game freezes at "next round" page
   * Ruby `sleep` method?
* JS-Timer: Tricksy Timerzes [+Gollum]
   * hiding the timer when we need to 
   * persisting time between Rounds
* building the pause pages between rounds and turns
* getting a buzzer to play on all devices

## Known Bugs

* Ruby `sleep` method glitch on heroku [Pat??? Heroku problems]
* Scoring... urgh! 
   * Made progress on debuggin' 
* Timer doesn't refresh immediately after wait-pages

## Live Demo [THE PAT SHOW]
* 

## The Future of FishBowling
* Player Stats
* Game Creator Options
   * Remove players
   * Update Scores
* Swag [Bowling Shirts]
* Make millions [billions???]

## Questions & Answers
* Team Photo!!!
