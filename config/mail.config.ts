export const emailConfig = {
    baseUrl: `primusone.primuspartners.in`,
    name: "primuspartners Notification",
    nodeMailerConfig: {
        service: "Outlook365",
        host: "smtp-mail.outlook.com",
        port: 587, // 587
        secure: true,
        auth: {
            user: "admin@primuspartners.in",
            pass: "@dkytQ7M@gHqN938SZRe0^OVC^dMjO#q%KNWqurK*rT4R26#H8qhbUndXcuyNYWmMcCbY6UsDX4^iw$cI41blu3YZBATEy!Qxy1",
        },
        tls: {
            ciphers:'SSLv3'
        }
    }
};
