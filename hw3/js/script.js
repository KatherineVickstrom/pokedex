//event listener
$("button").on("click", async function() {
  //clear invalid pokemon error and previous pokemon info
  clearPokemon();

  //sanitize user input, convert to lowercase and trim whitespace
  let pokemon = $("#pokemon").val().toLowerCase().trim();

  //api request to retrieve pokemon info
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  let response = await fetch(url);
  /* I needed to make the response text because I could not figure out how to validate if it returned "not found" in json, it would not execute anything
  afterwards. I found that it was easier to return as text
  and convert to json after finding that it didn't return "not found". */
  let data = await response.text();

  //validation to check if user entered a valid pokemon
  if(data == "Not Found" || pokemon == "") {
    $("#invalid").html("Pokemon not found, please enter a valid Pokemon name or number.");
  }
  else {
    //convert data from text to json
    data = JSON.parse(data);
    //set pokemon name on page
    pokemon = data.name.toUpperCase();
    $("#name").html(`${pokemon}`);
    //set pokemon photo on page
    $("#photo").html(`<img src='${data.sprites.front_default}' alt=${pokemon}>`);
    //set pokemon types
    $("#typeHeader").html("<h3>Types</h3>");
    for(let i = 0; i < data.types.length; i++) {
      $("#types").append(`${data.types[i].type.name}<br>`);
    }
    $("#types").append("</ul>");
    //set pokemon abilities
    $("#abilityHeader").html("<h3>Abilities</h3>");
    for(let i = 0; i < data.abilities.length; i++) {
      $("#abilities").append(`${data.abilities[i].ability.name}<br>`);
    }
    $("#abilities").append("</ul>");
    //set pokemon stats
    $("#statHeader").html("<h3>Base Stats</h3>");
    for(let i = 0; i < data.stats.length; i++) {
      $("#stats").append(`${data.stats[i].stat.name}: ${data.stats[i].base_stat}<br>`);
    }
    $("#stats").append("</ul>");
    //set pokemon moves
    $("#moveHeader").html("<h3>Moves</h3>");
    for(let i = 0; i < data.moves.length; i++) {
      $("#moves").append(`<tr><td>${data.moves[i].move.name}</td></tr>`);
    }
    $("#moves").append("</ul>");
  }
});
//function to clear all dynamic html elements
function clearPokemon() {
  $("#invalid").html("");
  $("#name").html("");
  $("#photo").html("");
  $("#typeHeader").html("");
  $("#types").html("");
  $("#abilityHeader").html("");
  $("#abilities").html("");
  $("#statHeader").html("");
  $("#stats").html("");
  $("#moveHeader").html("");
  $("#moves").html("");
}