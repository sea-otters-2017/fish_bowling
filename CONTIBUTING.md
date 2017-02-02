# Group Workflow

## Pull Requests
* Fork this repo to your personal GitHub account
* Rebase or Merge locally [to feature branch] before pushing to origin
    * `git fetch upstream master` then merge or rebase *OR:*
    * `git pull upstream master` (fetches and merges automatically)
* Push to origin
* Create a pull request to (upstream/master)[https://github.com/sea-otters-2017/fluorine-psklrmrfi]
* Ask a teammate to review your pull request
    * Anyone from another pair may review a pull request
* Upon review, the reviewer will merge the request (if there are no conflicts)
    * If there are changes that need to be made, reviewer will add comments
* After a merge clean up your forked master:
    * `git pull upstream master` to update local master
    * `git push origin master` to update origin master

## Styleguides
* [AirBnB Ruby Styleguide](https://github.com/airbnb/ruby)
* [AirBnB JavaScript Styleguide](https://github.com/airbnb/javascript)
