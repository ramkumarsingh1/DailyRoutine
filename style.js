const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector('.progress-bar');
const progressValue =document.querySelector('.progress-value');
const progressLabel = document.querySelector('.progress-label');
const allQuotes = [
    'Raise the bar by completing your goals!',
    'well begun is half done!',
    'Just a step away , keep going!',
    'Whoa! you just completed all the goals!, time for chill'
]

errorLabel.innerText = `Please add all ${inputFields.length}  goals before marking them completed.`
// Get stored goals from localStorage or initialize empty object
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {}

// Count completed goals
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
// Update progress bar width
progressValue.style.width= `${(completedGoalsCount/inputFields.length)*100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`
progressLabel.innerText = allQuotes[completedGoalsCount]

// CHECKBOX CLICK EVENT
checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e)=>{
        // Check if all inputs are filled
        const allGoalsAdded =[...inputFields].every((input)=>{
            return input.value
        })
        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            // Recount completed goals
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
            progressValue.style.width= `${(completedGoalsCount/inputFields.length)*100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} Completed`
            progressLabel.innerText = allQuotes[completedGoalsCount]
            // Save updated data to localStorage
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
            progressBar.classList.add('show-error');
        }   
    })
})
//removing error when typing input or clicking input
inputFields.forEach((input) => {
    // Load stored goal data into input fields
    if(allGoals[input.id]){
    input.value = allGoals[input.id].name
    // Mark completed goals in UI
    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed');
    }
    }
    // Remove error when user clicks input
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error');
    })
    // prevent editing completed goal
    input.addEventListener('input',(e)=>{
        if(allGoals[input.id] && allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
       // Update existing goal name
        if(allGoals[input.id]){
        allGoals[input.id].name = input.value;
        }
        // Create new goal object
        else{
            allGoals[input.id] = {name: input.value, completed: false}
        }
        // Save updated goals to localStorage
        localStorage.setItem('allGoals',JSON.stringify(allGoals));
    })
})


