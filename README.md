# News Website

This is a fullstack project built using **_NextJS_** _app router_ with _form actions_. The application has a **_role-based authentication_** system _(user/moderator/admin)_ and uses a **_PostgreSQL_** database.

The application allows browsing/searching articles for unauthenticated users. After logging in, the user can like/save articles, create comments/replies, edit/like comments, follow text authors. The user also has insight into the history of all his activity and the ability to edit profile data.  
If the user has the _moderator_ role, they are authorized to create new articles based on a customized _MarkDown_ system with live preview of the written article.  
If the user has the _admin_ role, they additionally have permissions to the admin panel.

---

[Working App](https://blog-app-with-cockroachdb.vercel.app "Go to working page.")

---

## Used technologies:

- `prisma` to working and interacting with the database
- `next-auth` for authentication (_custom credentials provider and GitHub provider_)
- `zod` for data validation
- `bcrypt` for password encryption
- `date-fns` for handling dates
- `react-markdown` for markdown support
- `unist-util-visit` and `hastscript` to create a custom plugin for `react-markdown`

---

### Screenshots

![Non-logged user](/screenshots/Navbar_1.png "Navbar for non-logged in user.")
![Moderator user](/screenshots/Navbar_2.png "Navbar for logged user with moderator role.")
![Admin user](/screenshots/Navbar_3.png "Navbar for logged user with admin role.")
![Profile menu](/screenshots/profile-options.png "Profile related menu.")
![Search params filtering](/screenshots/searchparams-filtering.png "Filter articles by search parameters.")
![Signup form](/screenshots/signup.png "Form to create a new account.")
![Signup form with errors 1](/screenshots/signup_errors_1.png "Form to create a new account with errors.")
![Signup form with errors 2](/screenshots/signup_errors_2.png "Form to create a new account with errors caused by incorrectly entered data or an existing user with such data.")
![Screenshot of the form for creating an article](/screenshots/creating-post.png "Node screenshot showing the creation of an article using the custom MarkDown system.")
