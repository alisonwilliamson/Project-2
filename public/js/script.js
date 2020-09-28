$(() => {
  const current = location.pathname;
  if (current === "/") {
    $(".nav-item.home").addClass("bg-info");
  } else {
    $(".navbar-nav .nav-item .nav-link").each(function() {
      const $this = $(this);
      const link = $this.attr("href");
      // if the current path is like this link, make it active
      if (link.indexOf(current) !== -1) {
        $this.parent().addClass("bg-info");
        $this.addClass("text-light");
      }
    });
  }
});

$(document).ready(() => {
  $(document).on("click", "#signIn", signIn);
  $(document).on("click", "#signUp", signUp);
  $(document).on("click", "#recipe-form", recipeSubmit);
  $(document).on("click", "#addIngredient", addIngredient);
  function signIn(event) {
    event.preventDefault();
    $(".alert").hide();
    const userIn = {
      userName: $("#inputUser")
        .val()
        .trim(),
      password: $("#inputPassword1")
        .val()
        .trim()
    };
    $.post("/users/login", userIn).then(data => {
      if (data === "User Does not Exist") {
        $("#usernameAlert").show();
        $("input").val("");
      } else if (data === "Incorrect password") {
        $("#passwordAlert").show();
        $("input").val("");
      } else {
        $("#successfulAlert").show();
      }
    });
  }

  function signUp(event) {
    event.preventDefault();
    $(".alert").hide();
    const newUser = {
      userName: $("#inputUser")
        .val()
        .trim(),
      password: $("#inputPassword1")
        .val()
        .trim()
    };

    $.post("/users/register", newUser).then(data => {
      if (data === "Username already exists") {
        $("#usernameExist").show();
        $("input").val("");
      } else if (data === "Fields Cannot Be Empty") {
        $("#fieldsEmpty").show();
        $("input").val("");
      } else {
        $("#signUpAlert").show();
        $("input").val("");
      }
    });
  }

  $(document).on("click", ".searchBtn", function() {
    const btnText = $(this).attr("data-text");
    $("#searchMe").html(btnText);

    if (btnText === "Search by User Name") {
      $("#searchMe").attr("data-value", "user_name");
    } else {
      $("#searchMe").attr("data-value", "recipe_name");
    }
  });

  $(document).on("click", "#searchMe", () => {
    event.preventDefault();
    let url;
    const userInput = $("#searchwhat")
      .val()
      .trim();
    if ($("#searchMe").attr("data-value") === "user_name") {
      url = "user";
    } else {
      url = "recipe";
    }
    const query = "/api/" + url + "/" + userInput;
    console.log(query);
    $.ajax({
      url: query,
      type: "GET"
      // eslint-disable-next-line no-unused-vars
    }).then(_data => {
      window.location.href = query;
      console.log(query);
    });
  });

  //need a validation that they have signed in before running function
  function recipeSubmit(event) {
    event.preventDefault();

    const newRecipe = {
      recipeName: $("#inputRecipeName")
        .val()
        .trim(),
      userName: $("#inputUserName")
        .val()
        .trim(),
      ingredients: ingredientsArray.toString(),
      instructions: $("#inputInstructions")
        .val()
        .trim(),
      cookTime: parseInt(
        $("#inputCook")
          .val()
          .trim()
      ),
      prepTime: parseInt(
        $("#inputPrep")
          .val()
          .trim()
      )
    };
    $.ajax("/api/recipe", {
      type: "POST",
      data: newRecipe
    }).then(() => {
      $("#showMeTheModal").modal("toggle");
      console.log("created new recipe");
    });
  }

  //this is for ingredients being added
  const ingredientsArray = [];

  function addIngredient(event) {
    event.preventDefault();
    //need to remove & and insert commas where split occurs
    const oneIngredient = [
      $("#inputAmount")
        .val()
        .trim(),
      $("#inputMeasurement")
        .val()
        .trim(),
      $("#inputIngredient")
        .val()
        .trim()
    ]
      .join(" ")
      .replace(/\s\s/g, " ");
    console.log(oneIngredient);
    ingredientsArray.push(oneIngredient);
    $(".ingredientsInMe").append("<li>" + oneIngredient + "</li>");
    $("#inputAmount").val("");
    $("#inputMeasurement").val("");
    $("#inputIngredient").val("");
    console.log(ingredientsArray);
  }
});
