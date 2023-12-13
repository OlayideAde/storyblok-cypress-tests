# Storyblok-cypress-tests

This repo contains three UI e2e test scripts for Assets tab on the Storyblok website
These test cases were selected from a list of predetermined test cases linked [here](https://docs.google.com/spreadsheets/d/1pQH-Can5UFLngKuS90MRzOTei8llqIv7wCGqMmK6vww/edit#gid=0)

## Run tests locally
### Setup
1. Clone the repo locally with command `git clone git@github.com:OlayideAde/storyblok-cypress-tests.git`
2. Install NPM dependencies by running `npm i`
3. Run tests locally with this command `npm run cypress-test`
4. Open cypress runner with this command `npm run cy:open`

## Run on Git
You can run tests in this project using github actions.
1. Open the [project repo](https://github.com/OlayideAde/storyblok-cypress-tests) on github
2. Access the `Actions` tab of this repositiory on github
3. On the left menu, select the `cypress headless browser tests` workflow and then click the  `Run workflow` button
