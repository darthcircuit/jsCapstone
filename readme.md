# HTML / SCSS / JS Capstone

## DUE: With the other projects, Wednesday

### style >

- main.scss
- main.css
- main.css.map
- sidebar-container >
  - page-container.scss
  - page-container.css
  - page-container.map.css

# Build My Random Student Generator

## HTML Interface

API URL: https://devpipeline-mock-api.onrender.com

- Layout: Sidebar with users that are fetched from the given api.
  > - users, (formatted first and abbreviated last initial, weight Defaulted to 1, plus and minus weight buttons, which should labeled appropriately)
- larger middle section that has:
  > - label (initial message, intermediate(while selecting) message, selected user)
  > - button to initiate selection process
- loading animation (ex: spinner, shuffle the names, etc)
  > - css animation
- hover effects
- disabled button while selecting a user

## JS

- fetch users from given api
- creating dom elements and appending them to the dom
- each user should be weighted, meaning that they would be more or less likely to be randomly selected
- users should only be selected 1 time (unless weighted) per round (getting through entire list)
- once everyone has been selected, the list should start over
- after starting another round(meaning everyone has been selected), the first person selected cannot be the last person that was selected (no back to back selections unless weighted)

### Requirements

1. Use VS Code
2. Push to github
3. Clean projects
4. Clean Code
5. Try your best to incorporate a large majority of what you've learned

---

Endpoint: /api/auth/login
Request Payload: { email, password } as a stringifie JSON object
Response body: {
message: "Logged In",
user: {\_id: "", first_name: "", last_name: "", cohort.......},
users: [{}, {}, {}]
}

Be on the lookout for further instructions regarding fetching your cohort peers

# -- HAVE FUN --
