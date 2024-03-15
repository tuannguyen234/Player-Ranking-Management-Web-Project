library(RPostgreSQL)
library(jsonlite)
# Define database connection function
db_conn <- function() {
  con <- dbConnect(RPostgres::Postgres(), dbname = "postgres", 
                   user = "postgres", 
                   password = "tuan234681", 
                   host = "127.0.0.1", 
                   port = 5432)
  return(con)
}

#' @filter cors
cors <- function(req, res) {
  
  res$setHeader("Access-Control-Allow-Origin", "*")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$setHeader("Access-Control-Allow-Methods","*")
    res$setHeader("Access-Control-Allow-Headers", req$HTTP_ACCESS_CONTROL_REQUEST_HEADERS)
    res$status <- 200 
    return(list())
  } else {
    plumber::forward()
  }
}


# Define SQL queries
CREATE_TABLE <- "
                CREATE TABLE IF NOT EXISTS Player (
                MSSV VARCHAR(20) PRIMARY KEY, FULL_NAME VARCHAR(100), RANK VARCHAR(50), DATE TIMESTAMP
                );
                "
SELECT <- "SELECT * FROM Player ORDER BY rank;"
INSERT <- "INSERT INTO Player (MSSV, FULL_NAME, RANK, DATE) VALUES ($1, $2, $3, $4);"
UPDATE <- "UPDATE Player SET FULL_NAME = $1, RANK = $2, DATE = $3 WHERE MSSV = $4 ;"
DELETE <- "DELETE FROM Player WHERE MSSV = $1;"

# Define plumber API endpoints
#* @apiTitle Player API
#* @get /show
Show <- function(){
  conn <- db_conn()
  data <- dbGetQuery(conn, SELECT)
  dbDisconnect(conn)
  return(data)
}



#* @post /create
post_example <- function(mssv,full_name,rank,date) {
  
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, INSERT, list(mssv, full_name, rank, date))
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}


#* @put /Update
post_example <- function(mssv,full_name,rank,date) {
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, UPDATE, list(full_name, rank, date,mssv))
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}

#* @delete  /delete
post_example <- function(mssv) {
  
  # Connect to the database
  conn = db_conn()
  dbExecute(conn, DELETE, mssv)
  
  # Disconnect from the database
  dbDisconnect(conn)
  
  # Return a response
  return("Done!")
}

