Zip the Lamda function on the fly
data "archive_file" "source6" {
  type        = "zip"
  source_dir = "lambda-jk-tf-test6.zip"
  source_file  = "src/index.js"
  source_file  = "node_modules/dotenv"
  source_file  = "src/helpers/templateHelper.js"
  source_file  = "src/helpers/emailHelper.js"
  output_path = "../lambda-function/lambda-jk-tf-test6.zip"
}
