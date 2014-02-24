# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, 'sencha-touch')

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")
fonts_path = File.join(dir, '..', 'themes/fonts/')

# Require any additional compass plugins here.
images_dir = File.join(dir, "..", "images")

require File.join(dir, 'compass-recipes', 'config')

# output_style = :compressed
# environment = :production
environment  = :development
output_style = :expanded