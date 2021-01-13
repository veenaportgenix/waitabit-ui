<p align="center">
    <img  alt="Waitabit Logo"src="assets/images/logo_primary.png"  width="12%">
</p>


# Getting started with the Waitabit API


These instructions describe how to get email id from user for your website using api calls. 

Before you can start using the API, you need to do the following:

1.  Create a Waitabit  [account](https://waitabit.dev/signup).
2.  Create an  [API Key](https://waitabit/api-information).


## API Details


**Header**  
-   **your_api_key**  - the production api key/developer api key(for testing)

**Payload**  
-   **waitabitUrl**  - the url of waitabit api (https://api.waitabit.dev/waitlist)
-   **submitted_email**  - the email id of the signup person
-   **website_url**  -  the current URL of your website. Used to get the referral codes.


```javascript
var waitabitUrl = 'https://api.waitabit.dev/waitlist'
var submitted_email = 'you@gmail.com'
var website_url = 'https://yourwebsite.com?ref_Id=1234'

header = {
	'X-API-TOKEN': your_api_key,
	'content-type': 'application/json'
}
post(waitabitUrl, {
    email: submitted_email,
    current_url: current_url
}, success_callback, fail_callback)
                    
```



## Response JSON


 - **registered_email**  - the email of the user  signed up for the waitlist
-   **current_priority**  - the current priority of a user that signed up.
-   **total_waiters_currently**  - Total users signed up on your website
-   **referral_link**  - Referral link for the user that signed up.
-    **position**  - Current position/rank for the user
```javascript
{
    "registered_email": 'bani@getwaitlist.com',
    "current_priority": 5,
    "position":20
    "total_waiters_currently": 23,
    "referral_link": 'www.getwaitlist.com?&ref_id=0GBWN'
}
                    
zxc





