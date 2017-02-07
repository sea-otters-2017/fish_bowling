# Group Workflow

## Pull Requests
* Fork this repo to your personal GitHub account
* Checkout a feature branch
* Merge locally [to feature branch] before pushing to origin:
    * `git co master` (switch to the local master branch)
    * `git pull upstream master` (fetches and merges automatically)
    * `git push origin master` (updates your fork with the newest changes)
    * `git co [FEATURE-BRANCH]` (checkout back to the branch you worked on)
    * `git rebase upstream/master` (integrates all the changes from the upstream master branch onto your feature branch)
* Push to origin
* Create a pull request to [sea-otters:master](https://github.com/sea-otters-2017/fluorine-psklrmrfi)
* Ask a teammate to review your pull request
    * Anyone from another pair may review a pull request
* Upon review, the reviewer will merge the request (if there are no conflicts)
    * If there are changes that need to be made, reviewer will add comments
* After a merge clean up your forked master:
    * `git pull upstream master` to update local master
    * `git push origin master` to update origin (your fork) master

## Styleguides
* [AirBnB Ruby Styleguide](https://github.com/airbnb/ruby)
* [AirBnB JavaScript Styleguide](https://github.com/airbnb/javascript)
