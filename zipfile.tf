# Zip the Lamda function on the fly
data "archive_file" "source6" {
  type        = "zip"
  source_dir  = "src/index.js node_modules/dotenv src/helpers/templateHelper.js src/helpers/emailHelper.js"
  output_path = "../lambda-function/lambda-jk-tf-test6.zip"
}
