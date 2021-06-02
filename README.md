# E-Commerce Web Application using React JS & Tensorflow

### Overview
<ul>
  <li>Dashboard style e-commerce website</li>
  <li>Responsive layout</li>
  <li>No CSS libraries</li>
  <li>Using Styled Components</li>
  <li>React Context API</li>
  <li>Tensorflow MobileNet Image Classifier for searching purposes</li>
</ul>

### CodeSandBox Demo

<a href="https://codesandbox.io/s/e-commerce-web-application-gy21f"> Check this out </a>
<br>
All the style is written using styled-components in .js file.
<br>
Svg illustration are contributed by <a href="https://undraw.co/illustrations"> Undraw </a>
<br>

### Searching Process

The searchbar allows the input of product name, brand, color and image address.
<br>
While inputing product name, brand and color, the webpage directly route you to the product page and the array of specific item is being displayed.
<br>
While inputing image address, the image identification box directly pop up using certain javascript regular expression. You can then press the identify image button, within 20ms inteference time of the MobileNet v2 model, an array of 3 prediction results are being displayed by the probability.
<br>
There are certain image URL blocked by the cross-origin policy (CORS policy). Apart from that, user can also provide an image file input to the browser for image classification.

### Brief Intro of Tensorflow JS MobileNet

MobileNet-v2 is a convolutional neural network that is 53 layers deep. You can load a pretrained version of the network trained on more than a million images from the ImageNet database. The pretrained network can classify images into 1000 object categories, such as keyboard, mouse, pencil, and many animals. As a result, the network has learned rich feature representations for a wide range of images. 

MobileNet-v2 image classification for javascript from Tensorflow JS library provide an eye-opening interactivity for the users or clients without any installation. This is the model that runs directly in the browser and the data input stays only at the client side, this greatly secure the privacy of the clients or users. Accurate results is provided for the users in the vast decrease in time(20ms inteference time) and better performance experience compared to VGG-16(OxfordNet). Even the species of the animal can be determined by the model.
