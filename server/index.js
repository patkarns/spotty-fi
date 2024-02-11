const express = require('express')
const request = require('request');
const dotenv = require('dotenv');
const nodeCron = require('node-cron');
const moment = require('moment');

const port = 5000

global.access_token = ''

dotenv.config()

let spotify_client_id = process.env.SPOTIFY_CLIENT_ID
let spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

let spotify_redirect_uri = 'http://localhost:4200/auth/callback'

let generateRandomString = function (length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let app = express();

const scopeArr = [
  'streaming user-read-email',
  'user-read-private',
  'user-library-read user-top-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private'
];

let token_expiry_utc = new Date();

app.get('/auth/login', (req, res) => {
  let scope = scopeArr.join(', ');
  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})


app.get('/auth/callback', (req, res) => {
  let code = req.query.code;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      token_expiry_utc = moment(new Date()).add(body.expires_in - 60*2, 's').toDate();
      console.log('token expires in', body.expires_in, token_expiry_utc);
      access_token = body.access_token;
      res.redirect('//localhost:4200/')
    }
  });
});

app.get('/auth/token', (req, res) => {
  res.json({ access_token, token_expiry_utc })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send("Home")
});