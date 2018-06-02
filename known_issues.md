# Known Issues

Referral Handles are Ethereum Accounts; it is easy to guess them and make a long branch under another person. Solution: use psuedo-random handles and store them in a mapping.

Data is stored on blockchain unecrypted. Solution: owner sets public key.

Don't check for self-referrals. Solution: Add required statements.

Don't check for loops. 

Variable names aren't amazing. Solution: Refactor!

We don't want to pay out to the root. We check just for root. 

To get payout working export variable and call js if it's none 1.


