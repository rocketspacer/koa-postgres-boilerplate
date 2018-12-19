# request-id

Generate universally unique request id

## Usage
```js
const requestID = require('koa-request-id');

const app = new Koa();
app.use(requestID({
  requestHeader  : 'X-Request-ID',
  responseHeader : 'X-Request-ID',
}));
app.use(async (ctx, next) => {
  console.log(ctx.request_id);
  console.log(ctx.request.id);
  console.log(ctx.response.get('X-Request-ID'));
  ...
});
```

## Options

- **requestHeader**
  - If set to a string, the value will be treated as the request header where the request ID will be fetched from, will fall back to generating a new request ID if the header doesn't exist or empty
  - If set to a falsy/non-string value. New request ID will always be generated

- **responseHeader**
  - If set to a string, the value will be treated as the response header where the request ID will be injected to.
  - If set to a falsy/non-string value, the request ID won't be injected to the response header
