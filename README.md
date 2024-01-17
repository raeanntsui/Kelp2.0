# Group Full Stack Project (Kelp)

Feel free to explore our website, Kelp, a platform designed to allow users to see reviews about businesses in Bikini Bottom from the iconic show, Spongebob Squarepants! Take a tour of the website and discover a diverse range of restaurants and businesses available at your fingertips. Registered users can explore, create businesses, and leave reviews on Kelp.

**Click on the link below to visit the live site!**<br>
[![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
](https://kelp-sqpk.onrender.com/)

<!-- **Check out the developers' LinkedIn profiles:**<br>
[![Linkedin](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/khuong-c-nguyen/) -->

**Languages Used**<br>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

<!-- ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) -->

**Site Preview**<br>

<!-- ![Alt Text](https://cdn.discordapp.com/attachments/1110721109076221993/1195912430971260958/image.png) -->

<!-- ![Alt text](<Screen-Recording-2024-01-13-at-11.17.31 AM.gif>) -->

## What can you do on Kelp?

**1. Check out reviews and ratings for businesses helping others make informed decisions!**<br>

- Navigate through the website as either a registered or unregistered user. Create your own account or simply log in as the demo user for quick access!
- View available businesses and see what other users have to say about it

**2. What are the perks of being a registered user?**<br>

- Create your own business in Bikini Bottom
- Edit or delete your existing spots
- Other users can leave reviews on your existing spots
- Post reviews on other spots

## How to download Kelp on your local computer

1. In the root folder:

- create an .env file
- copy over .envexample content into the new .env file
- run these commands in terminal

  ```bash
  pipenv requirements > requirements.txt
  pipenv install
  pipenv shell
  flask db upgrade
  flask seed all
  flask run
  ```

2. cd into the root folder and then run `pipenv run flask run` to start the back-end

3. cd into the react-app folder and then run `npm start` to start the front-end

# Site Summary

## Landing Page

<!-- ![](img.png) -->

- This page generates three randomly selected reviews to present a brief excerpt written by customers about other businesses

## Main Page

<!-- ![All business](image.png) -->

- Click the 'View All Spots' link to navigate here
- The homepage displays a comprehensive list of all available locations featured on Kelp.
- This page is also accessible to anyone (registered and unregistered users)

## Sign Up

<!-- ![Sign up](https://cdn.discordapp.com/attachments/1110721109076221993/1196687779342594048/image.png) -->

- Unregistered users have the option to create an account through the dropdown menu located at the top-right corner
- In the event a user attempts to input invalid information, error messages will populate to guide the user to resolve them accurately
- Upon successful completion of the Sign Up form, the new user will be logged in automatically

## Log In

<!-- ![Login](https://media.discordapp.net/attachments/1110721109076221993/1196688534917099602/image.png) -->

- Existing users can access their accounts through the designated login portal through the dropdown menu located at the top-right corner
- To gain full access to Kelp quickly, simply click the "Sign In as Demo User" button. This will allow you to creating new business, managing existing businesses, and leave reviews on others' businesses

## Leave a Review

<!-- ![Leave a comment](image.png) -->

- Registered users can submit reviews provided that they have not previously submitted a review for the same spot
- Each review requires a description and star rating, while the inclusion of photos remains optional
- Newly ubmitted reviews dynamically appear on the current page
- Users may modify or delete their reviews conveniently through the business details page

## Add a Business

<!-- ![Add a Spot](https://cdn.discordapp.com/attachments/1110721109076221993/1196688537177829487/image.png) -->

- As a logged-in user, create a spot in Bikini Bottom
- Each new listing requires a name, description, category, price, and image!

## Manage Business

<!-- ![Manage Spot](https://cdn.discordapp.com/attachments/1110721109076221993/1196688537702109274/image.png) -->

- User is able to update or delete the spot on the spot details page
- Each update requires a name, description, category, price, and image!
