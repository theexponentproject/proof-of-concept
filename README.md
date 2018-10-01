<p align="center">
 <img width="741" height="403" src="https://user-images.githubusercontent.com/3171564/40881088-deee55ae-6683-11e8-89b3-c41db31cd933.png">
 </p>	
 
# Archived Proof of Concept

# Introduction

Real-world high stakes search tasks often require high speed recruitment of particpants in a scaleable, trustworthy way. Furthermore, in order to maximize participation, high stakes information searches often require participant anonymity, while guaranteeing that particpants are fairly (and anonymously) credited for their submission. Current anonymous online information submission systems ('tipboxes', 'anonymous hotlines', etc) allow partipants to submit information, but do not guarantee that participants will remain anonymous to all parties when they receive monetary payment (which may disincentivize partipation). In addition, global searches may require a series of complex trans-border payments, limiting the scope of participants to those within the country of search origin. Lastly, currently deployed mechanisms do not encode (anonymously or otherwise) social/referral information, extremely useful for encouraging partipants to expand the search into new social networks. __**Often, the fastest way to find something isn't to search for it yourself, but to find someone to find someone (and so forth) that might know where it is.**__

Over the 24 hours of the hackathon, our team implemented a modified Query Incentive Network in Solidity and created a basic web interface in Web3. This proof of concept provides three contributions: 

 * A basic implementation of modified Query Incentive Network [1] in Solidity
 * A discussion of the engineering limitations of referral chains in Solidity and potential solutions 
 * A discussion of the engineering limitations of information searches in Blockchain and potential solutions.
 	 
# Potential Use Cases	

* Finding missing children (distributed Amber alert)
* Searching for outlaws in a manhunt
* Responding to resource needs in a humanitarian crisis
* Rallying supporters of a politican cause

# Media
https://medium.com/@SocialAlpha/social-alpha-blockchain-for-social-impact-hackathon-42802909f016

# Contributors (From left to right)

* Matthew Feng
* Andrew Kuznetsov
* Reahman (Adeel) Afshar

<p align="center">
 <img src="https://user-images.githubusercontent.com/3171564/46313493-fc63d480-c595-11e8-836c-604cb3b9b175.png">
</p>	

# Problems to Think About

* Is it better to create a token that search organizers must buy to participate, or just put in straight Eth?
* How do we best combat malicious behavior such as self-looping and users that break the one-user-one-wallet paradigm?
* What is the best way to encrypt our information as we store it on the public ledger? Should we be using a private ledger?
* This system assumes the search organizers can be trusted. How do we verify organizers? How do we verify that they selected the right person to reward?
* Can we expose information others have submitted to participants to aid their efforts? If we do, how do we make sure they get credited? Is there a mechanisms that would assist us in handling misinformation?
* How would we implement searches that may have multiple stages? Multiple identical objects? Can only be verified once?
* Blockchain UX is notoriously difficult. How do we make this system easy to use and register for users not familiar with crypto currency?
* A significant amount of real-world searching is done with only access to a phone (or even just SMS). Can we make keep mobile in mind?
* Understanding the current effort progress is difficult without a visualization. What are good ways of communicating this data to participants and search organizers?

# References
[1] https://www.cs.cornell.edu/home/kleinber/focs05-qin.pdf
[2] http://science.sciencemag.org/content/334/6055/509


