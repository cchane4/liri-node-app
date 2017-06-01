# liri-node-app
A command-line Language Interpretation and Recognition Interface node application (or LIRI for short). This application can provide data about a given movie or music tracks and can also display the user's 10 most recent tweets.


## Technologies Used 
*Node.js
*npm packages: 
	-request 
		-twitter 
			-spotify
				-inquirer 

### Prereq's 
* Node.js 
* a twitter developer account 

Note: the 'my tweets' command will not work without a twitter account. 

## Creating a Twitter Developer account
If you want to view the Twitter functionality, you will need a Twitter developer account. If you do not already have one, follow these instructions to make one.

1. Visit https://apps.twitter.com/app/new
2. Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Submit the form.

## Getting Started 
1. Clone this repository with `git clone <repo url>`.
2. If you do not already have a Twitter developer account, create one with the instructions above.
3. Visit your Twitter developer account and click the Keys and Access Tokens tab to get your consume key and secret. Copy and paste them where the `<insert key here>` tags are inside your keys-empty.js file.
4. At the bottom of the same page, click the `Create my access token` button to get your access token key and secret. Copy the access token key and secret displayed at the bottom of the next screen. Paste them where the `<insert key here>` tags are inside keys-empty.js.
5. Rename and Save keys-empty.js as keys.js.
6. Add your twitter username on line 96.
6. Open a Terminal window or other Bash and navigate to the project folder. 
7. Run `npm install` to install the program's dependencies. 
8. Run `node liri.js`.

## Author 
Chad Chaney  
