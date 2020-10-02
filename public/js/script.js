// initialize sidenav using materialize js
$(document).ready(function () {
    $(".sidenav").sidenav();
});

// initialize slider using materialize js
const slider = document.querySelector(".slider");
M.Slider.init(slider, {
    indicators: false,
    height: 500,
});

$(document).ready(function () {
    $(document).on("click", "#recipeForm", submitRecipe);
    $(document).on("click", "#addAnIngredient", addAnIngredient);
    $(document).on("click", "#login", login);
    $(document).on("click", "#createAccount", createAccount);

    //ingredients to be added
    var ingredientArr = [];
    function addAnIngredient(event) {
        event.preventDefault();
        var oneIngredient = [
            $("#amount").val().trim(),
            $("#measurement").val().trim(),
            $("#ingredient").val().trim()
        ].join(" ").replace(/\s\s/g, " ");
       
        ingredientArr.push(oneIngredient);
        $('.showIngredients').append("<li>" + oneIngredient + "</li>");
        $("#amount").val("");
        $("#measurement").val("");
        $("#ingredient").val("");
        console.log(ingredientArr)
    };

    function submitRecipe(event) {
        event.preventDefault();
        var newRecipe = {
            recipe_name: $("#inputRecipeName").val().trim(),
            user_name: $("#addUsername").val().trim(),
            ingredients: ingredientArr.toString(),
            instructions: $("#inputInstructions").val().trim(),
            cook_time: parseInt($("#inputCook").val().trim()),
            prep_time: parseInt($("#inputPrep").val().trim()),
        }
        $.ajax("/api/recipe", {
            type: "POST",
            data: newRecipe
        }).then(
            function () {
                $('#showModal').modal('toggle');
            }
        );
    };

    function login(event) {
        event.preventDefault();
        $(".alert").hide();
        var userIn = {
            user_name: $("#addUsername").val().trim(),
            password: $("#createPassword").val().trim(),
        };
        $.post('/users/login', userIn).then(function (data) {
        
        if(data == "User does not exist"){
            $("#notExisting").show();
            $("input").val('');
        }
        else if(data == "Incorrect password"){
            $("#incorrectAlert").show();
            $("input").val('');
        }
        else{
            console.log(data)
            $("#successAlert").show();
        }

        })
    }

    function createAccount(event) {
        event.preventDefault();
        $(".alert").hide();
        var newUser = {
            user_name: $('#addUsername').val().trim(),
            password: $('#createPassword').val().trim(),
        };

        $.post('/users/register', newUser).then(function (data) {
            if(data == "Username already exists"){
            $("#existingUsername").show();
            $("input").val('');
            }
            else if (data == "Fields cannot be empty"){
            $("#emptyFields").show();
            $("input").val('');

            }
            else {
            $("#createAccountAlert").show();
            $("input").val('');
            }
        })
    }
})