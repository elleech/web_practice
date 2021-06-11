## image_repository

- An image shopping website which allows users to upload image or buy other people's images. Although it's called "image repository", it does not provide space for users to store images. They'll need to store it somewhere else and provide the URL.

- This project referenced a challenge of 2021 Shopify Developer Intern that I found online. They have a few requirements/ideas of the repository. The detailed description is in [Fall 2021 - Shopify Developer Intern Challenge.docx](https://github.com/elleech/web_practice/blob/master/image_repository/Fall%202021%20-%20Shopify%20Developer%20Intern%20Challenge.docx).

- Built by using **_MERN stack_** and **_Bootstrap_**.

_P.S. I don't own any photos inside the demo. They are resources from the Internet._

<!-- # View Here ->  -->

### Notes & Documentation: [doc-image_repository.pptx](https://github.com/elleech/web_practice/blob/master/image_repository/doc-image_repository.pptx)

### ER Model:

![Image](_images/shopify-image_repository-00_ermodel.png)

### Backend Permission Hierarchy:

![Image](_images/shopify-image_repository-00a_backendpermission.png)

![Image](_images/shopify-image_repository-00b_backendpermission.png)

### Website Pages Preview:

- Home (before login)

  ![Image](_images/shopify-image_repository-01_home.png)

  - Register/Login

    ![Image](_images/shopify-image_repository-01a_register.png)

    ![Image](_images/shopify-image_repository-01b_login.png)

- Home (after login)

  ![Image](_images/shopify-image_repository-02_home.png)

  - Buy from Home

    ![Image](_images/shopify-image_repository-02a_create_buy.png)

- My Image

  ![Image](_images/shopify-image_repository-03_myimage.png)

  - Create/Update from My Image

    ![Image](_images/shopify-image_repository-03a_create_image.png)

    ![Image](_images/shopify-image_repository-03b_update_image.png)

  - Update a sold image shipment from My Image

    ![Image](_images/shopify-image_repository-03c_update_buy.png)

- My Account

  ![Image](_images/shopify-image_repository-04_myaccount.png)

  - Update Account/Shipping Info

    ![Image](_images/shopify-image_repository-04a_update_account.png)

    ![Image](_images/shopify-image_repository-04b_update_user.png)

  - Create Shipping Info

    (Account doesn't have shipping info when register. Everyone needs to set it up to unlock purchase button.)

    ![Image](_images/shopify-image_repository-04c_create_user.png)

- My Order

  ![Image](_images/shopify-image_repository-05_myorder.png)

  - Cancel an order

    ![Image](_images/shopify-image_repository-05a_update_buy.png)
