# App details

### Proggress
Progress bar is showing the number of completed task,And the progress bar is showing the progress in percentage, It's basically colcualting by this equation 
```
( noOfCompletedTask / noOfTotalTask ) * 100
```

### Task filtering
`All` - Showing all todos
`Undone` - Showing todos are not done yet.
`Done` - Showing todos that are done.

### Tasks list
Fetching the tasks from api `https://todos-json-server.herokuapp.com/todos` and showing them as list. this api called when app is just mounted. I used `useEffect` hook here.

### Tasks list item
Each list item has two state, One is completed and other is running. Completed task has a overthough line and checked mark that indicates the task is completed. When click on each list item it will toggle between normal and completed state. List items also have a three dot menu to edit and delete the item. These two buttons also uses api call to update and delete. Delete button send a `DELETE` request on this api endpoint with the task id to delete the task `https://todos-json-server.herokuapp.com/todos/:id`.

### Add todo text field
This is the input field to write the task description to create a new task. Once user write the description and hit `Enter` on keyboard it's grab the description from the input field and send a `POST` request on the API and api create the task and return the task with an generated id and then the task being pushed to the tasks list and task list immediately show the task.