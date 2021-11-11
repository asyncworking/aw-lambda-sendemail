# Zip the Lamda function on the fly
data "archive_file" "source6" {
  type        = "zip"
  source_dir = "lambda-jk-tf-test6.zip"
  source_file1  = "src/index.js"
  source_file2  = "node_modules/dotenv"
  source_file3  = "src/helpers/templateHelper.js"
  source_file4  = "src/helpers/emailHelper.js"
  output_path = "../lambda-function/lambda-jk-tf-test6.zip"
}
