# Zip the Lamda function on the fly
data "archive_file" "source6" {
  type        = "zip"
  source_dir  = "src/index.js"
  source_dir  = "node_modules/dotenv"
  source_dir  = "src/helpers/templateHelper.js"
  source_dir  = "src/helpers/emailHelper.js"
  output_path = "../lambda-function/lambda-jk-tf-test6.zip"
}
