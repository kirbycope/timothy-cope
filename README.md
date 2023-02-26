# timothy-cope
Source for http://timothycope.com/

[View the Wiki](https://github.com/kirbycope/timothy-cope/wiki)

![Screenshot](/timothy-cope.png)

## Getting Started
1. Install VS Code
1. Clone this repo
1. Open root folder from the cloned repo in VS Code
1. Run `npm install`
   - This installs dependencies defined in `[package.json](package.json)`

## Run the app
1. Run `npm start`
   - This runs the script defined in `[package.json](package.json)`

## Deploy (Manual)
1. Zip up the contents of the `timothy-cope` folder (including `config.json`)
1. Log into AWS
1. Upload a New Application Version
1. Deploy to `TimothyCope-env`

## Deploy (GitHub Action)
Submit a change or PR to the `main` branch to [deploy](/.github/workflows/deploy-changes.yml) using [actions](https://github.com/kirbycope/timothy-cope/actions).
