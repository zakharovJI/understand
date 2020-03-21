API
---

login
---
```
POST /user/login
```

request:
```
string username
string password
```
---
signup
---
```
POST /user/signup
```

request:
```
string username
string email
string password
```
---
refresh token
---
```
POST /user/refresh-token
```

header:
```
Authorization: Bearer access_token
```

request:
```
string refresh_token
```
---
user info
---
```
GET /user/info
```

header:
```
Authorization: Bearer access_token
```
---
user wallet
---
```
GET /user/wallet
```

header:
```
Authorization: Bearer access_token
```

request:
```
int page
int size
string sort
string direction
```
---
symbol list
---
```
GET /symbol/list
```

request:
```
int page
int size
```
---
symbol full list
---
```
GET /symbol/list-full
```

request:
```
int page
int size
```
---
symbol info
---
```
GET /symbol/info
```

request:
```
string currencies
```
---
chart config
---
```
GET /chart/config
```
---
chart time
---
```
GET /chart/time
```
---
chart list
---
```
GET /chart/symbols
```

request:
```
string symbol
int page
int size
```
---
chart search
---
```
GET /chart/search
```

request:
```
string query
int page
int size
```
---
chart history
---
```
GET /chart/history
```

request:
```
string symbol
int from
int to
string resolution
```
---
order list
---
```
GET /order/list
```

request:
```
string currencies
int page
```
---
order history
---
```
GET /order/history
```

request:
```
string currencies
int id
int limit
```
---
order order list
---
```
GET /order/order-list
```

request:
```
string currency_code1
string currency_code2
string type
int page
int size
string sort
string direction
```
---
user order list
---
```
GET /user-order/list
```

request:
```
bool is_active
```
---
user order create
---
```
POST /user-order/list
```

header:
```
Authorization: Bearer access_token
```

request:
```
string currency_code1
string currency_code2
string order_type
int amount
int rate
string reference_id
```
---
user order cancel
---
```
POST /user-order/cancel
```

header:
```
Authorization: Bearer access_token
```

request:
```
string id
```
---
user wallet info
---
```
GET /user-wallet/info
```

header:
```
Authorization: Bearer access_token
```

request:
```
string currency_code

```
---
user wallet withdraw list
---
```
GET /user-wallet/withdraw-list
```

header:
```
Authorization: Bearer access_token
```

request:
```
string currency_code

```
---
user wallet withdraw info
---
```
GET /user-wallet/withdraw-info
```

header:
```
Authorization: Bearer access_token
```

request:
```
string id
float calc_for

```
---
user wallet transaction list
---
```
GET /user-wallet/transaction-list
```

header:
```
Authorization: Bearer access_token
```

request:
```
int page
int size
string sort
string direction

```
---