# cs (customer_service)
 
Backend Node.js API

Backend URL: [https://infsci2710-customerservice-api.herokuapp.com/](https://infsci2710-customerservice-api.herokuapp.com/)

### Need to modify [CORS config](https://www.npmjs.com/package/cors#configuring-cors)

```javascript
// cors origin URL - Allow inbound traffic from origin
corsOptions = {
  origin: "your frontend page",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
```

### Deployment

- `heroku login`

- `heroku create your-project-name`

- `git remote -v` (for checking)

- Push to GitHub:

  ```
  git add .
  git commit -m "your comments"
  git push origin
  ```

- Push to Heroku: `git push heroku master`

- `heroku open`
