export const oktaConfig = {
    clientId: '0oaae5cy6vQ3oSvHA5d7',
    issuer: 'https://dev-87375260.okta.com/oauth2/default',
    redirectUri: 'https://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}