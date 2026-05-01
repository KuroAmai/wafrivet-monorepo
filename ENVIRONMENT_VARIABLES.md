# Environment Variables

Each app uses its own `.env.local`. These are required for subdomain routing and shared API access.

## Shared

```txt
NEXT_PUBLIC_API_URL=https://api.wafrivet.com
NEXT_PUBLIC_APP_URL=https://app.wafrivet.com
NEXT_PUBLIC_HERD_URL=https://herd.wafrivet.com
NEXT_PUBLIC_SHOP_URL=https://shop.wafrivet.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
```

## Cookie domain

Authentication cookies should be issued for the parent domain so they’re available across subdomains:

```txt
.wafrivet.com
```

