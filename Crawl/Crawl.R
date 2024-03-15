library(tidyverse)
library(RSelenium)
library(netstat)
library(wdman)
library(XML)
selenium_object <- chrome(retcommand = T,verbose = F, check = F)
selenium_object
binman::list_versions("chromedriver")

rs_driver_objest <- rsDriver(browser = 'chrome',
                             chromever = '122.0.6261.128',
                             verbose = FALSE,
                             port = free_port()
                            )
remDr <- rs_driver_objest[["client"]]

# Navigate to the website
url <- "https://www.bioconductor.org/packages/release/BiocViews.html#___Software"
remDr$navigate(url)
table <- remDr$findElement(using = "id", value = "biocViews_package_table")

# Extract the HTML content of the table
table_html <- table$getElementAttribute("outerHTML")[[1]]

# Read the HTML table into a data frame
table_df <- readHTMLTable(table_html, header = TRUE, stringsAsFactors = FALSE)[[1]]

# Close the RSelenium session
remDr$close()
rs_driver_objest$server$stop()

# View the extracted data
View(table_df)
write.table(table_df, "F:\\Project\\shiny\\output.txt", sep=",", row.names=FALSE)

