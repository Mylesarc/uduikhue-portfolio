# Contact delivery setup

Configured with the user-provided public endpoint https://formspree.io/f/xbggplwb. Recipient verification and routing are managed in the owner's Formspree dashboard.

1. Create a Formspree account, verify the recipient email, and create a form for `o.uduikhue2038@miva.edu.ng`.
2. Copy the public endpoint from Integration (`https://formspree.io/f/…`). No password or private API key belongs in this repository.
3. Put that endpoint into `data-endpoint` on `#contact-form` in contact.html.
4. Replace the temporary setup notice with: “Send a message and I’ll get back to you by email.” Update the footer note to state that submissions are processed by Formspree.
5. Test one clearly labelled message on the public site. Confirm acceptance in the UI and receipt in the destination inbox, including spam. Keep provider spam protection enabled; if a challenge is required, integrate its supported challenge flow before declaring delivery ready.

The custom JavaScript preserves required-field, email and digits-only phone validation. It sends only name, email, phone and message over HTTPS. It prevents simultaneous submissions and retains text after errors or uncertain delivery. A successful response means the service accepted the message; it does not prove inbox receipt.

Run `node tools/check-contact.cjs` for mocked delivery cases without sending email. After activation, update README.md and DEPLOYMENT.md to supersede their original local-demo descriptions.
