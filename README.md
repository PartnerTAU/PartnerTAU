![image](https://user-images.githubusercontent.com/80216162/128201083-5beabc59-70d1-4aea-b57b-7da4a4c40f40.png)

PartnerTAU is a website created to ease the some of the problems student encounter at the beginning of each semester. The website tries to help student find partners for assignments, find another student to switch group or class with and find the link to a course’s whatsapp group.
Main Features:
-	Whatsapp group link
users can look for or insert a whatsapp group link for a certain class
-	Create request: Find a partner/ Switch Group/ switch Course:
users can create request of 3 types.
![image](https://user-images.githubusercontent.com/80216162/128200969-8ef535da-dac1-4cbd-89cc-520f9a7d8633.png)

-	Personal requests list

users can watch the status of their requests in the personal requests list, they can open the chat and cancel a request.
![image](https://user-images.githubusercontent.com/80216162/128200751-fa27cf80-121b-4693-96fe-0febafeb254b.png)

-	Chat

users can message each other via chat once a match is found.

![image](https://user-images.githubusercontent.com/80216162/128200847-50073f6b-17c6-48ef-8270-7a7464f14b5a.png)

The PartnerTAU website requires users to be registered to create requests, we highly recommend that you create your own users. The website sends emails notifying of matches and chat messages, so to have a full experience we recommend you to be using your own users. 
**A user can be created solely via a tau email account (emails ending with one of the following options: "mail.tau.ac.il", "tauex.tau.ac.il" or "eng.tau.ac.il";).
Users you can use:

When logging into the website, firstly you can search for your intended class. You can create 3 types of requests: to find partners for assignments, to switch class and to switch a class group (recitation or lab group).
After creating a request, the website’s algorithm will work to find a match. Once a match is found emails are sent to both users notifying them of the match. Users can now talk to each other via the chat option. If one of the users removes the request (maybe he found partners in a different way and the request is irrelevant, or he didn’t like the person he was matched with), the other will be notified and will be able to either remove his request as well or resubmit.  
An example for a request that can be created using the website: 
one user can create a request to switch from group 01 to group 03 in “אלגוריתמים” in semester א. 
if another user creates a request to switch from group 03 to group 01 in “אלגוריתמים” in semester א they will be matched, receive emails notifying them of the match and the chat option will open.

The website code is parted to front and backend: The front contains the UI while the back contains the login, the databases, the algorithm etc. The login is implemented using Firebase. The database is implemented using mySQL workbench. The database contains all the university classes, this data was derived using selenium. 
