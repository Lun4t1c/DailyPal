# DailyPal TODO

### Backend

- [X] Check why login result feedback is not showing up  
- [ ] Check Prisma and potentially rewrite models  
- [ ] Users emails
- [ ] Add Heroku ip addresses pool to Mongodb atlas
- [ ] Move checking if user is logged in from +page.server.ts's to hooks.server.ts

### Frontend
- [ ] Refactor Modal component
  - [ ] Deal with 'window is not defined' error
  - [ ] Deal with 'visible, non-interactive elements with an on:click event must be accompanied by an on:keydown, on:keyup, or on:keypress event.' warning  

- [ ] Implement ComboBoxComponent  

- [ ] Modules  

  - [ ] Todo module  
    - [X] Todo CRUD  
    - [ ] Delete completed todos after X time (specified by user)  
    - [ ] Nested todos 
    - [ ] Cyclical todos  

  - [ ] Time spent module  

  - [X] Streaks module

  - [ ] Finances  
    - [X] FinanceSources CRUD  
    - [ ] Ask user for confirmation when deleting  
    - [ ] Transactions CRUD  
    - [X] Move adding transaction to FinanceSourceComponent
    - [X] Transaction description
    - [X] Format money display value
    - [X] Predicted money amount component
    - [ ] Monthly spendings component  
    - [X] PlannedExpense: display percentage of total amount  
    - [ ] Sorting PlannedExpenses  
    - [ ] Monthly summaries  

  - [ ] Fitness  
    - [ ] Implement charts for FitnessMeasurements
    - [ ] Meals  
    - [ ] Up/Down arrow icons in FitnessMeasurementComponent showing if measurement has improved/worsen 

  - [ ]  Calendar module  
  
  - [X]  Feature suggestions module    

- [X] Components  
  - [X] Todo component  
  - [X] Streak component  
  - [X] Finance component  
  - [X] Fitness component  

### Styling

- [ ] Find some temporary ready to go css styles
- [ ] Navbar icons

### Misc

- [ ] Write proper README
- [X] Prepare app for multi-user possibilities
- [X] It is possible to register two user with the same login, fix that
- [ ] Unexpected typing token in 'filter()' in html body in .svelte files

### Important

- [ ] User register validation (https://youtu.be/E3VG-dLCRUk?t=832)  
- [ ] Limit login attempts  

### Bugs
- [ ] Switching todo isDone causes Modal error  
- [ ] Reloading in browser causes 500 internal server error  
- [ ] Footer covers content  

### In Progress



### Done ✓
