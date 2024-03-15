library(plumber)
# Load your Plumber script
r <- plumb("F:/Project/shiny/PlayerRanking/backEndRanking/server.R")
# Run the Plumber API
r$run(debug = TRUE,port = 8000)

