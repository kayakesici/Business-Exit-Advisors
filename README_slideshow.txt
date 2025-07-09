HERO BACKGROUND SLIDESHOW SETUP
=================================

Your website now has a translucent background slideshow in the hero section!

TO ACTIVATE THE SLIDESHOW:
1. Save your 4 presentation images with these exact names:
   - image1.jpg
   - image2.jpg  
   - image3.jpg
   - image4.jpg

2. Place these images in the same folder as your HTML file

WHAT THE SLIDESHOW DOES:
- Automatically rotates through your 4 images every 5 seconds
- Shows images at 30% opacity (translucent effect)
- Smooth 2-second fade transitions between images
- Text stays readable with overlay gradients

SLIDESHOW LOCATION IN CODE:
The image references are on lines 301-304:
<div class="hero-slide" style="background-image: url('image1.jpg');"></div>
<div class="hero-slide" style="background-image: url('image2.jpg');"></div>
<div class="hero-slide" style="background-image: url('image3.jpg');"></div>
<div class="hero-slide" style="background-image: url('image4.jpg');"></div>

TO CUSTOMIZE:
- Change timing: Edit "5000" in the JavaScript (currently 5 seconds)
- Change opacity: Edit "0.3" in the CSS (currently 30%)
- Use different image names: Update the url('...') references

FILES:
- index.html = Your original file (updated with slideshow)
- slideshow_website.html = Copy with clear name for download