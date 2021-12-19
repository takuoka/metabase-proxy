# What is this
Proxy Server to access metabase API.

(Combinient to avoid CORS Limitation and VPN related problem.)

# Usage

### Create `secrets.json`

``` json
{
    "metabaseUrl": "https://your-metabase.com"
}
```

### Start server

``` shell
yarn starts
```

### Test

``` shell
curl -X POST  -H "Content-Type: application/json"  -d '{"username": "yourname@yourcampany.com", "password": "xxxxxxxxxxx"}'   localhost:3000/metabase-proxy/api/session
```